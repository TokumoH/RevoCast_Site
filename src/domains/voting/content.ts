// ✏️ Textos e limites da página "Votação".
export const votingCopy = {
  eyebrow: "Votação",
  title: "Gerenciar votações",
  note: "Crie uma votação antes de cadastrar os projetos. Os dados ficam salvos neste navegador.",
  empty: "Esta votação ainda não tem projetos. Adicione o primeiro!",
  addLabel: "Adicionar projeto",
  full: "Limite de projetos atingido",
  imageLabel: "Clique para adicionar a logo ou capa",
  imageAlt: "Logo ou capa do projeto",
  namePlaceholder: "Nome do projeto",
  nameLabel: "Nome do projeto",
  vote: "Votar",
  audit: "Auditar resultados",
  auditTitle: "Resultado da auditoria",
  chartLabel: "Gráfico de votos por projeto",
  champion: "Projeto vencedor",
  tie: "Empate no topo",
  noVotes: "Ninguém votou ainda. Registre um voto e audite novamente.",
}

export const votingLimits = {
  maxProjects: 10,
  nameMax: 40,
}

export const projectLabel = (name: string, index: number) => name.trim() || `Projeto ${index + 1}`
export const votesLabel = (n: number) => `${n} ${n === 1 ? "voto" : "votos"}`
