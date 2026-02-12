## 2025-05-14 - [Improved Login Validation]
**Vulnerability:** Weak password policy (>6 chars + special char) and restrictive email validation (only .com, .org, .net).
**Learning:** Initial validation was overly restrictive for email domains but too weak for password complexity. Using `type="email"` on inputs without `noValidate` on the form can block custom validation logic from triggering in test environments like Playwright/jsdom because the browser stops the submit event before React can handle it.
**Prevention:** Always use `noValidate` when implementing custom validation UI. Use robust regex for email and enforce industry-standard password complexity (min 8 chars, mixed case, numbers, special characters).
