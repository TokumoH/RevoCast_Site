# RevoCast — Site do podcast da Atlética Revoada (IFSP campus Birigui)

Site de divulgação do **RevoCast**: apresenta o podcast, destaca episódios (com capas ligadas aos vídeos do
YouTube), mostra formas de contato e atrai espectadores e convidados.
Feito com **React + Vite + TypeScript**, em estilo "colagem de adesivos" com humor.

## Como rodar

Requisitos: Node.js 20+ e npm.

```bash
npm install        # instala as dependências
npm run dev        # servidor de desenvolvimento (http://localhost:5173)
npm run typecheck  # checa os tipos
npm run build      # gera a versão final em dist/
npm run preview    # serve o conteúdo de dist/ localmente
```

Para publicar na Vercel, conecte o repositório ao projeto. O arquivo `vercel.json` configura o build Vite e a pasta `dist`; a função em `api/episodes.ts` é publicada como `/api/episodes`.

## O que você mais vai editar (resumo)

| Quero mudar... | Arquivo |
|---|---|
| **Links** (YouTube, Instagram, TikTok, Spotify, Amazon Music, e-mail, WhatsApp, formulário) | `src/shared/config/links.ts` |
| **Imagens** (logo, capas de episódios, foto da equipe) | `src/shared/config/images.ts` (arquivos em `public/images/`) |
| **Episódios** (textos da seção e fallback) | `src/domains/episodes/data.ts`, `src/domains/episodes/fallback.ts` |
| Textos da abertura e do menu | `src/domains/brand/data.ts` |
| Texto "Sobre", números e selos | `src/domains/about/data.ts` |
| Textos de "Participe" (convidados e plateia) | `src/domains/community/data.ts` |
| Textos de "Contato" e plataformas | `src/domains/contact/data.ts` |
| Nome, instituição e ano | `src/shared/config/site.ts` |
| **Cores, bordas e fontes** | `src/shared/styles/tokens.css` |

## Arquitetura (DDD)

O código é organizado por **domínios** (partes do negócio do podcast), cada um com seu modelo, dados,
componentes e estilo. O que é comum a todos fica em `shared/`.

```
revocast-site/
├── index.html                 # Shell HTML: título, descrição, fontes e favicon
├── vite.config.ts             # Configuração do Vite (alias "@" aponta para src/)
├── vercel.json                # Build Vite e diretório de saída na Vercel
├── api/
│   └── episodes.ts            # Função serverless que consulta a playlist do YouTube
├── public/
│   └── images/                # TODAS as imagens, em pastas por domínio
│       ├── brand/             #   logo.png
│       ├── episodes/          #   capas personalizadas dos episódios
│       ├── about/             #   foto da equipe
│       └── community/         #   (reservada para imagens de convidados/plateia)
└── src/
    ├── app/                   # Camada de aplicação: monta a página
    │   ├── main.tsx           #   ponto de entrada (carrega estilos globais)
    │   └── App.tsx            #   ordem das seções da página
    ├── shared/                # Núcleo compartilhado (nunca importa de domains/)
    │   ├── config/
    │   │   ├── links.ts       #   TODOS os links (plataformas, contato, âncoras)
    │   │   ├── images.ts      #   TODAS as variáveis de imagem
    │   │   └── site.ts        #   nome, instituição, ano
    │   ├── motion/            #   animações (entrada ao rolar, flutuar) e o CSS delas
    │   │   ├── motion.css     #     TODOS os keyframes e efeitos de movimento
    │   │   ├── useReveal.ts   #     detecta quando o elemento aparece na tela
    │   │   ├── Reveal.tsx     #     envolve um conteúdo para entrar com animação
    │   │   └── Float.tsx      #     faz o conteúdo flutuar
    │   ├── styles/
    │   │   ├── tokens.css     #   cores, bordas, sombras e fontes
    │   │   └── base.css       #   reset e tipografia
    │   └── ui/                #   componentes visuais reutilizáveis
    │       ├── Sticker.tsx    #     bloco "adesivo" (borda grossa, sombra, inclinação, fita)
    │       ├── Button.tsx     #     botão (desativa sozinho se o link estiver vazio)
    │       ├── Bubble.tsx     #     balão de fala
    │       ├── ImageSlot.tsx  #     imagem ou espaço reservado se estiver vazia
    │       ├── SectionTitle.tsx #   título padrão de seção
    │       ├── Doodles.tsx    #     rabiscos (estrela, brilho, onda, seta)
    │       └── ui.css         #     estilo desses componentes
    └── domains/               # Um domínio por pasta
        ├── brand/             # Identidade: cabeçalho, abertura (hero) e rodapé
        ├── episodes/          # Episódios: cartões ligados ao YouTube
        │   ├── api.ts         #   cliente HTTP e adaptação da resposta
        │   ├── fallback.ts    #   conteúdo local se a API falhar
        │   ├── useEpisodes.ts #   hook que carrega API + fallback
        │   └── model.ts       #   tipos de episódio e estatísticas do canal
        ├── about/             # Sobre o podcast, números e selos de respaldo
        ├── community/         # Convidados e plateia ("Participe")
        └── contact/           # Plataformas e formas de contato
```

Cada domínio segue o mesmo padrão:

```
domains/<domínio>/
├── model.ts        # tipos do domínio (quando existem)
├── data.ts         # conteúdo editável (textos, listas)
├── components/     # componentes React do domínio
├── <domínio>.css   # estilo do domínio
└── index.ts        # "porta de entrada": o que o domínio expõe para os outros
```

### Regras de dependência

- `app` pode importar de `domains` e `shared`.
- `domains` importam de `shared` e, de outros domínios, **só pelo `index.ts`** (ex.: `brand` usa `PlatformChips` de `contact`).
- `shared` **nunca** importa de `domains`.

## Como fazer as tarefas comuns

**Trocar uma imagem:** coloque o arquivo na pasta correta de `public/images/` e mude o caminho da variável em
`src/shared/config/images.ts` (ex.: `slot("episodes/ep01.jpg")`). Também vale colar um link completo
(`https://...`). Variável vazia (`slot("")`) mostra um espaço reservado.

**Atualização dos vídeos e estatísticas:** na Vercel, o site busca todos os vídeos e transmissões públicas da playlist de envios do canal, mas exibe apenas os sete mais recentes: um em destaque e seis abaixo. Títulos, descrições e miniaturas vêm do YouTube. As tags são automáticas: transmissões com dados de live recebem "Episódio"; os demais vídeos recebem "Corte". Capas personalizadas dos vídeos cadastrados continuam sendo aproveitadas de `src/domains/episodes/fallback.ts`. A seção Sobre mostra a quantidade total de vídeos, visualizações e inscritos do canal; se os inscritos estiverem ocultos pelo YouTube ou a API não responder, o site mostra `—`.

### YouTube Data API na Vercel

1. No Google Cloud Console, crie um projeto, ative **YouTube Data API v3** e gere uma chave de API. Restrinja a chave à YouTube Data API v3. A chave é usada apenas pela função serverless; não a coloque em variáveis com prefixo `VITE_`.
2. Na Vercel, abra **Project Settings > Environment Variables** e adicione somente `YOUTUBE_API_KEY` para os ambientes desejados. O endpoint descobre o canal pelo link do YouTube em `src/shared/config/links.ts` e consulta a playlist de envios, que inclui vídeos e transmissões. Depois, faça um novo deploy.
3. A Vercel lê `vercel.json` automaticamente. Não é necessário YAML: esse projeto usa `vercel.json` para configurar o build (`npm run build`) e a saída (`dist`). A pasta `api/` é publicada como função serverless.

Para testar localmente com a função habilitada, copie `.env.example` para `.env.local`, preencha `YOUTUBE_API_KEY` e execute `npx vercel dev` (se necessário, faça `npx vercel login` e `npx vercel link` primeiro). `npm run dev` inicia apenas o Vite; nesse modo, a tela continua usando os dados de fallback. A função mantém os dados em cache por uma hora.

**Manter o fallback:** edite `src/domains/episodes/fallback.ts` para ajustar tags, capas próprias e os dados usados quando a API falhar. `youtubeId` deve conter somente o ID do vídeo, sem URL ou parâmetros.

**Adicionar o Amazon Music (ou outro link):** preencha `platforms.amazonMusic` em `src/shared/config/links.ts`.
Links vazios não aparecem no site. Os botões de e-mail, WhatsApp e formulário de convidados funcionam do mesmo jeito.

**Adicionar uma plataforma nova:** crie o link em `links.ts`, adicione a chave em `src/domains/contact/model.ts`
e uma linha em `src/domains/contact/data.ts`.

**Adicionar ou remover episódios:** adicione ou apague um item da lista em `src/domains/episodes/data.ts`
(e, se quiser capa própria, uma variável em `images.ts`).

**Mudar a ordem das seções:** edite `src/app/App.tsx`.

**Criar um novo domínio/seção:** crie `src/domains/<nome>/` seguindo o padrão acima, exporte o componente no
`index.ts` e adicione-o em `src/app/App.tsx` (e um link de âncora em `links.ts`, se quiser no menu).

**Ajustar o tamanho do topo (hero):** o topo usa a largura e a ALTURA da janela para caber na primeira tela em
qualquer zoom. Os tamanhos ficam em `src/domains/brand/brand.css` (bloco "Hero"): `min-height`, `font-size` do `h1`
e `width` do `.hero__logo`. Em zoom muito alto (janela baixa), o texto de apoio é escondido para o topo caber.

**Ordem dos estilos:** `src/app/main.tsx` carrega primeiro os estilos compartilhados (`shared/`) e depois a aplicação,
cujos domínios carregam o próprio CSS. Assim, o CSS de um domínio sempre sobrescreve o `shared/`. Mantenha essa ordem.

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

## Pendências conhecidas

- `links.platforms.amazonMusic`, `links.contact.whatsapp` e `links.contact.guestForm` ainda podem ser preenchidos conforme os links estiverem disponíveis.
- A foto da equipe ainda é conteúdo editável localmente. As estatísticas são totais do canal e podem incluir vídeos que não sejam episódios do podcast.
- Sem as variáveis da API ou quando a consulta falha, a seção de episódios usa `src/domains/episodes/fallback.ts`.
