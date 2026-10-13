import type { IncomingMessage, ServerResponse } from "node:http"
import type { ApiEpisode } from "../src/domains/episodes/model"

type PlaylistItem = {
  contentDetails?: { videoId?: string }
  snippet?: {
    title?: string
    description?: string
    thumbnails?: {
      maxres?: { url?: string }
      standard?: { url?: string }
      high?: { url?: string }
      medium?: { url?: string }
      default?: { url?: string }
    }
  }
}

type PlaylistResponse = { items?: PlaylistItem[] }

function respond(response: ServerResponse, status: number, body: unknown) {
  response.statusCode = status
  response.setHeader("Content-Type", "application/json; charset=utf-8")
  response.end(JSON.stringify(body))
}

export default async function handler(request: IncomingMessage, response: ServerResponse) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET")
    respond(response, 405, { error: "Método não permitido." })
    return
  }

  const apiKey = process.env.YOUTUBE_API_KEY
  const playlistId = process.env.YOUTUBE_UPLOADS_PLAYLIST_ID
  if (!apiKey || !playlistId) {
    respond(response, 503, { error: "Configure YOUTUBE_API_KEY e YOUTUBE_UPLOADS_PLAYLIST_ID." })
    return
  }

  try {
    const endpoint = new URL("https://www.googleapis.com/youtube/v3/playlistItems")
    endpoint.search = new URLSearchParams({
      part: "snippet,contentDetails",
      playlistId,
      maxResults: "50",
      key: apiKey,
    }).toString()

    const youtubeResponse = await fetch(endpoint)
    if (!youtubeResponse.ok) {
      respond(response, 502, { error: "Não foi possível consultar a playlist no YouTube." })
      return
    }

    const playlist = (await youtubeResponse.json()) as PlaylistResponse
    const episodes: ApiEpisode[] = (playlist.items ?? [])
      .map((item) => {
        const videoId = item.contentDetails?.videoId
        if (!videoId) return null

        const thumbnails = item.snippet?.thumbnails
        return {
          id: videoId,
          youtubeId: videoId,
          title: item.snippet?.title ?? "Episódio sem título",
          description: item.snippet?.description ?? "",
          thumbnail:
            thumbnails?.maxres?.url ??
            thumbnails?.standard?.url ??
            thumbnails?.high?.url ??
            thumbnails?.medium?.url ??
            thumbnails?.default?.url ??
            "",
        }
      })
      .filter((episode): episode is ApiEpisode => episode !== null)
      .slice(0, 12)
      .reverse()

    response.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400")
    respond(response, 200, episodes)
  } catch {
    respond(response, 502, { error: "Erro ao carregar episódios do YouTube." })
  }
}