## 2025-05-24 - [Unstable Object Dependencies causing Render Loops]
**Learning:** In this codebase, `useFetch` was frequently used with inline object literals for `headers` or `body`. Since these are recreated on every render, they trigger `useEffect` infinitely if the fetched data updates a state that causes a re-render of the component using `useFetch`.
**Action:** Stabilized `useFetch` by stringifying object dependencies and providing a stable `DEFAULT_CONFIG`. Always memoize context providers to prevent cascading re-renders across the app.

## 2025-05-24 - [Cart List Re-render Optimization]
**Learning:** Rendering large lists (like a shopping cart) can cause significant UI lag if every item re-renders on any state change. Using `React.memo` for list items combined with stable `useCallback` handlers is essential.
**Action:** Memoized `CartItem` and `CartItemAmount`. Leveraged the reducer's partial update capability to keep parent handlers stable by only passing updated items, rather than the whole list.

## 2025-05-24 - [Anonymous Callback Invalidation of React.memo]
**Learning:** Even when a child component is wrapped in `React.memo`, passing an anonymous arrow function as a prop from the parent will invalidate the memoization on every render of the parent. This is a common silent performance killer in list rendering.
**Action:** Always pass stable function references (like those from `useCart` or wrapped in `useCallback`) directly to memoized components. Verified that `onRemove={removeItem}` is functionally equivalent to `onRemove={(id) => removeItem(id)}` while providing referential stability.
