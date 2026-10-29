# Relatório de ação — Decals por cargo e votação ▲/▼

- **Data:** 2026-10-29
- **Branch:** `master`
- **Decisão:** [ADR-005](../arquitetura/adr/ADR-005-votacao-up-down.md)

## 1. Decals por cargo (página Equipe)

10 SVGs novos em `public/images/team/decals/`, no estilo do site (contorno grosso, paleta de `tokens.css` + um amarelo
`#ffe27a` para brilho/lâmpada/coroa), ligados a cada integrante em `src/domains/team/content.ts`:

| Integrante | Cargo | Decal |
|---|---|---|
| membro01 | Diretor Geral | `megafone.svg` (megafone com coroa) |
| membro02 | Roteiro | `roteiro.svg` (roteiro com lápis) |
| membro03 | Auxiliar Técnico | `ferramenta.svg` (chave inglesa e cabo) |
| membro04 | Apresentadora | `microfone.svg` (microfone retrô com brilhos) |
| membro05 | Apresentadora | `no-ar.svg` (placa "NO AR") |
| membro06 | Design | `pincel.svg` (pincel com respingo) |
| membro07 | Redes sociais | `curtida.svg` (balão com coração, "+99") |
| membro08 | Produção | `prancheta.svg` (checklist) |
| membro09 | Pauta | `ideia.svg` (lâmpada) |
| membro10 | Edição | `claquete.svg` (claquete) |

## 2. Votação ▲/▼

| Arquivo | Mudança |
|---|---|
| `voting/model.ts` | `VoteDirection`, `Ballot`; `Project.ups/downs`; `Voting.ballots`; `AuditRow` com `ups`, `downs`, `score` |
| `voting/ballot.ts` (novo) | Regra pura: `nextDirection`, `applyVote`, `projectScore`, `projectVotes` |
| `voting/audit.ts` | Ranking por pontuação; campeões só se houver votos |
| `voting/voteCodes.ts` (novo) | Validação do código extraída do hook (`validateCode`, `maskCode`) |
| `voting/votingStore.ts` (novo) | Persistência v3 e migração de v1/v2 (`votes` → `ups`, `usedCodes` → `lockedCodes`) |
| `voting/useVotings.ts` | Usa store + ballot; `vote(código)` → `castVote(votingId, voterHash, projectId, direção)` |
| `voting/useVoterSession.ts` (novo) | Sessão do votante na memória, expira após `voterIdleSeconds` (120 s) |
| `voting/components/VoterPanel.tsx` (novo) | Código digitado uma vez; "Terminar e passar a vez" |
| `voting/components/VoteControl.tsx` (novo) | ▲ pontuação ▼ com `aria-pressed` |
| `voting/components/ProjectCard.tsx` | Sem campo de código; nome + `VoteControl` |
| `voting/components/VotingPage.tsx` | Liga painel, sessão e votos; encerra a sessão ao sair |
| `voting/components/AuditChart.tsx` | Pontuação, detalhe ▲/▼, barra cinza para negativos |
| `voting/content.ts`, `voting.css` | Textos e estilos novos; `voterIdleSeconds` |
| `voting/useProjects.ts` | **Removido** (hook antigo sem uso) |
| `shared/ui/ActionButton.tsx` | Comentário atualizado (`LinkButton`) |

## Verificação

- `npm run typecheck` e `npm run build` — sem erros (99 módulos).
- Navegador (dev server; a lista de hashes foi **interceptada no navegador** com 2 códigos de teste, sem usar os
  códigos reais da feira; os dados de teste foram apagados ao final):
  - Código inválido → "Código inválido…"; código válido → "Votando com RV-••••-2345" e setas habilitadas.
  - ▲ em A → 1; ▲ de novo → 0 (desfaz); ▲ e depois ▼ → −1 (troca).
  - Após "passar a vez" as setas ficam desabilitadas; o 2º votante começa com cédula vazia.
  - O 1º votante, ao voltar, vê os próprios votos.
  - Auditoria: Beta 2 (▲2 ▼0) vencedor, Gama 0 (▲1 ▼1), Alfa −1 (▲0 ▼1), total 5 votos.
  - Migração v2: `votes` 4 e 1 → `ups` 4 e 1; código antigo bloqueado com mensagem; novo votante ▼ → 3.
  - Celular (375px): sem rolagem lateral; nome e setas cabem no cartão.
  - Equipe: os 10 decals carregam (HTTP 200) e os cartões continuam do mesmo tamanho (284 × 568 em 1280px).
- **Não testado:** a expiração automática da sessão após 2 minutos (não foi possível esperar no teste automatizado).
