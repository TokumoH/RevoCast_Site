import { useCallback, useMemo, useRef, useState } from "react"
import { audit } from "./audit"
import { votingLimits } from "./content"
import type { Project } from "./model"

type VotingState = { projects: Project[]; usedCodes: string[] }
const STORAGE_KEY = "revocast:voting:state:v1"
let validHashesPromise: Promise<Set<string>> | null = null

function readState(): VotingState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { projects: [], usedCodes: [] }
    const value: unknown = JSON.parse(raw)
    if (!value || typeof value !== "object") return { projects: [], usedCodes: [] }
    const candidate = value as { projects?: unknown; usedCodes?: unknown }
    const projects = Array.isArray(candidate.projects) ? candidate.projects.filter((p): p is Project => Boolean(
      p && typeof p.id === "number" && typeof p.name === "string" &&
      typeof p.image === "string" && typeof p.votes === "number" && p.votes >= 0,
    )) : []
    const usedCodes = Array.isArray(candidate.usedCodes) ? candidate.usedCodes.filter((v): v is string => typeof v === "string") : []
    return { projects, usedCodes }
  } catch {
    return { projects: [], usedCodes: [] }
  }
}

function persistState(state: VotingState) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) } catch {
    throw new Error("Não foi possível salvar a votação neste navegador. Libere espaço ou remova imagens muito grandes.")
  }
}

async function sha256(value: string): Promise<string> {
  if (!globalThis.crypto?.subtle) throw new Error("A validação precisa de uma conexão HTTPS. Abra o site publicado e tente novamente.")
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value.trim().toUpperCase()))
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("")
}

async function getValidHashes(): Promise<Set<string>> {
  if (!validHashesPromise) {
    validHashesPromise = fetch(`${import.meta.env.BASE_URL}vote-code-hashes.json`, { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Os códigos ainda não foram configurados. A organização precisa gerar o lote de códigos antes da votação.")
        const data: unknown = await response.json()
        if (!Array.isArray(data) || !data.every((v) => typeof v === "string")) throw new Error("A lista de códigos está inválida. Avise a organização.")
        return new Set(data as string[])
      })
      .catch((error) => { validHashesPromise = null; throw error })
  }
  return validHashesPromise
}

// Guarda projetos, contagem de votos e códigos consumidos em uma única entrada local.
// Isso é adequado a uma feira presencial usando um único computador e navegador.
export function useProjects() {
  const [state, setState] = useState<VotingState>(readState)
  const stateRef = useRef(state)
  const [audited, setAudited] = useState(false)
  const nextId = useRef(Math.max(0, ...state.projects.map((p) => p.id)) + 1)
  const votingLock = useRef(false)
  const projects = state.projects

  const commit = useCallback((next: VotingState) => {
    // Persistir primeiro evita atualizar a tela se o navegador não conseguir gravar.
    persistState(next)
    stateRef.current = next
    setState(next)
    setAudited(false)
  }, [])

  const change = useCallback((update: (list: Project[]) => Project[]) => {
    const current = stateRef.current
    commit({ ...current, projects: update(current.projects) })
  }, [commit])

  const edit = useCallback((id: number, patch: Partial<Project>) => {
    change((list) => list.map((p) => (p.id === id ? { ...p, ...patch } : p)))
  }, [change])

  const add = useCallback(() => {
    if (stateRef.current.projects.length >= votingLimits.maxProjects) return
    const id = nextId.current++
    change((list) => [...list, { id, name: "", image: "", votes: 0 }])
  }, [change])
  const remove = useCallback((id: number) => change((list) => list.filter((p) => p.id !== id)), [change])

  const toggleVote = useCallback(async (id: number, inputCode: string) => {
    if (votingLock.current) throw new Error("Aguarde a validação do voto anterior.")
    votingLock.current = true
    try {
      const code = inputCode.trim().toUpperCase()
      if (!/^RV-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/.test(code)) throw new Error("Confira o código. Exemplo: RV-ABCD-2345.")
      if (!stateRef.current.projects.some((p) => p.id === id)) throw new Error("Projeto não encontrado. Atualize a página e tente novamente.")

      const codeHash = await sha256(code)
      const validHashes = await getValidHashes()
      if (!validHashes.has(codeHash)) throw new Error("Código inválido. Confira os caracteres e tente novamente.")

      const current = stateRef.current
      if (current.usedCodes.includes(codeHash)) throw new Error("Este código já foi utilizado.")

      const next: VotingState = {
        projects: current.projects.map((p) => p.id === id ? { ...p, votes: p.votes + 1 } : p),
        usedCodes: [...current.usedCodes, codeHash],
      }
      // Os votos e os códigos usados são salvos juntos para evitar estados parciais após recarregar.
      commit(next)
    } finally {
      votingLock.current = false
    }
  }, [commit])

  const setName = useCallback((id: number, name: string) => edit(id, { name }), [edit])
  const setImage = useCallback((id: number, file: File | undefined) => {
    if (!file || !file.type.startsWith("image/")) return
    const reader = new FileReader()
    reader.onload = () => {
      const image = new Image()
      image.onload = () => {
        // Reduz as imagens para não lotar o armazenamento local durante a feira.
        const scale = Math.min(1, 720 / Math.max(image.naturalWidth, image.naturalHeight))
        const canvas = document.createElement("canvas")
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale))
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale))
        const context = canvas.getContext("2d")
        if (!context) { edit(id, { image: String(reader.result) }); return }
        context.drawImage(image, 0, 0, canvas.width, canvas.height)
        edit(id, { image: canvas.toDataURL("image/webp", 0.78) })
      }
      image.src = String(reader.result)
    }
    reader.readAsDataURL(file)
  }, [edit])

  const result = useMemo(() => (audited ? audit(projects) : null), [audited, projects])

  return {
    projects,
    canAdd: projects.length < votingLimits.maxProjects,
    add,
    remove,
    toggleVote,
    setName,
    setImage,
    audited,
    runAudit: () => setAudited(true),
    result,
  }
}
