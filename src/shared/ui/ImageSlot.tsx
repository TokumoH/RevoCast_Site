type Props = { src: string; alt: string; label?: string; className?: string }

// Mostra a imagem; se "src" estiver vazio, mostra um espaço reservado.
export default function ImageSlot({ src, alt, label = "Adicione uma imagem", className = "" }: Props) {
  if (src) {
    return (
      <div className={`image-slot ${className}`.trim()}>
        <img src={src} alt={alt} loading="lazy" />
      </div>
    )
  }
  return (
    <div className={`image-slot image-slot--empty ${className}`.trim()} role="img" aria-label={`${label}: ${alt}`}>
      <span>{label}</span>
    </div>
  )
}
