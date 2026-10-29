import { links, anchorId } from "@/shared/config/links"
import { LinkButton, SectionTitle } from "@/shared/ui"
import { episodesCopy } from "../content"
import { useEpisodes } from "../useChannelData"
import EpisodeCard from "./EpisodeCard"
import LatestEpisode from "./LatestEpisode"
import "../episodes.css"

export default function EpisodesSection() {
  const episodes = useEpisodes()
  const recentEpisodes = episodes.slice(-7)
  const latestEpisode = recentEpisodes[recentEpisodes.length - 1]

  return (
    <section className="section" id={anchorId(links.anchors.episodes)}>
      <div className="container">
        <SectionTitle eyebrow={episodesCopy.eyebrow} title={episodesCopy.title} note={episodesCopy.note} />
        {latestEpisode && <LatestEpisode episode={latestEpisode} />}
        {recentEpisodes.length > 1 && (
          <div className="episodes__grid">
            {recentEpisodes.slice(0, -1).map((episode, index) => (
              <EpisodeCard key={episode.id} episode={episode} index={index} />
            ))}
          </div>
        )}
        <div className="episodes__more">
          <LinkButton href={links.platforms.youtube} variant="light">
            {episodesCopy.moreLabel}
          </LinkButton>
        </div>
      </div>
    </section>
  )
}
