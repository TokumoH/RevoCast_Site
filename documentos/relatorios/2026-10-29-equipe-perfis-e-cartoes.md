# Relatório de ação — Perfis da equipe no domínio e cartões de mesmo tamanho

- **Data:** 2026-10-29
- **Branch:** `master`

## Objetivo

1. Mover LinkedIn/GitHub dos integrantes de `shared/config/links.ts` para o domínio `team` (ADR-003).
2. Corrigir a tentativa de deixar os cartões de integrante com o mesmo tamanho, independentemente do nome.
3. Criar um dicionário do projeto.

## Diagnóstico da tentativa anterior (cartões)

A alteração em `.member` era `justify-self: end; grid-template-columns: minmax(0, 300px)`:
- `justify-self` não tem efeito num item de *flex* (o `<li>` é item flex; o cartão nem é item de grid) —
  e, se tivesse, empurraria o cartão para a direita.
- A largura já era igual (vem do `flex-basis` do `<li>`); o que variava era a **altura**: nomes com 1, 2 ou 3 linhas,
  botões que quebravam em 2 linhas, títulos que quebravam no celular e cartões sem frase/links.

## Ações realizadas

| Ação | Arquivos |
|---|---|
| Novo tipo `MemberProfiles` e campo `Member.profiles` | `src/domains/team/model.ts` |
| Perfis movidos para cada integrante; exemplos (04–10) trocados por `""` | `src/domains/team/data.ts` |
| `MemberLinks` recebe `profiles` (não busca mais por `id`) e sempre renderiza o bloco | `src/domains/team/components/MemberLinks.tsx` |
| Cartão repassa `profiles`, envolve o título em `.member__role-slot` e sempre renderiza a frase | `src/domains/team/components/MemberCard.tsx` |
| Removidos `MemberLinks` (tipo), `links.team` e `memberLinks()` | `src/shared/config/links.ts` |
| Cartões de mesmo tamanho (ver abaixo) | `src/domains/team/team.css` |
| Dicionário do projeto | `documentos/dicionario.md` |
| ADR-003, guia de edição, domínios, visão geral, índices | `documentos/**`, `README.md` |

### Como os cartões ficaram do mesmo tamanho (`team.css`)

- `<li>` vira flex e o cartão ocupa 100% → na mesma linha, todos esticam até o maior.
- Cada bloco de texto reserva altura fixa: nome `--name-lines` (2; 3 em cartão ≤ 200px), título 1 linha de chip
  (2 em cartão ≤ 200px), frase `--tagline-lines` (2), linha de botões `min-height: 35px`.
- O cartão é um *container* CSS (`container-type: inline-size`): o tamanho do nome usa `clamp(19px, 10.5cqi, 26px)`
  e, em cartão ≤ 260px, os botões viram só ícone (`@container`) — antes isso dependia da largura da janela.

## Verificação

- `npm run typecheck` e `npm run build` — sem erros.
- Medição no navegador (`offsetWidth × offsetHeight` de todos os cartões, dev server local):

| Janela | Cartões |
|---|---|
| 1440px (4 por linha) | todos 288 × 573 |
| 1024px (4 por linha) | todos 220 × 473 |
| 768px (2 por linha) | todos 218 × 507 |
| 375px (2 por linha) | todos 160 × 421 |

## Limites

Um nome que ultrapasse 2 linhas (3 no celular) ainda aumenta o cartão — escolha deliberada para nunca cortar nomes.
