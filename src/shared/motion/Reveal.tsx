import type { CSSProperties, ElementType, ReactNode } from "react"
import { useReveal } from "./useReveal"

type Props = {
  as?: ElementType // tag HTML (div, h1, p...)
  variant?: "rise" | "stick" // rise: sobe suave | stick: "cola" como adesivo
  delay?: number // atraso em ms (para entrar em sequência)
  className?: string
  children: ReactNode
}

// Faz o conteúdo entrar com animação quando aparece na tela.
export default function Reveal({ as: Tag = "div", variant = "rise", delay = 0, className = "", children }: Props) {
  const ref = useReveal<HTMLElement>()
  const cls = `reveal${variant === "rise" ? " reveal--rise" : ""} ${className}`.trim()
  return (
    <Tag ref={ref} className={cls} style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  )
}
