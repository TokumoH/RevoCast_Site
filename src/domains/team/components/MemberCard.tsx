import { images } from "@/shared/config/images"
import { ImageSlot, Sticker } from "@/shared/ui"
import { teamCopy } from "../content"
import type { Member } from "../model"
import MemberLinks from "./MemberLinks"
import MemberDecal from "./MemberDecal"

// Cada cartão alterna cor e inclinação conforme a posição na lista.
const tones = ["pink", "cyan", "sand", "paper"] as const
const tilts = [-2, 1.5, -1, 2]

type Props = { member: Member; index: number }

export default function MemberCard({ member, index }: Props) {
  const { name, role, photo, decal, tagline, profiles } = member
  return (
    <Sticker as="article" tone={tones[index % tones.length]} tilt={tilts[index % tilts.length]} className="member" reveal delay={(index % 4) * 90} hover>
      <MemberDecal src={decal || images.team.decal} />
      <div className="member__photo">
        <ImageSlot src={photo} alt={teamCopy.photoAlt(name)} label={teamCopy.photoLabel} />
      </div>
      <MemberLinks profiles={profiles} name={name} />
      <h3 className="member__name">{name}</h3>
      <div className="member__role-slot">
        <span className="chip member__role">{role}</span>
      </div>
      <p className="note member__tagline">{tagline && `“${tagline}”`}</p>
    </Sticker>
  )
}
