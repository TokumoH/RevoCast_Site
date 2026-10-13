import { useEffect, useState } from "react"
import { fetchYouTubeData } from "./api"
import { fallbackEpisodes } from "./fallback"
import type { ChannelStats, Episode } from "./model"

export function useYouTubeData() {
  const [data, setData] = useState<{ episodes: Episode[]; stats: ChannelStats | null }>({
    episodes: fallbackEpisodes,
    stats: null,
  })

  useEffect(() => {
    let active = true

    fetchYouTubeData()
      .then((youtubeData) => {
        if (active) setData(youtubeData)
      })
      .catch(() => undefined)

    return () => {
      active = false
    }
  }, [])

  return data
}

export function useEpisodes() {
  return useYouTubeData().episodes
}