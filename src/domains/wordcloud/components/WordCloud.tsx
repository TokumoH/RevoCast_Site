import type { CSSProperties } from "react"
import { cloudCopy } from "../data"
import type { CloudWord } from "../model"
import { wordHash, wordSize } from "../words"

// A nuvem: cada palavra cresce conforme a contagem. Cor e inclinação vêm da própria palavra.
export default function WordCloud({ words }: { words: CloudWord[] }) {
  if (words.length === 0) return <p className="cloud__empty note">{cloudCopy.empty}</p>
  return (
    <ul className="cloud" aria-label={cloudCopy.cloudLabel}>
      {words.map((w) => {
        const h = wordHash(w.key)
        const style = { "--size": `${wordSize(w.count)}px`, "--tilt": `${(h % 9) - 4}deg` } as CSSProperties
        return (
          <li key={w.key} className={`cloud__word cloud__word--${h % 4}`} style={style} title={`${w.count}×`}>
            {/* a "key" com a contagem refaz o pulinho a cada repetição */}
            <span key={w.count} className="cloud__text">
              {w.text}
            </span>
            <span className="sr-only"> ({w.count})</span>
          </li>
        )
      })}
    </ul>
  )
}
