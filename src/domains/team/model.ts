// Perfis de um integrante nas redes. Vazio ("") ou ausente = o botão correspondente não aparece.
export type MemberProfiles = { linkedin?: string; github?: string }

// Um integrante da equipe. Só "id", "name", "role" e "photo" são obrigatórios.
export type Member = {
  id: string // identificador único, sem espaços (ex.: "ana"). Usado como chave do cartão na lista
  name: string // nome que aparece no cartão
  role: string // título / função (ex.: "Edição de vídeo")
  photo: string // use teamPhoto("arquivo.jpg"), com o arquivo em public/images/team/ (vazio = espaço reservado)
  decal?: string // adesivo do canto do cartão: use teamDecal("arquivo.png"), arquivo em public/images/team/decals/ (omitido = decal padrão)
  tagline?: string // frase curta e engraçada (opcional)
  profiles?: MemberProfiles // LinkedIn e GitHub (opcional)
}
