# Deploy na Vercel e YouTube Data API

## Publicação

Conecte o repositório ao projeto na Vercel. O `vercel.json` configura o build (`npm run build`) e a saída (`dist`);
não é necessário YAML. A função em `api/episodes.ts` é publicada como `/api/episodes`.

## Atualização dos vídeos e estatísticas

Na Vercel, o site busca todos os vídeos e transmissões públicas da playlist de envios do canal, mas exibe apenas os
sete mais recentes: um em destaque e seis abaixo. Títulos, descrições e miniaturas vêm do YouTube. As tags são
automáticas: transmissões com dados de live recebem "Episódio"; os demais vídeos recebem "Corte". Capas
personalizadas dos vídeos cadastrados continuam sendo aproveitadas de `src/domains/episodes/fallback.ts`. A seção
Sobre mostra a quantidade total de vídeos, visualizações e inscritos do canal; se os inscritos estiverem ocultos
pelo YouTube ou a API não responder, o site mostra `—`.

## Configurar a YouTube Data API

1. No Google Cloud Console, crie um projeto, ative **YouTube Data API v3** e gere uma chave de API. Restrinja a chave
   à YouTube Data API v3. A chave é usada apenas pela função serverless; **não** a coloque em variáveis com prefixo `VITE_`.
2. Na Vercel, abra **Project Settings > Environment Variables** e adicione somente `YOUTUBE_API_KEY` para os ambientes
   desejados. O endpoint descobre o canal pelo link do YouTube em `src/shared/config/links.ts` e consulta a playlist de
   envios, que inclui vídeos e transmissões. Depois, faça um novo deploy.

## Testar localmente com a função

Copie `.env.example` para `.env.local`, preencha `YOUTUBE_API_KEY` e execute `npx vercel dev` (se necessário, faça
`npx vercel login` e `npx vercel link` primeiro). `npm run dev` inicia apenas o Vite; nesse modo, a tela continua
usando os dados de fallback. A função mantém os dados em cache por uma hora.
