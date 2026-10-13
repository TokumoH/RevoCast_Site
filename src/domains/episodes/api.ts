import { fallbackEpisodes } from "./fallback"
import type { ApiEpisode, Episode } from "./model"

function isApiEpisode(value: unknown): value is ApiEpisode {
  if (typeof value !== "object" || value === null) return false

  const episode = value as Record<string, unknown>
  return ["id", "title", "description", "youtubeId", "thumbnail"].every(
    (field) => typeof episode[field] === "string",
  )
}

export async function fetchEpisodes(): Promise<Episode[]> {
  const response = await fetch("/api/episodes")
  if (!response.ok) throw new Error("Não foi possível carregar os episódios da API.")

  const payload: unknown = await response.json()
  if (!Array.isArray(payload)) throw new Error("Resposta inválida da API de episódios.")

  const fallbackByVideoId = new Map(fallbackEpisodes.map((episode) => [episode.youtubeId, episode]))
  const episodes = payload.filter(isApiEpisode).map((episode) => {
    const fallback = fallbackByVideoId.get(episode.youtubeId)
    return {
      ...episode,
      tag: fallback?.tag ?? "RevoCast",
      thumbnail: fallback?.thumbnail || episode.thumbnail,
    }
  })

  if (episodes.length === 0) throw new Error("A API não retornou episódios válidos.")
  return episodes
}