import { createBadge } from "../components/base/badge.js";
import { createElement } from "../components/base/dom-utils.js";
import { apiRequest } from "./api-client.js";
const API_KEY = "CyberWatch2026";

/**
 * Exibe mensagem para o usuário
 *
 * @param {"success"|"danger"|"warning"|"info"} type
 * @param {string} message
 * @returns {void}
 */
const showMessage = (type, message) => {
  const box = document.getElementById("msgBox");
  if (!box) return;

  const allowedTypes = ["success", "danger", "warning", "info"];
  const alert = createElement("div", `alert alert-${allowedTypes.includes(type) ? type : "info"} alert-dismissible fade show`, null, { role: "alert" });
  const closeButton = createElement("button", "btn-close", null, { type: "button", "aria-label": "Fechar mensagem" });
  closeButton.addEventListener("click", () => alert.remove());
  alert.append(createElement("span", "", String(message)), closeButton);
  box.replaceChildren(alert);
};

/**
 * Renderiza tabela de certificados
 *
 * @param {Array} data
 * @returns {void}
 */
const renderTable = (data) => {
  const tbody = document.getElementById("certTableBody");

  if (!data || !data.length) {
    const cell = createElement("td", "text-center", "Nenhum certificado encontrado", { colspan: "5" });
    tbody.replaceChildren(createElement("tr", "", null, {}, [cell]));
    return;
  }

  const rows = data.map((cert) => {
    const values = [cert.id, cert.empresa, cert.sistema, cert.capacidade, cert.data];
    const cells = values.map((value, index) => {
      const text = value == null ? "—" : String(value);
      const content = index === 3 ? createBadge(text, "badge text-bg-info") : createElement("span", "", text);
      return createElement("td", "", null, {}, [content]);
    });
    return createElement("tr", "", null, {}, cells);
  });

  tbody.replaceChildren(...rows);
};

/**
 * Busca certificados da API com autenticação
 *
 * @returns {void}
 */
const loadCertificates = async () => {
  showMessage("info", "Carregando certificados...");

  try {
    const response = await apiRequest("crt/all", {
      method: "GET",
      headers: { authorization: API_KEY },
    });
    const payload = response.data;
    const message = payload && typeof payload === "object"
      ? payload.message || payload.error || "Erro ao carregar certificados"
      : String(payload || "Erro ao carregar certificados");

    if (!response.ok) {
      showMessage("danger", message);
      renderTable([]);
      return;
    }

    window.certCache = Array.isArray(payload) ? payload : [];
    renderTable(window.certCache);
    showMessage("success", "Certificados carregados com sucesso.");
  } catch {
    showMessage("danger", "Falha de conexão com o servidor.");
    renderTable([]);
  }
};

/**
 * Filtra certificados localmente
 *
 * @param {string} term
 * @returns {void}
 */
const filterCertificates = (term) => {

  if (!window.certCache) return;

  const filtered = window.certCache.filter((cert) =>
    [cert.id, cert.empresa, cert.sistema]
      .some((value) => String(value || "").toLowerCase().includes(term))
  );

  renderTable(filtered);
};

document.addEventListener("DOMContentLoaded", () => {

  loadCertificates();

  document
    .getElementById("searchInput")
    .addEventListener("input", (e) => {
      filterCertificates(e.target.value.toLowerCase());
    });
});
