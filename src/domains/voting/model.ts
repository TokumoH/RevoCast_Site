// Direção de um voto: +1 = ▲ (sobe), -1 = ▼ (desce).
export type VoteDirection = 1 | -1

// Projeto pertencente a uma votação específica. Os dados ficam no navegador da organização.
// votes = pontuação do projeto; nunca fica abaixo de zero (ver voteRule.ts).
export type Project = {
  id: number
  name: string
  image: string
  votes: number
}

// Votação é a entidade principal (agregado): existe antes dos projetos e agrupa os projetos e seus votos.
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
  champions: AuditRow[] // vazio se ninguém tem pontos; mais de um se houver empate
  totalVotes: number // soma das pontuações
}
