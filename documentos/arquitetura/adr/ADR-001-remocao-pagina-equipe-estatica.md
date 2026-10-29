# ADR-001 — Remoção da página Equipe estática legada

- **Data:** 2026-10-29
- **Status:** Aceita

## Contexto

O commit `669dd0a` adicionou à raiz uma versão estática da página Equipe (`equipe.html`, `assets/css`,
`assets/js`, `assets/img` e `COMO-EDITAR.md`), feita para "colar" num site HTML tradicional. O site, porém, é
uma SPA React/Vite, e a página Equipe já existe como o domínio `src/domains/team` (rota `#/equipe`).

Constatações:
- Nenhum arquivo de `src/`, `api/`, `scripts/` ou `index.html` referencia `equipe.html` ou `assets/`.
- O Vite só usa `index.html` como entrada; os arquivos legados nem chegavam ao `dist/`.
- Os dados legados (`equipe-data.js`) eram uma versão anterior e com nomes de exemplo dos mesmos integrantes de
  `team/data.ts`. O único conteúdo exclusivo era o subtítulo "Gente que cria, edita, grava e faz o Revocast
  acontecer." e um campo `instagram` vazio.
- O visual (fontes Bricolage/DM Sans, tema escuro) não segue os tokens do site (`shared/styles/tokens.css`).

## Decisão

Remover `equipe.html`, `assets/` e `COMO-EDITAR.md` com `git rm`. O domínio `team` passa a ser a única fonte da
página Equipe.

## Consequências

- Um único lugar para editar a equipe; elimina ~383 KB de código morto.
- Os arquivos continuam recuperáveis pelo histórico do Git (`git show 669dd0a:equipe.html`).
- Se for desejado um campo Instagram nos cartões, ele deve ser adicionado ao domínio `team`
  (`model.ts` + `MemberLinks.tsx`), não reintroduzido como página estática.
