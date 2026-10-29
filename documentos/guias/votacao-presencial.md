# Votação presencial (▲/▼, sem código)

A votação foi feita para uma feira presencial de um dia, com **um único computador e navegador**. Não exige
cadastro, login, código de voto, servidor ou API externa.

## Como o voto funciona

- Cada projeto tem **▲**, a **pontuação** e **▼**.
- **▲** soma 1 ponto; **▼** tira 1 ponto.
- A pontuação **nunca fica abaixo de zero**: em 0, o botão ▼ fica desativado.
- Não há código nem limite por pessoa: cada clique conta. A regra está em `src/domains/voting/voteRule.ts`.

## Fluxo de votação

1. Abra **Votação** no menu e crie uma votação com um nome, por exemplo, `Feira de Projetos 2026`.
2. Clique em **Entrar na votação**.
3. Adicione os projetos (até 10), preencha os nomes e, se desejar, suas imagens.
4. Os participantes votam com ▲/▼ nos cartões dos projetos.
5. Use **Auditar resultados** para ver o ranking por pontuação. Empates no topo aparecem como "Empate no topo".
6. Use **Todas as votações** para voltar à lista. A organização pode excluir uma votação completa (projetos e votos),
   mas não pode excluir projetos individualmente.

**Dados de versões anteriores** são migrados automaticamente na primeira abertura:
- votação ▲/▼ com código (v3): pontuação = ▲ − ▼, com mínimo zero;
- votação com um voto por código (v2) e votação única (v1): os votos viram a pontuação.

As chaves antigas do navegador são mantidas como cópia de segurança.

## Cuidados durante a feira

Os nomes, imagens e pontuações ficam salvos no navegador utilizado durante a feira. Portanto:

- Use sempre o mesmo computador e o mesmo perfil do navegador durante o evento.
- Não utilize janela anônima e não limpe os dados do site enquanto a votação estiver em andamento.
- Os votos não são sincronizados entre computadores nem enviados para um banco remoto.
- Como qualquer clique conta, **mantenha o computador sob supervisão** (por exemplo, um monitor orientando cada
  participante a votar uma vez em cada projeto).

## Limites conhecidos

Sem código de voto, nada impede que a mesma pessoa clique várias vezes. A solução serve para uma competição informal
com a votação supervisionada. Se for preciso controlar quem vota, a versão com códigos está no histórico do Git
(commit `748ea2e`, ver ADR-005) e pode ser restaurada.
