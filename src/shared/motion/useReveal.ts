import { useEffect, useRef } from "react"

/**
 * Marca o elemento com "is-visible" quando ele entra na tela (dispara a animação de entrada).
 * Com "reduzir movimento" ativado no sistema, o elemento já aparece visível.
 */
export function useReveal<T extends HTMLElement>(enabled = true) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!enabled || !el) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce || !("IntersectionObserver" in window)) {
      el.classList.add("is-visible")
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible")
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [enabled])
  return ref
}
