import { useEffect, useMemo, useRef, useState, type FormEvent } from "react"
import { ActionButton, SectionTitle, Sticker } from "@/shared/ui"
import { votingCopy, votingLimits, votesLabel } from "../content"
import { audit } from "../audit"
import { useVotings } from "../useVotings"
import AuditChart from "./AuditChart"
import ProjectCard from "./ProjectCard"
import "../voting.css"

export default function VotingPage() {
  const { votings, createVoting, deleteVoting, addProject, setName, setImage, vote } = useVotings()
  const [selectedVotingId, setSelectedVotingId] = useState<string | null>(null)
  const [newTitle, setNewTitle] = useState("")
  const [formError, setFormError] = useState("")
  const [formMessage, setFormMessage] = useState("")
  const [audited, setAudited] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)
  const selectedVoting = votings.find((voting) => voting.id === selectedVotingId) ?? null
  const result = useMemo(() => audited && selectedVoting ? audit(selectedVoting.projects) : null, [audited, selectedVoting])
  const totalVotes = (projects: { votes: number }[]) => projects.reduce((total, project) => total + project.votes, 0)

  useEffect(() => {
    if (!audited) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    resultRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" })
  }, [audited])

  const handleCreate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError("")
    setFormMessage("")
    try {
      createVoting(newTitle)
      setNewTitle("")
      setFormMessage("Votação criada. Clique em ‘Entrar na votação’ para adicionar os projetos.")
      setAudited(false)
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Não foi possível criar a votação.")
    }
  }

  const handleDelete = (id: string, title: string) => {
    const confirmed = window.confirm(`Excluir a votação “${title}”? Os projetos, votos e códigos utilizados desta votação serão apagados deste navegador.`)
    if (!confirmed) return
    setFormError("")
    setFormMessage("")
    try { deleteVoting(id) }
    catch (error) { setFormError(error instanceof Error ? error.message : "Não foi possível excluir a votação.") }
  }

  return (
    <section className="section">
      <div className="container">
        {!selectedVoting ? (
          <>
            <SectionTitle eyebrow={votingCopy.eyebrow} title={votingCopy.title} note={votingCopy.note} />
            <form className="voting-create" onSubmit={handleCreate}>
              <label htmlFor="new-voting-title">Nome da nova votação</label>
              <div className="voting-create__row">
                <input id="new-voting-title" className="field" value={newTitle} onChange={(event) => setNewTitle(event.target.value)} maxLength={80} placeholder="Ex.: Feira de Projetos 2026" autoComplete="off" />
                <ActionButton type="submit" disabled={!newTitle.trim()}>+ Criar votação</ActionButton>
              </div>
              {formError && <p className="voting-feedback" role="alert">{formError}</p>}
              {formMessage && <p className="voting-feedback voting-feedback--success" role="status">{formMessage}</p>}
            </form>

            {votings.length > 0 ? (
              <div className="voting-list">
                {votings.map((voting, index) => (
                  <Sticker key={voting.id} tone={["paper", "pink", "cyan", "sand"][index % 4] as "paper" | "pink" | "cyan" | "sand"} tilt={index % 2 ? 0.7 : -0.7} className="voting-item" hover>
                    <div className="voting-item__content">
                      <span className="chip chip--sand">{voting.projects.length}/{votingLimits.maxProjects} projetos</span>
                      <h3>{voting.title}</h3>
                      <p className="note">Criada em {new Date(voting.createdAt).toLocaleDateString("pt-BR")} · {votesLabel(totalVotes(voting.projects))}</p>
                    </div>
                    <div className="voting-item__actions">
                      <ActionButton onClick={() => { setSelectedVotingId(voting.id); setAudited(false); setFormError(""); setFormMessage("") }}>Entrar na votação</ActionButton>
                      <button type="button" className="voting-delete" onClick={() => handleDelete(voting.id, voting.title)}>Excluir votação</button>
                    </div>
                  </Sticker>
                ))}
              </div>
            ) : (
              <Sticker tone="sand" tilt={-0.4} className="voting-empty">
                <h3>Nenhuma votação criada ainda</h3>
                <p>Crie a votação acima. Depois entre nela para adicionar os projetos e registrar os votos.</p>
              </Sticker>
            )}
          </>
        ) : (
          <>
            <div className="voting-session-top">
              <button type="button" className="voting-back" onClick={() => { setSelectedVotingId(null); setAudited(false) }}>← Todas as votações</button>
              <span className="chip chip--pink">Votação em andamento</span>
            </div>
            <SectionTitle eyebrow="Votação" title={selectedVoting.title} note={`Adicione até ${votingLimits.maxProjects} projetos. Projetos cadastrados não podem ser excluídos.`} />
            <div className="voting-session-meta">
              <span className="chip chip--sand">{selectedVoting.projects.length}/{votingLimits.maxProjects} projetos</span>
              <span className="chip chip--cyan">{votesLabel(totalVotes(selectedVoting.projects))}</span>
            </div>
            <div className="voting__grid">
              {selectedVoting.projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onName={(name) => setName(selectedVoting.id, project.id, name)}
                  onImage={(file) => setImage(selectedVoting.id, project.id, file)}
                  onVote={(code) => vote(selectedVoting.id, project.id, code)}
                />
              ))}
              {selectedVoting.projects.length < votingLimits.maxProjects ? (
                <button type="button" className="project-add" onClick={() => { addProject(selectedVoting.id); setAudited(false) }}>
                  <span className="project-add__plus" aria-hidden="true">+</span>
                  <span>{votingCopy.addLabel}</span>
                  <span className="chip chip--sand">{selectedVoting.projects.length}/{votingLimits.maxProjects}</span>
                </button>
              ) : (
                <p className="project-add project-add--full note">{votingCopy.full} ({votingLimits.maxProjects}).</p>
              )}
            </div>
            {selectedVoting.projects.length === 0 && <p className="voting__empty note">{votingCopy.empty}</p>}
            <div className="voting__audit">
              <ActionButton onClick={() => setAudited(true)} disabled={selectedVoting.projects.length === 0}>{votingCopy.audit}</ActionButton>
              <div ref={resultRef} className="voting__result">
                {result && <AuditChart result={result} />}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
