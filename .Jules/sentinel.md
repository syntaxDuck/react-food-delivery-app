## 2025-05-14 - [Improved Login Validation]
**Vulnerability:** Weak password policy (>6 chars + special char) and restrictive email validation (only .com, .org, .net).
**Learning:** Initial validation was overly restrictive for email domains but too weak for password complexity. Using `type="email"` on inputs without `noValidate` on the form can block custom validation logic from triggering in test environments like Playwright/jsdom because the browser stops the submit event before React can handle it.
**Prevention:** Always use `noValidate` when implementing custom validation UI. Use robust regex for email and enforce industry-standard password complexity (min 8 chars, mixed case, numbers, special characters).

## 2025-05-14 - [Vite 7 and Vitest Type Compatibility]
**Vulnerability:** Build failure during deployment due to type mismatch.
**Learning:** Vite 7 `defineConfig` does not recognize the `test` property from Vitest 2.x by default, causing `tsc` errors during the build process.
**Prevention:** Use `// @ts-expect-error` above the `test` property in `vite.config.ts` to allow production builds to pass when using mixed major versions of Vite and Vitest.

## 2025-05-15 - [Securing Firestore Rules]
**Vulnerability:** Wide-open Firestore rules (`allow read, write: if true;`) allowed unauthorized access and tampering with all database collections.
**Learning:** Default Firestore rules are often set to "allow all" during early development, which is a critical security risk if left unchanged. It's essential to implement the Principle of Least Privilege by restricting access to specific collections based on user authentication and document ownership.
**Prevention:** Always replace "allow all" rules with collection-specific rules. Use `request.auth` to verify user identity and `resource.data` to check document ownership. Prohibit update/delete operations on sensitive collections like `Orders` once submitted.

## 2025-05-16 - [Sanitized Authentication Errors]
**Vulnerability:** Account enumeration via specific Firebase Auth error messages (e.g., "auth/user-not-found").
**Learning:** Returning detailed error messages to the frontend allows attackers to distinguish between a non-existent account and an incorrect password, facilitating brute-force or social engineering attacks.
**Prevention:** Always map technical authentication errors to generic messages like "Invalid email or password" on the client side. Log technical details only on the server or in the console for debugging, never expose them to the user.
