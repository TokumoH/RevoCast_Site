# ADR-005 — Votação ▲/▼ (estilo Reddit) com sessão de votante

- **Data:** 2026-10-29
- **Status:** Aceita

## Contexto

A votação exigia digitar o código em cada cartão, e cada código valia um único voto no site inteiro. O pedido foi
facilitar a votação com ▲/▼ como no Reddit.

## Opções

- **A.** O votante digita o código uma vez (sessão) e vota ▲/▼ em cada projeto; um voto por código por projeto.
- **B.** ▲/▼ sem código: mais simples, mas qualquer pessoa vota quantas vezes quiser.

## Decisão

Opção **A**.

- Modelo: `Project` passa de `votes` para `ups`/`downs`; `Voting` ganha `ballots` (cédulas por hash do código).
  A pontuação é `ups − downs`.
- Regra do voto isolada em `ballot.ts` (função pura): clicar de novo desfaz, clicar no oposto troca.
- Responsabilidades separadas (Pure Fabrication): `voteCodes.ts` (validação), `votingStore.ts` (persistência e
  migração), `useVoterSession.ts` (sessão), `useVotings.ts` (operações do agregado).
- A sessão fica só na memória e encerra por "passar a vez", 2 min sem votos, saída da votação ou recarga.
- Cédulas são **por votação**: o mesmo código pode votar em votações diferentes.
- Migração v2 → v3: `votes` antigos viram `ups` fixos; códigos que já votaram ficam em `lockedCodes` e não abrem sessão.

## Consequências

- Votar fica mais rápido: um código, vários projetos, com possibilidade de corrigir o voto.
- Com ▼, um votante pode prejudicar concorrentes; dar ▲ em todos não altera a ordem. Se for indesejado, a regra muda
  só em `ballot.ts`.
- Continua sendo uma solução de um computador só (localStorage), sem sincronização nem antifraude robusto.
