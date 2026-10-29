import { Footer, Header, Hero, ThemeTicker } from "@/domains/brand"
import { EpisodesSection } from "@/domains/episodes"
import { AboutSection } from "@/domains/about"
import { JoinSection } from "@/domains/community"
import { ContactSection } from "@/domains/contact"
import { WordCloudPage } from "@/domains/wordcloud"
import { VotingPage } from "@/domains/voting"
import { TeamPage } from "@/domains/team"
import { useEffect, useRef } from "react"
import { useHashRoute } from "@/shared/router"

// Ordem das seções da página inicial. Para reordenar, mude a ordem abaixo.
// As outras páginas (Nuvem, Votação e Equipe) ficam sempre montadas e só são escondidas,
// assim a nuvem e os projetos não se perdem quando o usuário troca de página.
export default function App() {
  const route = useHashRoute()
  const first = useRef(true)

  // Ao trocar de página: vai para a âncora pedida (ex.: #sobre) ou para o topo.
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    const target = route === "home" ? document.getElementById(window.location.hash.slice(1)) : null
    if (target) target.scrollIntoView()
    else window.scrollTo({ top: 0, behavior: "instant" })
  }, [route])

  return (
    <>
      <Header />
      <main>
        <div hidden={route !== "home"}>
          <Hero />
          <ThemeTicker />
          <EpisodesSection />
          <AboutSection />
          <JoinSection />
          <ContactSection />
        </div>
        <div hidden={route !== "cloud"}>
          <WordCloudPage />
        </div>
        <div hidden={route !== "voting"}>
          <VotingPage />
        </div>
        <div hidden={route !== "team"}>
          <TeamPage />
        </div>
      </main>
      <Footer />
    </>
  )
}
