import { platforms } from "../data"
import type { PlatformKey } from "../model"

// Lista de plataformas como etiquetas clicáveis.
export default function PlatformChips({ exclude = [] }: { exclude?: PlatformKey[] }) {
  return (
    <div className="platform-chips">
      {platforms
        .filter((p) => p.url && !exclude.includes(p.key))
        .map((p) => (
          <a key={p.key} className={`chip chip--${p.tone}`} href={p.url} target="_blank" rel="noreferrer">
            {p.label}
          </a>
        ))}
    </div>
  )
}
