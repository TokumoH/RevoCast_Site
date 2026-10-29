# Guia de edição de conteúdo

## O que você mais vai editar

| Quero mudar... | Arquivo |
|---|---|
| **Links** (YouTube, Instagram, TikTok, Spotify, Amazon Music, e-mail, WhatsApp, formulário, LinkedIn/GitHub dos integrantes) | `src/shared/config/links.ts` |
| **Imagens** (logo, capas de episódios, foto da equipe, foto de toda a equipe e sticker padrão da página Equipe) | `src/shared/config/images.ts` (arquivos em `public/images/`) |
| **Episódios** (textos da seção e fallback) | `src/domains/episodes/data.ts`, `src/domains/episodes/fallback.ts` |
| Textos da abertura e do menu (inclusive o link **Equipe**, que fica por último) e os links **Nuvem** e **Votação** do cabeçalho | `src/domains/brand/data.ts` |
| Textos e limites da página **Nuvem de palavras** | `src/domains/wordcloud/data.ts` |
| Textos e limites da página **Votação** (inclui o máximo de projetos) | `src/domains/voting/data.ts` |
| **Equipe**: adicionar/remover pessoas, trocar nome, título e foto, textos da página | `src/domains/team/data.ts` (fotos em `public/images/team/`) |
| **Equipe**: LinkedIn e GitHub de cada pessoa | `src/shared/config/links.ts` (`links.team`) |
| Texto "Sobre", números e selos | `src/domains/about/data.ts` |
| Textos de "Participe" (convidados e plateia) | `src/domains/community/data.ts` |
| Textos de "Contato" e plataformas | `src/domains/contact/data.ts` |
| Nome, instituição e ano | `src/shared/config/site.ts` |
| **Cores, bordas e fontes** | `src/shared/styles/tokens.css` |

## Tarefas comuns

**Trocar uma imagem:** coloque o arquivo na pasta correta de `public/images/` e mude o caminho da variável em
`src/shared/config/images.ts` (ex.: `slot("episodes/ep01.jpg")`). Também vale colar um link completo
(`https://...`). Variável vazia (`slot("")`) mostra um espaço reservado. A foto do Sobre (`about/`) e a da página
Equipe (`team/`) são arquivos separados de propósito (ver ADR-002): trocar uma não troca a outra.

**Manter o fallback de episódios:** edite `src/domains/episodes/fallback.ts` para ajustar tags, capas próprias e os
dados usados quando a API falhar. `youtubeId` deve conter somente o ID do vídeo, sem URL ou parâmetros.

**Adicionar o Amazon Music (ou outro link):** preencha `platforms.amazonMusic` em `src/shared/config/links.ts`.
Links vazios não aparecem no site. Os botões de e-mail, WhatsApp e formulário de convidados funcionam do mesmo jeito.

**Adicionar uma plataforma nova:** crie o link em `links.ts`, adicione a chave em `src/domains/contact/model.ts`
e uma linha em `src/domains/contact/data.ts`.

**Adicionar ou remover episódios:** adicione ou apague um item da lista em `src/domains/episodes/data.ts`
(e, se quiser capa própria, uma variável em `images.ts`).

**Mudar a ordem das seções:** edite `src/app/App.tsx`.

**Criar um novo domínio/seção:** crie `src/domains/<nome>/` seguindo o padrão de
[../arquitetura/visao-geral.md](../arquitetura/visao-geral.md), exporte o componente no `index.ts` e adicione-o em
`src/app/App.tsx` (e um link de âncora em `links.ts`, se quiser no menu).

**Ajustar o tamanho do topo (hero):** o topo usa a largura e a ALTURA da janela para caber na primeira tela em
qualquer zoom. Os tamanhos ficam em `src/domains/brand/brand.css` (bloco "Hero"): `min-height`, `font-size` do `h1`
e `width` do `.hero__logo`. Em zoom muito alto (janela baixa), o texto de apoio é escondido para o topo caber.

**Texto justificado:** parágrafos de descrição usam a classe `text-justify` (definida em `src/shared/styles/base.css`).
Para justificar ou soltar um parágrafo, adicione ou remova essa classe no componente.

**Movimento (animações):** todo o CSS de animação está em `src/shared/motion/motion.css`. Os componentes que
usam: `Sticker` (props `reveal`, `delay`, `hover`), `Reveal`, `Float`, `SectionTitle` (rabisco que se desenha),
`brand/components/RotatingBubble.tsx` (balão trocando de frase) e `brand/components/ThemeTicker.tsx` (faixa de temas).
- Frases do balão e temas da faixa: `src/domains/brand/data.ts` (`hero.bubblePhrases` e `tickerThemes`).
- Velocidade da faixa: duração (`60s`) da `animation` em `.ticker__track` no `brand.css` (menor = mais rápido).
- Tempo de cada frase do balão: constante `INTERVAL` em `RotatingBubble.tsx`.
- Quem ativa "reduzir movimento" no sistema vê tudo parado (já preparado em todos os arquivos).

**Mudar as cores:** edite `src/shared/styles/tokens.css`. As cores atuais vêm da logo (rosa, azul-claro e areia).

## Página Equipe

| O quê | Onde |
|---|---|
| Pessoas, nomes, títulos, frases e referência das fotos/stickers | `src/domains/team/data.ts` |
| **Links** (LinkedIn e GitHub de cada pessoa) | `src/shared/config/links.ts`, em `links.team` |
| **Imagens** (foto da equipe toda, sticker padrão e helpers `teamPhoto`/`teamSticker`) | `src/shared/config/images.ts` (arquivos em `public/images/team/`) |

| Quero... | Como |
|---|---|
| **Adicionar** uma pessoa | 1) Em `src/domains/team/data.ts`, copie uma linha da lista `members`, cole no fim e dê um `id` novo (ex.: `"ana"`). 2) Em `links.ts`, adicione `ana: { linkedin: "...", github: "..." }` dentro de `links.team`. Sem o passo 2 o cartão aparece normalmente, só sem os botões. |
| **Remover** uma pessoa | Apague a linha dela em `members` (e, se quiser, a entrada dela em `links.team`). |
| **Trocar o título** (função) | Mude o campo `role`. O nome é o campo `name`. |
| **Trocar a foto** de alguém | Salve a imagem em `public/images/team/` (ideal vertical 4:5, ex. 800×1000; jpg, png, webp ou svg) e escreva só o nome do arquivo em `teamPhoto("arquivo.jpg")`. Usando o **mesmo nome** do arquivo atual, não precisa editar nada. |
| **Trocar LinkedIn/GitHub** | Mude os endereços em `links.team["<id>"]` (`links.ts`). Link vazio (`""`) = o botão não aparece. |
| **Trocar o sticker** | Todos usam `public/images/team/stickers/placeholder.svg` (`images.team.sticker`): substitua o arquivo para trocar o de todos. Para um sticker só de uma pessoa, salve em `public/images/team/stickers/` e use `sticker: teamSticker("arquivo.png")` na linha dela. |
| **Mudar a ordem** | A ordem da lista `members` é a ordem na página. |
| Trocar a **foto de toda a equipe** | Substitua `public/images/team/equipeToda.jpeg` (ou mude `images.team.group` em `images.ts`). O enquadramento é `object-position` em `.team-hero__photo img` (`team.css`). |
| Mudar textos do topo, da seção, da faixa e dos botões | `teamCopy` e `teamTicker` em `src/domains/team/data.ts`. |

Foto ou sticker vazio, ou arquivo que não existe, não quebra a página (foto mostra espaço reservado; sticker some).
