// Um integrante da equipe. Só "id", "name", "role" e "photo" são obrigatórios.
export type Member = {
  id: string // identificador único, sem espaços (ex.: "ana"). Liga o integrante aos links dele em links.team
  name: string // nome que aparece no cartão
  role: string // título / função (ex.: "Edição de vídeo")
  photo: string // use teamPhoto("arquivo.jpg"), com o arquivo em public/images/team/ (vazio = espaço reservado)
  sticker?: string // use teamSticker("arquivo.png"), arquivo em public/images/team/stickers/ (omitido = sticker padrão)
  tagline?: string // frase curta e engraçada (opcional)
}
