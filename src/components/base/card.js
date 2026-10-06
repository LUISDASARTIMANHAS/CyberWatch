import { createElement } from "./dom-utils.js";

/**
 * Cria um card Bootstrap.
 * @param {string} className
 * @param {Node[]} children
 * @returns {HTMLDivElement}
 */
export function createCard(className = "", children = []) {
  return createElement("div", `card ${className}`.trim(), null, {}, children);
}