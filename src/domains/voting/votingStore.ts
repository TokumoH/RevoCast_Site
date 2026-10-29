import type { Project, Voting } from "./model"

// Persistência das votações no localStorage (Pure Fabrication): leitura, validação, migração e gravação.
export type VotingStore = { votings: Voting[] }

const STORAGE_KEY = "revocast:voting:sessions:v4"
// Formatos antigos, migrados na primeira leitura (as chaves antigas ficam como cópia de segurança):
const V3_STORAGE_KEY = "revocast:voting:sessions:v3" // ▲/▼ com código: projetos com ups/downs
const V2_STORAGE_KEY = "revocast:voting:sessions:v2" // um voto por código: projetos com votes
const V1_STORAGE_KEY = "revocast:voting:state:v1" // votação única
const EMPTY: VotingStore = { votings: [] }

const isCount = (n: unknown): n is number => typeof n === "number" && Number.isFinite(n) && n >= 0

function isProject(value: unknown): value is Project {
  if (!value || typeof value !== "object") return false
  const p = value as Partial<Project>
  return typeof p.id === "number" && typeof p.name === "string" && typeof p.image === "string" && isCount(p.votes)
}

function isVoting(value: unknown): value is Voting {
  if (!value || typeof value !== "object") return false
  const v = value as Partial<Voting>
  return typeof v.id === "string" && typeof v.title === "string" && typeof v.createdAt === "number" &&
    Array.isArray(v.projects) && v.projects.every(isProject)
}

// Projeto de qualquer formato antigo → { votes }. ups/downs (v3) viram max(0, ups - downs).
function migrateProject(value: unknown): Project | null {
  if (!value || typeof value !== "object") return null
  const p = value as { id?: unknown; name?: unknown; image?: unknown; votes?: unknown; ups?: unknown; downs?: unknown }
  if (typeof p.id !== "number" || typeof p.name !== "string" || typeof p.image !== "string") return null
  const votes = isCount(p.votes) ? p.votes : isCount(p.ups) && isCount(p.downs) ? Math.max(0, p.ups - p.downs) : null
  return votes === null ? null : { id: p.id, name: p.name, image: p.image, votes }
}

function migrateVoting(value: unknown): Voting | null {
  if (!value || typeof value !== "object") return null
  const v = value as { id?: unknown; title?: unknown; createdAt?: unknown; projects?: unknown }
  if (typeof v.id !== "string" || typeof v.title !== "string" || typeof v.createdAt !== "number" || !Array.isArray(v.projects)) return null
  const projects = v.projects.map(migrateProject).filter((p): p is Project => p !== null)
  return { id: v.id, title: v.title, createdAt: v.createdAt, projects }
}

export function makeVotingId(): string {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID()
  return `voting-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

function readLegacy(): VotingStore | null {
  for (const key of [V3_STORAGE_KEY, V2_STORAGE_KEY]) {
    const raw = localStorage.getItem(key)
    if (!raw) continue
    const parsed: unknown = JSON.parse(raw)
    const list = Array.isArray(parsed) ? parsed : (parsed as { votings?: unknown } | null)?.votings
    const votings = Array.isArray(list) ? list.map(migrateVoting).filter((v): v is Voting => v !== null) : []
    return { votings }
  }
  const v1Raw = localStorage.getItem(V1_STORAGE_KEY)
  if (v1Raw) {
    const parsed = JSON.parse(v1Raw) as { projects?: unknown } | null
    const projects = Array.isArray(parsed?.projects) ? parsed.projects.map(migrateProject).filter((p): p is Project => p !== null) : []
    if (projects.length === 0) return null
    return { votings: [{ id: makeVotingId(), title: "Votação anterior", createdAt: Date.now(), projects }] }
  }
  return null
}

export function readStore(): VotingStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<VotingStore> | null
      return parsed && Array.isArray(parsed.votings) && parsed.votings.every(isVoting) ? { votings: parsed.votings } : EMPTY
    }
    const migrated = readLegacy()
    if (!migrated) return EMPTY
    localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated))
    return migrated
  } catch {
    return EMPTY
  }
}

export function persistStore(store: VotingStore) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  } catch {
    throw new Error("Não foi possível salvar os dados neste navegador. Libere espaço ou reduza o tamanho das imagens dos projetos.")
  }
}
