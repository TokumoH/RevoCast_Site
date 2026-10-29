/**
 * Links do site (plataformas, contato, rotas e âncoras).
 * Perfis de integrantes (LinkedIn/GitHub) ficam no domínio team: src/domains/team/data.ts.
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
