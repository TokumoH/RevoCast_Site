// ✏️ Textos e limites da página "Votação".
export const votingCopy = {
  eyebrow: "Votação",
  title: "Quem leva a taça?",
  note: "um clique vota, outro clique tira o voto",
  empty: "Nenhum projeto ainda. Adicione o primeiro!",
  addLabel: "Adicionar projeto",
  full: "Limite de projetos atingido",
  imageLabel: "Clique para adicionar a logo ou capa",
  imageAlt: "Logo ou capa do projeto",
  namePlaceholder: "Nome do projeto",
  nameLabel: "Nome do projeto",
  vote: "Votar",
  voted: "Votado",
  remove: "Remover projeto",
  audit: "Auditar",
  auditTitle: "Resultado da auditoria",
  chartLabel: "Gráfico de votos por projeto",
  champion: "Campeão da votação",
  tie: "Empate no topo",
  noVotes: "Ninguém votou ainda. Vote em algum projeto e audite de novo.",
}

export const votingLimits = {
  maxProjects: 10,
  nameMax: 40,
}

export const projectLabel = (name: string, index: number) => name.trim() || `Projeto ${index + 1}`
export const votesLabel = (n: number) => `${n} ${n === 1 ? "voto" : "votos"}`
