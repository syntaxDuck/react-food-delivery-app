# AGENTS.md --- Agent Execution Guide

This document defines the operational rules, architecture constraints,
and coding standards for AI agents working in this repository.

Agents must prioritize correctness, minimal changes, and adherence to
the existing architecture.

------------------------------------------------------------------------

# 🔴 Agent Operating Rules (READ FIRST)

When modifying this repository:

1.  Prefer modifying existing files over creating new ones.
2.  Do NOT introduce new architectural patterns unless explicitly
    requested.
3.  Follow the established layered architecture strictly.
4.  Match existing naming conventions exactly.
5.  Do not add dependencies without justification.
6.  Write production-quality code --- avoid placeholders, stubs, or TODO
    comments.
7.  Keep functions small and single-purpose.
8.  Never duplicate logic that already exists.
9.  Search the repository for similar implementations before writing
    code.
10. Favor clarity over cleverness.
11. Ask clarifying questions if requirements are ambiguous.
12. Do not perform large refactors unless explicitly instructed.

Failure to follow these rules results in lower-quality contributions.

------------------------------------------------------------------------

# 🔴 Before Writing Code (MANDATORY)

Agents MUST:

✅ Search the repository for existing patterns\
✅ Identify which architectural layer is affected\
✅ Confirm whether tests must be updated\
✅ Reuse utilities whenever possible\
✅ Avoid parallel abstractions

Do NOT immediately generate code.

Reason first.

------------------------------------------------------------------------

# 🔴 Code Modification Style

When updating code:

-   Prefer **minimal diffs**
-   Preserve formatting
-   Do not reorder imports unnecessarily
-   Do not refactor unrelated code
-   Only change what is required
-   Keep files under 500 lines when possible. If logic can be cleanly split
    into separate files while maintaining relevance, prefer smaller files
    for better maintainability. However, do not artificially split logic
    that belongs together.

Large rewrites are discouraged unless explicitly requested.

------------------------------------------------------------------------

# 🔴 Prohibited Practices

Agents must NOT:

-   Rewrite large files without need\
-   Rename public functions silently\
-   Change API contracts without instruction\
-   Introduce global state\
-   Convert async code to sync\
-   Add unnecessary abstractions\
-   Create duplicate services or repositories

When unsure --- choose the simpler solution.

------------------------------------------------------------------------

# 🔴 Dependency Policy

Do NOT add dependencies unless:

✅ The feature cannot be implemented with the current stack\
✅ The dependency is widely adopted and production-safe\
✅ Justification is provided

Prefer the standard library and existing tools.

------------------------------------------------------------------------

# 🔴 Testing Requirements (MANDATORY)

Backend logic changes MUST include:

-   Unit tests for success cases\
-   Unit tests for failure cases

Agents should not consider a task complete without tests.

------------------------------------------------------------------------

# 🔴 Definition of Good Code

Good code in this repository is:

-   Typed\
-   Tested\
-   Async-safe\
-   Architecturally correct\
-   Readable within 30 seconds

Optimize for maintainability.

------------------------------------------------------------------------

# Project Overview

FastAPI MongoDB Movies is a clean architecture application with:

-   **Frontend:** React + TypeScript + Tailwind
-   **Database:** Firebase

------------------------------------------------------------------------

# Development Commands

## Environment Setup

``` bash
uv sync
uv sync --group test
```

## Run Application


``` bash
```
Frontend:

``` bash
npm start
```

------------------------------------------------------------------------

# Code Style Guidelines

## Types

Always use types.

------------------------------------------------------------------------

## Naming Conventions

  Element     Convention
  ----------- ------------------
  Classes     PascalCase
  Functions   camelCase
  Variables   camelCase
  Constants   UPPER_SNAKE_CASE

Match existing naming patterns.

------------------------------------------------------------------------

## Import Order

1.  Standard library\
2.  Third-party\
3.  Local (relative within app)

Do not reorder unless necessary.

------------------------------------------------------------------------

# Frontend Agent Rules

Agents must:

✅ Prefer functional components\
✅ Use TypeScript interfaces\
✅ Follow CSS Modules\
✅ Reuse hooks when possible\
✅ Handle loading + error states\
✅ Follow accessibility best practices\
✅ Create granular, reusable components\
✅ Separate concerns between styling and animations\
✅ Use barrel exports for clean imports

Do NOT introduce state libraries unless explicitly requested.

------------------------------------------------------------------------

## Framer Motion

Use **Framer Motion** for all animations and interactions.

### Animation Responsibilities
- **Framer Motion**: Hover effects, tap animations, transitions, transforms
- **CSS**: Base styling, layout, disabled states, visual effects

### Performance Guidelines
- Prefer transform-based animations (`x`, `y`, `scale`, `opacity`)
- Avoid animating layout-heavy properties (width, height, left, top)
- Use `transition` prop for smooth animations
- Implement staggered animations for lists

### Animation Patterns
- Use animation variants for reusable animation logic
- Implement proper `whileHover`, `whileTap`, and `transition` props
- Create shared animation utilities in `/src/utils/animationVariants.ts`
- Follow existing animation patterns in components

------------------------------------------------------------------------

# File Creation Rules

Before creating a new file:

1.  Confirm similar functionality does not exist\
2.  Follow current folder structure\
3.  Use consistent naming\
4.  Create separate files for granular components\
5.  Co-locate CSS modules in `/src/styles/components/`\
6.  Add barrel exports for component groups

## Component File Structure
```
Component.tsx          # Component implementation
index.ts              # Barrel export (for component groups)
```

New files should be rare, but granular component separation is encouraged.

# Frontend Component Organization

## Component Structure

### UI Components (`/src/components/ui/`)
- **Flat structure**: Single components as individual files (Button.tsx, Image.tsx)
- **Grouped structure**: Subdirectories only when multiple variants needed (buttons/, inputs/)
- **Barrel exports**: Use `index.ts` files for clean import paths

### Domain Components (`/src/components/menu/`)
- **Feature-based organization**: Group by domain responsibility
- **Granular components**: Create focused, single-purpose components
- **Composition patterns**: Use UI components as building blocks

## Component Design Principles

### Granularity
- **Single responsibility**: Each component has one clear purpose
- **Composable**: Components can be combined to create complex UI
- **Reusable**: Design for use across multiple contexts

### Props Interface
- **TypeScript interfaces**: Strong typing for all component props
- **Default values**: Provide sensible defaults for optional props
- **Consistent naming**: Follow established prop naming conventions

# Frontend Import/Export Patterns

## Component Imports
```typescript
// Individual component imports
import { Button, Image, Badge } from "../ui";

```

## Barrel Exports
```typescript
// Component group index.ts
export { default as Button } from './Button';
export { default as Image } from './Image';
export type { ButtonProps, ImageProps } from './Button';
```

# Logging

Use the project logger.

Avoid prints.

Keep logs structured and professional.

------------------------------------------------------------------------

# If Uncertain

Agents should ask clarifying questions rather than guessing architecture
decisions.
