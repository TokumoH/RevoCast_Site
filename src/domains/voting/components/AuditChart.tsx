import type { CSSProperties } from "react"
import { Star, Sticker } from "@/shared/ui"
import { pointsLabel, votesLabel, votingCopy } from "../content"
import type { AuditResult } from "../model"

// Resultado da auditoria: aviso do campeão e gráfico com a pontuação (▲ - ▼) de cada projeto.
// Pontuação negativa aparece em barra cinza; o detalhe ▲/▼ fica ao lado do nome.
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
          <span>{pointsLabel(champions[0].score)}</span>
        </p>
      ) : (
        <p className="audit__winner note">{votingCopy.noVotes}</p>
      )}
      <ul className="audit__chart" aria-label={votingCopy.chartLabel}>
        {rows.map((row) => (
          <li key={row.id} className={`audit__row${championIds.has(row.id) ? " is-champion" : ""}${row.score < 0 ? " is-negative" : ""}`}>
            <span className="audit__label">
              {row.label}
              <small className="audit__detail">▲ {row.ups} · ▼ {row.downs}</small>
            </span>
            <span className="audit__track">
              {row.score !== 0 && <span className="audit__fill" style={{ width: `${row.ratio * 100}%` } as CSSProperties} />}
            </span>
            <span className="audit__value">{row.score}</span>
          </li>
        ))}
      </ul>
      <p className="audit__total note">Total: {votesLabel(totalVotes)}</p>
    </Sticker>
  )
}
