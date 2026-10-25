// ✏️ Textos e limites da página "Nuvem de palavras".
export const cloudCopy = {
  eyebrow: "Nuvem de palavras",
  title: "Qual é a palavra do dia?",
  note: "digite lá embaixo e veja a nuvem crescer",
  empty: "A nuvem está vazia. Escreva a primeira palavra!",
  placeholder: "Digite uma palavra",
  label: "Palavra para a nuvem",
  cta: "Adicionar",
  cloudLabel: "Nuvem de palavras",
  remove: "Remover palavra",
}

export const timesLabel = (n: number) => `${n} ${n === 1 ? "vez" : "vezes"}`

export const cloudLimits = {
  wordMax: 24, // letras por palavra
  inputMax: 60, // letras na caixa de texto
}

// Tamanho da palavra (px): começa em "min" e cresce a cada repetição, até "max".
export const cloudSize = { min: 28, step: 28, max: 140 }
