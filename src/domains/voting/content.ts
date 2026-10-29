// ✏️ Textos e limites da página "Votação".
export const votingCopy = {
  eyebrow: "Votação",
  title: "Gerenciar votações",
  note: "Crie uma votação antes de cadastrar os projetos. Os dados ficam salvos neste navegador.",
  voteHint: "Use ▲ para dar um ponto e ▼ para tirar um ponto. A pontuação mínima é zero.",
  empty: "Esta votação ainda não tem projetos. Adicione o primeiro!",
  addLabel: "Adicionar projeto",
  full: "Limite de projetos atingido",
  imageLabel: "Clique para adicionar a logo ou capa",
  imageAlt: "Logo ou capa do projeto",
  namePlaceholder: "Nome do projeto",
  nameLabel: "Nome do projeto",
  upvote: (label: string) => `Dar um ponto para ${label}`,
  downvote: (label: string) => `Tirar um ponto de ${label}`,
  scoreLabel: (votes: number) => `Pontuação: ${votes}`,
  // Auditoria
  audit: "Auditar resultados",
  auditTitle: "Resultado da auditoria",
  chartLabel: "Gráfico de pontuação por projeto",
  champion: "Projeto vencedor",
  tie: "Empate no topo",
  noVotes: "Nenhum projeto tem pontos ainda. Vote com ▲ e audite novamente.",
}

export const votingLimits = {
  maxProjects: 10,
  nameMax: 40,
}

export const projectLabel = (name: string, index: number) => name.trim() || `Projeto ${index + 1}`
export const pointsLabel = (n: number) => `${n} ${n === 1 ? "ponto" : "pontos"}`
