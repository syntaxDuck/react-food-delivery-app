## 2026-02-09 - [Accessibility and Semantic HTML Improvements]
**Learning:** Found a pattern of invalid HTML nesting (link inside button) in the shared UI components and empty anchors for page navigation. These patterns hinder accessibility and trigger linting errors.
**Action:** Always verify that shared components like `Button` render semantic HTML based on their props. Move navigation IDs to parent containers instead of using empty `<a>` tags. Ensure icon-only buttons have `aria-label` and decorative icons have `aria-hidden="true"`.

## 2026-02-10 - [Consistent Password UX]
**Learning:** Implementing password visibility toggles and real-time mismatch feedback improves accessibility for users with cognitive disabilities or motor impairments who may struggle with re-typing.
**Action:** Use a standardized visibility toggle pattern for all sensitive fields. Ensure the toggle is keyboard-accessible (button role, aria-label) and placed within the input field's visual boundary using absolute positioning.

## 2026-02-12 - [Guiding Users through Terminal States]
**Learning:** Empty states and success screens are critical "micro-moments" that need clear navigation guidance. A "dead-end" UI (like an empty cart with no button) leads to user drop-off.
**Action:** Always provide actionable Call-To-Action (CTA) buttons in empty or terminal success states (e.g., "Start Shopping" in an empty cart, "Great, thanks!" to dismiss a success message). Use `line-clamp-2` instead of `truncate` for descriptions to balance context and space.

## 2026-02-14 - [Enhanced Form Accessibility Pattern]
**Learning:** Standardized form accessibility improves the experience for both visual and screen-reader users. Using `aria-describedby` to link error messages ensures screen readers announce errors immediately upon focusing an invalid field.
**Action:** Always link field-level error messages to inputs using `aria-describedby`. Add visual required indicators (\*) using `aria-hidden="true"` to avoid screen reader clutter, as the `required` attribute already handles the semantic announcement. Ensure interactive icons have `focus-visible` rings for keyboard navigation.
