import { links } from "@/shared/config/links"
import { ImageSlot, Sticker } from "@/shared/ui"
import type { Episode } from "../model"
import { thumbnailUrl, watchUrl } from "../youtube"
import { episodesCopy } from "../data"

export default function LatestEpisode({ episode }: { episode: Episode }) {
  const cover = episode.thumbnail || thumbnailUrl(episode.youtubeId)
  const href = episode.youtubeId ? watchUrl(episode.youtubeId) : links.platforms.youtube

  return (
    <Sticker as="article" tone="cyan" tilt={0} className="episode-feature" reveal hover>
      <a className="episode-feature__cover" href={href} target="_blank" rel="noreferrer" aria-label={`Assistir: ${episode.title}`}>
        <ImageSlot src={cover} alt={episode.title} label="Adicione a capa" />
        <span className="episode-feature__play" aria-hidden="true">▶</span>
      </a>
      <div className="episode-feature__body">
        <span className="episode-feature__eyebrow">{episodesCopy.latestLabel}</span>
        <span className="chip">{episode.tag}</span>
        <h3>{episode.title}</h3>
        <p className="text-justify">{episode.description}</p>
        <a className="episode-feature__link" href={href} target="_blank" rel="noreferrer">
          ▶ {episodesCopy.latestAction}
        </a>
      </div>
    </Sticker>
  )
}