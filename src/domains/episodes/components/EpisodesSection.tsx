import { links, anchorId } from "@/shared/config/links"
import { Button, SectionTitle } from "@/shared/ui"
import { episodesCopy } from "../data"
import { useEpisodes } from "../useEpisodes"
import EpisodeCard from "./EpisodeCard"
import LatestEpisode from "./LatestEpisode"
import "../episodes.css"

export default function EpisodesSection() {
  const episodes = useEpisodes()
  const latestEpisode = episodes[episodes.length - 1]

  return (
    <section className="section" id={anchorId(links.anchors.episodes)}>
      <div className="container">
        <SectionTitle eyebrow={episodesCopy.eyebrow} title={episodesCopy.title} note={episodesCopy.note} />
        {latestEpisode && <LatestEpisode episode={latestEpisode} />}
        {episodes.length > 1 && (
          <div className="episodes__grid">
            {episodes.slice(0, -1).map((episode, index) => (
              <EpisodeCard key={episode.id} episode={episode} index={index} />
            ))}
          </div>
        )}
        <div className="episodes__more">
          <Button href={links.platforms.youtube} variant="light">
            {episodesCopy.moreLabel}
          </Button>
        </div>
      </div>
    </section>
  )
}
