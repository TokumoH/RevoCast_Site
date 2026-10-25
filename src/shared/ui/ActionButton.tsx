import type { ReactNode } from "react"

type Props = {
  variant?: "primary" | "light"
  size?: "md" | "sm"
  type?: "button" | "submit"
  disabled?: boolean
  pressed?: boolean // botão liga/desliga (ex.: votar)
  onClick?: () => void
  children: ReactNode
}

// Botão que executa uma ação (o "Button" é só para links). Mesmo visual do Button.
export default function ActionButton({ variant = "primary", size = "md", type = "button", disabled, pressed, onClick, children }: Props) {
  return (
    <button type={type} className={`btn btn--${variant} btn--${size}`} disabled={disabled} aria-pressed={pressed} onClick={onClick}>
      {children}
    </button>
  )
}
