import { ImageSlot, Sticker } from "@/shared/ui"
import { teamCopy } from "../data"
import type { Member } from "../model"

// Cada cartão alterna cor e inclinação conforme a posição na lista.
const tones = ["pink", "cyan", "sand", "paper"] as const
const tilts = [-2, 1.5, -1, 2]

type Props = { member: Member; index: number }

export default function MemberCard({ member, index }: Props) {
  const { name, role, photo, tagline, instagram } = member
  return (
    <Sticker as="article" tone={tones[index % tones.length]} tilt={tilts[index % tilts.length]} className="member" reveal delay={(index % 4) * 90} hover>
      <div className="member__photo">
        <ImageSlot src={photo} alt={teamCopy.photoAlt(name)} label={teamCopy.photoLabel} />
      </div>
      <h3 className="member__name">{name}</h3>
      <span className="chip member__role">{role}</span>
      {tagline && <p className="note member__tagline">“{tagline}”</p>}
      {instagram && (
        <a className="member__social" href={`https://www.instagram.com/${instagram}/`} target="_blank" rel="noopener noreferrer">
          @{instagram}
        </a>
      )}
    </Sticker>
  )
}
