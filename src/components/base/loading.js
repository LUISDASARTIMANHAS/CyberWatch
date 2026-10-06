import { createElement } from "./dom-utils.js";
import { createParagraph } from "./paragraph.js";

/**
 * Cria um estado de carregamento.
 * @param {string} message
 * @returns {HTMLElement}
 */
export function createLoading(message = "Carregando...") {
  const spinner = createElement("span", "spinner-border spinner-border-sm", null, {
    role: "status",
    "aria-hidden": "true",
  });

  return createElement("div", "text-center py-4", null, { role: "status", "aria-live": "polite" }, [
    spinner,
    createParagraph(message, "mt-2 mb-0"),
  ]);
}