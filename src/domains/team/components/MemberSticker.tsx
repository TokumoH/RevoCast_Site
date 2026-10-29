import { useState } from "react"

// Sticker (adesivo) decorativo no canto superior esquerdo do cartão. Se a imagem não carregar, some sem quebrar o cartão.
export default function MemberSticker({ src }: { src: string }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) return null
  return <img className="member__sticker" src={src} alt="" aria-hidden="true" loading="lazy" onError={() => setFailed(true)} />
}
