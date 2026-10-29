/** Perfis de um integrante da página Equipe. Vazio ("") = o botão correspondente não aparece. */
export type MemberLinks = { linkedin: string; github: string }

/**
 * TODOS os links do site ficam aqui.
 * Link vazio ("") = o botão ou ícone correspondente não aparece (ou fica desativado).
 */
export const links = {
  // Plataformas do podcast
  platforms: {
    youtube: "https://www.youtube.com/@Revocast-Atl%C3%A9ticaRevoada",
    instagram: "https://www.instagram.com/atletica_revocast/",
    tiktok: "https://www.tiktok.com/@atletica_revocast?lang=en",
    spotify: "https://open.spotify.com/show/4fL422JHtzoSi2GGmGCUnc?si=a142fa1962814727",
    amazonMusic: "", // ✏️ adicionar quando tiver o link
  },
  // Formas de contato
  contact: {
    email: "atleticarevocast@gmail.com", // ✏️ ex.: "contato@exemplo.com"
    whatsapp: "", // ✏️ link completo, ex.: "https://wa.me/55..."
    guestForm: "", // ✏️ link do formulário para convidados (ex.: Google Forms)
  },
  // Páginas interativas (rotas por "#/", sem recarregar o site)
  pages: {
    cloud: "#/nuvem",
    voting: "#/votacao",
    team: "#/equipe",
  },
  // Perfis dos integrantes da página Equipe. A chave é o "id" do integrante em src/domains/team/data.ts.
  // ✏️ Os links abaixo são EXEMPLOS (levam à página inicial das redes): troque pelo perfil de cada pessoa.
  // Quem não está na lista (ou tem link vazio) simplesmente não mostra o botão.
  team: {
    membro01: { linkedin: "https://www.linkedin.com/", github: "https://github.com/" },
    membro02: { linkedin: "https://www.linkedin.com/", github: "https://github.com/" },
    membro03: { linkedin: "https://www.linkedin.com/", github: "https://github.com/" },
    membro04: { linkedin: "https://www.linkedin.com/", github: "https://github.com/" },
    membro05: { linkedin: "https://www.linkedin.com/", github: "https://github.com/" },
    membro06: { linkedin: "https://www.linkedin.com/", github: "https://github.com/" },
    membro07: { linkedin: "https://www.linkedin.com/", github: "https://github.com/" },
    membro08: { linkedin: "https://www.linkedin.com/", github: "https://github.com/" },
    membro09: { linkedin: "https://www.linkedin.com/", github: "https://github.com/" },
    membro10: { linkedin: "https://www.linkedin.com/", github: "https://github.com/" },
  } as Record<string, MemberLinks>,
  // Âncoras internas (navegação dentro da página)
  anchors: {
    top: "#topo",
    episodes: "#episodios",
    about: "#sobre",
    join: "#participe",
    contact: "#contato",
  },
}

export const anchorId = (anchor: string) => anchor.replace("#", "")

/** Links de um integrante (pelo "id"). Sem cadastro em links.team, devolve tudo vazio. */
export const memberLinks = (id: string): MemberLinks => links.team[id] ?? { linkedin: "", github: "" }
