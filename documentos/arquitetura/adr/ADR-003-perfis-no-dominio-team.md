# ADR-003 — Perfis dos integrantes ficam no domínio `team`

- **Data:** 2026-10-29
- **Status:** Aceita

## Contexto

LinkedIn e GitHub dos integrantes ficavam em `shared/config/links.ts` (`links.team`), ligados ao integrante por um
`id` e lidos por `memberLinks(id)`. Isso colocava dado de domínio no núcleo compartilhado e obrigava a editar dois
arquivos para adicionar uma pessoa; esquecer o segundo fazia os botões sumirem sem aviso.

## Opções

- **A.** Campo `profiles?: MemberProfiles` no próprio `Member` (`team/content.ts`, antes `team/data.ts`).
- **B.** Arquivo `team/profiles.ts` indexado por `id`.

## Decisão

Opção **A**. O perfil é atributo do integrante (value object `MemberProfiles`). `MemberLinks` passou a ser um
componente puramente de apresentação, que recebe `profiles` pronto.

`shared/config/links.ts` continua guardando os links **do site** (plataformas, contato, rotas, âncoras). A regra
antiga "todos os links ficam em `links.ts`" foi revista: links que descrevem uma entidade de domínio ficam no domínio.

## Consequências

- Uma pessoa é editada em um único lugar; `id` serve só como chave da lista.
- `shared/` deixa de conhecer o conceito de integrante.
- Links de exemplo (página inicial das redes) foram trocados por `""`: o botão só aparece com perfil real.
