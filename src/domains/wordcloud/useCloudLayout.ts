import { useEffect, useMemo, useRef, useState } from "react"
import { computeLayout, resetMeasure, type Layout, type Size } from "./layout"
import type { CloudWord } from "./model"

// Mede o espaço da nuvem e devolve a posição de cada palavra.
export function useCloudLayout(words: CloudWord[]) {
  const areaRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<Size | null>(null)
  const [fontsTick, setFontsTick] = useState(0)
  const previous = useRef<Layout | null>(null)

  useEffect(() => {
    const el = areaRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width)
      const h = Math.round(entry.contentRect.height)
      if (w > 0 && h > 0) setSize((s) => (s && s.w === w && s.h === h ? s : { w, h })) // página escondida (0×0) é ignorada
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Quando a fonte do site termina de carregar, as larguras mudam: mede de novo.
  useEffect(() => {
    const refresh = () => {
      resetMeasure()
      setFontsTick((t) => t + 1)
    }
    document.fonts?.addEventListener("loadingdone", refresh)
    document.fonts?.ready.then(refresh)
    return () => document.fonts?.removeEventListener("loadingdone", refresh)
  }, [])

  const layout = useMemo(() => {
    if (!size) return null
    const next = computeLayout(words, previous.current, size)
    previous.current = next
    return next
  }, [words, size, fontsTick])

  return { areaRef, layout }
}
