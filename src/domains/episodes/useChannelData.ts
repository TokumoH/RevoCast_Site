import { useEffect, useState } from "react"
import { fetchChannelData } from "./api"
import { fallbackEpisodes } from "./fallback"
import type { ChannelStats, Episode } from "./model"

// Dados do canal (episódios + estatísticas): começa com o fallback local e troca pela API quando ela responde.
export function useChannelData() {
  const [data, setData] = useState<{ episodes: Episode[]; stats: ChannelStats | null }>({
    episodes: fallbackEpisodes,
    stats: null,
  })

  useEffect(() => {
    let active = true

    fetchChannelData()
      .then((channelData) => {
        if (active) setData(channelData)
      })
      .catch(() => undefined)

    return () => {
      active = false
    }
  }, [])

  return data
}

export function useEpisodes() {
  return useChannelData().episodes
}