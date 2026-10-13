// Rabiscos decorativos (SVG). Cor via "color"/className.
type P = { className?: string }
const stroke = { stroke: "var(--ink)", strokeWidth: 1.6, strokeLinejoin: "round" as const }

export const Star = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2l2.9 6.6 7.1.7-5.4 4.8 1.6 7-6.2-3.8-6.2 3.8 1.6-7L2 9.3l7.1-.7L12 2z" fill="currentColor" {...stroke} />
  </svg>
)
export const Spark = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2c.6 5.2 4.8 9.4 10 10-5.2.6-9.4 4.8-10 10-.6-5.2-4.8-9.4-10-10 5.2-.6 9.4-4.8 10-10z" fill="currentColor" {...stroke} />
  </svg>
)
export const Squiggle = ({ className }: P) => (
  <svg className={className} viewBox="0 0 120 12" preserveAspectRatio="none" aria-hidden="true">
    <path pathLength={1} d="M2 6c10-8 18 8 28 0s18 8 28 0 18 8 28 0 18 8 28 0" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
)
export const Arrow = ({ className }: P) => (
  <svg className={className} viewBox="0 0 80 60" aria-hidden="true">
    <path d="M4 10c30-6 62 4 66 38M58 42l12 8 8-14" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
