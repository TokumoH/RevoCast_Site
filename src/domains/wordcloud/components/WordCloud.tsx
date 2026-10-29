import type { CSSProperties } from "react"
import { cloudCopy, timesLabel } from "../content"
import type { CloudWord } from "../model"
import { useCloudLayout } from "../useCloudLayout"
import { wordHash, wordSize } from "../words"

type Props = { words: CloudWord[]; onRemove: (key: string) => void }

// A nuvem: cada palavra cresce conforme a contagem. Cor e inclinação vêm da própria palavra.
// Passar o mouse (ou tocar) na palavra mostra quantas vezes foi digitada e o botão de excluir.
export default function WordCloud({ words, onRemove }: Props) {
  const { areaRef, layout } = useCloudLayout(words)
  return (
    <div ref={areaRef} className="cloud">
      {words.length === 0 && <p className="cloud__empty note">{cloudCopy.empty}</p>}
      <ul className="cloud__list" aria-label={cloudCopy.cloudLabel}>
        {layout &&
          words.map((w) => {
            const p = layout.pos[w.key]
            const h = wordHash(w.key)
            const style = { left: p.x, top: p.y, "--size": `${wordSize(w.count) * layout.scale}px`, "--tilt": `${(h % 9) - 4}deg` } as CSSProperties
            return (
              <li key={w.key} className={`cloud__word cloud__word--${h % 4}`} style={style} tabIndex={0}>
                {/* a "key" com a contagem refaz o pulinho a cada repetição */}
                <span key={w.count} className="cloud__text">
                  {w.text}
                </span>
                <span className="cloud__tools">
                  <span className="chip chip--pink">{timesLabel(w.count)}</span>
                  <button type="button" className="cloud__remove" onClick={() => onRemove(w.key)} aria-label={`${cloudCopy.remove}: ${w.text}`}>
                    ×
                  </button>
                </span>
              </li>
            )
          })}
      </ul>
    </div>
  )
}
