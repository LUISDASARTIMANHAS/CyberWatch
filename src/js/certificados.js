const API_BASE = "https://pingobras-sg.onrender.com/api/crt";
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

  if (!box) {
    alert(message);
    return;
  }

  box.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;
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
    tbody.innerHTML =
      `<tr><td colspan="5" class="text-center">Nenhum certificado encontrado</td></tr>`;
    return;
  }

  tbody.innerHTML = data
    .map(
      (cert) => `
        <tr>
          <td>${cert.id}</td>
          <td>${cert.empresa}</td>
          <td>${cert.sistema}</td>
          <td>${cert.capacidade}</td>
          <td>${cert.data}</td>
        </tr>
      `
    )
    .join("");
};

/**
 * Busca certificados da API com autenticação
 *
 * @returns {void}
 */
const loadCertificates = () => {

  showMessage("info", "Carregando certificados...");

  fetch(`${API_BASE}/all`, {
    method: "GET",
    headers: {
      authorization: API_KEY
    }
  })
    .then((res) => {
      return res.text().then((text) => ({
        ok: res.ok,
        text
      }));
    })
    .then(({ ok, text }) => {

      let data;
      let message = "Erro ao carregar certificados";

      try {
        data = JSON.parse(text);
        message = data.message || data.error || message;
      } catch {
        message = text || message;
      }

      if (!ok) {
        showMessage("danger", message);
        document.getElementById("certTableBody").innerHTML =
          `<tr><td colspan="5" class="text-center text-danger">${message}</td></tr>`;
        return;
      }

      window.certCache = Array.isArray(data) ? data : [];

      renderTable(window.certCache);
      showMessage("success", "Certificados carregados com sucesso.");
    })
    .catch(() => {
      showMessage("danger", "Falha de conexão com o servidor.");
      document.getElementById("certTableBody").innerHTML =
        `<tr><td colspan="5" class="text-center text-danger">Erro de conexão</td></tr>`;
    });
};

/**
 * Filtra certificados localmente
 *
 * @param {string} term
 * @returns {void}
 */
const filterCertificates = (term) => {

  if (!window.certCache) return;

  const filtered = window.certCache.filter(cert =>
    cert.id.toLowerCase().includes(term) ||
    cert.empresa.toLowerCase().includes(term) ||
    cert.sistema.toLowerCase().includes(term)
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
