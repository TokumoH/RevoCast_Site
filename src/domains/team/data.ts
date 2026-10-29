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
 * Opcionais: tagline (frase) e sticker (adesivo do canto do cartão; sem ele, usa o sticker padrão).
 *  🔗 LinkedIn e GitHub NÃO ficam aqui: ficam em src/shared/config/links.ts, em links.team["<id>"].
 *     Ao adicionar uma pessoa, crie o "id" dela lá também (sem isso o cartão aparece sem os botões).
 *  🖼 Sticker próprio: salve em public/images/team/stickers/ e use  sticker: teamSticker("arquivo.png").
 * Hoje são imagens de exemplo (membro01.svg … membro10.svg): troque pelas fotos reais.
 */
export const members: Member[] = [
  { id: "membro01", name: "Integrante 01", role: "Apresentação", photo: teamPhoto("membro01.svg"), tagline: "Sempre com a pauta na mão." },
  { id: "membro02", name: "Integrante 02", role: "Roteiro", photo: teamPhoto("membro02.svg"), tagline: "Transformo caos em episódio." },
  { id: "membro03", name: "Integrante 03", role: "Edição de vídeo", photo: teamPhoto("membro03.svg"), tagline: "O corte certo muda tudo." },
  { id: "membro04", name: "Integrante 04", role: "Câmera", photo: teamPhoto("membro04.svg"), tagline: "Luz, câmera e café." },
  { id: "membro05", name: "Integrante 05", role: "Áudio", photo: teamPhoto("membro05.svg"), tagline: "Se tem ruído, eu acho." },
  { id: "membro06", name: "Integrante 06", role: "Design", photo: teamPhoto("membro06.svg"), tagline: "Pixel perfeito, sempre." },
  { id: "membro07", name: "Integrante 07", role: "Redes sociais", photo: teamPhoto("membro07.svg"), tagline: "Viralizar é questão de tempo." },
  { id: "membro08", name: "Integrante 08", role: "Produção", photo: teamPhoto("membro08.svg"), tagline: "Eu resolvo (quase) tudo." },
  { id: "membro09", name: "Integrante 09", role: "Pauta", photo: teamPhoto("membro09.svg"), tagline: "Tenho 40 ideias, escolhe uma." },
  { id: "membro10", name: "Integrante 10", role: "Direção", photo: teamPhoto("membro10.svg"), tagline: "Gravando em 3, 2, 1…" },
]
