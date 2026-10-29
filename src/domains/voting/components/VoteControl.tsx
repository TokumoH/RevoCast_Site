import { projectScore } from "../ballot"
import { votingCopy } from "../content"
import type { Project, VoteDirection } from "../model"

type Props = {
  project: Project
  label: string
  current?: VoteDirection // voto do votante ativo neste projeto (se houver)
  disabled: boolean // sem votante ativo
  onVote: (direction: VoteDirection) => void
}

const Arrow = ({ up }: { up?: boolean }) => (
  <svg className="vote__arrow" viewBox="0 0 24 24" aria-hidden="true">
    <path d={up ? "M12 3 3 13h5v8h8v-8h5z" : "M12 21 3 11h5V3h8v8h5z"} fill="currentColor" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
  </svg>
)

// Seta ▲, pontuação e seta ▼, como no Reddit. aria-pressed indica o voto atual do votante.
export default function VoteControl({ project, label, current, disabled, onVote }: Props) {
  const score = projectScore(project)
  const title = disabled ? votingCopy.needVoter : undefined
  return (
    <div className={`vote${current === 1 ? " is-up" : current === -1 ? " is-down" : ""}`}>
      <button type="button" className="vote__btn vote__btn--up" aria-pressed={current === 1} aria-label={votingCopy.upvote(label)} title={title} disabled={disabled} onClick={() => onVote(1)}>
        <Arrow up />
      </button>
      <span className="vote__score" aria-label={votingCopy.scoreLabel(score)} aria-live="polite">{score}</span>
      <button type="button" className="vote__btn vote__btn--down" aria-pressed={current === -1} aria-label={votingCopy.downvote(label)} title={title} disabled={disabled} onClick={() => onVote(-1)}>
        <Arrow />
      </button>
    </div>
  )
}
