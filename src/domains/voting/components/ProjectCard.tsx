import { useState } from "react"
import { ActionButton, ImageSlot, Sticker } from "@/shared/ui"
import { projectLabel, votingCopy, votingLimits } from "../content"
import type { Project } from "../model"

type Props = {
  project: Project
  index: number
  onName: (name: string) => void
  onImage: (file: File | undefined) => void
  onVote: (code: string) => Promise<void>
}

const tones = ["paper", "pink", "cyan", "sand"] as const

const LikeIcon = () => (
  <svg className="project__like" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M2 10h4v11H2zM6 10l4-8c2 0 3 1.5 2.5 4L12 9h7a2 2 0 0 1 2 2.4l-1.4 7A2 2 0 0 1 17.6 20H6" fill="currentColor" stroke="var(--ink)" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
)

export default function ProjectCard({ project, index, onName, onImage, onVote }: Props) {
  const [code, setCode] = useState("")
  const [message, setMessage] = useState("")
  const [busy, setBusy] = useState(false)
  const label = projectLabel(project.name, index)
  return (
    <Sticker tone={tones[index % tones.length]} tilt={index % 2 ? 1.2 : -1.2} className="project" reveal hover>
      <label className="project__image">
        <ImageSlot src={project.image} alt={`${votingCopy.imageAlt}: ${label}`} label={votingCopy.imageLabel} />
        <input className="sr-only" type="file" accept="image/*" aria-label={`${votingCopy.imageLabel} (${label})`} onChange={(e) => {
          onImage(e.target.files?.[0]); e.target.value = ""
        }} />
      </label>
      <input className="field" type="text" value={project.name} onChange={(e) => onName(e.target.value)} maxLength={votingLimits.nameMax} placeholder={votingCopy.namePlaceholder} aria-label={`${votingCopy.nameLabel} ${index + 1}`} autoComplete="off" />
      <div className="project__vote">
        <label className="project__code-label" htmlFor={`vote-code-${project.id}`}>Código de validação</label>
        <div className="project__vote-row">
          <input id={`vote-code-${project.id}`} className="field project__code" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="RV-ABCD-2345" autoComplete="off" disabled={busy} />
          <ActionButton variant="light" disabled={busy || !code.trim()} onClick={async () => {
            setBusy(true); setMessage("")
            try { await onVote(code); setCode(""); setMessage("Voto registrado.") }
            catch (error) { setMessage(error instanceof Error ? error.message : "Não foi possível registrar o voto.") }
            finally { setBusy(false) }
          }}>
            <LikeIcon />{busy ? "Validando…" : votingCopy.vote}
          </ActionButton>
        </div>
        {message && <p className="project__vote-message" role="status">{message}</p>}
      </div>
    </Sticker>
  )
}
