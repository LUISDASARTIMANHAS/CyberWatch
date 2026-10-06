import { createElement } from "./dom-utils.js";

/**
 * Cria um indicador textual.
 * @param {string} text
 * @param {string} className
 * @param {Record<string, string>} attributes
 * @returns {HTMLSpanElement}
 */
export function createBadge(text, className = "", attributes = {}) {
  return createElement("span", className, text, attributes);
}