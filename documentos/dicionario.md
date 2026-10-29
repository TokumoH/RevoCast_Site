# Dicionário do projeto

Linguagem ubíqua do RevoCast: o que cada termo significa no negócio e como aparece no código.
Convenções de nomes: [arquitetura/adr/ADR-004-convencao-de-nomes.md](arquitetura/adr/ADR-004-convencao-de-nomes.md).

## 1. Termos do negócio

| Termo (PT) | No código | Significado |
|---|---|---|
| Episódio | `Episode` | Vídeo do canal exibido na seção de episódios. Transmissões ao vivo recebem a tag "Episódio". |
| Corte | `tag: "Corte"` | Vídeo do canal que não é transmissão (trecho de episódio). |
| Episódio em destaque | `LatestEpisode` | O vídeo mais recente, exibido grande no topo da seção. |
| Dados do canal | `ChannelData`, `useChannelData()`, `fetchChannelData()` | Episódios + estatísticas vindos do YouTube (pela função `/api/episodes`). |
| Estatísticas do canal | `ChannelStats` | Totais de vídeos, visualizações e inscritos (seção Sobre). |
| Fallback | `fallbackEpisodes` | Lista local de episódios usada quando a API do YouTube não responde. |
| Plataforma | `Platform`, `PlatformKey` | Onde o podcast está publicado (YouTube, Spotify, Instagram…). |
| Contato direto | `directContacts` | E-mail, WhatsApp e formulário de convidados. |
| Participe | domínio `join`, `JoinSection`, `joinCopy` | Chamada para convidados e plateia (âncora `#participe`). |
| Integrante | `Member` | Pessoa da equipe exibida na página Equipe. |
| Função / título | `Member.role` | Cargo do integrante (ex.: "Roteiro"). |
| Frase | `Member.tagline` | Frase curta e bem-humorada no cartão do integrante. |
| Perfis | `Member.profiles`, `MemberProfiles` | LinkedIn e GitHub de um integrante. |
| Nuvem de palavras | domínio `wordcloud`, `CloudWord` | Página onde palavras digitadas crescem conforme se repetem. |
| Votação | `Voting` | Uma rodada de votação (ex.: "Feira de Projetos 2026"); agrega projetos e votos. |
| Projeto | `Project` | Item votável dentro de uma votação (até `votingLimits.maxProjects`); guarda `ups` e `downs`. |
| Voto ▲/▼ | `VoteDirection` (`1` ou `-1`), `VoteControl` | Voto estilo Reddit: ▲ a favor, ▼ contra; clicar de novo desfaz, clicar no oposto troca. |
| Pontuação | `projectScore()` | ▲ − ▼ de um projeto; ordena o ranking da auditoria. |
| Cédula | `Ballot`, `Voting.ballots` | Votos de um votante numa votação (projeto → ▲/▼), indexada pelo hash do código. |
| Votante / sessão | `Voter`, `useVoterSession`, `VoterPanel` | Pessoa que digitou um código válido; a sessão dura até "passar a vez", 2 min sem votos ou recarregar. |
| Código bloqueado | `lockedCodes` | Código que já votou no sistema antigo (um voto por código); não abre sessão. |
| Código de voto | `scripts/vote-code.mjs` | Código de uso único (`RV-XXXX-XXXX`) entregue a cada participante. |
| Hash do código | `public/vote-code-hashes.json` | Versão irreversível do código, publicada para validar sem expor a lista. |
| Auditoria | `audit()`, `AuditResult`, `AuditChart` | Contagem final dos votos com o vencedor (ou empate). |

## 2. Termos visuais (estilo "colagem de adesivos")

| Termo | No código | Significado |
|---|---|---|
| Sticker | `shared/ui/Sticker.tsx`, classe `.sticker` | Bloco-base do visual: borda grossa, sombra dura, inclinação (`tilt`), cor (`tone`) e fita opcional (`tape`). Quase todo cartão do site é um `Sticker`. |
| Decal | `MemberDecal`, `Member.decal`, `images.team.decal`, `teamDecal()`, `public/images/team/decals/` | Imagem decorativa (adesivo) colada no canto do cartão do integrante, ligada ao cargo (megafone, roteiro, ferramenta, microfone, no-ar, pincel, curtida, prancheta, ideia, claquete). **Não** confundir com `Sticker`. |
| Chip | classe `.chip` | Etiqueta arredondada em caixa alta (tags, funções, botões pequenos). |
| Botão-link | `LinkButton` | Botão que abre um endereço (`<a>`); link vazio = botão desativado. |
| Botão de ação | `ActionButton` | Botão que executa algo na página (enviar, votar, auditar). |
| Balão | `Bubble`, `RotatingBubble` | Balão de fala; o rotativo troca de frase sozinho no hero. |
| Faixa / ticker | `Ticker` (shared), `HomeTicker` (brand), `brandCopy.tickerThemes`, `teamTicker` | Faixa de palavras que corre na horizontal. O `Ticker` é genérico; cada domínio passa sua lista. |
| Rabiscos | `Doodles.tsx` (`Star`, `Spark`, `Squiggle`, `Arrow`) | Desenhos decorativos em SVG. |
| Hero | `Hero`, `brandCopy.hero`, `.team-hero` | Bloco de abertura no topo de uma página. |
| Slot de imagem | `ImageSlot`, `slot()` | Imagem que mostra um espaço reservado quando o caminho está vazio ou o arquivo falha. |
| Tom | prop `tone` (`paper`, `pink`, `cyan`, `sand`) | Cor de fundo de um `Sticker`, vinda de `tokens.css`. |
| Tokens | `shared/styles/tokens.css` | Variáveis de cor, borda, sombra e fonte usadas por todo o CSS. |

## 3. Termos de arquitetura

| Termo | Onde | Significado |
|---|---|---|
| Domínio | `src/domains/<nome>/` | Contexto do negócio com modelo, conteúdo, componentes e estilo próprios. |
| Shared | `src/shared/` | Núcleo reutilizável (Pure Fabrication): não conhece nenhum domínio. |
| App | `src/app/` | Composição: monta seções e páginas na ordem certa. |
| Porta de entrada | `index.ts` de cada domínio | Única forma de outro módulo importar algo do domínio. |
| Modelo | `model.ts` | Tipos/entidades do domínio. |
| Conteúdo editável | `content.ts` | Textos e listas que quem edita o site altera. |
| Copy | sufixo `…Copy` (ex.: `teamCopy`, `brandCopy`) | Objeto com os textos de interface de um domínio. |
| Limites | sufixo `…Limits` (ex.: `votingLimits`) | Regras numéricas editáveis (máximos, tamanhos). |
| Hook | prefixo `use…` | Função React que liga o modelo aos componentes (estado, carregamento, persistência). O arquivo tem o nome do hook principal. |
| Adaptador | `episodes/api.ts`, `episodes/youtube.ts`, `api/episodes.ts` | Código que conversa com serviços externos e traduz para o modelo. |
| Store | `voting/votingStore.ts` | Persistência de um agregado (leitura, validação, migração e gravação no `localStorage`). |
| Rota | `links.pages`, `useHashRoute`, `Route` | Página atual, lida do `#/…` do endereço. |
| Âncora | `links.anchors` | Link para uma seção dentro da home (`#episodios`…). |
| Configuração | `shared/config/` | Links, imagens e dados do site usados por vários domínios. |
| ADR | `documentos/arquitetura/adr/` | Registro de uma decisão de arquitetura e seu porquê. |
| Relatório de ação | `documentos/relatorios/` | O que foi feito em uma mudança, por quê e como foi verificado. |

## 4. Mapa rápido: "onde fica…?"

| Procuro… | Arquivo |
|---|---|
| Todos os textos de uma seção | `src/domains/<domínio>/content.ts` (objeto `…Copy`) |
| Tipos de um domínio | `src/domains/<domínio>/model.ts` |
| Links de plataformas, contato, rotas e âncoras | `src/shared/config/links.ts` |
| LinkedIn/GitHub de integrantes | `src/domains/team/content.ts` (`profiles`) |
| Caminhos de imagens | `src/shared/config/images.ts` (arquivos em `public/images/<domínio>/`) |
| Componentes visuais reutilizáveis | `src/shared/ui/` |
| Cores e fontes | `src/shared/styles/tokens.css` |
| Animações | `src/shared/motion/` |
| Ordem das seções/páginas | `src/app/App.tsx` |

## 5. Nomes antigos → novos (2026-10-29)

| Antes | Agora |
|---|---|
| `src/domains/*/data.ts` | `src/domains/*/content.ts` |
| domínio `community/`, `community.css`, `public/images/community/` | `join/`, `join.css`, `public/images/join/` |
| `shared/ui/Button.tsx` (`Button`) | `shared/ui/LinkButton.tsx` (`LinkButton`) |
| `brand/components/ThemeTicker.tsx` (`ThemeTicker`) | `shared/ui/Ticker.tsx` (`Ticker`, prop `items`) + `brand/components/HomeTicker.tsx` |
| `episodes/useEpisodes.ts`, `useYouTubeData`, `fetchYouTubeData`, `YouTubeData` | `episodes/useChannelData.ts`, `useChannelData`, `fetchChannelData`, `ChannelData` |
| `MemberSticker`, `Member.sticker`, `images.team.sticker`, `teamSticker()`, `team/stickers/`, `.member__sticker` | `MemberDecal`, `Member.decal`, `images.team.decal`, `teamDecal()`, `team/decals/`, `.member__decal` |
| `brand`: `nav`, `pageNav`, `hero`, `footerNote`, `tickerThemes` | `brandCopy.nav`, `.pageNav`, `.hero`, `.footerNote`, `.tickerThemes` |
| `episodes/ep1Thumbnail.jpg` … `ep7Thumbnail.jpg` | `episodes/ep01.jpg` … `ep07.jpg` |
| `about/equipeRevocast.jpeg`, `team/equipeToda.jpeg` | `about/equipe-revocast.jpeg`, `team/equipe-toda.jpeg` |
| `team/membro01.svg` … `membro10.svg` | `team/membro-01.svg` … `membro-10.svg` |
