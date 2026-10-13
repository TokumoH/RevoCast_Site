import { images } from "@/shared/config/images"
import { links } from "@/shared/config/links"
import { site } from "@/shared/config/site"
import { footerNote } from "../data"
import "../brand.css"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <img src={images.brand.logo} alt="" />
        <p>
          © {site.year} {site.name} · {site.org} · {site.school}
          <br />
          {footerNote}
        </p>
        <a href={links.anchors.top}>Voltar ao topo ↑</a>
      </div>
    </footer>
  )
}
