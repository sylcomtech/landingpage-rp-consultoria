/* =========================================================
   RP Consultoria | HS Consórcios — Landing Page
   Script principal
========================================================= */
(function () {
  "use strict";

  /* ---------------------------------------------------------
     Config
  --------------------------------------------------------- */
  // TODO: substituir pelo número real de WhatsApp (com DDI + DDD, apenas dígitos).
  var WHATSAPP_NUMBER = "5500000000000";

  /* ---------------------------------------------------------
     Utilidades
  --------------------------------------------------------- */
  function qs(sel, ctx) {
    return (ctx || document).querySelector(sel);
  }

  function qsa(sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  }

  function buildWhatsAppLink(data) {
    var lines = [
      "Olá! Vim pelo site da RP Consultoria | HS Consórcios e gostaria de simular:",
      data.produto ? "Produto: " + data.produto : null,
      data.valor ? "Valor de interesse: " + data.valor : null,
      data.nome ? "Nome: " + data.nome : null,
      data.email ? "E-mail: " + data.email : null,
      data.telefone ? "Telefone: " + data.telefone : null,
      data.mensagem ? "Mensagem: " + data.mensagem : null,
    ].filter(Boolean);

    var text = encodeURIComponent(lines.join("\n"));
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + text;
  }

  function showToast(message) {
    var toast = qs(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 3200);
  }

  /* ---------------------------------------------------------
     Menu mobile
  --------------------------------------------------------- */
  var navToggle = qs("#navToggle");
  var nav = qs("#nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    qsa(".nav__link", nav).forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------------------------------------------------
     Modal de simulação
  --------------------------------------------------------- */
  var modal = qs("#modal");
  var modalForm = qs("#modalForm");
  var modalProdutoSelect = qs("#m-produto");
  var modalTitle = qs("#modalTitle");
  var lastFocusedEl = null;

  function openModal(product) {
    if (!modal) return;
    lastFocusedEl = document.activeElement;

    if (modalProdutoSelect) {
      if (product && ["Imóvel", "Veículo", "Investimento"].indexOf(product) !== -1) {
        modalProdutoSelect.value = product;
      } else {
        modalProdutoSelect.value = "";
      }
    }

    if (modalTitle) {
      modalTitle.textContent = product && product.trim() !== ""
        ? "Simular: " + product
        : "Qual será a sua próxima conquista?";
    }

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    var firstField = qs("#m-produto") || qs("input, select", modal);
    if (firstField) firstField.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  qsa(".js-open-modal").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openModal(btn.getAttribute("data-product") || "");
    });
  });

  qsa(".js-close-modal").forEach(function (el) {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  /* ---------------------------------------------------------
     Envio dos formulários (redireciona para WhatsApp)
  --------------------------------------------------------- */
  function handleSimFormSubmit(form, opts) {
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var formData = new FormData(form);
      var data = {
        produto: formData.get("produto") || "",
        valor: formData.get("valor") || "",
        nome: formData.get("nome") || "",
        email: formData.get("email") || "",
        telefone: formData.get("telefone") || "",
        mensagem: formData.get("mensagem") || "",
      };

      var link = buildWhatsAppLink(data);
      window.open(link, "_blank", "noopener");

      showToast("Tudo certo! Vamos te chamar no WhatsApp.");
      form.reset();

      if (opts && opts.closeModalAfter) {
        window.setTimeout(closeModal, 400);
      }
    });
  }

  handleSimFormSubmit(qs("#simForm"));
  handleSimFormSubmit(qs("#modalForm"), { closeModalAfter: true });
  handleSimFormSubmit(qs("#contactForm"));

  /* ---------------------------------------------------------
     Ano dinâmico no rodapé
  --------------------------------------------------------- */
  var yearEl = qs("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------------------------------------------------------
     Header: sombra ao rolar a página
  --------------------------------------------------------- */
  var header = qs("#header");
  if (header) {
    window.addEventListener(
      "scroll",
      function () {
        header.style.boxShadow = window.scrollY > 8 ? "0 4px 18px rgba(0,0,0,0.35)" : "none";
      },
      { passive: true }
    );
  }

  /* ---------------------------------------------------------
     Reveal on scroll
  --------------------------------------------------------- */
  var revealTargets = qsa(
    ".reason-card, .step-card, .solution-card, .stat-card, .differential, .compliance-badge, .table-wrap, .photo-frame"
  );
  revealTargets.forEach(function (el) {
    el.setAttribute("data-reveal", "");
  });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
