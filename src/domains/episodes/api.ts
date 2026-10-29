import { fallbackEpisodes } from "./fallback"
import type { ApiEpisode, ChannelStats, Episode, ChannelData } from "./model"

function isApiEpisode(value: unknown): value is ApiEpisode {
  if (typeof value !== "object" || value === null) return false

  const episode = value as Record<string, unknown>
  return ["id", "title", "description", "tag", "youtubeId", "thumbnail"].every(
    (field) => typeof episode[field] === "string",
  )
}

function isChannelStats(value: unknown): value is ChannelStats {
  if (typeof value !== "object" || value === null) return false

  const stats = value as Record<string, unknown>
  return typeof stats.videoCount === "number"
    && typeof stats.viewCount === "number"
    && (typeof stats.subscriberCount === "number" || stats.subscriberCount === null)
}

async function requestChannelData(): Promise<{ episodes: Episode[]; stats: ChannelStats | null }> {
  const response = await fetch("/api/episodes")
  if (!response.ok) throw new Error("Não foi possível carregar os episódios da API.")

  const payload: unknown = await response.json()
  if (typeof payload !== "object" || payload === null) throw new Error("Resposta inválida da API de episódios.")

  const data = payload as Partial<ChannelData>
  if (!Array.isArray(data.episodes)) throw new Error("Resposta inválida da API de episódios.")

  const fallbackByVideoId = new Map(fallbackEpisodes.map((episode) => [episode.youtubeId, episode]))
  const episodes = data.episodes.filter(isApiEpisode).map((episode) => {
    const fallback = fallbackByVideoId.get(episode.youtubeId)
    return {
      ...episode,
      thumbnail: fallback?.thumbnail || episode.thumbnail,
    }
  })

  if (episodes.length === 0) throw new Error("A API não retornou episódios válidos.")
  return { episodes, stats: isChannelStats(data.stats) ? data.stats : null }
}

let cachedRequest: Promise<{ episodes: Episode[]; stats: ChannelStats | null }> | undefined

export function fetchChannelData() {
  if (!cachedRequest) {
    cachedRequest = requestChannelData().catch((error: unknown) => {
      cachedRequest = undefined
      throw error
    })
  }

  return cachedRequest
}