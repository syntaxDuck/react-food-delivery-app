## 2026-02-09 - [Accessibility and Semantic HTML Improvements]
**Learning:** Found a pattern of invalid HTML nesting (link inside button) in the shared UI components and empty anchors for page navigation. These patterns hinder accessibility and trigger linting errors.
**Action:** Always verify that shared components like `Button` render semantic HTML based on their props. Move navigation IDs to parent containers instead of using empty `<a>` tags. Ensure icon-only buttons have `aria-label` and decorative icons have `aria-hidden="true"`.

## 2026-02-10 - [Consistent Password UX]
**Learning:** Implementing password visibility toggles and real-time mismatch feedback improves accessibility for users with cognitive disabilities or motor impairments who may struggle with re-typing.
**Action:** Use a standardized visibility toggle pattern for all sensitive fields. Ensure the toggle is keyboard-accessible (button role, aria-label) and placed within the input field's visual boundary using absolute positioning.

## 2026-02-12 - [Guiding Users through Terminal States]
**Learning:** Empty states and success screens are critical "micro-moments" that need clear navigation guidance. A "dead-end" UI (like an empty cart with no button) leads to user drop-off.
**Action:** Always provide actionable Call-To-Action (CTA) buttons in empty or terminal success states (e.g., "Start Shopping" in an empty cart, "Great, thanks!" to dismiss a success message). Use `line-clamp-2` instead of `truncate` for descriptions to balance context and space.

## 2026-02-14 - [Form Accessibility and Cart Interaction]
**Learning:** Found a common pattern where form validation errors were visually present but not programmatically linked to inputs. Also discovered that interactive cart buttons were incorrectly tied to global UI visibility toggles instead of state mutations.
**Action:** Standardize form accessibility by adding required indicators (*) to labels and linking validation error messages to inputs using `aria-describedby` with `aria-live="polite"`. Ensure item removal actions in the cart are decoupled from UI visibility logic to prevent accidental cart closure.

## 2026-02-15 - [Accessible Navigation and Pagination Patterns]
**Learning:** Generic list-based components like pagination often default to non-semantic `div` structures, which are invisible to screen readers as navigation landmarks.
**Action:** Always wrap pagination components in a semantic `<nav>` with a descriptive `aria-label`. Use `<ul>` and `<li>` for page items, and explicitly set `aria-current="page"` on the active element to provide clear spatial context to assistive technologies.
