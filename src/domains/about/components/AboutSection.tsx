import { images } from "@/shared/config/images"
import { links, anchorId } from "@/shared/config/links"
import { useChannelData } from "@/domains/episodes"
import { ImageSlot, SectionTitle, Sticker } from "@/shared/ui"
import { aboutCopy, badges, stats } from "../content"
import "../about.css"

export default function AboutSection() {
  const { stats: channelStats } = useChannelData()

  return (
    <section className="section about" id={anchorId(links.anchors.about)}>
      <div className="container about__grid">
        <div className="about__text">
          <SectionTitle eyebrow={aboutCopy.eyebrow} title={aboutCopy.title} />
          {aboutCopy.paragraphs.map((p) => (
            <p key={p} className="text-justify">{p}</p>
          ))}
          <div className="about__badges">
            {badges.map((b) => (
              <span key={b} className="chip chip--sand">
                {b}
              </span>
            ))}
          </div>
          <div className="about__stats">
            {stats.map((s, i) => {
              const value = channelStats?.[s.key]
              return (
                <Sticker key={s.label} tone={i % 2 ? "cyan" : "pink"} tilt={i % 2 ? 2 : -2} className="stat" reveal delay={i * 120} hover>
                  <strong>{typeof value === "number" ? value.toLocaleString("pt-BR") : "—"}</strong>
                  <span>{s.label}</span>
                </Sticker>
              )
            })}
          </div>
        </div>
        <Sticker tone="paper" tilt={2} tape className="about__photo" reveal delay={150}>
          <ImageSlot src={images.about.team} alt={aboutCopy.teamAlt} label={aboutCopy.teamLabel} />
        </Sticker>
      </div>
    </section>
  )
}
