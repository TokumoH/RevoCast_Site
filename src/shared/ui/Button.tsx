import type { ReactNode } from "react"

type Props = {
  href: string // vazio = botão desativado
  variant?: "primary" | "light"
  size?: "md" | "sm"
  children: ReactNode
}

export default function Button({ href, variant = "primary", size = "md", children }: Props) {
  const cls = `btn btn--${variant} btn--${size}`
  if (!href) {
    return (
      <span className={`${cls} is-disabled`} aria-disabled="true">
        {children}
      </span>
    )
  }
  const external = /^https?:/.test(href)
  return (
    <a className={cls} href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      {children}
    </a>
  )
}
