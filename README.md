# Wobb Frontend Assignment

A starter influencer search application built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. This project is intentionally left in a rough-but-working state for candidates to improve.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## What's Included

- **Search / Dashboard** — filter influencers by platform (Instagram, YouTube, TikTok) and search by username or full name
- **Profile Details** — click a profile to view extended data loaded from individual JSON files
- **Routing** — `react-router-dom` with `/` (search) and `/profile/:username` (details)

Sample data lives in:

- `src/assets/data/search/` — platform search results (10 profiles each)
- `src/assets/data/profiles/` — detailed profile JSON per username

## How to Submit

1. **Download or clone** this starter project to your machine.
2. **Create a new repository** on your own GitHub account. Do not fork the original assignment repo — push your work to a repo you own.
3. Complete the tasks below and push your changes to that repository.
4. **Share the public GitHub repository URL** with us as your submission.

### Deadline (strict)

- **Due:** **2 July 2026, 2:00 PM IST** (Indian Standard Time, UTC+5:30)
- **Any git commits made after this deadline will disqualify your submission.** We will only consider the repository state as of the deadline; late commits will not be reviewed.
- Make sure your final work is pushed **before** the cutoff.

## AI Usage

You may use any AI tools (Cursor, ChatGPT, Claude, GitHub Copilot, etc.). We are evaluating your final solution and engineering decisions.

## Your Tasks

Complete the following as part of your submission:

1. **Find and fix all bugs and quality issues** — the codebase contains intentional bugs and quality issues. Identify and resolve them.

2. **Completely redesign the UI/UX** — replace the basic layout with a polished, modern interface. Focus on usability, visual hierarchy, and delight.

3. **Replace React Context with Zustand** — when you implement state management for the selected list, use [Zustand](https://github.com/pmndrs/zustand) instead of React Context.

4. **Implement "Select profile & Add to List"** — the disabled "Add to List" button is a stub. Build the full feature:
   - Select / add profiles to a persistent list
   - View and manage the selected list
   - Handle duplicates appropriately

5. **Improve code quality and project structure** — refactor as needed, add proper types, and follow React best practices.

6. **Optimize performance** — apply sensible optimizations where appropriate.

7. **Use any libraries you need** — you are not limited to the current stack. Choose tools that help you deliver a great result (UI kits, state managers, testing libraries, etc.).

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start development server |
| `npm run build`| Production build         |
| `npm run lint` | Run ESLint               |

## Submission Notes

- Document any assumptions or trade-offs in your README
- Ensure `npm run build` passes before submitting
- Focus on demonstrating your judgment — not every possible feature needs to be built, but the core assignment items should be addressed thoughtfully
- Double-check that your repo is public (or that we have access) and that the link is included in your submission
- Please make meaningful commits throughout your work. We may review your commit history.
- **Bonus:** Deploying the app (e.g. Vercel, Netlify, GitHub Pages) is optional but will be considered a plus — include the live URL in your submission if you do

Good luck!

---

## Implementation Notes (this submission)

### Bugs fixed
- **Engagement rate math**: the profile detail page multiplied `engagement_rate` by `10000` for the "Engagement Rate" stat (should be `× 100` for a percentage) and separately mislabeled a raw engagement-rate percentage as "Engagements". Fixed: *Engagement Rate* now shows the correct percentage, and a new *Avg Engagements* stat shows the raw engagement count.
- **Dead code removed**: an unused `SearchBar.tsx` component and a duplicate `formatFollowersLocal` in `ProfileCard` (now uses the shared `formatFollowers` util) were removed.
- **Fixed-width cards**: `ProfileCard` was hardcoded to `w-[700px]`, breaking on mobile. Replaced the stacked list with a responsive `ProfileGrid`.
- **Debug leftovers**: removed a `clickCount`/`console.log` debug counter in `SearchPage`.
- **Stray DOM attribute**: removed a meaningless `data-search` attribute that was being written to every card.

### Redesign
Full visual redesign around a "Wobb" brand system — wine (`#6B2438`), cream (`#F5EFDC`), gold (`#C99A3F`), set up as CSS-first Tailwind v4 theme tokens in `src/index.css` (`@theme`). Includes a landing-style hero with the live search bar, animated entrances, platform tabs, premium profile cards, and a redesigned profile detail page. No extra UI/animation libraries were added — all built with Tailwind v4 utilities and a few custom `@utility`/`@keyframes` blocks, to keep the dependency footprint small.

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
