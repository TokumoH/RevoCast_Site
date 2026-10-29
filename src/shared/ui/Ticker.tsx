import { Fragment } from "react"
import { Star } from "./Doodles"

const REPEATS = 3 // repetições das palavras em cada grupo (garante largura suficiente)

function Group({ items }: { items: string[] }) {
  return (
    <div className="ticker__group">
      {Array.from({ length: REPEATS }).flatMap((_, r) =>
        items.map((item) => (
          <Fragment key={`${r}-${item}`}>
            <span>{item}</span>
            <Star className="ticker__star" />
          </Fragment>
        )),
      )}
    </div>
  )
}

// Faixa decorativa que corre sem parar. Dois grupos iguais: o loop não tem emenda.
// Cada domínio passa a própria lista de palavras (ex.: brand -> HomeTicker, team -> TeamPage).
export default function Ticker({ items }: { items: string[] }) {
  return (
    <div className="ticker-wrap" aria-hidden="true">
      <div className="ticker">
        <div className="ticker__track">
          <Group items={items} />
          <Group items={items} />
        </div>
      </div>
    </div>
  )
}
