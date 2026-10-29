import { ThemeTicker } from "@/domains/brand"
import { images } from "@/shared/config/images"
import { Float, Reveal } from "@/shared/motion"
import { ImageSlot, SectionTitle, Spark, Squiggle, Star, Sticker } from "@/shared/ui"
import { members, teamCopy, teamTicker } from "../data"
import MemberCard from "./MemberCard"
import "../team.css"

export default function TeamPage() {
  return (
    <>
      <section className="section team-hero">
        <div className="container team-hero__grid">
          <div className="team-hero__text">
            <Sticker tone="cyan" tilt={-2} className="team-hero__tag" reveal>
              {teamCopy.eyebrow} · {members.length} {teamCopy.countLabel}
            </Sticker>
            <Reveal as="h1" delay={120}>
              {teamCopy.title} <mark>{teamCopy.highlight}</mark>
            </Reveal>
            <Squiggle className="team-hero__squiggle" />
            <Reveal as="p" delay={220} className="team-hero__lead text-justify">
              {teamCopy.text}
            </Reveal>
          </div>

          <div className="team-hero__art">
            <Sticker tone="paper" tilt={2} tape className="team-hero__photo" reveal delay={150}>
              <ImageSlot src={images.team.group} alt={teamCopy.groupAlt} label={teamCopy.groupLabel} />
            </Sticker>
            <Float className="team-hero__float" duration={7}>
              <Sticker tone="paper" tilt={-6} className="team-hero__logo" reveal delay={350} hover>
                <img src={images.brand.logo} alt={teamCopy.logoAlt} />
              </Sticker>
            </Float>
            <Star className="doodle team-hero__star" />
            <Spark className="doodle team-hero__spark" />
          </div>
        </div>
      </section>

      <ThemeTicker themes={teamTicker} />

      <section className="section members">
        <div className="container">
          <SectionTitle eyebrow={teamCopy.membersEyebrow} title={teamCopy.membersTitle} note={teamCopy.membersNote} />
          <ul className="members__grid">
            {members.map((member, i) => (
              <li key={member.id}>
                <MemberCard member={member} index={i} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
