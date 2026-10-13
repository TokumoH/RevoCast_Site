export type PlatformKey = "youtube" | "spotify" | "amazonMusic" | "instagram" | "tiktok"

export type Platform = {
  key: PlatformKey
  label: string
  url: string
  tone: "pink" | "cyan" | "sand"
}
