import type { IncomingMessage, ServerResponse } from "node:http"
import type { ApiEpisode, ChannelStats, ChannelData } from "../src/domains/episodes/model"
import { links } from "../src/shared/config/links.js"

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

type ChannelResponse = {
  items?: Array<{
    id?: string
    contentDetails?: { relatedPlaylists?: { uploads?: string } }
    statistics?: {
      videoCount?: string
      viewCount?: string
      subscriberCount?: string
      hiddenSubscriberCount?: boolean
    }
  }>
}
type PlaylistResponse = { items?: PlaylistItem[]; nextPageToken?: string }
type VideoDetailsResponse = {
  items?: Array<{ id?: string; liveStreamingDetails?: Record<string, string> }>
}

const count = (value?: string) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

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
  if (!apiKey) {
    respond(response, 503, { error: "Configure YOUTUBE_API_KEY." })
    return
  }

  try {
    const youtubeUrl = new URL(links.platforms.youtube)
    const channelHandle = decodeURIComponent(youtubeUrl.pathname.slice(1))
    const channelEndpoint = new URL("https://www.googleapis.com/youtube/v3/channels")
    channelEndpoint.search = new URLSearchParams({
      part: "contentDetails,statistics",
      forHandle: channelHandle,
      key: apiKey,
    }).toString()

    const channelResponse = await fetch(channelEndpoint)
    if (!channelResponse.ok) {
      respond(response, 502, { error: "Não foi possível consultar o canal no YouTube." })
      return
    }

    const channelData = (await channelResponse.json()) as ChannelResponse
    const channel = channelData.items?.[0]
    if (!channel?.id) {
      respond(response, 502, { error: "Não foi possível localizar o canal no YouTube." })
      return
    }

    const playlistId = channel.contentDetails?.relatedPlaylists?.uploads
    if (!playlistId) {
      respond(response, 502, { error: "Não foi possível localizar a playlist de envios do canal." })
      return
    }

    const items: PlaylistItem[] = []
    let pageToken: string | undefined
    do {
      const playlistEndpoint = new URL("https://www.googleapis.com/youtube/v3/playlistItems")
      const params = new URLSearchParams({
        part: "snippet,contentDetails",
        playlistId,
        maxResults: "50",
        key: apiKey,
      })
      if (pageToken) params.set("pageToken", pageToken)
      playlistEndpoint.search = params.toString()

      const playlistResponse = await fetch(playlistEndpoint)
      if (!playlistResponse.ok) {
        respond(response, 502, { error: "Não foi possível consultar os envios do canal no YouTube." })
        return
      }

      const playlist = (await playlistResponse.json()) as PlaylistResponse
      items.push(...(playlist.items ?? []))
      pageToken = playlist.nextPageToken
    } while (pageToken)

    const videoIds = items
      .map((item) => item.contentDetails?.videoId)
      .filter((videoId): videoId is string => Boolean(videoId))
    const liveVideoIds = new Set<string>()

    for (let start = 0; start < videoIds.length; start += 50) {
      const videoDetailsEndpoint = new URL("https://www.googleapis.com/youtube/v3/videos")
      videoDetailsEndpoint.search = new URLSearchParams({
        part: "liveStreamingDetails",
        id: videoIds.slice(start, start + 50).join(","),
        key: apiKey,
      }).toString()

      const videoDetailsResponse = await fetch(videoDetailsEndpoint)
      if (!videoDetailsResponse.ok) {
        respond(response, 502, { error: "Não foi possível classificar os vídeos do canal." })
        return
      }

      const videoDetails = (await videoDetailsResponse.json()) as VideoDetailsResponse
      for (const video of videoDetails.items ?? []) {
        if (video.id && video.liveStreamingDetails) liveVideoIds.add(video.id)
      }
    }

    const episodes: ApiEpisode[] = items
      .map((item) => {
        const videoId = item.contentDetails?.videoId
        if (!videoId) return null

        const thumbnails = item.snippet?.thumbnails
        return {
          id: videoId,
          youtubeId: videoId,
          tag: liveVideoIds.has(videoId) ? "Episódio" : "Corte",
          title: item.snippet?.title ?? "Vídeo sem título",
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
      .reverse()

    const channelStatistics = channel.statistics
    const stats: ChannelStats | null = channelStatistics
      ? {
          videoCount: count(channelStatistics.videoCount),
          viewCount: count(channelStatistics.viewCount),
          subscriberCount: channelStatistics.hiddenSubscriberCount
            ? null
            : channelStatistics.subscriberCount === undefined
              ? null
              : count(channelStatistics.subscriberCount),
        }
      : null

    response.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400")
    const data: ChannelData = { episodes, stats }
    respond(response, 200, data)
  } catch {
    respond(response, 502, { error: "Erro ao carregar episódios do YouTube." })
  }
}