# RevoCast — Site do podcast da Atlética Revoada (IFSP campus Birigui)

Site de divulgação do **RevoCast**: apresenta o podcast, destaca episódios (com capas ligadas aos vídeos do
YouTube), mostra formas de contato e atrai espectadores e convidados. Inclui as páginas interativas **Nuvem de
palavras**, **Votação** presencial e **Equipe**.
Feito com **React + Vite + TypeScript**, em estilo "colagem de adesivos" com humor, organizado por domínios (DDD).

## Como rodar

Requisitos: Node.js 20+ e npm.

```bash
npm install        # instala as dependências
npm run dev        # servidor de desenvolvimento (http://localhost:5173)
npm run typecheck  # checa os tipos
npm run build      # gera a versão final em dist/
npm run preview    # serve o conteúdo de dist/ localmente
npm run vote-codes -- generate 100   # gera códigos de votação
```

## Estrutura

```
revocast-site/
├── api/          # função serverless da Vercel (/api/episodes)
├── documentos/   # arquitetura, guias e relatórios de ação  ← comece por aqui
├── public/       # imagens (por domínio) e hashes dos códigos de votação
├── scripts/      # ferramentas de linha de comando
└── src/
    ├── app/      # ponto de entrada e composição das páginas
    ├── domains/  # brand, episodes, about, community, contact, wordcloud, voting, team
    └── shared/   # UI reutilizável, animações, roteador, configuração e estilos
```

## Documentação

Toda a documentação fica em [`documentos/`](documentos/README.md):

- [Visão geral da arquitetura](documentos/arquitetura/visao-geral.md) e [domínios](documentos/arquitetura/dominios.md)
- [Guia de edição de conteúdo](documentos/guias/edicao-de-conteudo.md) — "quero mudar X → arquivo Y"
- [Deploy na Vercel e YouTube API](documentos/guias/deploy-vercel.md)
- [Votação presencial com códigos](documentos/guias/votacao-presencial.md)
- [Decisões de arquitetura (ADR)](documentos/arquitetura/adr/) e [relatórios de ação](documentos/relatorios/)
