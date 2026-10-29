export type Episode = {
  id: string
  title: string
  description: string
  tag: string
  /** ID do vídeo no YouTube, sem parâmetros ou URL. */
  youtubeId: string
  /** Capa personalizada ou miniatura fornecida pelo YouTube. */
  thumbnail: string
}

export type ApiEpisode = Pick<Episode, "id" | "title" | "description" | "tag" | "youtubeId" | "thumbnail">

export type ChannelStats = {
  videoCount: number
  viewCount: number
  subscriberCount: number | null
}

export type ChannelData = {
  episodes: ApiEpisode[]
  stats: ChannelStats | null
}
