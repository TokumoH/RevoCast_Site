/* ==========================================================
   REVOCAST · EQUIPE  —  ARQUIVO DE CONFIGURAÇÃO
   É AQUI que você edita tudo. Não precisa mexer no HTML.

   COMO FAZER:
   ➕ Adicionar pessoa  → copie uma linha { ... }, cole e edite.
   ➖ Remover pessoa    → apague a linha dela.
   🖼 Trocar foto        → coloque o arquivo em  assets/img/equipe/
                          e escreva o nome dele no campo "foto".
                          (jpg, png, webp ou svg. Ideal: 800x1000, vertical)
   ✏️ Trocar título      → mude o campo "cargo".
   🔀 Mudar a ordem      → mude a posição das linhas.

   Campos opcionais (pode apagar): frase, instagram, linkedin.
   Se a foto não for encontrada, aparece um avatar com a inicial.
   ========================================================== */

window.REVOCAST_EQUIPE = {

  /* ---------- BANNER PRINCIPAL (foto de toda a equipe) ---------- */
  hero: {
    foto: "assets/img/equipe-toda.jpg",   // troque o arquivo ou o caminho
    logo: "assets/img/logo.svg",          // logo do Revocast (SVG ou PNG transparente)
    titulo: "A galera por trás do mic",
    subtitulo: "Somos o time que transforma ideia em episódio."
  },

  /* ---------- TÍTULO DA SEÇÃO DE MEMBROS ---------- */
  secao: {
    titulo: "Conheça o time",
    subtitulo: "Gente que cria, edita, grava e faz o Revocast acontecer."
  },

  /* ---------- MEMBROS ---------- */
  pasta: "assets/img/equipe/",   // pasta onde ficam as fotos dos membros

  membros: [
    { nome: "Membro 01", cargo: "Apresentação",    foto: "membro-01.svg", frase: "Sempre com a pauta na mão.",     instagram: "" },
    { nome: "Membro 02", cargo: "Roteiro",         foto: "membro-02.svg", frase: "Transformo caos em episódio.",   instagram: "" },
    { nome: "Membro 03", cargo: "Edição de vídeo", foto: "membro-03.svg", frase: "O corte certo muda tudo.",       instagram: "" },
    { nome: "Membro 04", cargo: "Câmera",          foto: "membro-04.svg", frase: "Luz, câmera e café.",            instagram: "" },
    { nome: "Membro 05", cargo: "Áudio",           foto: "membro-05.svg", frase: "Se tem ruído, eu acho.",         instagram: "" },
    { nome: "Membro 06", cargo: "Design",          foto: "membro-06.svg", frase: "Pixel perfeito, sempre.",        instagram: "" },
    { nome: "Membro 07", cargo: "Social media",    foto: "membro-07.svg", frase: "Viralizar é só questão de tempo.", instagram: "" },
    { nome: "Membro 08", cargo: "Produção",        foto: "membro-08.svg", frase: "Eu resolvo (quase) tudo.",       instagram: "" },
    { nome: "Membro 09", cargo: "Pauta",           foto: "membro-09.svg", frase: "Tenho 40 ideias, escolhe uma.",  instagram: "" },
    { nome: "Membro 10", cargo: "Direção",         foto: "membro-10.svg", frase: "Gravando em 3, 2, 1…",           instagram: "" }
  ]
};
