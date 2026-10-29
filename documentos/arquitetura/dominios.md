# Domínios (bounded contexts)

| Domínio | Responsabilidade | Onde aparece |
|---|---|---|
| `brand` | Identidade: cabeçalho, abertura (hero), balão rotativo, faixa da home (`HomeTicker`) e rodapé; textos em `brandCopy` | Todas as páginas |
| `episodes` | Episódios ligados ao YouTube, com API + fallback local | Home |
| `about` | Sobre o podcast, números do canal e selos | Home |
| `join` | "Participe": convidados e plateia | Home |
| `contact` | Plataformas e formas de contato | Home (e chips no `brand`) |
| `wordcloud` | Nuvem de palavras interativa | `#/nuvem` |
| `voting` | Votação presencial com códigos e auditoria | `#/votacao` |
| `team` | Página da equipe: foto do grupo e cartões dos integrantes | `#/equipe` |

## episodes

- `api.ts`: cliente HTTP de `/api/episodes` e adaptação da resposta.
- `youtube.ts`: utilitários de ID/miniatura do YouTube.
- `fallback.ts`: conteúdo local usado se a API falhar (também guarda capas personalizadas).
- `useChannelData.ts`: hook `useChannelData()` (episódios + estatísticas, API + fallback) e `useEpisodes()`.
- `model.ts`: tipos de episódio e estatísticas do canal.

O site busca todos os vídeos e transmissões públicas da playlist de envios do canal e exibe os sete mais
recentes (um em destaque e seis abaixo). Transmissões recebem a tag "Episódio"; os demais vídeos, "Corte".

## wordcloud

Cada palavra digitada entra na nuvem; repetir aumenta o tamanho dela. Maiúsculas, acentos e pontuação nas
pontas são ignorados (`Café`, `cafe` e `cafe!` são a mesma palavra). A nuvem é mantida em memória.

- `words.ts`: normalização do texto.
- `layout.ts` + `useCloudLayout.ts`: posicionamento em espiral a partir do centro, sem sobreposição; quem já está
  na tela não se move, salvo colisão. Se lotar, todas diminuem. Constantes `GAP` e `INSET` em `layout.ts`.
- `content.ts`: textos e tamanhos (`cloudSize`).

## voting

Crie uma votação, entre nela e cadastre até 10 projetos (`votingLimits.maxProjects`), cada um com imagem e nome.
Cada projeto recebe ▲ (+1) e ▼ (−1), sem código; a pontuação mínima é zero. Projetos não podem ser excluídos pela
interface; votações inteiras podem.

- `model.ts`: agregado `Voting` (projetos), `Project` (`votes` = pontuação), `VoteDirection`.
- `voteRule.ts`: regra pura do voto (`applyVote`, `canVoteDown`, `MIN_VOTES = 0`).
- `audit.ts`: ranking pela pontuação e vencedor (empates aparecem como "Empate no topo").
- `votingStore.ts`: leitura/gravação no `localStorage` (v4) e migração dos formatos antigos (v1, v2, v3).
- `useVotings.ts`: estado das votações e operações (criar, excluir, projetos, `castVote`).
- Componentes: `VotingPage`, `ProjectCard`, `VoteControl` (▲ pontuação ▼), `AuditChart`.

Detalhes de operação: [../guias/votacao-presencial.md](../guias/votacao-presencial.md).

## team

Topo com a foto de toda a equipe e a logo; abaixo, faixa animada e um cartão por integrante (cor e inclinação
alternam sozinhas), com decal (adesivo), botões de LinkedIn/GitHub, nome, título e frase. A grade se ajusta a qualquer
número de pessoas (4 por linha no computador, 3 no tablet, 2 no celular) e centraliza a última linha.

- Modelo: `Member` com `profiles?: MemberProfiles` (LinkedIn/GitHub). Os perfis são dados do integrante, por isso
  ficam no domínio, não em `shared/config/links.ts` (ADR-003).
- Componentes: `TeamPage`, `MemberCard`, `MemberDecal`, `MemberLinks`.
- Decals por cargo em `public/images/team/decals/` (megafone, roteiro, ferramenta, microfone, no-ar, pincel, curtida,
  prancheta, ideia, claquete); cada integrante aponta para o seu em `content.ts`.
- Cartões de mesmo tamanho: cada bloco de texto reserva espaço fixo; o cartão é um *container* CSS, então texto e
  botões se ajustam à largura do cartão (`cqi`, `@container`).
- A faixa usa `Ticker` de `shared/ui` com a lista `teamTicker`.
- Ícones em `shared/ui/Icons.tsx`.

Como editar: [../guias/edicao-de-conteudo.md#página-equipe](../guias/edicao-de-conteudo.md#página-equipe).
