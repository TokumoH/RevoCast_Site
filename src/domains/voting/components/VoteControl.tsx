import { votingCopy } from "../content"
import type { VoteDirection } from "../model"
import { canVoteDown } from "../voteRule"

type Props = {
  votes: number
  label: string // nome do projeto (para leitores de tela)
  onVote: (direction: VoteDirection) => void
}

const Arrow = ({ up }: { up?: boolean }) => (
  <svg className="vote__arrow" viewBox="0 0 24 24" aria-hidden="true">
    <path d={up ? "M12 3 3 13h5v8h8v-8h5z" : "M12 21 3 11h5V3h8v8h5z"} fill="currentColor" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
  </svg>
)

// Seta ▲, pontuação e seta ▼. A ▼ fica desativada em zero (a pontuação nunca é negativa).
export default function VoteControl({ votes, label, onVote }: Props) {
  return (
    <div className="vote">
      <button type="button" className="vote__btn vote__btn--up" aria-label={votingCopy.upvote(label)} onClick={() => onVote(1)}>
        <Arrow up />
      </button>
      <span className="vote__score" aria-label={votingCopy.scoreLabel(votes)} aria-live="polite">{votes}</span>
      <button type="button" className="vote__btn vote__btn--down" aria-label={votingCopy.downvote(label)} disabled={!canVoteDown(votes)} onClick={() => onVote(-1)}>
        <Arrow />
      </button>
    </div>
  )
}
