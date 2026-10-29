import type { VoteDirection } from "./model"

// Regra do voto (função pura): ▲ soma 1, ▼ tira 1, e a pontuação nunca fica abaixo de zero.
export const MIN_VOTES = 0

export const applyVote = (votes: number, direction: VoteDirection) => Math.max(MIN_VOTES, votes + direction)

export const canVoteDown = (votes: number) => votes > MIN_VOTES
