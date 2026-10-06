import { createElement } from "./dom-utils.js";

/**
 * Cria um título semântico.
 * @param {1|2|3|4|5|6} level
 * @param {string} text
 * @param {string} className
 * @param {Record<string, string>} attributes
 * @returns {HTMLHeadingElement}
 */
export function createHeading(level = 1, text = "", className = "", attributes = {}) {
  if (!Number.isInteger(level) || level < 1 || level > 6) {
    throw new RangeError("O nível do título deve estar entre 1 e 6.");
  }

  return createElement(`h${level}`, className, text, attributes);
}