## 2025-05-14 - [Improved Login Validation]
**Vulnerability:** Weak password policy (>6 chars + special char) and restrictive email validation (only .com, .org, .net).
**Learning:** Initial validation was overly restrictive for email domains but too weak for password complexity. Using `type="email"` on inputs without `noValidate` on the form can block custom validation logic from triggering in test environments like Playwright/jsdom because the browser stops the submit event before React can handle it.
**Prevention:** Always use `noValidate` when implementing custom validation UI. Use robust regex for email and enforce industry-standard password complexity (min 8 chars, mixed case, numbers, special characters).

## 2025-05-14 - [Vite 7 and Vitest Type Compatibility]
**Vulnerability:** Build failure during deployment due to type mismatch.
**Learning:** Vite 7 `defineConfig` does not recognize the `test` property from Vitest 2.x by default, causing `tsc` errors during the build process.
**Prevention:** Use `// @ts-expect-error` above the `test` property in `vite.config.ts` to allow production builds to pass when using mixed major versions of Vite and Vitest.

## 2025-05-15 - [Secure Error Handling and Information Leakage]
**Vulnerability:** Technical error messages (e.g., "HTTP error: Status 400") and specific Auth error codes (e.g., "EMAIL_NOT_FOUND") were exposed to users.
**Learning:** Exposing raw backend error codes allows for User Enumeration (identifying which emails are registered) and reveals internal architecture details. Sanitizing these into generic messages (e.g., "Invalid email or password") is critical for security.
**Prevention:** Centralize error sanitization logic. Map technical or specific error codes to safe, user-friendly strings before rendering them in the UI.

## 2025-05-15 - [Defense in Depth with CSP]
**Vulnerability:** Absence of Content Security Policy (CSP) headers or meta tags left the app vulnerable to XSS and data exfiltration.
**Learning:** A client-side CSP meta tag provides an important layer of defense for SPAs by restricting where scripts, styles, and connections can originate or point to, even if server-side headers are missing.
**Prevention:** Include a CSP meta tag in the base `index.html` that follows the Principle of Least Privilege, only allowing trusted domains like Firebase and Google Fonts.
