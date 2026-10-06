# AGENTS.md

## Project overview

This repository is a static cybersecurity dashboard and landing page app for LDA CyberWatch. It is primarily built with HTML, CSS, and vanilla JavaScript, with Bootstrap used for layout and styling. The app is designed as a frontend prototype for a monitoring and security platform, not as a full backend service.

Relevant workspace entry points:

- [README.md](README.md)
- [index.html](index.html)
- [dashboard.html](dashboard.html)
- [login.html](login.html)
- [sistemas.html](sistemas.html)
- [src/js/auth.js](src/js/auth.js)
- [src/js/guard.js](src/js/guard.js)
- [src/js/dashboard.js](src/js/dashboard.js)

## Environment and workflow

- This project does not use a Node package manager or bundler. There is no build step, test runner, or CI config in the repo.
- The expected workflow is to edit static files directly and preview them in a browser.
- For local preview, use a simple static server from the repo root, for example:
  - `python -m http.server 8000`
- Prefer relative paths from the project root when linking scripts, styles, and pages.

## Coding conventions

- Keep the codebase in the web-standard style described in [README.md](README.md): semantic HTML, modern accessibility, and security-minded frontend practices.
- Prefer Bootstrap 5 patterns and classes when building pages or UI blocks.
- Keep JavaScript modular and readable; add JSDoc comments for functions when practical.
- Keep business logic separate from DOM structure when possible, ideally in the `src/js` folder.
- Follow clean code patterns: clear names, small functions, early returns, and predictable behavior.
- Avoid unnecessary frameworks or dependency-heavy solutions unless explicitly requested.

## Security and product expectations

This repo is a security-focused product, so front-end changes should be designed with an attacker mindset:

- Treat all client-side auth as non-trusted; validate assumptions on the server in production.
- Avoid storing sensitive secrets in frontend code or in localStorage unless intentionally part of a prototype.
- Be careful with route protection and access checks; verify that the redirect and auth flows remain consistent.
- Do not introduce unsafe patterns such as inline script execution or overly permissive form handling.
- Keep privacy, cookies, and terms-related compliance in mind for any page that presents user data or tracking.

## Auth and page guard patterns

The project already uses a simple localStorage-based auth flow:

- `src/js/auth.js` manages token and expiration values.
- `src/js/guard.js` redirects unauthenticated users to the forbidden page.

When modifying auth or access controls:

- Preserve the existing lifecycle of `isUserLogged()`, `login()`, and `logout()`.
- Keep expiration logic predictable and consistent.
- Avoid breaking redirection behavior for protected pages.

## UI and design direction

The project has a cyberpunk / futuristic dashboard aesthetic. Preserve the visual language when editing UI:

- dark theme
- neon accents and glassmorphism-inspired panels
- high contrast for readability
- clear section structure and strong hierarchy
- responsive layouts for desktop and mobile

Do not drift into generic corporate templates unless the task clearly asks for a different visual style.

## Good default behavior for coding agents

- Make the smallest correct change that aligns with the existing codebase.
- Reuse established naming and structure instead of inventing new patterns.
- When adding or editing pages, keep the HTML accessible and the styles centralized.
- For new features, prefer lightweight static implementations over complex frameworks.
- Before proposing major architectural changes, check whether the repository is intentionally a prototype/static product.

## When asked to extend the project

Focus on frontend improvements that fit the project scope:

- dashboard enhancements
- monitoring modules and metrics UI
- cyber security reporting views
- access control improvements
- content polish for the landing page
- future-ready architecture notes without introducing unnecessary backend complexity

If a task needs a backend, API, or database, clearly call out that the current repo is frontend-only and that a separate service would be required.

## Related documentation

- [README.md](README.md)
- [LICENSE](LICENSE)
