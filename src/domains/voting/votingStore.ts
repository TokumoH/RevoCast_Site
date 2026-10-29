import type { Ballot, Project, Voting } from "./model"

// Persistência das votações no localStorage (Pure Fabrication): leitura, validação, migração e gravação.
//
// lockedCodes: hashes de códigos que já votaram no sistema antigo (um voto por código no site inteiro).
// Esses votos viraram ▲ fixos na migração e os códigos continuam bloqueados para não votarem duas vezes.
export type VotingStore = { votings: Voting[]; lockedCodes: string[] }

const STORAGE_KEY = "revocast:voting:sessions:v3"
const V2_STORAGE_KEY = "revocast:voting:sessions:v2"
const V1_STORAGE_KEY = "revocast:voting:state:v1"
const EMPTY: VotingStore = { votings: [], lockedCodes: [] }

const isCount = (n: unknown): n is number => typeof n === "number" && Number.isFinite(n) && n >= 0
const strings = (value: unknown): string[] => Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : []

function isProject(value: unknown): value is Project {
  if (!value || typeof value !== "object") return false
  const p = value as Partial<Project>
  return typeof p.id === "number" && typeof p.name === "string" && typeof p.image === "string" && isCount(p.ups) && isCount(p.downs)
}

function isBallot(value: unknown): value is Ballot {
  return !!value && typeof value === "object" && Object.values(value).every((d) => d === 1 || d === -1)
}

function isVoting(value: unknown): value is Voting {
  if (!value || typeof value !== "object") return false
  const v = value as Partial<Voting>
  return typeof v.id === "string" && typeof v.title === "string" && typeof v.createdAt === "number" &&
    Array.isArray(v.projects) && v.projects.every(isProject) &&
    !!v.ballots && typeof v.ballots === "object" && Object.values(v.ballots).every(isBallot)
}

// Projeto do formato antigo ({ votes }) → ▲ fixos.
function migrateProject(value: unknown): Project | null {
  if (!value || typeof value !== "object") return null
  const p = value as { id?: unknown; name?: unknown; image?: unknown; votes?: unknown }
  if (typeof p.id !== "number" || typeof p.name !== "string" || typeof p.image !== "string" || !isCount(p.votes)) return null
  return { id: p.id, name: p.name, image: p.image, ups: p.votes, downs: 0 }
}

function migrateVoting(value: unknown): Voting | null {
  if (!value || typeof value !== "object") return null
  const v = value as { id?: unknown; title?: unknown; createdAt?: unknown; projects?: unknown }
  if (typeof v.id !== "string" || typeof v.title !== "string" || typeof v.createdAt !== "number" || !Array.isArray(v.projects)) return null
  const projects = v.projects.map(migrateProject).filter((p): p is Project => p !== null)
  return { id: v.id, title: v.title, createdAt: v.createdAt, projects, ballots: {} }
}

export function makeVotingId(): string {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID()
  return `voting-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

// Formatos antigos: v2 = { votings, usedCodes } (ou lista de votações); v1 = { projects, usedCodes } (votação única).
function readLegacy(): VotingStore | null {
  const v2Raw = localStorage.getItem(V2_STORAGE_KEY)
  if (v2Raw) {
    const parsed: unknown = JSON.parse(v2Raw)
    const list = Array.isArray(parsed) ? parsed : (parsed as { votings?: unknown } | null)?.votings
    const listCodes = Array.isArray(parsed)
      ? parsed.flatMap((entry) => strings((entry as { usedCodes?: unknown } | null)?.usedCodes))
      : strings((parsed as { usedCodes?: unknown } | null)?.usedCodes)
    const votings = Array.isArray(list) ? list.map(migrateVoting).filter((v): v is Voting => v !== null) : []
    return { votings, lockedCodes: [...new Set(listCodes)] }
  }
  const v1Raw = localStorage.getItem(V1_STORAGE_KEY)
  if (v1Raw) {
    const parsed = JSON.parse(v1Raw) as { projects?: unknown; usedCodes?: unknown } | null
    const projects = Array.isArray(parsed?.projects) ? parsed.projects.map(migrateProject).filter((p): p is Project => p !== null) : []
    const lockedCodes = strings(parsed?.usedCodes)
    if (projects.length === 0 && lockedCodes.length === 0) return null
    return { votings: [{ id: makeVotingId(), title: "Votação anterior", createdAt: Date.now(), projects, ballots: {} }], lockedCodes }
  }
  return null
}

export function readStore(): VotingStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<VotingStore> | null
      if (parsed && Array.isArray(parsed.votings) && parsed.votings.every(isVoting)) {
        return { votings: parsed.votings, lockedCodes: strings(parsed.lockedCodes) }
      }
      return EMPTY
    }
    const migrated = readLegacy()
    if (!migrated) return EMPTY
    localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated)) // a chave antiga é mantida como cópia de segurança
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
