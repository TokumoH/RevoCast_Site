import { links } from "@/shared/config/links"
import type { Route } from "@/shared/router"

// ✏️ Textos do cabeçalho, da abertura (hero) e do rodapé.
export const nav = [
  { label: "Episódios", href: links.anchors.episodes },
  { label: "Sobre", href: links.anchors.about },
  { label: "Participe", href: links.anchors.join },
  { label: "Contato", href: links.anchors.contact },
]

// ✏️ Páginas (canto direito do cabeçalho): Nuvem, Votação e Equipe
export const pageNav: { label: string; href: string; route: Route }[] = [
  { label: "Nuvem", href: links.pages.cloud, route: "cloud" },
  { label: "Votação", href: links.pages.voting, route: "voting" },
  { label: "Equipe", href: links.pages.team, route: "team" },
]

export const hero = {
  title: "Papo sério,",
  highlight: "risada garantida.",
  text: "O RevoCast é o podcast da Atlética Revoada que leva conhecimento sobre faculdade, projetos e saberes para a conversa, de um jeito leve, com diversão e muito humor.",
  cta: "Assistir no YouTube",
  ctaSecondary: "Ver episódios",
  listenLabel: "ouça e siga também:",
  // ✏️ Frases que se alternam no balão do mascote (a primeira aparece antes)
  bubblePhrases: ["Bora trocar ideia?", "Tem café?", "Sem script, só papo!", "Qual é o assunto de hoje?"],
  logoAlt: "Logo do RevoCast: um pombo musculoso de óculos falando ao microfone",
}

export const footerNote = "Um podcast da Atlética Revoada, feito por estudantes."

// ✏️ Temas da faixa que corre entre o topo e os episódios
export const tickerThemes = ["Faculdade", "Projetos", "Saberes", "Humor"]
