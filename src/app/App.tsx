import { Footer, Header, Hero, ThemeTicker } from "@/domains/brand"
import { EpisodesSection } from "@/domains/episodes"
import { AboutSection } from "@/domains/about"
import { JoinSection } from "@/domains/community"
import { ContactSection } from "@/domains/contact"

// Ordem das seções da página. Para reordenar, mude a ordem abaixo.
export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ThemeTicker />
        <EpisodesSection />
        <AboutSection />
        <JoinSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
