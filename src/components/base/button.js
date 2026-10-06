import { createElement } from "./dom-utils.js";

/**
 * Cria um botão com tipo explícito para evitar submits acidentais.
 * @param {string} text
 * @param {string} className
 * @param {Record<string, string>} attributes
 * @returns {HTMLButtonElement}
 */
export function createButton(text = "", className = "", attributes = {}) {
  return createElement("button", className, text, { type: "button", ...attributes });
}