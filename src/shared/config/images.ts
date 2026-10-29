/**
 * TODAS as imagens do site ficam aqui.
 * Para trocar uma imagem: coloque o arquivo na pasta indicada (public/images/<pasta>/)
 * e mude o caminho da variável, ou cole um link completo (https://...).
 * Variável vazia ("") = o site mostra um espaço reservado para a imagem.
 */
const asset = (path: string) =>
  /^(data:|https?:)/.test(path) ? path : `${import.meta.env.BASE_URL}images/${path}`
const slot = (path: string) => (path ? asset(path) : "")

export const images = {
  brand: {
    logo: asset("brand/logo.png"), // public/images/brand/
  },
  episodes: {
    // Capa personalizada de cada episódio (public/images/episodes/).
    // Vazia = usa a miniatura do YouTube (se o episódio tiver youtubeId).
    ep01: slot("episodes/ep1Thumbnail.jpg"), // ex.: slot("episodes/ep01.jpg")
    ep02: slot("episodes/ep2Thumbnail.jpg"),
    ep03: slot("episodes/ep3Thumbnail.jpg"),
    ep04: slot("episodes/ep4Thumbnail.jpg"),
    ep05: slot("episodes/ep5Thumbnail.jpg"),
    ep06: slot("episodes/ep6Thumbnail.jpg"),
    ep07: slot("episodes/ep7Thumbnail.jpg"),
  },
  about: {
    team: slot("about/equipeRevocast.jpeg"), // foto da equipe (public/images/about/)
  },
  team: {
    group: slot("team/equipeToda.jpeg"), // foto de TODA a equipe, no topo da página Equipe (public/images/team/)
    sticker: slot("team/stickers/placeholder.svg"), // sticker padrão dos cartões (public/images/team/stickers/)
  },
}

/**
 * Foto de um integrante da página Equipe: informe só o NOME DO ARQUIVO guardado em public/images/team/.
 * Ex.: teamPhoto("ana.jpg"). Vazio (teamPhoto("")) = o site mostra um espaço reservado.
 * Os integrantes ficam em src/domains/team/data.ts.
 */
export const teamPhoto = (file: string) => slot(file ? `team/${file}` : "")

/**
 * Sticker (adesivo) de um integrante, no canto do cartão: informe só o NOME DO ARQUIVO guardado em
 * public/images/team/stickers/. Ex.: teamSticker("ana.png"). Quem não tem sticker próprio usa images.team.sticker.
 */
export const teamSticker = (file: string) => slot(file ? `team/stickers/${file}` : "")
