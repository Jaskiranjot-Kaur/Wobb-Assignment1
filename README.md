### Bugs fixed
- **Engagement rate math**: the profile detail page multiplied `engagement_rate` by `10000` for the "Engagement Rate" stat (should be `× 100` for a percentage) and separately mislabeled a raw engagement-rate percentage as "Engagements". Fixed: *Engagement Rate* now shows the correct percentage, and a new *Avg Engagements* stat shows the raw engagement count.
- **Dead code removed**: an unused `SearchBar.tsx` component and a duplicate `formatFollowersLocal` in `ProfileCard` (now uses the shared `formatFollowers` util) were removed.
- **Fixed-width cards**: `ProfileCard` was hardcoded to `w-[700px]`, breaking on mobile. Replaced the stacked list with a responsive `ProfileGrid`.
- **Debug leftovers**: removed a `clickCount`/`console.log` debug counter in `SearchPage`.
- **Stray DOM attribute**: removed a meaningless `data-search` attribute that was being written to every card.

### Redesign
Full visual redesign around a "Wobb" brand system — wine (`#6B2438`), cream (`#F5EFDC`), gold (`#C99A3F`), set up as CSS-first Tailwind v4 theme tokens in `src/index.css` (`@theme`). Includes a landing-style hero with the live search bar, animated entrances, platform tabs, premium profile cards, and a redesigned profile detail page. No extra UI/animation libraries were added — all built with Tailwind v4 utilities and a few custom `@utility`/`@keyframes` blocks, to keep the dependency footprint small.
## 📄 InitialDesign

[Click here to view my Initial Design for the website](./InitialDesign.pdf)

### State management — Zustand
Replaced the old localStorage + custom `window` event pub-sub (`utils/savedList.ts`) with a single Zustand store (`src/store/useSavedProfilesStore.ts`) using the `persist` middleware for localStorage sync. Components read via selector hooks (`useIsProfileSaved`, `useSavedCount`) so only the components whose saved-state actually changed re-render.

### "Add to List" feature
Implemented end-to-end via the Zustand store: toggle from the search grid or the detail page, duplicates are prevented by matching on `username` + `platform`, and `/my-list` groups saved creators by platform with a "Clear all" action and an empty state.

### Structure / quality
- Routing switched to nested routes (`<Route element={<Layout />}>` + `<Outlet />`) so the nav/footer shell isn't duplicated in every page.
- `SearchPage` memoizes `extractProfiles`/`filterProfiles` with `useMemo` so filtering doesn't re-derive on unrelated re-renders.
- Avatar fallback gradients recolored to the brand palette instead of a generic rainbow set.
- Removed the unused `react-beautiful-dnd` dependency (nothing used it).

### Trade-offs / assumptions
- Kept the sample JSON data model as-is; `engagements`/`avg_*` fields are optional in the type since not every platform's payload includes them.
- Persist middleware uses `localStorage` directly (no cross-tab broadcast); a saved item added in one tab won't live-update another open tab until it re-reads storage. Acceptable for a demo; would swap in a `BroadcastChannel` or storage-event listener for production.
- No test suite was added given the scope of the redesign — happy to add Vitest + React Testing Library coverage for the store and filtering logic if useful.
