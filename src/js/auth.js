const AUTH_KEY = "auth_token";
const AUTH_EXPIRES_KEY = "auth_expires";

/**
 * Verifica se o usuário está autenticado e dentro do prazo
 * @returns {boolean}
 */
function isUserLogged() {
	const token = localStorage.getItem(AUTH_KEY);
	const expires = Number(localStorage.getItem(AUTH_EXPIRES_KEY));

	if (!token || !expires) return false;

	if (Date.now() > expires) {
		logout();
		return false;
	}

	return true;
}

/**
 * Registra autenticação
 * @param {string} token
 * @param {number} days
 * @returns {void}
 */
function login(token, days = 30) {
	const expiresAt = Date.now() + days * 24 * 60 * 60 * 1000;

	localStorage.setItem(AUTH_KEY, token);
	localStorage.setItem(AUTH_EXPIRES_KEY, expiresAt);
}

/**
 * Remove autenticação
 * @returns {void}
 */
function logout() {
	localStorage.removeItem(AUTH_KEY);
	localStorage.removeItem(AUTH_EXPIRES_KEY);
}
