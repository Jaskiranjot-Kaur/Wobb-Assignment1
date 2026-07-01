import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Platform } from "@/types";

export type SavedPlatform = Platform | "unknown";

export interface SavedProfileEntry {
  username: string;
  platform: SavedPlatform;
  savedAt: string;
}

interface SavedProfilesState {
  entries: SavedProfileEntry[];
  save: (username: string, platform: SavedPlatform) => void;
  remove: (username: string, platform: SavedPlatform) => void;
  toggle: (username: string, platform: SavedPlatform) => void;
  clear: () => void;
}

/**
 * Two entries refer to the same saved profile if the usernames match and
 * either side has an "unknown" platform (covers legacy/ambiguous data) or
 * the platforms match exactly.
 */
function matches(
  entry: SavedProfileEntry,
  username: string,
  platform: SavedPlatform
) {
  if (entry.username !== username) return false;
  return (
    entry.platform === platform ||
    entry.platform === "unknown" ||
    platform === "unknown"
  );
}

export const useSavedProfilesStore = create<SavedProfilesState>()(
  persist(
    (set, get) => ({
      entries: [],

      save: (username, platform) => {
        if (!username.trim()) return;
        set((state) => ({
          entries: [
            ...state.entries.filter((e) => !matches(e, username, platform)),
            { username, platform, savedAt: new Date().toISOString() },
          ],
        }));
      },

      remove: (username, platform) => {
        set((state) => ({
          entries: state.entries.filter((e) => !matches(e, username, platform)),
        }));
      },

      toggle: (username, platform) => {
        const alreadySaved = get().entries.some((e) =>
          matches(e, username, platform)
        );
        if (alreadySaved) {
          get().remove(username, platform);
        } else {
          get().save(username, platform);
        }
      },

      clear: () => set({ entries: [] }),
    }),
    {
      name: "wobb_saved_profiles",
      version: 1,
    }
  )
);

/** Selector hook — re-renders only when this specific profile's saved state changes. */
export function useIsProfileSaved(username: string, platform: SavedPlatform) {
  return useSavedProfilesStore((state) =>
    state.entries.some((e) => matches(e, username, platform))
  );
}

export function useSavedCount() {
  return useSavedProfilesStore((state) => state.entries.length);
}
