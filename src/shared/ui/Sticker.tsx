import type { CSSProperties, ReactNode } from "react"
import { useReveal } from "@/shared/motion"

type Props = {
  tone?: "paper" | "pink" | "cyan" | "sand"
  tilt?: number // inclinação em graus
  tape?: boolean // fita adesiva no topo
  reveal?: boolean // "cola" na página quando aparece na tela
  delay?: number // atraso da entrada (ms)
  hover?: boolean // reage ao mouse (endireita, sobe, sombra maior)
  as?: "div" | "article" | "section"
  className?: string
  children: ReactNode
}

// Bloco "adesivo": borda grossa, sombra dura e leve inclinação.
export default function Sticker({ tone = "paper", tilt = 0, tape, reveal, delay = 0, hover, as: Tag = "div", className = "", children }: Props) {
  const ref = useReveal<HTMLElement>(!!reveal)
  const cls = [`sticker tone-${tone}`, tape && "sticker--tape", reveal && "reveal", hover && "hoverable", className].filter(Boolean).join(" ")
  return (
    <Tag ref={ref as never} className={cls} style={{ "--tilt": `${tilt}deg`, "--reveal-delay": `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  )
}
