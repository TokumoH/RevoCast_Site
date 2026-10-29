# ADR-002 — Imagens separadas por domínio, mesmo quando iguais

- **Data:** 2026-10-29
- **Status:** Aceita

## Contexto

`public/images/about/equipeRevocast.jpeg` (seção Sobre) e `public/images/team/equipeToda.jpeg` (página Equipe)
são hoje o mesmo arquivo (mesmo hash MD5).

## Opções

- **A.** Manter os dois arquivos, um por domínio.
- **B.** Fazer `images.about.team` apontar para `team/equipeToda.jpeg` e apagar a cópia.

## Decisão

Opção **A**. Cada domínio tem seu próprio "slot" de imagem em `shared/config/images.ts` e sua pasta em
`public/images/`. A foto do Sobre e a da página Equipe têm finalidades diferentes e podem divergir no futuro;
compartilhar o arquivo criaria acoplamento entre `about` e `team` por ~1 imagem.

## Consequências

- Trocar a foto em um lugar não troca no outro — isso é intencional e está registrado no guia de edição.
- Custo: uma imagem duplicada no deploy.
