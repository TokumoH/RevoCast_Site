import { images } from "@/shared/config/images"
import { links } from "@/shared/config/links"
import { site } from "@/shared/config/site"
import { Button } from "@/shared/ui"
import { nav } from "../data"
import "../brand.css"

export default function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <a className="header__brand" href={links.anchors.top} aria-label={`${site.name} — início`}>
          <img src={images.brand.logo} alt="" />
          <span>{site.name}</span>
        </a>
        <nav className="header__nav" aria-label="Principal">
          {nav.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <Button href={links.platforms.youtube} size="sm">
          Assistir
        </Button>
      </div>
    </header>
  )
}
