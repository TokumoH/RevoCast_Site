// Um projeto na votação. "image" vazia = espaço reservado; "voted" = o voto (como o like do YouTube).
export type Project = {
  id: number
  name: string
  image: string
  voted: boolean
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
