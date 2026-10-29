import { cloudLimits, cloudSize } from "./content"
import type { CloudWord } from "./model"

// Palavras iguais ignoram maiúsculas e acentos: "Café" e "cafe" contam como a mesma.
const toKey = (word: string) =>
  word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()

// Separa o texto digitado em palavras, tirando pontuação das pontas e cortando as muito longas.
export function parseWords(raw: string): string[] {
  return raw
    .split(/\s+/)
    .map((w) => w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "").slice(0, cloudLimits.wordMax))
    .filter(Boolean)
}

// Soma as palavras à nuvem: repetida aumenta a contagem; nova entra no fim.
export function addWords(current: CloudWord[], incoming: string[]): CloudWord[] {
  const next = current.map((w) => ({ ...w }))
  for (const text of incoming) {
    const key = toKey(text)
    const found = next.find((w) => w.key === key)
    if (found) found.count += 1
    else next.push({ key, text, count: 1 })
  }
  return next
}

// Tira a palavra da nuvem de uma vez (qualquer que seja a contagem).
export const removeWord = (current: CloudWord[], key: string): CloudWord[] => current.filter((w) => w.key !== key)

// Tamanho em px: cresce com a raiz da contagem para a palavra não "explodir" na tela.
export const wordSize = (count: number) =>
  Math.min(cloudSize.max, Math.round(cloudSize.min + cloudSize.step * (Math.log2(count))))

// Número fixo por palavra (mesma palavra, mesma cor e inclinação sempre).
export function wordHash(key: string) {
  let h = 0
  for (const ch of key) h = (h * 31 + ch.codePointAt(0)!) >>> 0
  return h
}
