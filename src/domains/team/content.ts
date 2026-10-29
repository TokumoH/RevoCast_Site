import { teamPhoto } from "@/shared/config/images"
import type { Member } from "./model"

// ✏️ Textos da página Equipe (topo, seção de integrantes e faixa que corre).
export const teamCopy = {
  eyebrow: "Equipe",
  title: "A galera por trás",
  highlight: "do microfone.",
  text: "O RevoCast é feito por estudantes da Atlética Revoada: gente que pesquisa, grava, edita, ri junto e transforma conversa em episódio.",
  groupAlt: "Foto de toda a equipe do RevoCast reunida no estúdio",
  groupLabel: "Adicione a foto da equipe toda",
  logoAlt: "Logo do RevoCast: um pombo musculoso de óculos falando ao microfone",
  membersEyebrow: "Integrantes",
  membersTitle: "Conheça o time",
  membersNote: "passa o mouse nos cartões ↓",
  photoAlt: (name: string) => `Foto de ${name}`,
  photoLabel: "Adicione a foto",
  countLabel: "integrantes", // aparece como selo no topo: "10 integrantes"
  linkedinLabel: "LinkedIn",
  githubLabel: "GitHub",
  linkedinAria: (name: string) => `LinkedIn de ${name}`,
  githubAria: (name: string) => `GitHub de ${name}`,
}

// ✏️ Palavras da faixa que corre entre o topo e os integrantes.
export const teamTicker = ["Bastidores", "Câmera", "Áudio", "Edição", "Risada"]

/**
 * ✏️ INTEGRANTES — é aqui que você edita a equipe.
 *
 *  ➕ Adicionar: copie uma linha { ... } e cole no fim da lista.
 *  ➖ Remover:   apague a linha da pessoa.
 *  🔀 Ordem:     é a ordem da lista (de cima para baixo = da esquerda para a direita).
 *  ✏️ Título:    mude "role". Nome: "name".
 *  🖼 Foto:       coloque o arquivo em  public/images/team/  e escreva só o nome dele em teamPhoto("...").
 *                Ideal: vertical (4:5), ex. 800×1000. Aceita jpg, png, webp ou svg.
 *                Para trocar a foto de alguém, salve com o MESMO nome do arquivo atual (ou mude o nome aqui).
 *
 * Opcionais: tagline (frase) e decal (adesivo do canto do cartão; sem ele, usa o decal padrão).
 *  🔗 LinkedIn e GitHub: campo "profiles" da própria pessoa, ex.: profiles: { linkedin: "https://...", github: "https://..." }.
 *     Link vazio ou ausente = o botão não aparece.
 *  🖼 Decal próprio: salve em public/images/team/decals/ e use  decal: teamDecal("arquivo.png").
 * Hoje são imagens de exemplo (membro-01.svg … membro-10.svg): troque pelas fotos reais.
 */
export const members: Member[] = [
  { id: "membro01", name: "João Pedro Ferreira de Oliveira", role: "Diretor Geral", photo: teamPhoto("membro-01.svg"), tagline: "Sempre com a pauta na mão.", profiles: { linkedin: "https://www.linkedin.com/in/jo%C3%A3o-pedro-ferreira-oliveira-2a4382204/", github: "https://github.com/JoaoPdr04" } },
  { id: "membro02", name: "Júlia Monguini Ribeiro", role: "Roteiro", photo: teamPhoto("membro-02.svg"), tagline: "Transformo caos em episódio.", profiles: { linkedin: "https://www.linkedin.com/in/j%C3%BAlia-monguini-371708364/", github: "https://github.com/juliamonguini-star" } },
  { id: "membro03", name: "Victor Hideki Ioza Tokumo", role: "Auxiliar Técnico", photo: teamPhoto("membro-03.svg"), tagline: "Eu resolvo (quase) tudo", profiles: { linkedin: "https://www.linkedin.com/in/victortokumo/", github: "https://github.com/TokumoH" } },
  { id: "membro04", name: "Wanessa Lima", role: "Apresentadora", photo: teamPhoto("membro-04.svg"), tagline: "Luz, câmera e café.", profiles: { linkedin: "", github: "" } },
  { id: "membro05", name: "Laura Patrocínio Riitano", role: "Apresentadora", photo: teamPhoto("membro-05.svg"), tagline: "Se tem ruído, eu acho.", profiles: { linkedin: "", github: "" } },
  { id: "membro06", name: "Integrante 06", role: "Design", photo: teamPhoto("membro-06.svg"), tagline: "Pixel perfeito, sempre.", profiles: { linkedin: "", github: "" } },
  { id: "membro07", name: "Integrante 07", role: "Redes sociais", photo: teamPhoto("membro-07.svg"), tagline: "Viralizar é questão de tempo.", profiles: { linkedin: "", github: "" } },
  { id: "membro08", name: "Integrante 08", role: "Produção", photo: teamPhoto("membro-08.svg"), tagline: "Eu resolvo (quase) tudo.", profiles: { linkedin: "", github: "" } },
  { id: "membro09", name: "Integrante 09", role: "Pauta", photo: teamPhoto("membro-09.svg"), tagline: "Tenho 40 ideias, escolhe uma.", profiles: { linkedin: "", github: "" } },
  { id: "membro10", name: "Integrante 10", role: "Direção", photo: teamPhoto("membro-10.svg"), tagline: "Gravando em 3, 2, 1…", profiles: { linkedin: "", github: "" } },
]
