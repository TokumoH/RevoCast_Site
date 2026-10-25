import { useCallback, useMemo, useRef, useState } from "react"
import { audit } from "./audit"
import { votingLimits } from "./data"
import type { Project } from "./model"

// Guarda os projetos, os votos e o estado da auditoria.
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [audited, setAudited] = useState(false)
  const nextId = useRef(1)

  // Mudou a lista ou um voto: a auditoria antiga deixa de valer.
  const change = useCallback((update: (list: Project[]) => Project[]) => {
    setProjects(update)
    setAudited(false)
  }, [])
  const edit = useCallback((id: number, patch: Partial<Project>) => {
    setProjects((list) => list.map((p) => (p.id === id ? { ...p, ...patch } : p)))
  }, [])

  const add = useCallback(() => {
    const id = nextId.current++
    change((list) => (list.length >= votingLimits.maxProjects ? list : [...list, { id, name: "", image: "", voted: false }]))
  }, [change])
  const remove = useCallback((id: number) => change((list) => list.filter((p) => p.id !== id)), [change])
  const toggleVote = useCallback((id: number) => change((list) => list.map((p) => (p.id === id ? { ...p, voted: !p.voted } : p))), [change])
  const setName = useCallback((id: number, name: string) => edit(id, { name }), [edit])

  const setImage = useCallback(
    (id: number, file: File | undefined) => {
      if (!file || !file.type.startsWith("image/")) return
      const reader = new FileReader()
      reader.onload = () => edit(id, { image: String(reader.result) })
      reader.readAsDataURL(file)
    },
    [edit],
  )

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
