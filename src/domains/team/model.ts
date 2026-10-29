// Um integrante da equipe. Só "name", "role" e "photo" são obrigatórios.
export type Member = {
  name: string // nome que aparece no cartão
  role: string // título / função (ex.: "Edição de vídeo")
  photo: string // use teamPhoto("arquivo.jpg"), com o arquivo em public/images/team/ (vazio = espaço reservado)
  tagline?: string // frase curta e engraçada (opcional)
  instagram?: string // usuário sem o @ (opcional)
}
