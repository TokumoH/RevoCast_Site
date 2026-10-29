import { images } from "@/shared/config/images"
import { links } from "@/shared/config/links"
import { site } from "@/shared/config/site"
import { useHashRoute } from "@/shared/router"
import { brandCopy } from "../content"
import "../brand.css"

export default function Footer() {
  const route = useHashRoute()
  // Nas páginas interativas, só rola até o topo (sem voltar para a página inicial).
  const toTop = (e: React.MouseEvent) => {
    if (route === "home") return
    e.preventDefault()
    window.scrollTo({ top: 0 })
  }
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <img src={images.brand.logo} alt="" />
        <p>
          © {site.year} {site.name} · {site.org} · {site.school}
          <br />
          {brandCopy.footerNote}
        </p>
        <a href={links.anchors.top} onClick={toTop}>
          Voltar ao topo ↑
        </a>
      </div>
    </footer>
  )
}
