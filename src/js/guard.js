/**
 * Protege a página atual
 * @returns {void}
 */
function protectPage() {
  if (!isUserLogged()) {
    redirectForbidden();
  }
}

/**
 * Redireciona para página forbidden
 * @returns {void}
 */
function redirectForbidden() {
  const projectRoot = new URL("../../", document.currentScript.src);
  window.location.replace(new URL("sys/forbidden/", projectRoot).href);
}

/**
 * Inicialização do guard
 * @returns {void}
 */
function initGuard() {
  protectPage();
}

initGuard();
