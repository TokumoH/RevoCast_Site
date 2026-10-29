import { GitHubIcon, LinkedInIcon } from "@/shared/ui"
import { teamCopy } from "../content"
import type { MemberProfiles } from "../model"

type Props = { profiles?: MemberProfiles; name: string }

// Botões de LinkedIn e GitHub, abaixo da foto. Os links vêm do campo "profiles" do integrante (team/content.ts).
// Link vazio = o botão não aparece. O bloco é sempre renderizado (vazio, se for o caso) para reservar a
// mesma altura em todos os cartões.
export default function MemberLinks({ profiles = {}, name }: Props) {
  const { linkedin, github } = profiles
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
