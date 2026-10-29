# ADR-004 — Convenção de nomes de arquivos, variáveis e pastas

- **Data:** 2026-10-29
- **Status:** Aceita

## Contexto

Ao montar o dicionário do projeto apareceram nomes ambíguos ou inconsistentes: "sticker" com dois significados,
`Button` sem dizer que é link, um componente genérico (`ThemeTicker`) preso ao domínio `brand`, um arquivo
(`useEpisodes.ts`) que exportava outro nome (`useYouTubeData`), `data.ts` vago, domínio `community` cujo conceito
se chamava "join", `brand` sem objeto `…Copy` e imagens misturando camelCase, português e inglês.

## Decisão

1. **Código em inglês, conteúdo em português.** Identificadores, arquivos `.ts/.tsx/.css` e pastas de código em inglês;
   textos do site e comentários de edição em português.
2. **Um termo, um significado.** `Sticker` = bloco visual de `shared/ui`; `Decal` = imagem adesiva do cartão do integrante.
3. **Componentes dizem o que fazem:** `LinkButton` (navega) × `ActionButton` (executa).
4. **Genérico mora em `shared/`.** `Ticker` foi para `shared/ui`; cada domínio passa sua lista (`HomeTicker` em `brand`).
5. **Arquivo de hook = nome do hook principal** (`useChannelData.ts` → `useChannelData()`).
6. **Conteúdo editável em `content.ts`**, exportando `<domínio>Copy` para textos (e `…Limits` para números).
7. **Nome do domínio = nome do conceito** (`join` ↔ `JoinSection`, `joinCopy`, `#participe`).
8. **Arquivos de imagem em minúsculas com hífen** (kebab-case), numerados com dois dígitos: `ep01.jpg`, `membro-01.svg`,
   `equipe-toda.jpeg`. A pasta é a do domínio dono da imagem (`public/images/<domínio>/`).

## Consequências

- O dicionário (`documentos/dicionario.md`) lista os termos e a tabela "antes → agora".
- Os caminhos públicos das imagens mudaram (ex.: `/images/episodes/ep1Thumbnail.jpg` → `/images/episodes/ep01.jpg`).
  Nenhuma referência externa conhecida; links antigos diretos para imagens deixam de funcionar após o deploy.
- Novos arquivos e nomes devem seguir esta convenção.
