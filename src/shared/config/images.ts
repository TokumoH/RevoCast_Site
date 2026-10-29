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
    ep01: slot("episodes/ep01.jpg"), // padrão de nome: epNN.jpg
    ep02: slot("episodes/ep02.jpg"),
    ep03: slot("episodes/ep03.jpg"),
    ep04: slot("episodes/ep04.jpg"),
    ep05: slot("episodes/ep05.jpg"),
    ep06: slot("episodes/ep06.jpg"),
    ep07: slot("episodes/ep07.jpg"),
  },
  about: {
    team: slot("about/equipe-revocast.jpeg"), // foto da equipe (public/images/about/)
  },
  team: {
    group: slot("team/equipe-toda.jpeg"), // foto de TODA a equipe, no topo da página Equipe (public/images/team/)
    decal: slot("team/decals/placeholder.svg"), // decal (adesivo) padrão dos cartões (public/images/team/decals/)
  },
}

/**
 * Foto de um integrante da página Equipe: informe só o NOME DO ARQUIVO guardado em public/images/team/.
 * Ex.: teamPhoto("ana.jpg"). Vazio (teamPhoto("")) = o site mostra um espaço reservado.
 * Os integrantes ficam em src/domains/team/data.ts.
 */
export const teamPhoto = (file: string) => slot(file ? `team/${file}` : "")

/**
 * Decal (adesivo decorativo) de um integrante, no canto do cartão: informe só o NOME DO ARQUIVO guardado em
 * public/images/team/decals/. Ex.: teamDecal("ana.png"). Quem não tem decal próprio usa images.team.decal.
 */
export const teamDecal = (file: string) => slot(file ? `team/decals/${file}` : "")
