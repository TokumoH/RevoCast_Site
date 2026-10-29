# Relatório de ação — Renomeação para nomes mais claros

- **Data:** 2026-10-29
- **Branch:** `master`
- **Decisão:** [ADR-004](../arquitetura/adr/ADR-004-convencao-de-nomes.md) · **Tabela antes → agora:** [dicionário §5](../dicionario.md#5-nomes-antigos--novos-2026-10-29)

## Ações realizadas (arquivos movidos com `git mv`, histórico preservado)

| # | Mudança | Arquivos principais |
|---|---|---|
| 1 | "Sticker" do integrante → **Decal** (`MemberDecal`, `decal`, `teamDecal`, `team/decals/`, `.member__decal`) | `team/components/MemberDecal.tsx`, `MemberCard.tsx`, `model.ts`, `content.ts`, `team.css`, `shared/config/images.ts` |
| 2 | `Button` → **`LinkButton`** | `shared/ui/LinkButton.tsx`, `index.ts`; usos em `Header`, `Hero`, `JoinSection`, `ContactSection`, `EpisodesSection` |
| 3 | `ThemeTicker` (brand) → **`Ticker`** genérico em `shared/ui` (prop `items`) + `HomeTicker` em `brand`; CSS da faixa movido de `brand.css` para `ui.css` | `shared/ui/Ticker.tsx`, `ui.css`, `brand/components/HomeTicker.tsx`, `brand.css`, `App.tsx`, `TeamPage.tsx` |
| 4 | `useEpisodes.ts`/`useYouTubeData`/`fetchYouTubeData`/`YouTubeData` → **`useChannelData.ts`/`useChannelData`/`fetchChannelData`/`ChannelData`** | `episodes/*`, `about/AboutSection.tsx`, `api/episodes.ts` |
| 5 | `data.ts` → **`content.ts`** nos 8 domínios | `src/domains/*/content.ts` e todos os imports |
| 6 | Domínio `community` → **`join`** (`join.css`, `public/images/join/`) | `src/domains/join/**`, `App.tsx` |
| 7 | `nav`, `pageNav`, `hero`, `footerNote`, `tickerThemes` → **`brandCopy`** | `brand/content.ts`, `Header`, `Hero`, `Footer`, `HomeTicker` |
| 8 | Imagens em kebab-case (`ep01.jpg`, `equipe-toda.jpeg`, `equipe-revocast.jpeg`, `membro-01.svg`…) | `public/images/**`, `shared/config/images.ts`, `team/content.ts` |
| — | Documentação atualizada | `dicionario.md`, `visao-geral.md`, `dominios.md`, `guias/edicao-de-conteudo.md`, ADR-003, ADR-004, `README.md` |

## Verificação

- `npm run typecheck` — sem erros. `npm run build` (com `dist/` limpo) — sucesso, 93 módulos.
- Busca por nomes antigos em `src/`, `api/`, `scripts/`: nenhuma ocorrência.
- Navegador (dev server, após recarregar):
  - Home: seções `topo`, `episodios`, `sobre`, `participe`, `contato` renderizadas; faixa animando (`ticker`);
    7 botões-link; título do hero e rodapé com os textos de `brandCopy`.
  - Equipe: 10 decals carregados de `/images/team/decals/placeholder.svg`; cartões todos 210 × 496; 6 botões de perfil.
  - As 21 imagens da página responderam HTTP 200 com tipo de imagem.
  - Os erros de console registrados vieram do *hot reload* do Vite durante a renomeação (módulos antigos que
    deixaram de existir); a página recarregada funciona normalmente.

## Observações

- Pastas vazias antigas (`src/domains/community`, `public/images/community`) foram removidas.
- Os caminhos públicos das imagens mudaram; não há referências externas conhecidas.
