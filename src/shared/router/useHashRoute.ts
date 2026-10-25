import { useSyncExternalStore } from "react"
import { links } from "@/shared/config/links"

export type Route = "home" | "cloud" | "voting"

// Rotas das páginas interativas. Qualquer outro "#" (ex.: #sobre) é uma âncora da página inicial.
const pages: Record<string, Route> = {
  [links.pages.cloud]: "cloud",
  [links.pages.voting]: "voting",
}

const subscribe = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange)
  return () => window.removeEventListener("hashchange", onChange)
}

/** Página atual, lida do "#" do endereço (funciona em qualquer hospedagem estática, sem configurar servidor). */
export function useHashRoute(): Route {
  return useSyncExternalStore(subscribe, () => pages[window.location.hash] ?? "home", () => "home")
}
