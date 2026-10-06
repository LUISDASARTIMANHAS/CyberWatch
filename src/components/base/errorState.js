import { createElement } from "./dom-utils.js";
import { createHeading } from "./heading.js";
import { createParagraph } from "./paragraph.js";

/**
 * Cria um estado de erro sem inserir conteúdo externo como HTML.
 * @param {string} message
 * @param {string} title
 * @returns {HTMLElement}
 */
export function createErrorState(message, title = "Não foi possível concluir") {
  return createElement("div", "alert alert-danger", null, { role: "alert" }, [
    createHeading(3, title, "h5 alert-heading"),
    createParagraph(message || "Ocorreu um erro inesperado.", "mb-0"),
  ]);
}