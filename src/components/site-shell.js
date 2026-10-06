import { createButton } from "./base/button.js";
import { createElement } from "./base/dom-utils.js";
import { createLink } from "./base/link.js";
import { createParagraph } from "./base/paragraph.js";

const projectRoot = new URL("../../", import.meta.url);
const navigationItems = [
  ["Dashboard", "dashboard/"],
  ["Sistemas", "sistemas/"],
  ["Certificados", "certifild/certificados/"],
];

/**
 * Resolve páginas a partir da raiz publicada, inclusive em subdiretórios.
 * @param {string} path
 * @returns {string}
 */
function projectUrl(path) {
  return new URL(path, projectRoot).href;
}

function createHeader() {
  const nav = createElement("nav", "navbar navbar-expand-lg navbar-dark navbar-glass px-3 no-print", null, {
    "aria-label": "Navegação principal",
  });
  const container = createElement("div", "container-fluid");
  const brand = createLink("LDA CyberWatch", projectUrl("index.html"), "navbar-brand neon-text fw-bold");
  const toggle = createButton("", "navbar-toggler", {
    "aria-controls": "cw-navigation",
    "aria-expanded": "false",
    "aria-label": "Abrir navegação",
  });
  toggle.appendChild(createElement("span", "navbar-toggler-icon", null, { "aria-hidden": "true" }));

  const menu = createElement("div", "collapse navbar-collapse", null, { id: "cw-navigation" });
  const list = createElement("ul", "navbar-nav ms-auto align-items-lg-center");
  const currentUrl = new URL(window.location.href);

  navigationItems.forEach(([label, path]) => {
    const link = createLink(label, projectUrl(path), "nav-link neon-link");
    const listItem = createElement("li", "nav-item", null, {}, [link]);

    if (new URL(link.href).pathname === currentUrl.pathname) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }

    list.appendChild(listItem);
  });

  const loginLink = createLink("Entrar", projectUrl("login/"), "btn btn-neon ms-lg-3");
  list.appendChild(createElement("li", "nav-item", null, {}, [loginLink]));
  menu.appendChild(list);
  container.append(brand, toggle, menu);
  nav.appendChild(container);

  toggle.addEventListener("click", () => {
    const isExpanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isExpanded));
    toggle.setAttribute("aria-label", isExpanded ? "Abrir navegação" : "Fechar navegação");
    menu.classList.toggle("show", !isExpanded);
  });

  return nav;
}

function createFooter() {
  const footer = createElement("footer", "site-footer px-3 py-4 no-print");
  const container = createElement("div", "container d-flex flex-column flex-md-row justify-content-between gap-2");
  const summary = createParagraph(
    `LDA CyberWatch · ${new Date().getFullYear()} · Monitoramento responsável de infraestrutura.`,
    "small mb-0",
  );
  const links = createElement("nav", "d-flex flex-wrap gap-3", null, { "aria-label": "Links institucionais" });

  [
    ["Privacidade", "privacidade"],
    ["Cookies", "cookies"],
    ["Termos", "termos"],
  ].forEach(([label, section]) => {
    links.appendChild(createLink(label, projectUrl(`index.html#${section}`)));
  });

  container.append(summary, links);
  footer.appendChild(container);
  return footer;
}

document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  if (main && !main.id) main.id = "main-content";

  const skipLink = createLink("Pular para o conteúdo", "#main-content", "visually-hidden-focusable skip-link");
  document.body.prepend(skipLink, createHeader());
  document.body.appendChild(createFooter());
});