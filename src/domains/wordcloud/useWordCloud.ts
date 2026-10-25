import { useCallback, useState } from "react"
import type { CloudWord } from "./model"
import { addWords, parseWords } from "./words"

// Guarda as palavras da nuvem e recebe o texto digitado.
export function useWordCloud() {
  const [words, setWords] = useState<CloudWord[]>([])
  const add = useCallback((raw: string) => {
    const incoming = parseWords(raw)
    if (incoming.length) setWords((current) => addWords(current, incoming))
  }, [])
  return { words, add }
}
