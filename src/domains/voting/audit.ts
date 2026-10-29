import { projectScore, projectVotes } from "./ballot"
import { projectLabel } from "./content"
import type { AuditResult, Project } from "./model"

// Monta o ranking pela pontuação (▲ - ▼). Empates no topo ficam todos como campeões.
export function audit(projects: Project[]): AuditResult {
  const counted = projects.map((p, i) => ({ id: p.id, label: projectLabel(p.name, i), ups: p.ups, downs: p.downs, score: projectScore(p) }))
  const totalVotes = projects.reduce((sum, p) => sum + projectVotes(p), 0)
  const maxAbs = Math.max(0, ...counted.map((r) => Math.abs(r.score)))
  const rows = counted
    .map((r) => ({ ...r, ratio: maxAbs ? Math.abs(r.score) / maxAbs : 0 }))
    .sort((a, b) => b.score - a.score) // estável: empatados mantêm a ordem da página
  const top = rows[0]?.score
  return {
    rows,
    champions: totalVotes > 0 ? rows.filter((r) => r.score === top) : [],
    totalVotes,
  }
}
