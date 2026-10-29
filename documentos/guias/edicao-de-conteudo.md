# Guia de edição de conteúdo

## O que você mais vai editar

| Quero mudar... | Arquivo |
|---|---|
| **Links** (YouTube, Instagram, TikTok, Spotify, Amazon Music, e-mail, WhatsApp, formulário) | `src/shared/config/links.ts` |
| **Imagens** (logo, capas de episódios, foto da equipe, foto de toda a equipe e decal padrão da página Equipe) | `src/shared/config/images.ts` (arquivos em `public/images/`) |
| **Episódios** (textos da seção e fallback) | `src/domains/episodes/content.ts`, `src/domains/episodes/fallback.ts` |
| Textos da abertura e do menu (inclusive o link **Equipe**, que fica por último) e os links **Nuvem** e **Votação** do cabeçalho | `src/domains/brand/content.ts` |
| Textos e limites da página **Nuvem de palavras** | `src/domains/wordcloud/content.ts` |
| Textos e limites da página **Votação** (máximo de projetos) | `src/domains/voting/content.ts` |
| **Equipe**: adicionar/remover pessoas, trocar nome, título e foto, textos da página | `src/domains/team/content.ts` (fotos em `public/images/team/`) |
| **Equipe**: LinkedIn e GitHub de cada pessoa | `src/domains/team/content.ts` (campo `profiles` de cada pessoa) |
| Texto "Sobre", números e selos | `src/domains/about/content.ts` |
| Textos de "Participe" (convidados e plateia) | `src/domains/join/content.ts` |
| Textos de "Contato" e plataformas | `src/domains/contact/content.ts` |
| Nome, instituição e ano | `src/shared/config/site.ts` |
| Link do selo "Atlética Revoada · IFSP campus Birigui" (topo da home) | `src/shared/config/links.ts` (`links.institution.campus`) |
| **Cores, bordas e fontes** | `src/shared/styles/tokens.css` |

## Tarefas comuns

**Trocar uma imagem:** coloque o arquivo na pasta correta de `public/images/` (nomes em minúsculas, com hífen: `ep08.jpg`, `membro-11.jpg`) e mude o caminho da variável em
`src/shared/config/images.ts` (ex.: `slot("episodes/ep01.jpg")`). Também vale colar um link completo
(`https://...`). Variável vazia (`slot("")`) mostra um espaço reservado. A foto do Sobre (`about/`) e a da página
Equipe (`team/`) são arquivos separados de propósito (ver ADR-002): trocar uma não troca a outra.

**Manter o fallback de episódios:** edite `src/domains/episodes/fallback.ts` para ajustar tags, capas próprias e os
dados usados quando a API falhar. `youtubeId` deve conter somente o ID do vídeo, sem URL ou parâmetros.

**Adicionar o Amazon Music (ou outro link):** preencha `platforms.amazonMusic` em `src/shared/config/links.ts`.
Links vazios não aparecem no site. Os botões de e-mail, WhatsApp e formulário de convidados funcionam do mesmo jeito.

**Adicionar uma plataforma nova:** crie o link em `links.ts`, adicione a chave em `src/domains/contact/model.ts`
e uma linha em `src/domains/contact/content.ts`.

**Adicionar ou remover episódios:** adicione ou apague um item da lista em `src/domains/episodes/content.ts`
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
`brand/components/RotatingBubble.tsx` (balão trocando de frase) e `shared/ui/Ticker.tsx` (faixa que corre).
- Frases do balão e temas da faixa: `src/domains/brand/content.ts` (`brandCopy.hero.bubblePhrases` e `brandCopy.tickerThemes`).
- Velocidade da faixa: duração (`60s`) da `animation` em `.ticker__track` no `shared/ui/ui.css` (menor = mais rápido).
- Tempo de cada frase do balão: constante `INTERVAL` em `RotatingBubble.tsx`.
- Quem ativa "reduzir movimento" no sistema vê tudo parado (já preparado em todos os arquivos).

**Mudar as cores:** edite `src/shared/styles/tokens.css`. As cores atuais vêm da logo (rosa, azul-claro e areia).

## Página Equipe

| O quê | Onde |
|---|---|
| Pessoas, nomes, títulos, frases, perfis (LinkedIn/GitHub) e referência das fotos/decals | `src/domains/team/content.ts` |
| **Imagens** (foto da equipe toda, decal padrão e helpers `teamPhoto`/`teamDecal`) | `src/shared/config/images.ts` (arquivos em `public/images/team/`) |

| Quero... | Como |
|---|---|
| **Adicionar** uma pessoa | Em `src/domains/team/content.ts`, copie uma linha da lista `members`, cole no fim, dê um `id` novo (ex.: `"ana"`) e preencha `profiles: { linkedin: "...", github: "..." }`. |
| **Remover** uma pessoa | Apague a linha dela em `members`. |
| **Trocar o título** (função) | Mude o campo `role`. O nome é o campo `name`. |
| **Trocar a foto** de alguém | Salve a imagem em `public/images/team/` (ideal vertical 4:5, ex. 800×1000; jpg, png, webp ou svg) e escreva só o nome do arquivo em `teamPhoto("arquivo.jpg")`. Usando o **mesmo nome** do arquivo atual, não precisa editar nada. |
| **Trocar LinkedIn/GitHub** | Mude os endereços em `profiles` na linha da pessoa. Link vazio (`""`) = o botão não aparece. |
| **Trocar o decal** (adesivo do canto do cartão) | Cada pessoa tem um decal ligado ao cargo: `decal: teamDecal("microfone.svg")` na linha dela. Disponíveis em `public/images/team/decals/`: `megafone`, `roteiro`, `ferramenta`, `microfone`, `no-ar`, `pincel`, `curtida`, `prancheta`, `ideia`, `claquete`. Para um novo, salve o arquivo (SVG ou PNG quadrado, fundo transparente) na pasta e use o nome dele. Sem `decal`, a pessoa usa o padrão `placeholder.svg` (`images.team.decal`). |
| **Mudar a ordem** | A ordem da lista `members` é a ordem na página. |
| Trocar a **foto de toda a equipe** | Substitua `public/images/team/equipe-toda.jpeg` (ou mude `images.team.group` em `images.ts`). O enquadramento é `object-position` em `.team-hero__photo img` (`team.css`). |
| Mudar textos do topo, da seção, da faixa e dos botões | `teamCopy` e `teamTicker` em `src/domains/team/content.ts`. |

Foto ou decal vazio, ou arquivo que não existe, não quebra a página (foto mostra espaço reservado; decal some).

**Cartões de mesmo tamanho:** todos os cartões têm a mesma largura e altura. O nome reserva 2 linhas (3 no celular),
o título reserva 1 linha de chip (2 no celular), a frase reserva 2 linhas e a linha de botões existe mesmo sem links.
Nomes muito longos (mais de 2–3 linhas) ainda podem aumentar o cartão; o tamanho do texto do nome acompanha a largura
do cartão. Ajustes: `--name-lines`, `--tagline-lines`, `.member__role-slot` e `.member__links` em `team.css`.
