import { createElement } from "./dom-utils.js";

/**
 * Cria um link com rótulo acessível.
 * @param {string} text
 * @param {string} href
 * @param {string} className
 * @param {Record<string, string>} attributes
 * @returns {HTMLAnchorElement}
 */
export function createLink(text, href, className = "", attributes = {}) {
  return createElement("a", className, text, { href, ...attributes });
}