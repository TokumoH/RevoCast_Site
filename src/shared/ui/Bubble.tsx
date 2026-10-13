import type { ReactNode } from "react"

// Balão de fala.
export default function Bubble({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`bubble ${className}`.trim()}>{children}</div>
}
