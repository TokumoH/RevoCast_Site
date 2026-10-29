import { ImageSlot, Sticker } from "@/shared/ui"
import { projectLabel, votingCopy, votingLimits } from "../content"
import type { Project, VoteDirection } from "../model"
import VoteControl from "./VoteControl"

type Props = {
  project: Project
  index: number
  current?: VoteDirection // voto do votante ativo neste projeto
  canVote: boolean
  onName: (name: string) => void
  onImage: (file: File | undefined) => void
  onVote: (direction: VoteDirection) => void
}

const tones = ["paper", "pink", "cyan", "sand"] as const

export default function ProjectCard({ project, index, current, canVote, onName, onImage, onVote }: Props) {
  const label = projectLabel(project.name, index)
  return (
    <Sticker tone={tones[index % tones.length]} tilt={index % 2 ? 1.2 : -1.2} className="project" reveal hover>
      <label className="project__image">
        <ImageSlot src={project.image} alt={`${votingCopy.imageAlt}: ${label}`} label={votingCopy.imageLabel} />
        <input className="sr-only" type="file" accept="image/*" aria-label={`${votingCopy.imageLabel} (${label})`} onChange={(e) => {
          onImage(e.target.files?.[0]); e.target.value = ""
        }} />
      </label>
      <div className="project__footer">
        <input className="field" type="text" value={project.name} onChange={(e) => onName(e.target.value)} maxLength={votingLimits.nameMax} placeholder={votingCopy.namePlaceholder} aria-label={`${votingCopy.nameLabel} ${index + 1}`} autoComplete="off" />
        <VoteControl project={project} label={label} current={current} disabled={!canVote} onVote={onVote} />
      </div>
    </Sticker>
  )
}
