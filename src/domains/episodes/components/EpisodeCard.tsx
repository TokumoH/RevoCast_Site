import { links } from "@/shared/config/links"
import { ImageSlot, Sticker } from "@/shared/ui"
import type { Episode } from "../model"
import { thumbnailUrl, watchUrl } from "../youtube"

const tilts = [-1.2, 0.8, -0.6, 1, -0.9, 0.6]
const tones = ["paper", "pink", "cyan", "sand"] as const

export default function EpisodeCard({ episode, index }: { episode: Episode; index: number }) {
  const cover = episode.thumbnail || thumbnailUrl(episode.youtubeId)
  const href = episode.youtubeId ? watchUrl(episode.youtubeId) : links.platforms.youtube
  return (
    <Sticker as="article" tone={tones[index % tones.length]} tilt={tilts[index % tilts.length]} className="episode" reveal delay={(index % 3) * 130} hover>
      <a className="episode__cover" href={href} target="_blank" rel="noreferrer" aria-label={`Assistir: ${episode.title}`}>
        <ImageSlot src={cover} alt={episode.title} label="Adicione a capa" />
        <span className="episode__play" aria-hidden="true">▶</span>
      </a>
      <div className="episode__body">
        <span className="chip">{episode.tag}</span>
        <h3>{episode.title}</h3>
        <p className="text-justify">{episode.description}</p>
      </div>
    </Sticker>
  )
}
