export function isCookieSet(cookieName) {
	// Get all cookies as an array of key-value pairs
	const cookies = document.cookie.split(';');

	// Iterate over each cookie
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();

		// Check if the cookie starts with the provided cookie name
		if (cookie.startsWith(cookieName + '=')) {
			return true;
		}
	}

	return false; // Cookie not found
}

export function getCookie(cookieName) {
	// Get all cookies as an array of key-value pairs
	const cookies = document.cookie.split(';');

	// Iterate over each cookie
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();

		// Check if the cookie starts with the provided cookie name
		if (cookie.startsWith(cookieName + '=')) {
			return cookie.substring(`${cookieName}=`.length);
		}
	}

	return false; // Cookie not found
}