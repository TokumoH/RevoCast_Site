/* Renderiza a página a partir de assets/js/equipe-data.js — não precisa editar. */
(function () {
  "use strict";
  var D = window.REVOCAST_EQUIPE;
  if (!D) { console.error("equipe-data.js não foi carregado."); return; }

  var $ = function (id) { return document.getElementById(id); };
  var el = function (tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  };

  /* ---------- HERO ---------- */
  var hero = D.hero || {};
  $("hero-foto").src = hero.foto || "";
  $("hero-logo").src = hero.logo || "assets/img/logo.svg";
  $("hero-titulo").textContent = hero.titulo || "";
  $("hero-sub").textContent = hero.subtitulo || "";
  $("hero-foto").addEventListener("error", function () { this.style.display = "none"; });

  /* ---------- SEÇÃO ---------- */
  var secao = D.secao || {};
  $("secao-titulo").textContent = secao.titulo || "Equipe";
  $("secao-sub").textContent = secao.subtitulo || "";

  /* ---------- MEMBROS ---------- */
  var pasta = D.pasta || "assets/img/equipe/";
  var grid = $("grid");

  (D.membros || []).forEach(function (m) {
    var li = el("li", "card");
    var foto = el("div", "photo");

    // inicial como fallback (aparece se a foto não carregar)
    var ini = el("span", "initial", (m.nome || "?").trim().charAt(0).toUpperCase());
    foto.appendChild(ini);

    if (m.foto) {
      var img = new Image();
      img.alt = "Foto de " + (m.nome || "membro da equipe");
      img.loading = "lazy";
      img.decoding = "async";
      img.src = /^(https?:|\/|data:)/.test(m.foto) ? m.foto : pasta + m.foto;
      img.addEventListener("load", function () { ini.remove(); });
      img.addEventListener("error", function () { img.remove(); });
      foto.insertBefore(img, ini);
    }

    if (m.frase) foto.appendChild(el("p", "frase", "“" + m.frase + "”"));
    li.appendChild(foto);

    var info = el("div", "info");
    info.appendChild(el("h3", "", m.nome || ""));
    info.appendChild(el("p", "cargo", m.cargo || ""));

    var links = [];
    if (m.instagram) links.push(["IG", "https://instagram.com/" + String(m.instagram).replace(/^@/, ""), "Instagram de " + m.nome]);
    if (m.linkedin)  links.push(["in", m.linkedin, "LinkedIn de " + m.nome]);
    if (links.length) {
      var s = el("div", "social");
      links.forEach(function (l) {
        var a = el("a", "", l[0]);
        a.href = l[1]; a.target = "_blank"; a.rel = "noopener noreferrer"; a.setAttribute("aria-label", l[2]);
        s.appendChild(a);
      });
      info.appendChild(s);
    }
    li.appendChild(info);
    grid.appendChild(li);
  });

  /* ---------- TICKER (usa os cargos da equipe) ---------- */
  var cargos = [];
  (D.membros || []).forEach(function (m) { if (m.cargo && cargos.indexOf(m.cargo) < 0) cargos.push(m.cargo); });
  if (!cargos.length) cargos = ["Revocast"];
  var faixa = cargos.concat(cargos);                 // repete p/ preencher a tela
  var track = $("ticker");
  faixa.concat(faixa).forEach(function (c) { track.appendChild(el("span", "", c)); }); // 2 metades iguais = loop contínuo

  /* ---------- REVEAL AO ROLAR ---------- */
  var cards = grid.querySelectorAll(".card");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          var i = Array.prototype.indexOf.call(cards, e.target);
          e.target.style.transitionDelay = (i % 4) * 70 + "ms";
          e.target.classList.add("in");
          (function (t) { setTimeout(function () { t.style.transitionDelay = ""; }, 1000); })(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    cards.forEach(function (c) { io.observe(c); });
  } else {
    cards.forEach(function (c) { c.classList.add("in"); });
  }

  /* ---------- MENU MOBILE ---------- */
  var btn = document.querySelector(".menu-btn"), nav = $("nav");
  btn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { nav.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
  });

  $("ano").textContent = new Date().getFullYear();
})();
