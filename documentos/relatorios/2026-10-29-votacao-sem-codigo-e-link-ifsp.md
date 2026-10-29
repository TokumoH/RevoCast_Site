# Relatório de ação — Votação sem código e link do IFSP

- **Data:** 2026-10-29
- **Branch:** `master`
- **Decisão:** [ADR-006](../arquitetura/adr/ADR-006-votacao-sem-codigo.md) (substitui o ADR-005)

## 1. Link do IFSP campus Birigui

O selo "Atlética Revoada · IFSP campus Birigui" do topo da home (`.hero__tag`) virou link para
`https://bri.ifsp.edu.br/` (nova aba, `rel="noreferrer"`).

| Arquivo | Mudança |
|---|---|
| `src/shared/config/links.ts` | Novo grupo `institution.campus` |
| `src/domains/brand/components/Hero.tsx` | `<a>` dentro do selo |
| `src/domains/brand/brand.css` | Link herda a cor; sublinhado no hover/foco |

O rodapé também mostra "Atlética Revoada · IFSP campus Birigui" e **não** foi alterado.

## 2. Votação só com ▲/▼, mínimo zero

| Arquivo | Mudança |
|---|---|
| `voting/model.ts` | `Project.votes` (pontuação); sem `ups`, `downs`, `Ballot`, `ballots` |
| `voting/voteRule.ts` (novo) | `applyVote = max(0, votes + direção)`, `canVoteDown`, `MIN_VOTES` |
| `voting/audit.ts` | Ranking por `votes` |
| `voting/votingStore.ts` | Chave v4; migra v3 (`max(0, ups − downs)`), v2 e v1 |
| `voting/useVotings.ts` | `castVote(votingId, projectId, direção)` sem código |
| `voting/components/VoteControl.tsx` | ▲ pontuação ▼; ▼ desativado em zero |
| `voting/components/ProjectCard.tsx`, `VotingPage.tsx`, `AuditChart.tsx` | Sem painel de votante; totais em pontos |
| `voting/content.ts`, `voting.css` | Textos e estilos de sessão/cédula removidos; dica "mínimo é zero" |
| **Removidos** | `ballot.ts`, `voteCodes.ts`, `useVoterSession.ts`, `VoterPanel.tsx`, `scripts/vote-code.mjs`, `public/vote-code-hashes.json`, comando `npm run vote-codes` |
| Documentação | Guia de votação reescrito, domínios, dicionário, visão geral, guia de edição, README, ADR-005 (substituído), ADR-006 |

## Verificação

- `npm run typecheck` e `npm run build` (com `dist/` limpo) — sem erros, 96 módulos.
- Navegador (dev server):
  - Selo do topo: `href=https://bri.ifsp.edu.br/`, `target=_blank`, texto "Atlética Revoada · IFSP campus Birigui".
  - Votação: sem campo de código; inicial 0/0 com ▼ desativado; ▲▲▲ em A e ▲ em B → 3/1; ▼ em B → 0 e ▼ desativado;
    clique forçado em ▼ com o botão reativado via script → continua 0; ▼ em A → 2.
  - Auditoria: Alfa vencedor com 2 pontos, Beta 0, total 2 pontos.
  - Migração v3: A (▲5 ▼2) → 3; B (▲1 ▼4) → 0.
  - Dados de teste apagados do navegador ao final.

## Observações

- Sem código, a mesma pessoa pode votar várias vezes; o guia orienta supervisionar o computador.
- A pasta `private/` (fora do Git) com os códigos antigos não é mais usada; a entrada no `.gitignore` foi mantida
  para que esses arquivos continuem fora do repositório.
