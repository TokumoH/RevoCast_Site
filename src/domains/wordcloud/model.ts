// Uma palavra da nuvem: "key" identifica palavras iguais (sem maiúsculas, acentos ou pontuação nas pontas).
export type CloudWord = {
  key: string
  text: string // como foi digitada na primeira vez
  count: number // quantas vezes foi digitada
}
