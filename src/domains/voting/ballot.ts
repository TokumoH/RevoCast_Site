import type { Project, VoteDirection, Voting } from "./model"

/**
 * Regra do voto estilo Reddit (função pura, sem estado):
 * - sem voto + ▲  → ▲        - ▲ + ▲ → sem voto (desfaz)
 * - ▲ + ▼        → ▼ (troca) - o mesmo vale para ▼
 */
export function nextDirection(current: VoteDirection | undefined, clicked: VoteDirection): VoteDirection | undefined {
  return current === clicked ? undefined : clicked
}

// Aplica o voto de um votante a um projeto e devolve a votação atualizada (cédula + contadores juntos).
export function applyVote(voting: Voting, voterHash: string, projectId: number, clicked: VoteDirection): Voting {
  const key = String(projectId)
  const ballot = voting.ballots[voterHash] ?? {}
  const before = ballot[key]
  const after = nextDirection(before, clicked)

  const nextBallot = { ...ballot }
  if (after) nextBallot[key] = after
  else delete nextBallot[key]

  const recount = (project: Project): Project => {
    if (project.id !== projectId) return project
    const ups = project.ups - (before === 1 ? 1 : 0) + (after === 1 ? 1 : 0)
    const downs = project.downs - (before === -1 ? 1 : 0) + (after === -1 ? 1 : 0)
    return { ...project, ups, downs }
  }

  return {
    ...voting,
    projects: voting.projects.map(recount),
    ballots: { ...voting.ballots, [voterHash]: nextBallot },
  }
}

export const projectScore = (project: Pick<Project, "ups" | "downs">) => project.ups - project.downs
export const projectVotes = (project: Pick<Project, "ups" | "downs">) => project.ups + project.downs
