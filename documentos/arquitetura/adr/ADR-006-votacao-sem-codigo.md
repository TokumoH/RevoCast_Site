# ADR-006 — Votação ▲/▼ sem código, com pontuação mínima zero

- **Data:** 2026-10-29
- **Status:** Aceita — substitui o [ADR-005](ADR-005-votacao-up-down.md)

## Contexto

A versão do ADR-005 exigia um código de voto por sessão. O pedido foi deixar somente ▲ e ▼, sem código, e impedir
pontuação negativa.

## Decisão

- `Project` volta a ter um único contador `votes` (a pontuação), que nunca fica abaixo de zero.
- A regra fica em `voteRule.ts` (função pura): `applyVote(votes, direção) = max(0, votes + direção)`; `canVoteDown`
  desativa o ▼ em zero.
- Removidos: cédulas (`Ballot`, `Voting.ballots`), sessão do votante (`useVoterSession`, `VoterPanel`), validação de
  códigos (`voteCodes.ts`), o gerador `scripts/vote-code.mjs`, o comando `npm run vote-codes` e
  `public/vote-code-hashes.json`.
- `votingStore.ts` passa para a chave v4 e migra v3 (`max(0, ups − downs)`), v2 e v1 (`votes`).

## Consequências

- Votar fica imediato: um clique, sem digitar nada.
- **Não há controle de quem vota**: a mesma pessoa pode clicar várias vezes. A votação precisa ser supervisionada.
- A versão com códigos pode ser recuperada do histórico do Git (commit `748ea2e`).
- A pasta `private/` (fora do Git) com os códigos antigos não é mais usada pelo site; pode ser apagada pela organização.
