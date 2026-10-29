# Votação presencial com códigos (sem serviço externo)

A votação foi simplificada para uma feira presencial de um dia, com **um único computador e navegador**. Não exige
Redis, cadastro de usuário, login, segredo de servidor ou configuração de API externa.

## Preparar os códigos antes da feira

Na raiz do projeto, execute:

```bash
# Gere 100 códigos para distribuir (pode escolher de 1 a 5000)
npm run vote-codes -- generate 100
```

O comando cria dois arquivos:

- `private/vote-codes.txt`: os códigos em texto puro para a organização imprimir ou distribuir. **Não publique nem
  envie esse arquivo ao site.** A pasta `private/` fica fora do Git.
- `public/vote-code-hashes.json`: somente os hashes dos códigos, usados pelo site para validar a digitação sem
  publicar a lista original em texto puro.

Depois de gerar o lote, publique/republique o site normalmente para que o arquivo de hashes vá junto com a aplicação.
Gere o lote **antes de iniciar a votação** e não execute o gerador novamente no meio da feira, porque isso substitui
a lista de códigos aceitos. Distribua um código por participante.

## Conferir um código no terminal

```bash
npm run vote-codes -- validate RV-ABCD-2345
```

Substitua o exemplo pelo código recebido. A conferência consulta o lote em `public/vote-code-hashes.json`; ela
confirma que o código pertence ao lote, mas não revela se ele já foi usado pelo navegador.

## Como o uso único funciona

O site calcula o hash do código digitado e verifica se ele consta no arquivo de hashes. Os hashes utilizados ficam
numa lista global no `localStorage` do navegador, compartilhada por todas as votações. Um código só pode registrar um
voto no site inteiro, mesmo após atualizar a página ou entrar em outra votação. A cada voto válido, o total do
projeto é incrementado — o botão não funciona como alternância de like.

## Fluxo de votação

1. Abra **Votação** no menu e crie uma votação com um nome, por exemplo, `Feira de Projetos 2026`.
2. Clique em **Entrar na votação**.
3. Adicione os projetos (até 10), preencha os nomes e, se desejar, suas imagens.
4. Digite um código no cartão do projeto escolhido e clique em **Votar**. Depois, use **Auditar resultados** para ver a contagem.
5. Use **Todas as votações** para voltar à lista. A organização pode excluir uma votação completa, mas não pode excluir projetos individualmente.

Cada votação guarda seu próprio conjunto de projetos e votos. Os códigos consumidos ficam em uma lista global
compartilhada entre as votações: o mesmo código não pode ser reutilizado ao entrar em outra votação. Excluir uma
votação apaga seus projetos e resultados, mas não libera novamente os códigos já utilizados. O projeto migra
automaticamente dados de uma versão anterior para uma votação chamada `Votação anterior`, quando encontra dados
legados não vazios.

Os nomes, imagens, contagens de votos e códigos consumidos ficam salvos no navegador utilizado durante a feira. Portanto:

- Use sempre o mesmo computador e o mesmo perfil do navegador durante o evento.
- Não utilize janela anônima e não limpe os dados do site enquanto a votação estiver em andamento.
- Os votos não são sincronizados entre computadores nem enviados para um banco remoto.
- A lista de códigos consumidos é global para todas as votações deste navegador. Excluir uma votação não restaura os códigos utilizados nela.

## Limites conhecidos

Esta é uma barreira simples contra a reutilização acidental de códigos, não um sistema antifraude robusto. Como a
validação acontece no navegador e os resultados ficam no armazenamento local, alguém com conhecimento técnico e
acesso ao computador pode alterar os dados do navegador; limpar os dados do site também apagará a apuração. Os
hashes evitam publicar os códigos em texto puro, mas não transformam o site em uma votação inviolável. Para uma
competição informal de feira, com a organização controlando a distribuição dos códigos e mantendo o computador sob
supervisão, essa solução evita a infraestrutura adicional.
