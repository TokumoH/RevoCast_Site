// Projeto pertencente a uma votação específica. Os dados ficam no navegador da organização.
export type Project = {
  id: number
  name: string
  image: string
  votes: number
}

// Votação é a entidade principal: ela existe antes dos projetos e agrupa os projetos e seus votos.
export type Voting = {
  id: string
  title: string
  createdAt: number
  projects: Project[]
}

// Linha do gráfico da auditoria.
export type AuditRow = {
  id: number
  label: string
  votes: number
  ratio: number // 0 a 1, em relação ao mais votado
}

export type AuditResult = {
  rows: AuditRow[] // do mais votado ao menos votado
  champions: AuditRow[] // vazio se ninguém votou; mais de um se houver empate
  totalVotes: number
}
