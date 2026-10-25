import { images } from "@/shared/config/images"
import { links } from "@/shared/config/links"
import { site } from "@/shared/config/site"
import { useHashRoute } from "@/shared/router"
import { Button } from "@/shared/ui"
import { nav, pageNav } from "../data"
import "../brand.css"

export default function Header() {
  const route = useHashRoute()
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
        <div className="header__side">
          <nav className="header__pages" aria-label="Páginas interativas">
            {pageNav.map((item) => {
              const active = route === item.route
              return (
                <a key={item.label} className={`chip ${active ? "chip--pink" : "chip--cyan"}`} href={item.href} aria-current={active ? "page" : undefined}>
                  {item.label}
                </a>
              )
            })}
          </nav>
          <Button href={links.platforms.youtube} size="sm">
            Assistir
          </Button>
        </div>
      </div>
    </header>
  )
}
