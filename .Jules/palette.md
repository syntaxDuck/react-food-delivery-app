## 2026-02-09 - [Accessibility and Semantic HTML Improvements]
**Learning:** Found a pattern of invalid HTML nesting (link inside button) in the shared UI components and empty anchors for page navigation. These patterns hinder accessibility and trigger linting errors.
**Action:** Always verify that shared components like `Button` render semantic HTML based on their props. Move navigation IDs to parent containers instead of using empty `<a>` tags. Ensure icon-only buttons have `aria-label` and decorative icons have `aria-hidden="true"`.
