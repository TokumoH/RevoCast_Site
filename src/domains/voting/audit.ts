import { projectLabel } from "./data"
import type { AuditResult, Project } from "./model"

// Conta os votos e monta o ranking. Empates ficam todos como campeões.
export function audit(projects: Project[]): AuditResult {
  const counted = projects.map((p, i) => ({ id: p.id, label: projectLabel(p.name, i), votes: p.votes }))
  const top = Math.max(0, ...counted.map((r) => r.votes))
  const rows = counted
    .map((r) => ({ ...r, ratio: top ? r.votes / top : 0 }))
    .sort((a, b) => b.votes - a.votes) // estável: empatados mantêm a ordem da página
  return {
    rows,
    champions: top ? rows.filter((r) => r.votes === top) : [],
    totalVotes: counted.reduce((sum, r) => sum + r.votes, 0),
  }
}
