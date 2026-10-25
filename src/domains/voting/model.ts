// Projeto da votação. O total de votos é armazenado localmente neste computador.
export type Project = {
  id: number
  name: string
  image: string
  votes: number
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
