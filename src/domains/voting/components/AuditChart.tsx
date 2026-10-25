import type { CSSProperties } from "react"
import { Star, Sticker } from "@/shared/ui"
import { votesLabel, votingCopy } from "../data"
import type { AuditResult } from "../model"

// Resultado da auditoria: aviso do campeão e gráfico de barras com os votos de cada projeto.
export default function AuditChart({ result }: { result: AuditResult }) {
  const { rows, champions, totalVotes } = result
  const championIds = new Set(champions.map((c) => c.id))
  const headline = champions.length > 1 ? votingCopy.tie : votingCopy.champion

  return (
    <Sticker tone="sand" tilt={-0.5} tape className="audit">
      <h3>{votingCopy.auditTitle}</h3>
      {champions.length > 0 ? (
        <p className="audit__winner">
          <Star className="audit__star" />
          <span className="chip chip--pink">{headline}</span>
          <strong>{champions.map((c) => c.label).join(" • ")}</strong>
          <span>{votesLabel(champions[0].votes)}</span>
        </p>
      ) : (
        <p className="audit__winner note">{votingCopy.noVotes}</p>
      )}
      <ul className="audit__chart" aria-label={votingCopy.chartLabel}>
        {rows.map((row) => (
          <li key={row.id} className={`audit__row${championIds.has(row.id) ? " is-champion" : ""}`}>
            <span className="audit__label">{row.label}</span>
            <span className="audit__track">
              {row.votes > 0 && <span className="audit__fill" style={{ width: `${row.ratio * 100}%` } as CSSProperties} />}
            </span>
            <span className="audit__value">{row.votes}</span>
          </li>
        ))}
      </ul>
      <p className="audit__total note">Total: {votesLabel(totalVotes)}</p>
    </Sticker>
  )
}
