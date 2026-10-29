// Direção de um voto, como no Reddit: +1 = ▲ (a favor), -1 = ▼ (contra).
export type VoteDirection = 1 | -1

// Projeto pertencente a uma votação específica. Os dados ficam no navegador da organização.
// ups/downs são contadores mantidos junto com as cédulas (a pontuação é ups - downs).
export type Project = {
  id: number
  name: string
  image: string
  ups: number
  downs: number
}

// Cédula de um votante numa votação: no máximo um voto (▲ ou ▼) por projeto. Chave = id do projeto.
export type Ballot = Record<string, VoteDirection>

// Votação é a entidade principal (agregado): agrupa os projetos e as cédulas dos votantes.
// ballots é indexado pelo hash do código de voto; o código em texto puro nunca é salvo.
export type Voting = {
  id: string
  title: string
  createdAt: number
  projects: Project[]
  ballots: Record<string, Ballot>
}

// Linha do gráfico da auditoria.
export type AuditRow = {
  id: number
  label: string
  ups: number
  downs: number
  score: number // ups - downs
  ratio: number // 0 a 1: |score| em relação ao maior |score|
}

export type AuditResult = {
  rows: AuditRow[] // da maior para a menor pontuação
  champions: AuditRow[] // vazio se ninguém votou; mais de um se houver empate
  totalVotes: number // quantidade de votos (▲ + ▼)
}
