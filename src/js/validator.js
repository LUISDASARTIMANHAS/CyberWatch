// const API_BASE = "http://localhost:3000/api/crt";
const API_BASE = "https://pingobras-sg.onrender.com/api/crt";

const btnValidar = document.getElementById("btnValidar");
const inputID = document.getElementById("inID");

const resultadoBox = document.getElementById("resultado");
const notFoundBox = document.getElementById("naoEncontrado");

let uiLocked = false;

/**
 * Inicialização
 * @returns {void}
 */
function init() {
  btnValidar.addEventListener("click", validateCertificado);
}

/**
 * Valida certificado via API
 * @returns {Promise<void>}
 */
async function validateCertificado() {
  if (uiLocked) return;

  const id = inputID.value.trim();

  if (!id) {
    inputID.reportValidity();
    return;
  }

  lockUI();

  try {
    const res = await fetch(`${API_BASE}/valid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "CyberWatch2026"
      },
      body: JSON.stringify({ id })
    });

    if (res.status === 404) {
      showNotFound();
      return;
    }

    if (!res.ok) throw new Error();

    const data = await res.json();

    showResultado(data);

  } catch {
    showNotFound();
  } finally {
    unlockUI();
  }
}

/**
 * Exibe resultado validado
 * @param {Object} cert
 * @param {string} cert.empresa
 * @param {string} cert.sistema
 * @param {string} cert.capacidade
 * @param {string} cert.data
 * @param {string} cert.id
 * @returns {void}
 */
function showResultado(cert) {

  document.getElementById("outEmpresa").textContent = cert.empresa;
  document.getElementById("outSistema").textContent = cert.sistema;
  document.getElementById("outCapacidade").textContent = cert.capacidade;
  document.getElementById("outData").textContent = cert.data;
  document.getElementById("outID").textContent = cert.id;

  resultadoBox.classList.remove("d-none");
  notFoundBox.classList.add("d-none");
}

/**
 * Exibe erro de validação
 * @returns {void}
 */
function showNotFound() {
  resultadoBox.classList.add("d-none");
  notFoundBox.classList.remove("d-none");
}

/**
 * Bloqueia UI
 * @returns {void}
 */
function lockUI() {
  uiLocked = true;
  btnValidar.disabled = true;
  btnValidar.textContent = "Validando...";
}

/**
 * Desbloqueia UI
 * @returns {void}
 */
function unlockUI() {
  uiLocked = false;
  btnValidar.disabled = false;
  btnValidar.textContent = "Validar";
}

init();
