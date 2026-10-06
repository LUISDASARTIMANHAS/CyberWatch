const API_BASE_URL = "https://pingobras-sg.onrender.com/api/";

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
  const headers = new Headers(options.headers || {});
  if (!headers.has("Accept")) headers.set("Accept", "application/json, text/plain;q=0.9");

  const response = await fetch(url, {
    ...options,
    headers,
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
}