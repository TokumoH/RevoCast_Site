# Documentação do RevoCast

Índice de toda a documentação técnica, guias de uso e relatórios de ação do site.

## Arquitetura

| Documento | Conteúdo |
|---|---|
| [arquitetura/visao-geral.md](arquitetura/visao-geral.md) | Camadas (`app`, `domains`, `shared`), árvore de diretórios e regras de dependência |
| [arquitetura/dominios.md](arquitetura/dominios.md) | O que cada domínio (bounded context) faz e seus arquivos principais |
| [arquitetura/adr/](arquitetura/adr/) | Registro de decisões de arquitetura (ADR) |

## Guias

| Guia | Para quem |
|---|---|
| [guias/edicao-de-conteudo.md](guias/edicao-de-conteudo.md) | Quem vai trocar textos, links, imagens, episódios e integrantes |
| [guias/deploy-vercel.md](guias/deploy-vercel.md) | Publicação na Vercel e configuração da YouTube Data API |
| [guias/votacao-presencial.md](guias/votacao-presencial.md) | Organização da votação com códigos na feira |

## Relatórios de ação

Cada mudança relevante gera um relatório em [relatorios/](relatorios/), nomeado `AAAA-MM-DD-assunto.md`
(o que foi feito, por quê, arquivos afetados e como verificar).

| Data | Relatório |
|---|---|
| 2026-10-29 | [Reorganização da arquitetura do diretório](relatorios/2026-10-29-reorganizacao.md) |

## Pendências conhecidas

- `links.platforms.amazonMusic`, `links.contact.whatsapp` e `links.contact.guestForm` ainda podem ser preenchidos conforme os links estiverem disponíveis.
- A foto da equipe ainda é conteúdo editável localmente. As estatísticas são totais do canal e podem incluir vídeos que não sejam episódios do podcast.
- Sem as variáveis da API ou quando a consulta falha, a seção de episódios usa `src/domains/episodes/fallback.ts`.
- Integrantes 06 a 10 da página Equipe ainda têm nome, foto e links de exemplo.
- Links de LinkedIn/GitHub dos integrantes ficam em `shared/config/links.ts`; avaliar movê-los para o domínio `team` (ver relatório de 2026-10-29).
