import { createElement } from "./dom-utils.js";
import { createHeading } from "./heading.js";
import { createParagraph } from "./paragraph.js";

/**
 * Cria um estado vazio acessível.
 * @param {string} title
 * @param {string} message
 * @param {string} className
 * @returns {HTMLElement}
 */
export function createEmptyState(title, message, className = "") {
  return createElement("div", className, null, { role: "status" }, [
    createHeading(3, title, "h5 mb-2"),
    createParagraph(message, "mb-0"),
  ]);
}