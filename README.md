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
| Textos da abertura e do menu (e os links **Nuvem** e **Votação** do cabeçalho) | `src/domains/brand/data.ts` |
| Textos e limites da página **Nuvem de palavras** | `src/domains/wordcloud/data.ts` |
| Textos e limites da página **Votação** (inclui o máximo de projetos) | `src/domains/voting/data.ts` |
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
    │   ├── router/            #   página atual lida do "#" do endereço (home, nuvem, votação)
    │   ├── styles/
    │   │   ├── tokens.css     #   cores, bordas, sombras e fontes
    │   │   └── base.css       #   reset e tipografia
    │   └── ui/                #   componentes visuais reutilizáveis
    │       ├── Sticker.tsx    #     bloco "adesivo" (borda grossa, sombra, inclinação, fita)
    │       ├── Button.tsx     #     botão-link (desativa sozinho se o link estiver vazio)
    │       ├── ActionButton.tsx #   botão que executa uma ação (enviar, votar, auditar)
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
        ├── contact/           # Plataformas e formas de contato
        ├── wordcloud/         # Página interativa "Nuvem de palavras" (#/nuvem)
        └── voting/            # Página interativa "Votação" com auditoria (#/votacao)
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

## Páginas interativas (Nuvem e Votação)

Além da página inicial, o site tem duas páginas interativas, abertas pelos links **Nuvem** e **Votação** no canto
direito do cabeçalho. Elas usam rotas por `#` (`#/nuvem` e `#/votacao`, definidas em `links.pages`), então funcionam
em qualquer hospedagem estática sem configurar servidor. As páginas ficam sempre montadas em `src/app/App.tsx` e só
são escondidas ao trocar de rota. A nuvem de palavras é mantida em memória; as votações, projetos, votos e códigos
consumidos são persistidos no `localStorage` do navegador usado pela organização.

- **Nuvem de palavras** (`domains/wordcloud`): cada palavra digitada entra na nuvem; repetir aumenta o tamanho dela.
  Maiúsculas, acentos e pontuação nas pontas são ignorados (`Café`, `cafe` e `cafe!` são a mesma palavra). Um texto
  com várias palavras separadas por espaço adiciona cada uma. A página cabe inteira na janela (título, nuvem e caixa
  de texto, sem rolar; veja `.cloud-page` em `wordcloud.css`). Ao passar o mouse (ou tocar) numa palavra aparecem
  quantas vezes ela foi digitada e o botão **×** para excluí-la. Tamanhos em `data.ts` (`cloudSize`); regras de texto
  em `words.ts`.
  - **Posição das palavras** (`layout.ts` + `useCloudLayout.ts`): a primeira vai para o meio e cada nova procura o
    lugar livre mais perto do centro numa espiral que começa num ângulo próprio da palavra, sem sobrepor as outras.
    Quem já está na tela fica onde está; só muda de lugar quem passa a bater em outra palavra. Se a nuvem lota, todas
    as palavras diminuem um pouco para caber. Espaço entre palavras e margens: constantes `GAP` e `INSET` em `layout.ts`.
- **Votação** (`domains/voting`): primeiro crie uma votação e entre nela; só então cadastre até 10 projetos
  (`votingLimits.maxProjects`), cada um com imagem (logo/capa), nome e botão de voto com código de validação.
  Projetos não podem ser excluídos pela interface para evitar remoções acidentais; votações inteiras podem ser excluídas.
  **Auditar resultados** gera um gráfico de barras com o projeto vencedor (empates aparecem como "Empate no topo").
  A contagem está em `audit.ts` e a entidade agregadora `Voting` fica em `model.ts`.
- Votações, projetos, contagem de votos e códigos consumidos ficam no `localStorage` do navegador de organização.
  Isso se destina a uma feira presencial em um único computador; não sincroniza os votos entre computadores.

**Adicionar outra página interativa:** crie o domínio, adicione a rota em `links.pages` e em `shared/router/useHashRoute.ts`,
o link em `pageNav` (`domains/brand/data.ts`) e o bloco em `src/app/App.tsx`.

## Pendências conhecidas

- `links.platforms.amazonMusic`, `links.contact.whatsapp` e `links.contact.guestForm` ainda podem ser preenchidos conforme os links estiverem disponíveis.
- A foto da equipe ainda é conteúdo editável localmente. As estatísticas são totais do canal e podem incluir vídeos que não sejam episódios do podcast.
- Sem as variáveis da API ou quando a consulta falha, a seção de episódios usa `src/domains/episodes/fallback.ts`.

## Votação presencial com códigos (sem serviço externo)

A votação foi simplificada para uma feira presencial de um dia, com **um único computador e navegador**. Não exige Redis, cadastro de usuário, login, segredo de servidor ou configuração de API externa.

### Preparar os códigos antes da feira

Na raiz do projeto, execute:

```bash
# Gere 100 códigos para distribuir (pode escolher de 1 a 5000)
npm run vote-codes -- generate 100
```

O comando cria dois arquivos:

- `private/vote-codes.txt`: os códigos em texto puro para a organização imprimir ou distribuir. **Não publique nem envie esse arquivo ao site.** A pasta `private/` fica fora do Git.
- `public/vote-code-hashes.json`: somente os hashes dos códigos, usados pelo site para validar a digitação sem publicar a lista original em texto puro.

Depois de gerar o lote, publique/republique o site normalmente para que o arquivo de hashes vá junto com a aplicação. Gere o lote **antes de iniciar a votação** e não execute o gerador novamente no meio da feira, porque isso substitui a lista de códigos aceitos. Distribua um código por participante.

### Conferir um código no terminal

Para conferir se um código faz parte do lote gerado:

```bash
npm run vote-codes -- validate RV-ABCD-2345
```

Substitua o exemplo pelo código recebido. A conferência consulta o lote no arquivo `public/vote-code-hashes.json`; ela confirma que o código pertence ao lote, mas não revela se ele já foi usado pelo navegador.

### Como o uso único funciona

O site calcula o hash do código digitado e verifica se ele consta no arquivo de hashes. Os hashes utilizados ficam numa lista global no `localStorage` do navegador, compartilhada por todas as votações. Um código só pode registrar um voto no site inteiro, mesmo após atualizar a página ou entrar em outra votação. A cada voto válido, o total do projeto é incrementado — o botão não funciona como alternância de like.

### Fluxo de votação

1. Abra **Votação** no menu e crie uma votação com um nome, por exemplo, `Feira de Projetos 2026`.
2. Clique em **Entrar na votação**.
3. Adicione os projetos (até 10), preencha os nomes e, se desejar, suas imagens.
4. Digite um código no cartão do projeto escolhido e clique em **Votar**. Depois, use **Auditar resultados** para ver a contagem.
5. Use **Todas as votações** para voltar à lista. A organização pode excluir uma votação completa, mas não pode excluir projetos individualmente.

Cada votação guarda seu próprio conjunto de projetos e votos. Os códigos consumidos ficam em uma lista global compartilhada entre as votações: o mesmo código não pode ser reutilizado ao entrar em outra votação. Excluir uma votação apaga seus projetos e resultados, mas não libera novamente os códigos já utilizados. O projeto migra automaticamente dados de uma versão anterior para uma votação chamada `Votação anterior`, quando encontra dados legados não vazios.

Os nomes, imagens, contagens de votos e códigos consumidos ficam salvos no navegador utilizado durante a feira. Portanto:

- Use sempre o mesmo computador e o mesmo perfil do navegador durante o evento.
- Não utilize janela anônima e não limpe os dados do site enquanto a votação estiver em andamento.
- Os votos não são sincronizados entre computadores nem enviados para um banco remoto. Para esta votação de um dia, mantenha o computador como ponto único de apuração.
- A lista de códigos consumidos é global para todas as votações deste navegador. Excluir uma votação não restaura os códigos utilizados nela.

### Limites conhecidos

Esta é uma barreira simples contra a reutilização acidental de códigos, não um sistema antifraude robusto. Como a validação acontece no navegador e os resultados ficam no armazenamento local, alguém com conhecimento técnico e acesso ao computador pode alterar os dados do navegador; limpar os dados do site também apagará a apuração. Os hashes evitam publicar os códigos em texto puro, mas não transformam o site em uma votação inviolável. Para uma competição informal de feira, com a organização controlando a distribuição dos códigos e mantendo o computador sob supervisão, essa solução evita a infraestrutura adicional.

