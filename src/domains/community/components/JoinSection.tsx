import { links, anchorId } from "@/shared/config/links"
import { Button, SectionTitle, Star, Sticker } from "@/shared/ui"
import { joinCards, joinCopy } from "../data"
import "../community.css"

export default function JoinSection() {
  return (
    <section className="section" id={anchorId(links.anchors.join)}>
      <div className="container">
        <SectionTitle eyebrow={joinCopy.eyebrow} title={joinCopy.title} note={joinCopy.note} />
        <div className="join__grid">
          {joinCards.map((card, i) => (
            <Sticker key={card.id} tone={card.tone} tilt={i % 2 ? 1.2 : -1.2} className="join__card" reveal delay={i * 150} hover>
              <Star className="doodle join__star" />
              <h3>{card.title}</h3>
              <p className="text-justify">{card.text}</p>
              <Button href={card.href} variant="light">
                {card.cta}
              </Button>
            </Sticker>
          ))}
        </div>
      </div>
    </section>
  )
}
