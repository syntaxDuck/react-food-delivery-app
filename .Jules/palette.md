## 2026-02-09 - [Accessibility and Semantic HTML Improvements]
**Learning:** Found a pattern of invalid HTML nesting (link inside button) in the shared UI components and empty anchors for page navigation. These patterns hinder accessibility and trigger linting errors.
**Action:** Always verify that shared components like `Button` render semantic HTML based on their props. Move navigation IDs to parent containers instead of using empty `<a>` tags. Ensure icon-only buttons have `aria-label` and decorative icons have `aria-hidden="true"`.

## 2026-02-10 - [Consistent Password UX]
**Learning:** Implementing password visibility toggles and real-time mismatch feedback improves accessibility for users with cognitive disabilities or motor impairments who may struggle with re-typing.
**Action:** Use a standardized visibility toggle pattern for all sensitive fields. Ensure the toggle is keyboard-accessible (button role, aria-label) and placed within the input field's visual boundary using absolute positioning.
