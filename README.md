# Wobb — Influencer Discovery App

🔗 **Live demo:** [wobb-pi.vercel.app](https://wobb-pi.vercel.app/)

React + TypeScript + Vite + Tailwind CSS v4 + Zustand.

This is the Wobb frontend assignment starter, redesigned and fixed up. Below: how to run it,what changed from the original starter, and which libraries got used.

---

## Running it

```bash
npm install
npm run dev
```

Then open the local URL it prints (usually `http://localhost:5173`).

Other commands:

```bash
npm run build     # type-check then build for production
npm run preview   # preview the production build
npm run lint       # eslint .
```

No backend, no env variables. All the data is just JSON files sitting in `src/assets/data/`.

---

## Libraries used

Only added one thing: **Zustand**, for state management, because the assignment specifically asked for the old Context setup to be swapped out for it. Nothing else got added — no UI kit, no animation library, nothing.

| Category | Used? | What's actually there |
|---|---|---|
| UI libraries | No | No MUI, no shadcn, nothing. Every card, tab, badge is just a plain Tailwind component I wrote. |
| Animation libraries | No | No Framer Motion. Animations are plain CSS keyframes in `index.css`, triggered with Tailwind classes. |
| Utility libraries | No | No lodash, no clsx. The formatting functions (`formatFollowers` etc.) are just small hand-written functions. |
| Testing libraries | No | Didn't add tests — see the notes at the bottom for why. |
| Form libraries | No | The only "form" is the search box, which is a normal controlled input. |
| Data fetching libraries | No | No React Query, no axios. Data is bundled JSON, read locally, no network calls at all. |
| State management | Yes — Zustand | `src/store/useSavedProfilesStore.ts`, replaces the old localStorage + window-event setup for the saved list. |

Everything else already in `package.json` (react, react-router-dom, tailwindcss) was there
before I touched anything.

---

## What changed from the original starter

### Bugs I fixed

- The engagement rate math on the profile page was wrong — it multiplied by 10000 instead of 100, so it showed absurd percentages. It was also showing the rate where it should've shown
  the raw engagement count. Fixed both, split into two separate stat cards now.
- That same page had a `useEffect` that called `setStatus` synchronously right at the top, which is a bit of an anti-pattern (can cause an extra render). Reworked it so the loading
  state is derived instead of set directly outside the async callback.
- Profile cards were hardcoded to `w-[700px]` which just broke on mobile. Now they sit in a responsive grid and size themselves normally.
- There was a leftover `clickCount` counter and a `console.log` in the search page click handler — just debug code someone forgot to remove. Deleted it.
- Found a `data-search={searchQuery}` attribute being written onto every card for no reason. Removed it too.
- YouTube search was breaking for some creators — a few entries in youtube.json (Vlad and Niki, Kids Diana Show, Like Nastya) don't have a username field at all in the raw data, only handle/custom_name. That       made the card show "@undefined" and broke the link to the profile page. Fixed.

### Dead code

- `SearchBar.tsx` was never actually used anywhere — deleted. The one working search input now lives in the Hero.
- `savedList.ts`, the old localStorage + window-event hack for tracking saved profiles, is gone — replaced by the Zustand store.
- `ProfileList.tsx` got replaced by `ProfileGrid.tsx` (see below).
- `react-beautiful-dnd` was sitting in package.json but never imported anywhere, so I removed it.

### Redesign

Rebuilt the look around the colors — wine `#6B2438`, cream `#F5EFDC`, gold `#C99A3F`. 
Set these up as Tailwind v4 theme tokens directly in `index.css` (this project's already on Tailwind v4, so no separate config file needed).

Added a proper hero section with the brand headline and the real, working search bar together — before, the marketing-style header and the actual search box were two disconnected things. Redesigned the navbar (highlights the active page, shows how many profiles you've saved), the
footer, the platform tabs, and the profile detail page.

Also wrote a tiny set of inline SVG icons instead of pulling in an icon library, and swapped the fallback-avatar colors from a random rainbow palette to something that matches the brand.

## Initial Design
![Landing Page](./1.png)
![Discover Talent](./2.png)

## Feature implemented — Add to List
Built the "Add to List" feature from scratch on top of the Zustand store:

- Clicking "Add to List" on any card (search grid or profile page) toggles that profile in and out of the saved list, and stays in sync everywhere it's shown.
- Duplicate protection — saving the same profile twice doesn't create two entries. Entries are matched by username + platform before adding, so re-clicking or saving from two different places never duplicates a row.
- Doesn't break on re-render — the list reads straight from the store (not local component state), so re-renders, remounts, or navigating away and back don't lose or corrupt it. It also survives a page refresh since it's persisted to localStorage.
- "My List" page groups everything by platform and has a "Clear all" action.

## Feature implemented — initials fallback for missing photos
Profiles with no photo, or a photo URL that fails to load, used to just show the browser's default broken-image icon — a small grey/black circle with a little photo icon in it, which reads as an error rather than a missing photo. Wired up onError on the <img> in both ProfileCard and ProfileDetailPage so a failed load swaps in a generated avatar instead: a colored circle (from the brand palette) with the person's initials, via getAvatarFallbackUrl() in src/utils/avatar.ts. Same idea apps like Slack/Gmail use for users without a profile picture — looks intentional instead of broken.


### Zustand

`useSavedProfilesStore.ts` is the new store — it replaces the old system for tracking which profiles you've saved, and persists to localStorage automatically. Components read from it through small selector hooks so only the parts of the UI that actually care about a change re-render, not the whole page.

Also added one reusable `SaveButton` component, used both in the search grid and on the profile page, so saving/removing a creator stays in sync everywhere immediately.

### Structure

Routing now uses a shared layout with nested routes instead of every page wrapping itself in `<Layout>` individually — cuts down on repeated code. Added a proper "My List" page that reads from the store and groups saved profiles by platform.

### Performance

- Wrapped the expensive data-processing calls in `SearchPage` with `useMemo` so they don't re-run on every unrelated render.
- Wrapped `ProfileCard` and `PlatformFilter` in `React.memo`. Without this, typing in the search box would re-render every single visible card on every keystroke, even the ones that didn't
  change.
- The Zustand selectors mean toggling "save" on one card only re-renders that card and the navbar badge — not the entire grid.

---

## What I didn't do / trade-offs

- No automated tests. Given how much else changed, I prioritized fixing bugs and the redesign
  over writing a test suite. If it'd help, the store logic and the search filtering are the two
  things I'd test first.
- The persist middleware just uses localStorage directly, so if you have two tabs open, saving
  something in one tab won't instantly show up in the other until it re-reads storage. Fine for
  a demo, would need a storage event listener for anything real.

