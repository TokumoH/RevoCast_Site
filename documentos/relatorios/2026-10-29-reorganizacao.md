# Relatório de ação — Reorganização da arquitetura do diretório

- **Data:** 2026-10-29
- **Branch:** `master` (alterações não commitadas)

## Objetivo

Arrumar a arquitetura do diretório `revocast-site`, mantendo a organização DDD já existente em `src/`.

## Diagnóstico

1. Página Equipe duplicada: versão estática legada (`equipe.html`, `assets/`, `COMO-EDITAR.md`) sem nenhuma
   referência no app React, coexistindo com o domínio `src/domains/team`.
2. Imagem duplicada: `public/images/about/equipeRevocast.jpeg` = `public/images/team/equipeToda.jpeg`.
3. `README.md` concentrava manual, arquitetura, deploy, votação e pendências.
4. Sem o diretório `documentos/` para documentação e relatórios de ação.

## Ações realizadas

| Ação | Arquivos |
|---|---|
| Removida a página Equipe estática legada (`git rm`) — ver [ADR-001](../arquitetura/adr/ADR-001-remocao-pagina-equipe-estatica.md) | `equipe.html`, `assets/**` (17 arquivos), `COMO-EDITAR.md` |
| Mantidas as duas fotos da equipe, uma por domínio — ver [ADR-002](../arquitetura/adr/ADR-002-imagens-por-dominio.md) | — (sem alteração de código) |
| Criado `documentos/` com índice, arquitetura, ADRs, guias e relatórios | `documentos/**` |
| O conteúdo do README foi dividido em documentos temáticos, sem perda de informação | `documentos/guias/*.md`, `documentos/arquitetura/*.md` |
| O `README.md` da raiz foi enxugado: apresentação, como rodar, estrutura e links | `README.md` |

**Sem alterações:** código em `src/`, `api/`, `scripts/`, `public/`, configs. As alterações já pendentes em
`src/domains/team/data.ts`, `team.css` e `shared/config/links.ts` são do usuário e foram preservadas.

## Verificação

- `npm run typecheck` — sem erros.
- `npm run build` — sucesso (92 módulos; `dist/` contém só `index.html`, `assets/`, `images/`, `vote-code-hashes.json`).
- Busca por referências a `equipe.html`, `COMO-EDITAR`, `assets/js` e `assets/img` fora de `documentos/`: nenhuma.

## Observações e próximos passos sugeridos

- ✅ *Resolvido em [2026-10-29-equipe-perfis-e-cartoes](2026-10-29-equipe-perfis-e-cartoes.md).* **`team.css` (alteração pendente do usuário):** `.member` recebeu `justify-self: end` e
  `grid-template-columns: minmax(0, 300px)` em formatação quebrada; `justify-self: end` tende a desalinhar os
  cartões para a direita dentro de cada coluna. Revisar antes de commitar.
- ✅ *Resolvido em [2026-10-29-equipe-perfis-e-cartoes](2026-10-29-equipe-perfis-e-cartoes.md).* **Links da equipe em `shared/`:** `links.team` (LinkedIn/GitHub por integrante) é dado do domínio `team`, não
  configuração transversal. Sugestão: mover para `domains/team/data.ts` (ou um campo `links` em `Member`).
- **Artefatos fora do Git:** `dist/` (regerado no build) e `../revocast-site-equipe-v2.zip` (cópia da versão React)
  podem ser apagados quando o usuário confirmar.
