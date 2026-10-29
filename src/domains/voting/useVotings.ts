import { useCallback, useRef, useState } from "react"
import { applyVote } from "./ballot"
import { votingLimits } from "./content"
import type { Project, VoteDirection, Voting } from "./model"
import { makeVotingId, persistStore, readStore, type VotingStore } from "./votingStore"

// Estado das votações (agregado Voting) e suas operações. Persistência em votingStore.ts; regra do voto em ballot.ts.
export function useVotings() {
  const [store, setStore] = useState<VotingStore>(readStore)
  const storeRef = useRef(store)

  const commit = useCallback((next: VotingStore) => {
    // Persistir antes de atualizar a interface para não mostrar alterações que não foram salvas.
    persistStore(next)
    storeRef.current = next
    setStore(next)
  }, [])

  const updateVoting = useCallback((votingId: string, update: (voting: Voting) => Voting) => {
    const current = storeRef.current
    commit({ ...current, votings: current.votings.map((voting) => voting.id === votingId ? update(voting) : voting) })
  }, [commit])

  const createVoting = useCallback((title: string) => {
    const normalizedTitle = title.trim()
    if (!normalizedTitle) throw new Error("Informe um nome para a votação.")
    const id = makeVotingId()
    const nextVoting: Voting = { id, title: normalizedTitle.slice(0, 80), createdAt: Date.now(), projects: [], ballots: {} }
    commit({ ...storeRef.current, votings: [...storeRef.current.votings, nextVoting] })
    return id
  }, [commit])

  const deleteVoting = useCallback((id: string) => {
    commit({ ...storeRef.current, votings: storeRef.current.votings.filter((voting) => voting.id !== id) })
  }, [commit])

  const addProject = useCallback((votingId: string) => {
    updateVoting(votingId, (voting) => {
      if (voting.projects.length >= votingLimits.maxProjects) return voting
      const nextId = Math.max(0, ...voting.projects.map((project) => project.id)) + 1
      return { ...voting, projects: [...voting.projects, { id: nextId, name: "", image: "", ups: 0, downs: 0 }] }
    })
  }, [updateVoting])

  const editProject = useCallback((votingId: string, projectId: number, patch: Partial<Pick<Project, "name" | "image">>) => {
    updateVoting(votingId, (voting) => ({
      ...voting,
      projects: voting.projects.map((project) => project.id === projectId ? { ...project, ...patch } : project),
    }))
  }, [updateVoting])

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

  // Códigos que já votaram no sistema antigo (um voto por código) não podem abrir uma sessão de votante.
  const isLocked = useCallback((voterHash: string) => storeRef.current.lockedCodes.includes(voterHash), [])

  // ▲/▼ estilo Reddit: clicar de novo desfaz, clicar no oposto troca. Cédula e contadores são gravados juntos.
  const castVote = useCallback((votingId: string, voterHash: string, projectId: number, direction: VoteDirection) => {
    const voting = storeRef.current.votings.find((v) => v.id === votingId)
    if (!voting) throw new Error("Votação não encontrada. Volte à lista e entre novamente.")
    if (!voting.projects.some((project) => project.id === projectId)) throw new Error("Projeto não encontrado. Atualize a página e tente novamente.")
    updateVoting(votingId, (current) => applyVote(current, voterHash, projectId, direction))
  }, [updateVoting])

  return { votings: store.votings, createVoting, deleteVoting, addProject, setName, setImage, isLocked, castVote }
}
