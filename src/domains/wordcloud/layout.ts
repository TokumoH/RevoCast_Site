import type { CloudWord } from "./model"
import { wordHash, wordSize } from "./words"

// Posição das palavras na nuvem: cada palavra nova procura o lugar livre mais perto do meio,
// numa espiral que começa num ângulo próprio da palavra (daí a aleatoriedade em volta do centro).
// Quem já está na tela mantém o lugar; só se muda de lugar quem passa a bater em outra palavra.

export type Size = { w: number; h: number }
export type Point = { x: number; y: number }
export type Layout = { size: Size; scale: number; pos: Record<string, Point> }
type Rect = { l: number; t: number; r: number; b: number }

const FONT = '"Lilita One", "Trebuchet MS", sans-serif' // mesma fonte do CSS (--font-display)
const GAP = 12 // espaço mínimo entre palavras (px)
const INSET = { x: 16, top: 44, bottom: 14 } // margem da borda (o topo deixa espaço para o contador e o botão de excluir)
const MIN_SCALE = 0.3

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))

// Largura do texto, medida uma vez a 100px e escalada para o tamanho pedido.
const widths = new Map<string, number>()
let ctx: CanvasRenderingContext2D | null = null
export const resetMeasure = () => widths.clear() // chamar quando a fonte terminar de carregar
function textWidth(text: string, px: number) {
  let w = widths.get(text)
  if (w === undefined) {
    ctx ??= document.createElement("canvas").getContext("2d")
    if (ctx) ctx.font = `400 100px ${FONT}`
    w = ctx ? ctx.measureText(text).width : text.length * 55
    widths.set(text, w)
  }
  return (w * px) / 100
}

const boxOf = (word: CloudWord, scale: number) => {
  const px = wordSize(word.count) * scale
  return { w: textWidth(word.text, px) + GAP, h: px * 1.1 + GAP }
}
const rectAt = (p: Point, box: { w: number; h: number }): Rect => ({ l: p.x - box.w / 2, r: p.x + box.w / 2, t: p.y - box.h / 2, b: p.y + box.h / 2 })
const inside = (r: Rect, s: Size) => r.l >= INSET.x && r.r <= s.w - INSET.x && r.t >= INSET.top && r.b <= s.h - INSET.bottom
const overlaps = (a: Rect, b: Rect) => a.l < b.r && a.r > b.l && a.t < b.b && a.b > b.t
const free = (r: Rect, s: Size, placed: Rect[]) => inside(r, s) && !placed.some((o) => overlaps(r, o))

const centerOf = (s: Size): Point => ({ x: s.w / 2, y: (INSET.top + s.h - INSET.bottom) / 2 })

// Espiral a partir do centro (esticada na horizontal, porque a nuvem é mais larga que alta).
function findSpot(word: CloudWord, scale: number, size: Size, placed: Rect[]): Point | null {
  const box = boxOf(word, scale)
  const c = centerOf(size)
  const stretch = clamp(size.w / size.h, 1, 2.4)
  const start = (wordHash(word.key) % 628) / 100 // ângulo inicial (0 a 2π)
  let turn = 0
  for (let i = 0; i < 20000; i++) {
    const r = 3.2 * turn
    const p = { x: c.x + Math.cos(start + turn) * r * stretch, y: c.y + Math.sin(start + turn) * r }
    if (free(rectAt(p, box), size, placed)) return p
    if (r * stretch > size.w && r > size.h) break
    turn += clamp(14 / Math.max(r, 14), 0.04, 0.5) // passos menores perto do centro e maiores longe
  }
  return null
}

// Tenta posicionar todas as palavras num tamanho; quem já tinha lugar livre fica onde estava.
function attempt(words: CloudWord[], keep: Record<string, Point>, size: Size, scale: number) {
  const placed: Rect[] = []
  const pos: Record<string, Point> = {}
  let ok = true
  for (const word of words) {
    const box = boxOf(word, scale)
    let p: Point | null = keep[word.key] ?? null
    if (!p || !free(rectAt(p, box), size, placed)) p = findSpot(word, scale, size, placed)
    if (!p) {
      ok = false
      p = centerOf(size)
    }
    pos[word.key] = p
    placed.push(rectAt(p, box))
  }
  return { ok, pos }
}

// Se a nuvem mudou de tamanho, as posições antigas acompanham proporcionalmente.
function remap(prev: Layout | null, size: Size): Record<string, Point> {
  if (!prev) return {}
  if (prev.size.w === size.w && prev.size.h === size.h) return prev.pos
  const out: Record<string, Point> = {}
  for (const [key, p] of Object.entries(prev.pos)) out[key] = { x: (p.x * size.w) / prev.size.w, y: (p.y * size.h) / prev.size.h }
  return out
}

export function computeLayout(words: CloudWord[], prev: Layout | null, size: Size): Layout {
  const base = clamp(Math.min(size.w / 1000, size.h / 460), 0.5, 1) // telas menores começam com palavras menores
  const keep = remap(prev, size)
  // Se não coube, diminui todas as palavras um pouco e tenta de novo.
  for (let scale = base; ; scale *= 0.92) {
    const { ok, pos } = attempt(words, keep, size, scale)
    if (ok || scale * 0.92 < MIN_SCALE) return { size, scale, pos }
  }
}
