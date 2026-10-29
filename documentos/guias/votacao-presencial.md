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
confirma que o código pertence ao lote, mas não mostra os votos dele no navegador.

## Como o voto funciona (▲/▼, estilo Reddit)

- O votante digita o código **uma vez** no painel "Quer votar?" e clica em **Começar a votar**.
- Cada projeto tem **▲** (a favor), a **pontuação** (▲ − ▼) e **▼** (contra):
  - clicar ▲ registra +1; clicar ▲ de novo **desfaz**;
  - clicar ▼ depois de ▲ **troca** o voto para −1 (e vice-versa);
  - cada código tem no máximo um voto por projeto, mas pode votar em quantos projetos quiser.
- **Terminar e passar a vez** encerra a sessão para a próxima pessoa. A sessão também termina sozinha após
  2 minutos sem votos (`votingLimits.voterIdleSeconds`) e ao recarregar a página ou sair da votação.
- Quem voltar com o mesmo código vê os próprios votos e pode mudá-los.

O site calcula o hash do código e confere se ele consta em `public/vote-code-hashes.json`. A cédula de cada votante
(um mapa projeto → ▲/▼) fica salva por votação, indexada pelo hash; o código em texto puro nunca é gravado.
O mesmo código pode votar em votações diferentes (cada votação tem sua própria cédula).

## Fluxo de votação

1. Abra **Votação** no menu e crie uma votação com um nome, por exemplo, `Feira de Projetos 2026`.
2. Clique em **Entrar na votação**.
3. Adicione os projetos (até 10), preencha os nomes e, se desejar, suas imagens.
4. Cada participante digita o código no painel do topo, vota com ▲/▼ e clica em **Terminar e passar a vez**.
5. Use **Auditar resultados** para ver o ranking por pontuação (com ▲ e ▼ de cada projeto). Empates no topo
   aparecem como "Empate no topo"; pontuação negativa aparece em barra cinza.
6. Use **Todas as votações** para voltar à lista. A organização pode excluir uma votação completa (projetos e votos),
   mas não pode excluir projetos individualmente.

**Dados de versões anteriores:** votos registrados no sistema antigo (um voto por código) são migrados como ▲ fixos,
e os códigos que já votaram nele continuam bloqueados (não abrem sessão). A chave antiga do navegador é mantida como
cópia de segurança.

Os nomes, imagens, votos e cédulas ficam salvos no navegador utilizado durante a feira. Portanto:

- Use sempre o mesmo computador e o mesmo perfil do navegador durante o evento.
- Não utilize janela anônima e não limpe os dados do site enquanto a votação estiver em andamento.
- Os votos não são sincronizados entre computadores nem enviados para um banco remoto.
- Peça a cada participante para clicar em **Terminar e passar a vez** ao acabar.

## Limites conhecidos

Esta é uma barreira simples contra votos repetidos (um voto por código em cada projeto), não um sistema antifraude robusto. Como a
validação acontece no navegador e os resultados ficam no armazenamento local, alguém com conhecimento técnico e
acesso ao computador pode alterar os dados do navegador; limpar os dados do site também apagará a apuração. Os
hashes evitam publicar os códigos em texto puro, mas não transformam o site em uma votação inviolável. Para uma
competição informal de feira, com a organização controlando a distribuição dos códigos e mantendo o computador sob
supervisão, essa solução evita a infraestrutura adicional.

**Sobre o ▼:** com up/down, dar ▲ em todos os projetos não muda a ordem entre eles, e um votante pode dar ▼ em
concorrentes. Se isso for um problema, a regra está isolada em `src/domains/voting/ballot.ts` (ex.: permitir só ▲).
