import { memberLinks } from "@/shared/config/links"
import { GitHubIcon, LinkedInIcon } from "@/shared/ui"
import { teamCopy } from "../data"

type Props = { id: string; name: string }

// Botões de LinkedIn e GitHub, abaixo da foto. Os links ficam em shared/config/links.ts (links.team).
// Link vazio = o botão não aparece; sem nenhum link, o bloco inteiro some.
export default function MemberLinks({ id, name }: Props) {
  const { linkedin, github } = memberLinks(id)
  if (!linkedin && !github) return null
  return (
    <div className="member__links">
      {linkedin && (
        <a className="chip member__link" href={linkedin} target="_blank" rel="noreferrer" aria-label={teamCopy.linkedinAria(name)}>
          <LinkedInIcon className="member__icon" />
          <span className="member__link-label">{teamCopy.linkedinLabel}</span>
        </a>
      )}
      {github && (
        <a className="chip member__link" href={github} target="_blank" rel="noreferrer" aria-label={teamCopy.githubAria(name)}>
          <GitHubIcon className="member__icon" />
          <span className="member__link-label">{teamCopy.githubLabel}</span>
        </a>
      )}
    </div>
  )
}
