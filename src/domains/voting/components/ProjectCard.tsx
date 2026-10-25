import { ActionButton, ImageSlot, Sticker } from "@/shared/ui"
import { projectLabel, votingCopy, votingLimits } from "../data"
import type { Project } from "../model"

type Props = {
  project: Project
  index: number
  onName: (name: string) => void
  onImage: (file: File | undefined) => void
  onVote: () => void
  onRemove: () => void
}

const tones = ["paper", "pink", "cyan", "sand"] as const

// Ícone de "joinha" do botão de voto.
const LikeIcon = () => (
  <svg className="project__like" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M2 10h4v11H2zM6 10l4-8c2 0 3 1.5 2.5 4L12 9h7a2 2 0 0 1 2 2.4l-1.4 7A2 2 0 0 1 17.6 20H6" fill="currentColor" stroke="var(--ink)" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
)

export default function ProjectCard({ project, index, onName, onImage, onVote, onRemove }: Props) {
  const label = projectLabel(project.name, index)
  return (
    <Sticker tone={tones[index % tones.length]} tilt={index % 2 ? 1.2 : -1.2} className="project" reveal hover>
      <button type="button" className="project__remove" onClick={onRemove} aria-label={`${votingCopy.remove}: ${label}`}>
        ×
      </button>
      <label className="project__image">
        <ImageSlot src={project.image} alt={`${votingCopy.imageAlt}: ${label}`} label={votingCopy.imageLabel} />
        <input
          className="sr-only"
          type="file"
          accept="image/*"
          aria-label={`${votingCopy.imageLabel} (${label})`}
          onChange={(e) => {
            onImage(e.target.files?.[0])
            e.target.value = "" // permite escolher o mesmo arquivo de novo
          }}
        />
      </label>
      <input
        className="field"
        type="text"
        value={project.name}
        onChange={(e) => onName(e.target.value)}
        maxLength={votingLimits.nameMax}
        placeholder={votingCopy.namePlaceholder}
        aria-label={`${votingCopy.nameLabel} ${index + 1}`}
        autoComplete="off"
      />
      <ActionButton variant={project.voted ? "primary" : "light"} pressed={project.voted} onClick={onVote}>
        <LikeIcon />
        {project.voted ? votingCopy.voted : votingCopy.vote}
      </ActionButton>
    </Sticker>
  )
}
