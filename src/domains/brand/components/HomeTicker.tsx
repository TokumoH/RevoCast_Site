import { Ticker } from "@/shared/ui"
import { brandCopy } from "../content"

// Faixa da página inicial, com os temas do podcast.
export default function HomeTicker() {
  return <Ticker items={brandCopy.tickerThemes} />
}
