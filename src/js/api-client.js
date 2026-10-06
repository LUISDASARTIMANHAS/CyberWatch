const API_BASE_URL = "https://pingobras-sg.onrender.com/api/";

/**
 * Gera um identificador aleatório para uma única requisição.
 * @returns {string}
 */
function createRequestNonce() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();

  const randomBytes = new Uint8Array(16);
  globalThis.crypto.getRandomValues(randomBytes);
  return Array.from(randomBytes, (value) => value.toString(16).padStart(2, "0")).join("");
}

/**
 * Faz uma chamada à API compartilhada e normaliza respostas JSON ou texto.
 * O chamador continua responsável por interpretar os códigos HTTP do endpoint.
 * @param {string} endpoint Caminho relativo à raiz /api/.
 * @param {RequestInit} options Opções nativas de fetch.
 * @returns {Promise<{ok: boolean, status: number, data: unknown, text: string}>}
 */
export async function apiRequest(endpoint, options = {}) {
  if (typeof endpoint !== "string" || !endpoint || endpoint.includes("..") || /^[a-z][a-z\d+.-]*:/i.test(endpoint)) {
    throw new TypeError("O endpoint deve ser um caminho relativo válido.");
  }

  const url = new URL(endpoint.replace(/^\/+/, ""), API_BASE_URL);
  const { timeoutMs = 10000, signal: callerSignal, ...requestOptions } = options;
  const headers = new Headers(requestOptions.headers || {});
  if (!headers.has("Accept")) headers.set("Accept", "application/json, text/plain;q=0.9");
  headers.set("x-nonce", createRequestNonce());
  headers.set("x-timestamp", String(Date.now()));

  const controller = new AbortController();
  const requestTimeout = Number.isFinite(timeoutMs) && timeoutMs > 0 ? timeoutMs : 10000;
  const timeoutId = window.setTimeout(() => controller.abort(), requestTimeout);
  const abortFromCaller = () => controller.abort(callerSignal.reason);

  if (callerSignal?.aborted) {
    abortFromCaller();
  } else {
    callerSignal?.addEventListener("abort", abortFromCaller, { once: true });
  }

  try {
    const response = await fetch(url, {
      ...requestOptions,
      headers,
      signal: controller.signal,
      credentials: "omit",
      redirect: "error",
    });
    const text = await response.text();
    let data = text;

    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }
    }

    return { ok: response.ok, status: response.status, data, text };
  } finally {
    window.clearTimeout(timeoutId);
    callerSignal?.removeEventListener("abort", abortFromCaller);
  }
}