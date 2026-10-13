import { useEffect, useState } from "react"
import { Bubble } from "@/shared/ui"

const INTERVAL = 3800 // tempo de cada frase (ms)

// Balão de fala que troca de frase sozinho (parado se "reduzir movimento" estiver ativo).
export default function RotatingBubble({ phrases, className = "" }: { phrases: string[]; className?: string }) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (phrases.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = setInterval(() => setIndex((i) => (i + 1) % phrases.length), INTERVAL)
    return () => clearInterval(id)
  }, [phrases.length])
  return (
    <Bubble className={className}>
      <span key={index} className="bubble__text">
        {phrases[index]}
      </span>
    </Bubble>
  )
}
