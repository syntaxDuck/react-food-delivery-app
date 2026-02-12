## 2025-05-24 - [Unstable Object Dependencies causing Render Loops]
**Learning:** In this codebase, `useFetch` was frequently used with inline object literals for `headers` or `body`. Since these are recreated on every render, they trigger `useEffect` infinitely if the fetched data updates a state that causes a re-render of the component using `useFetch`.
**Action:** Stabilized `useFetch` by stringifying object dependencies and providing a stable `DEFAULT_CONFIG`. Always memoize context providers to prevent cascading re-renders across the app.
