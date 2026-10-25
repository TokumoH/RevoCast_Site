import { useEffect, useRef } from "react"
import { ActionButton, SectionTitle } from "@/shared/ui"
import { votingCopy, votingLimits } from "../data"
import { useProjects } from "../useProjects"
import AuditChart from "./AuditChart"
import ProjectCard from "./ProjectCard"
import "../voting.css"

export default function VotingPage() {
  const { projects, canAdd, add, remove, toggleVote, setName, setImage, audited, runAudit, result } = useProjects()
  const resultRef = useRef<HTMLDivElement>(null)

  // Ao auditar, leva o resultado para a tela.
  useEffect(() => {
    if (!audited) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    resultRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" })
  }, [audited])

  return (
    <section className="section">
      <div className="container">
        <SectionTitle eyebrow={votingCopy.eyebrow} title={votingCopy.title} note={votingCopy.note} />
        <div className="voting__grid">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onName={(name) => setName(project.id, name)}
              onImage={(file) => setImage(project.id, file)}
              onVote={(code) => toggleVote(project.id, code)}
              onRemove={() => remove(project.id)}
            />
          ))}
          {canAdd ? (
            <button type="button" className="project-add" onClick={add}>
              <span className="project-add__plus" aria-hidden="true">
                +
              </span>
              <span>{votingCopy.addLabel}</span>
              <span className="chip chip--sand">
                {projects.length}/{votingLimits.maxProjects}
              </span>
            </button>
          ) : (
            <p className="project-add project-add--full note">{votingCopy.full}</p>
          )}
        </div>
        {projects.length === 0 && <p className="voting__empty note">{votingCopy.empty}</p>}
        <div className="voting__audit">
          <ActionButton onClick={runAudit} disabled={projects.length === 0}>
            {votingCopy.audit}
          </ActionButton>
          <div ref={resultRef} className="voting__result">
            {result && <AuditChart result={result} />}
          </div>
        </div>
      </div>
    </section>
  )
}
