import type { CSSProperties, ReactNode } from "react"

type Props = { duration?: number; delay?: number; className?: string; children: ReactNode }

// Faz o conteúdo flutuar devagar (sobe e desce) sem parar.
export default function Float({ duration = 6, delay = 0, className = "", children }: Props) {
  return (
    <div className={`float ${className}`.trim()} style={{ "--float-dur": `${duration}s`, "--float-delay": `${delay}s` } as CSSProperties}>
      {children}
    </div>
  )
}
