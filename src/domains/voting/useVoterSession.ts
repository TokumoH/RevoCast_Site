import { useCallback, useEffect, useRef, useState } from "react"
import { votingLimits } from "./content"
import { maskCode, validateCode } from "./voteCodes"

export type Voter = { hash: string; label: string } // label = código mascarado (ex.: "RV-••••-2345")

/**
 * Sessão do votante no computador da feira: a pessoa digita o código UMA vez e vota com ▲/▼.
 * A sessão fica só na memória (recarregar a página encerra) e termina sozinha após
 * votingLimits.voterIdleSeconds sem uso, para a próxima pessoa não votar com o código de outra.
 */
export function useVoterSession(isLocked: (hash: string) => boolean) {
  const [voter, setVoter] = useState<Voter | null>(null)
  const [busy, setBusy] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  const end = useCallback(() => {
    window.clearTimeout(timer.current)
    setVoter(null)
  }, [])

  // Reinicia a contagem de inatividade (chamar a cada voto).
  const touch = useCallback(() => {
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setVoter(null), votingLimits.voterIdleSeconds * 1000)
  }, [])

  const start = useCallback(async (code: string) => {
    setBusy(true)
    try {
      const hash = await validateCode(code)
      if (isLocked(hash)) throw new Error("Este código já votou na versão anterior da votação e não pode votar novamente.")
      setVoter({ hash, label: maskCode(code) })
      touch()
    } finally {
      setBusy(false)
    }
  }, [isLocked, touch])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  return { voter, busy, start, end, touch }
}
