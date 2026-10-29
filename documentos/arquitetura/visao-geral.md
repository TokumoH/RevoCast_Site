# Visão geral da arquitetura

O site é uma SPA **React + Vite + TypeScript** organizada por **domínios** (DDD): cada parte do negócio do
podcast tem seu modelo, dados, componentes e estilo. O que é comum a todos fica em `shared/`.

## Camadas

| Camada | Papel | Pode importar de |
|---|---|---|
| `src/app/` | Aplicação: ponto de entrada e composição das seções/páginas | `domains`, `shared` |
| `src/domains/<domínio>/` | Regras, dados e componentes de cada contexto do negócio | `shared` e outros domínios **só pelo `index.ts`** |
| `src/shared/` | Núcleo compartilhado (Pure Fabrication): UI reutilizável, animações, roteador, configuração, estilos | nada de `domains` |
| `api/` | Infraestrutura: função serverless da Vercel (`/api/episodes`) | — |

### Regras de dependência

- `app` pode importar de `domains` e `shared`.
- `domains` importam de `shared` e, de outros domínios, **só pelo `index.ts`** (ex.: `brand` usa `PlatformChips` de `contact`).
- `shared` **nunca** importa de `domains`.

## Árvore de diretórios

```
revocast-site/
├── index.html                 # Shell HTML: título, descrição, fontes e favicon
├── vite.config.ts             # Configuração do Vite (alias "@" aponta para src/)
├── vercel.json                # Build Vite e diretório de saída na Vercel
├── tsconfig.json
├── api/
│   └── episodes.ts            # Função serverless que consulta a playlist do YouTube
├── public/
│   └── images/                # TODAS as imagens, em pastas por domínio
│       ├── brand/             #   logo.png
│       │   (convenção de nomes: minúsculas com hífen, ex. ep01.jpg, membro-01.svg, equipe-toda.jpeg)
│       ├── episodes/          #   capas personalizadas dos episódios
│       ├── about/             #   foto da equipe (seção Sobre)
│       ├── team/              #   página Equipe: foto de toda a equipe e fotos dos integrantes
│       │   └── decals/        #     adesivos dos cartões (placeholder.svg = decal padrão)
│       └── join/              #   (reservada para imagens de convidados/plateia)
├── documentos/                # Documentação técnica, guias e relatórios de ação
└── src/
    ├── app/
    │   ├── main.tsx           #   ponto de entrada (carrega estilos globais)
    │   └── App.tsx            #   ordem das seções e páginas
    ├── shared/
    │   ├── config/
    │   │   ├── links.ts       #   links do site (plataformas, contato, rotas, âncoras)
    │   │   ├── images.ts      #   TODAS as variáveis de imagem
    │   │   └── site.ts        #   nome, instituição, ano
    │   ├── motion/            #   animações (entrada ao rolar, flutuar) e o CSS delas
    │   ├── router/            #   página atual lida do "#" do endereço
    │   ├── styles/
    │   │   ├── tokens.css     #   cores, bordas, sombras e fontes
    │   │   └── base.css       #   reset e tipografia
    │   └── ui/                #   componentes visuais reutilizáveis
    │       ├── Sticker.tsx    #     bloco "adesivo" (borda grossa, sombra, inclinação, fita)
    │       ├── LinkButton.tsx #     botão que é link (desativa sozinho se o link estiver vazio)
    │       ├── ActionButton.tsx #   botão que executa uma ação (enviar, votar, auditar)
    │       ├── Bubble.tsx     #     balão de fala
    │       ├── ImageSlot.tsx  #     imagem ou espaço reservado se estiver vazia
    │       ├── SectionTitle.tsx #   título padrão de seção
    │       ├── Ticker.tsx     #     faixa de palavras que corre (cada domínio passa a lista)
    │       ├── Doodles.tsx    #     rabiscos (estrela, brilho, onda, seta)
    │       ├── Icons.tsx      #     ícones (LinkedIn, GitHub…)
    │       └── ui.css
    └── domains/               # Um domínio por pasta (ver dominios.md)
        ├── brand/  episodes/  about/  join/  contact/
        └── wordcloud/  team/  voting/
```

## Padrão interno de um domínio

```
domains/<domínio>/
├── model.ts        # tipos/entidades do domínio (quando existem)
├── content.ts      # conteúdo editável (textos, listas): objeto <domínio>Copy
├── components/     # componentes React do domínio
├── <domínio>.css   # estilo do domínio
└── index.ts        # "porta de entrada": o que o domínio expõe para os outros
```

Hooks (`useX.ts`) fazem a ponte entre o modelo e os componentes; adaptadores externos (ex.: `episodes/api.ts`,
`episodes/youtube.ts`) isolam a infraestrutura do restante do domínio.

## Roteamento

As páginas extras usam rotas por `#` (`#/nuvem`, `#/votacao`, `#/equipe`, definidas em `links.pages`), então
funcionam em qualquer hospedagem estática. As páginas ficam sempre montadas em `src/app/App.tsx` e só são
escondidas ao trocar de rota.

**Adicionar uma página:** crie o domínio, adicione a rota em `links.pages` e em `shared/router/useHashRoute.ts`,
o link em `brandCopy.pageNav` (`domains/brand/content.ts`) e o bloco em `src/app/App.tsx`.

## Ordem dos estilos

`src/app/main.tsx` carrega primeiro os estilos compartilhados (`shared/`) e depois a aplicação, cujos domínios
carregam o próprio CSS. Assim, o CSS de um domínio sempre sobrescreve o `shared/`. Mantenha essa ordem.
