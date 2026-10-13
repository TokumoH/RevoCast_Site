import { useReveal } from "@/shared/motion"
import { Squiggle } from "./Doodles"

type Props = { eyebrow: string; title: string; note?: string }

// Título padrão de seção: etiqueta, título com rabisco e observação manuscrita.
export default function SectionTitle({ eyebrow, title, note }: Props) {
  const ref = useReveal<HTMLElement>()
  return (
    <header ref={ref} className="section-title reveal reveal--rise">
      <span className="chip chip--cyan">{eyebrow}</span>
      <h2>{title}</h2>
      <Squiggle className="section-title__squiggle" />
      {note && <p className="note">{note}</p>}
    </header>
  )
}
