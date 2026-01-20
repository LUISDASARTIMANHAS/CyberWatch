const form = document.getElementById("login-form");
const stepEmail = document.getElementById("step-email");
const stepCode = document.getElementById("step-code");
const statusLabel = document.getElementById("status");
const submitButton = form.querySelector("button[type='submit']");

const API_BASE = "https://pingobras-sg.onrender.com/api/auth";
const EMAIL_COOLDOWN_SEG = 60;
const COOLDOWN_KEY = "magiclink_cooldown_until";

let uiLocked = false;
let cooldownTimer = null;

/**
 * Inicialização
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
 * Envia email com código
 * @returns {Promise<void>}
 */
async function sendEmail() {
  const emailInput = document.getElementById("email");

  if (!emailInput.checkValidity()) {
    emailInput.reportValidity();
    return;
  }

  if (isCooldownActive()) return;

  lockUI("Enviando código...");

  try {
    const res = await fetch(`${API_BASE}/request-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": "CyberWatch2026",
      },
      body: JSON.stringify({ email: emailInput.value.trim() }),
    });

    startCooldown(EMAIL_COOLDOWN_SEG);

    if (!res.ok) throw new Error();

    goToCodeStep();
    statusLabel.textContent = "Código enviado. Verifique seu email.";
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
  const codeInput = document.getElementById("code");
  const emailValue = document.getElementById("email").value.trim();

  if (!codeInput.checkValidity()) {
    codeInput.reportValidity();
    return;
  }

  lockUI("Verificando código...");

  try {
    const res = await fetch(`${API_BASE}/verify-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "CyberWatch2026",
      },
      body: JSON.stringify({
        email: emailValue,
        code: codeInput.value.trim(),
      }),
    });

    if (!res.ok) throw new Error();

    /**
     * Token provisório (frontend-first)
     * Backend futuramente retorna JWT real
     */
    const fakeToken = btoa(`${emailValue}:${Date.now()}`);

    login(fakeToken, 30);

    statusLabel.textContent = "Acesso liberado ✔";
    redirectAfterLogin();
  } catch {
    statusLabel.textContent = "Código inválido ou expirado.";
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
 * Redireciona após login
 * @returns {void}
 */
function redirectAfterLogin() {
  window.location.replace("/");
}

/**
 * Inicia cooldown
 * @param {number} seconds
 * @returns {void}
 */
function startCooldown(seconds) {
  const until = Date.now() + seconds * 1000;
  localStorage.setItem(COOLDOWN_KEY, until);
}

/**
 * Cooldown ativo?
 * @returns {boolean}
 */
function isCooldownActive() {
  return Date.now() < getCooldownUntil();
}

/**
 * Retorna segundos restantes
 * @returns {number}
 */
function getCooldownRemaining() {
  const remaining = Math.ceil((getCooldownUntil() - Date.now()) / 1000);
  return Math.max(0, remaining);
}

/**
 * Retorna timestamp do cooldown
 * @returns {number}
 */
function getCooldownUntil() {
  return Number(localStorage.getItem(COOLDOWN_KEY) || 0);
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
    } else if (!uiLocked) {
      submitButton.disabled = false;
      statusLabel.textContent = "";
    }
  }, 500);
}

init();
