/**
 * Cria um elemento e configura seu conteúdo sem interpretar texto como HTML.
 * @param {string} tag
 * @param {string} className
 * @param {string|null} textContent
 * @param {Record<string, string>} attributes
 * @param {Node[]} children
 * @returns {HTMLElement}
 */
export function createElement(tag, className = "", textContent = null, attributes = {}, children = []) {
  const element = document.createElement(tag);

  if (className) element.className = className;
  if (textContent !== null) element.textContent = textContent;

  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });

  children.forEach((child) => element.appendChild(child));
  return element;
}