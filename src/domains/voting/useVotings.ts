import { useCallback, useRef, useState } from "react"
import type { Project, Voting } from "./model"
import { votingLimits } from "./content"

const STORAGE_KEY = "revocast:voting:sessions:v2"
const LEGACY_STORAGE_KEY = "revocast:voting:state:v1"
let validHashesPromise: Promise<Set<string>> | null = null

type VotingStore = { votings: Voting[]; usedCodes: string[] }
type LegacyState = { projects?: unknown; usedCodes?: unknown }

function isProject(value: unknown): value is Project {
  if (!value || typeof value !== "object") return false
  const p = value as Partial<Project>
  return typeof p.id === "number" && typeof p.name === "string" &&
    typeof p.image === "string" && typeof p.votes === "number" && Number.isFinite(p.votes) && p.votes >= 0
}

function isVoting(value: unknown): value is Voting {
  if (!value || typeof value !== "object") return false
  const v = value as Partial<Voting>
  return typeof v.id === "string" && typeof v.title === "string" &&
    typeof v.createdAt === "number" && Array.isArray(v.projects) && v.projects.every(isProject)
}

function readStore(): VotingStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed: unknown = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        // Compatibilidade com o formato intermediário: converte códigos usados por votação em uma lista global.
        const sessions = parsed.filter(isVoting)
        const legacyCodes = parsed.flatMap((entry) => {
          if (!entry || typeof entry !== "object") return []
          const usedCodes = (entry as { usedCodes?: unknown }).usedCodes
          return Array.isArray(usedCodes) ? usedCodes.filter((code): code is string => typeof code === "string") : []
        })
        const migrated: VotingStore = { votings: sessions, usedCodes: [...new Set(legacyCodes)] }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated))
        return migrated
      }
      if (parsed && typeof parsed === "object") {
        const candidate = parsed as { votings?: unknown; usedCodes?: unknown }
        if (Array.isArray(candidate.votings) && candidate.votings.every(isVoting) && Array.isArray(candidate.usedCodes)) {
          return {
            votings: candidate.votings,
            usedCodes: candidate.usedCodes.filter((code): code is string => typeof code === "string"),
          }
        }
      }
    }

    // Migra a votação única criada por versões anteriores do site sem perder seus votos/códigos consumidos.
    const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY)
    if (!legacyRaw) return { votings: [], usedCodes: [] }
    const legacy: unknown = JSON.parse(legacyRaw)
    if (!legacy || typeof legacy !== "object") return { votings: [], usedCodes: [] }
    const candidate = legacy as LegacyState
    const projects = Array.isArray(candidate.projects) ? candidate.projects.filter(isProject) : []
    const usedCodes = Array.isArray(candidate.usedCodes) ? candidate.usedCodes.filter((v): v is string => typeof v === "string") : []
    if (projects.length === 0 && usedCodes.length === 0) return { votings: [], usedCodes: [] }
    const migrated: VotingStore = {
      votings: [{ id: makeId(), title: "Votação anterior", createdAt: Date.now(), projects }],
      usedCodes,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated))
    return migrated
  } catch {
    return { votings: [], usedCodes: [] }
  }
}

function persistStore(store: VotingStore) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  } catch {
    throw new Error("Não foi possível salvar os dados neste navegador. Libere espaço ou reduza o tamanho das imagens dos projetos.")
  }
}

function makeId(): string {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID()
  return `voting-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
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
        if (!response.ok) throw new Error("Os códigos ainda não foram configurados. A organização precisa gerar o lote antes da votação.")
        const data: unknown = await response.json()
        if (!Array.isArray(data) || !data.every((v) => typeof v === "string")) throw new Error("A lista de códigos está inválida. Avise a organização.")
        return new Set(data as string[])
      })
      .catch((error) => { validHashesPromise = null; throw error })
  }
  return validHashesPromise
}

// A entidade principal é a votação; os códigos consumidos são globais para impedir reuso entre votações.
export function useVotings() {
  const [store, setStore] = useState<VotingStore>(readStore)
  const storeRef = useRef(store)
  const votingLock = useRef(false)
  const votings = store.votings

  const commit = useCallback((next: VotingStore) => {
    // Persistir antes de atualizar a interface para não mostrar alterações que não foram salvas.
    persistStore(next)
    storeRef.current = next
    setStore(next)
  }, [])

  const createVoting = useCallback((title: string) => {
    const normalizedTitle = title.trim()
    if (!normalizedTitle) throw new Error("Informe um nome para a votação.")
    const id = makeId()
    const nextVoting: Voting = { id, title: normalizedTitle.slice(0, 80), createdAt: Date.now(), projects: [] }
    commit({ ...storeRef.current, votings: [...storeRef.current.votings, nextVoting] })
    return id
  }, [commit])

  const deleteVoting = useCallback((id: string) => {
    // Os códigos já utilizados continuam consumidos mesmo quando uma votação é excluída.
    commit({ ...storeRef.current, votings: storeRef.current.votings.filter((voting) => voting.id !== id) })
  }, [commit])

  const addProject = useCallback((votingId: string) => {
    const target = storeRef.current.votings.find((voting) => voting.id === votingId)
    if (!target || target.projects.length >= votingLimits.maxProjects) return
    const nextId = Math.max(0, ...target.projects.map((project) => project.id)) + 1
    commit({
      ...storeRef.current,
      votings: storeRef.current.votings.map((voting) => voting.id !== votingId ? voting : {
        ...voting,
        projects: [...voting.projects, { id: nextId, name: "", image: "", votes: 0 }],
      }),
    })
  }, [commit])

  const editProject = useCallback((votingId: string, projectId: number, patch: Partial<Project>) => {
    commit({
      ...storeRef.current,
      votings: storeRef.current.votings.map((voting) => voting.id !== votingId ? voting : {
        ...voting,
        projects: voting.projects.map((project) => project.id === projectId ? { ...project, ...patch } : project),
      }),
    })
  }, [commit])

  const setName = useCallback((votingId: string, projectId: number, name: string) => {
    editProject(votingId, projectId, { name })
  }, [editProject])

  const setImage = useCallback((votingId: string, projectId: number, file: File | undefined) => {
    if (!file || !file.type.startsWith("image/")) return
    const reader = new FileReader()
    reader.onload = () => {
      const image = new Image()
      image.onload = () => {
        // Reduz as imagens para evitar que capas grandes excedam a capacidade do armazenamento local.
        const scale = Math.min(1, 720 / Math.max(image.naturalWidth, image.naturalHeight))
        const canvas = document.createElement("canvas")
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale))
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale))
        const context = canvas.getContext("2d")
        if (!context) { editProject(votingId, projectId, { image: String(reader.result) }); return }
        context.drawImage(image, 0, 0, canvas.width, canvas.height)
        editProject(votingId, projectId, { image: canvas.toDataURL("image/webp", 0.78) })
      }
      image.src = String(reader.result)
    }
    reader.readAsDataURL(file)
  }, [editProject])

  const vote = useCallback(async (votingId: string, projectId: number, inputCode: string) => {
    if (votingLock.current) throw new Error("Aguarde a validação do voto anterior.")
    votingLock.current = true
    try {
      const code = inputCode.trim().toUpperCase()
      if (!/^RV-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/.test(code)) throw new Error("Confira o código. Exemplo: RV-ABCD-2345.")

      const codeHash = await sha256(code)
      const validHashes = await getValidHashes()
      if (!validHashes.has(codeHash)) throw new Error("Código inválido. Confira os caracteres e tente novamente.")

      const currentStore = storeRef.current
      const currentVoting = currentStore.votings.find((voting) => voting.id === votingId)
      if (!currentVoting) throw new Error("Votação não encontrada. Volte à lista e entre novamente.")
      if (!currentVoting.projects.some((project) => project.id === projectId)) throw new Error("Projeto não encontrado. Atualize a página e tente novamente.")
      if (currentStore.usedCodes.includes(codeHash)) throw new Error("Este código já foi utilizado e não pode votar novamente em nenhuma votação.")

      // Voto e consumo global do código são gravados juntos no armazenamento local.
      commit({
        ...currentStore,
        votings: currentStore.votings.map((voting) => voting.id !== votingId ? voting : {
          ...voting,
          projects: voting.projects.map((project) => project.id === projectId ? { ...project, votes: project.votes + 1 } : project),
        }),
        usedCodes: [...currentStore.usedCodes, codeHash],
      })
    } finally {
      votingLock.current = false
    }
  }, [commit])

  return { votings, createVoting, deleteVoting, addProject, setName, setImage, vote }
}
