const form = document.getElementById("login-form");
const stepEmail = document.getElementById("step-email");
const stepCode = document.getElementById("step-code");
const statusLabel = document.getElementById("status");
const submitButton = form.querySelector("button[type='submit']");

const API_BASE = "https://pingobras-sg.onrender.com/api/auth";
const EMAIL_COOLDOWN_SEG = 60;

let uiLocked = false;
let cooldownTimer = null;

/**
 * Inicializa o fluxo
 * @returns {void}
 */
function init() {
  form.addEventListener("submit", onSubmit, true);
  startCooldownWatcher();
}

/**
 * Submit central
 * @param {SubmitEvent} event
 * @returns {void}
 */
function onSubmit(event) {
  event.preventDefault();
  event.stopImmediatePropagation();

  if (uiLocked) return;

  isEmailStep() ? sendEmail() : verifyCode();
}

/**
 * Verifica etapa atual
 * @returns {boolean}
 */
function isEmailStep() {
  return !stepEmail.classList.contains("d-none");
}

/**
 * Envia código
 * @returns {Promise<void>}
 */
async function sendEmail() {
  const email = document.getElementById("email");

  if (!email.checkValidity()) {
    email.reportValidity();
    return;
  }

  if (isCooldownActive()) return;

  lockUI("Enviando código...");

  try {
    const res = await fetch(`${API_BASE}/request-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value.trim() }),
    });

    startCooldown(EMAIL_COOLDOWN_SEG);

    if (!res.ok) throw new Error();

    goToCodeStep();
    statusLabel.textContent = "Código enviado.";
  } catch {
    statusLabel.textContent = "Solicitação bloqueada.";
  } finally {
    unlockUI();
  }
}

/**
 * Verifica código
 * @returns {Promise<void>}
 */
async function verifyCode() {
  const code = document.getElementById("code");

  if (!code.checkValidity()) {
    code.reportValidity();
    return;
  }

  lockUI("Verificando código...");

  try {
    const res = await fetch(`${API_BASE}/verify-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: document.getElementById("email").value.trim(),
        code: code.value.trim(),
      }),
    });

    if (!res.ok) throw new Error();

    statusLabel.textContent = "Acesso liberado ✔";
  } catch {
    statusLabel.textContent = "Código inválido.";
  } finally {
    unlockUI();
  }
}

/**
 * Alterna para etapa de código
 * @returns {void}
 */
function goToCodeStep() {
  stepEmail.classList.add("d-none");
  stepCode.classList.remove("d-none");
}

/**
 * Bloqueia UI
 * @param {string} message
 * @returns {void}
 */
function lockUI(message) {
  uiLocked = true;
  submitButton.disabled = true;
  statusLabel.textContent = message;
}

/**
 * Desbloqueia UI
 * @returns {void}
 */
function unlockUI() {
  uiLocked = false;
  submitButton.disabled = false;
}

/**
 * Atualiza texto de cooldown automaticamente
 * @returns {void}
 */
function startCooldownWatcher() {
  cooldownTimer = setInterval(() => {
    if (!isEmailStep()) return;

    const remaining = getCooldownRemaining();

    if (remaining > 0) {
      submitButton.disabled = true;
      statusLabel.textContent = `Aguarde ${remaining}s para reenviar.`;
    } else {
      submitButton.disabled = false;
      statusLabel.textContent = "";
    }
  }, 500);
}

init();