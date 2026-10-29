# Página Equipe · Revocast

## Estrutura
```
equipe.html                    ← a página (não precisa editar)
assets/
  js/equipe-data.js            ← ✏️ EDITE AQUI: pessoas, títulos, fotos
  img/
    logo.svg                   ← 🖼 troque pela logo oficial (mesmo nome)
    equipe-toda.jpg            ← 🖼 foto principal da equipe (mesmo nome)
    equipe/                    ← 🖼 fotos de cada membro
      membro-01.svg ... membro-10.svg
  css/equipe.css               ← cores e fontes (variáveis no topo, em :root)
  js/equipe.js                 ← lógica (não precisa editar)
```

## Tarefas do dia a dia (tudo em `assets/js/equipe-data.js`)
- **Adicionar pessoa:** copie uma linha `{ nome: ..., cargo: ..., foto: ... }` e cole na lista.
- **Remover pessoa:** apague a linha.
- **Trocar foto:** salve a imagem em `assets/img/equipe/` (ideal 800×1000, vertical) e coloque o nome no campo `foto`.
  Dica: se usar o mesmo nome do arquivo antigo, nem precisa mexer no JS.
- **Trocar título/cargo:** edite o campo `cargo`. Nome: campo `nome`.
- **Foto da equipe toda / logo:** substitua `equipe-toda.jpg` e `logo.svg` (ou mude o caminho em `hero`).
- **Instagram/LinkedIn (opcional):** `instagram: "@usuario"`, `linkedin: "https://..."`.

## Colocar no site existente
1. Copie `equipe.html` e a pasta `assets/` para a raiz do site.
2. Nos outros HTMLs, adicione no menu: `<li><a href="equipe.html">Equipe</a></li>`.
3. Ajuste os links do header (index/episodios/contato) para as páginas reais.
4. Se o site já tem CSS próprio, mantenha o `equipe.css` só nesta página, ou mova as variáveis `:root` para o seu CSS.
