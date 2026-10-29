import { images } from "@/shared/config/images"
import { ImageSlot, Sticker } from "@/shared/ui"
import { teamCopy } from "../data"
import type { Member } from "../model"
import MemberLinks from "./MemberLinks"
import MemberSticker from "./MemberSticker"

// Cada cartão alterna cor e inclinação conforme a posição na lista.
const tones = ["pink", "cyan", "sand", "paper"] as const
const tilts = [-2, 1.5, -1, 2]

type Props = { member: Member; index: number }

export default function MemberCard({ member, index }: Props) {
  const { id, name, role, photo, sticker, tagline } = member
  return (
    <Sticker as="article" tone={tones[index % tones.length]} tilt={tilts[index % tilts.length]} className="member" reveal delay={(index % 4) * 90} hover>
      <MemberSticker src={sticker || images.team.sticker} />
      <div className="member__photo">
        <ImageSlot src={photo} alt={teamCopy.photoAlt(name)} label={teamCopy.photoLabel} />
      </div>
      <MemberLinks id={id} name={name} />
      <h3 className="member__name">{name}</h3>
      <span className="chip member__role">{role}</span>
      {tagline && <p className="note member__tagline">“{tagline}”</p>}
    </Sticker>
  )
}
