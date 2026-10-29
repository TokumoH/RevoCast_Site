import { useState, type FormEvent } from "react"
import { ActionButton, Sticker } from "@/shared/ui"
import { votingCopy, votingLimits } from "../content"
import type { Voter } from "../useVoterSession"

type Props = {
  voter: Voter | null
  busy: boolean
  onStart: (code: string) => Promise<void>
  onEnd: () => void
}

// Painel acima dos projetos: sem votante, pede o código; com votante, mostra quem vota e o botão de passar a vez.
export default function VoterPanel({ voter, busy, onStart, onEnd }: Props) {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")
    try { await onStart(code); setCode("") }
    catch (e) { setError(e instanceof Error ? e.message : "Não foi possível validar o código.") }
  }

  if (voter) {
    return (
      <Sticker tone="cyan" tilt={-0.4} className="voter voter--active">
        <div className="voter__text">
          <span className="chip chip--pink">{votingCopy.voterActive(voter.label)}</span>
          <p className="note">{votingCopy.voterIdle(votingLimits.voterIdleSeconds)}</p>
        </div>
        <ActionButton variant="light" onClick={onEnd}>{votingCopy.voterEnd}</ActionButton>
      </Sticker>
    )
  }

  return (
    <Sticker tone="paper" tilt={0.4} className="voter">
      <form className="voter__form" onSubmit={handleSubmit}>
        <div className="voter__text">
          <h3>{votingCopy.voterTitle}</h3>
          <p className="note">{votingCopy.voterHint}</p>
        </div>
        <label className="sr-only" htmlFor="voter-code">{votingCopy.voterLabel}</label>
        <div className="voter__row">
          <input id="voter-code" className="field" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="RV-ABCD-2345" autoComplete="off" disabled={busy} />
          <ActionButton type="submit" disabled={busy || !code.trim()}>{busy ? votingCopy.voterValidating : votingCopy.voterStart}</ActionButton>
        </div>
        {error && <p className="voting-feedback" role="alert">{error}</p>}
      </form>
    </Sticker>
  )
}
