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
  window.location.replace("/sys/forbidden.html");
}

/**
 * Inicialização do guard
 * @returns {void}
 */
function initGuard() {
  protectPage();
}

initGuard();
