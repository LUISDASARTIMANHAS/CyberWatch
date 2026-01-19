const STORAGE_KEY = "magiclink_lock_until";

/**
 * Retorna segundos restantes do cooldown
 * @returns {number}
 */
function getCooldownRemaining() {
	const until = Number(localStorage.getItem(STORAGE_KEY) || 0);
	return Math.max(0, Math.ceil((until - Date.now()) / 1000));
}

/**
 * Inicia cooldown
 * @param {number} seconds
 * @returns {void}
 */
function startCooldown(seconds) {
	localStorage.setItem(
		STORAGE_KEY,
		Date.now() + seconds * 1000
	);
}

/**
 * Verifica se está em cooldown
 * @returns {boolean}
 */
function isCooldownActive() {
	return getCooldownRemaining() > 0;
}
