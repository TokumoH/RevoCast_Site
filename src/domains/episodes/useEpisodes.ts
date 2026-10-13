import { useEffect, useState } from "react"
import { fetchEpisodes } from "./api"
import { fallbackEpisodes } from "./fallback"
import type { Episode } from "./model"

export function useEpisodes() {
  const [episodes, setEpisodes] = useState<Episode[]>(fallbackEpisodes)

  useEffect(() => {
    let active = true

    fetchEpisodes()
      .then((apiEpisodes) => {
        if (active) setEpisodes(apiEpisodes)
      })
      .catch(() => undefined)

    return () => {
      active = false
    }
  }, [])

  return episodes
}