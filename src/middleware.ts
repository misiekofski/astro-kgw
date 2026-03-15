import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
	const response = await next();
	
	// Dodaj nagłówki CSP dla Google Forms i Google Sheets API
	const headers = new Headers(response.headers);
	
	// Content Security Policy - pozwól na ładowanie Google Forms iframe i Google Sheets API
	headers.set(
		'Content-Security-Policy',
		[
			"default-src 'self'",
			"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://docs.google.com https://*.google.com",
			"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
			"font-src 'self' https://fonts.gstatic.com",
			"img-src 'self' data: https: http:",
			"frame-src https://docs.google.com https://forms.gle",
			"connect-src 'self' https://sheets.googleapis.com https://docs.google.com",
			"frame-ancestors 'self'"
		].join('; ')
	);
	
	// Dodatkowe nagłówki bezpieczeństwa
	headers.set('X-Frame-Options', 'SAMEORIGIN');
	headers.set('X-Content-Type-Options', 'nosniff');
	headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers
	});
});
