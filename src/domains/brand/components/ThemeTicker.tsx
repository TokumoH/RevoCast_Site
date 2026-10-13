import { Fragment } from "react"
import { Star } from "@/shared/ui"
import { tickerThemes } from "../data"
import "../brand.css"

const REPEATS = 3 // repetições dos temas em cada grupo (garante largura suficiente)

function Group() {
  return (
    <div className="ticker__group">
      {Array.from({ length: REPEATS }).flatMap((_, r) =>
        tickerThemes.map((theme) => (
          <Fragment key={`${r}-${theme}`}>
            <span>{theme}</span>
            <Star className="ticker__star" />
          </Fragment>
        )),
      )}
    </div>
  )
}

// Faixa decorativa que corre sem parar. Dois grupos iguais: o loop não tem emenda.
export default function ThemeTicker() {
  return (
    <div className="ticker-wrap" aria-hidden="true">
      <div className="ticker">
        <div className="ticker__track">
          <Group />
          <Group />
        </div>
      </div>
    </div>
  )
}
