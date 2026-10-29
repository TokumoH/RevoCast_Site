import { PlatformChips } from "@/domains/contact"
import { images } from "@/shared/config/images"
import { links, anchorId } from "@/shared/config/links"
import { site } from "@/shared/config/site"
import { Float, Reveal } from "@/shared/motion"
import { Arrow, LinkButton, Spark, Star, Sticker } from "@/shared/ui"
import { brandCopy } from "../content"
import RotatingBubble from "./RotatingBubble"
import "../brand.css"

export default function Hero() {
  return (
    <section className="hero container" id={anchorId(links.anchors.top)}>
      <div className="hero__text">
        <Sticker tone="cyan" tilt={-2} className="hero__tag" reveal>
          {site.org} · {site.school}
        </Sticker>
        <Reveal as="h1" delay={120}>
          {brandCopy.hero.title} <mark>{brandCopy.hero.highlight}</mark>
        </Reveal>
        <Reveal as="p" delay={220} className="hero__lead text-justify">
          {brandCopy.hero.text}
        </Reveal>
        <Reveal delay={320} className="hero__actions">
          <LinkButton href={links.platforms.youtube}>{brandCopy.hero.cta}</LinkButton>
          <LinkButton href={links.anchors.episodes} variant="light">
            {brandCopy.hero.ctaSecondary}
          </LinkButton>
        </Reveal>
        <Reveal delay={420} className="hero__listen">
          <span className="note">{brandCopy.hero.listenLabel}</span>
          <PlatformChips exclude={["youtube"]} />
        </Reveal>
      </div>
      <div className="hero__art">
        <Float className="hero__float">
          <Sticker tone="paper" tilt={3} tape className="hero__logo" reveal delay={150}>
            <img src={images.brand.logo} alt={brandCopy.hero.logoAlt} />
          </Sticker>
        </Float>
        <RotatingBubble className="hero__bubble" phrases={brandCopy.hero.bubblePhrases} />
        <Star className="doodle hero__star" />
        <Spark className="doodle hero__spark" />
        <Arrow className="doodle hero__arrow" />
      </div>
    </section>
  )
}
