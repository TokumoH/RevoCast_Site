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
  // Sessão do votante (digita o código uma vez e vota com ▲/▼)
  voterTitle: "Quer votar?",
  voterHint: "Digite seu código uma vez e depois use ▲ e ▼ nos projetos. Clicar de novo desfaz; clicar no oposto troca.",
  voterLabel: "Seu código de voto",
  voterStart: "Começar a votar",
  voterValidating: "Validando…",
  voterActive: (label: string) => `Votando com ${label}`,
  voterIdle: (seconds: number) => `A sessão encerra sozinha após ${Math.round(seconds / 60)} min sem votos.`,
  voterEnd: "Terminar e passar a vez",
  needVoter: "Digite seu código acima para votar",
  upvote: (label: string) => `Votar a favor de ${label}`,
  downvote: (label: string) => `Votar contra ${label}`,
  scoreLabel: (score: number) => `Pontuação: ${score}`,
  // Auditoria
  audit: "Auditar resultados",
  auditTitle: "Resultado da auditoria",
  chartLabel: "Gráfico de pontuação por projeto",
  champion: "Projeto vencedor",
  tie: "Empate no topo",
  noVotes: "Ninguém votou ainda. Registre votos e audite novamente.",
}

export const votingLimits = {
  maxProjects: 10,
  nameMax: 40,
  voterIdleSeconds: 120, // sessão do votante termina após 2 min sem votar
}

export const projectLabel = (name: string, index: number) => name.trim() || `Projeto ${index + 1}`
export const votesLabel = (n: number) => `${n} ${n === 1 ? "voto" : "votos"}`
export const pointsLabel = (n: number) => `${n} ${Math.abs(n) === 1 ? "ponto" : "pontos"}`
