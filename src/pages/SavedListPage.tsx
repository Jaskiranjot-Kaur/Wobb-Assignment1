import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProfileCard } from "@/components/ProfileCard";
import { UsersIcon, TrashIcon } from "@/components/icons";
import type { FullUserProfile, Platform } from "@/types";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { useSavedProfilesStore } from "@/store/useSavedProfilesStore";
import type { SavedProfileEntry } from "@/store/useSavedProfilesStore";

type LoadedSavedProfile = SavedProfileEntry & { profile: FullUserProfile };

function getPlatformLabel(platform: Platform | "unknown") {
  if (platform === "instagram") return "Instagram";
  if (platform === "youtube") return "YouTube";
  if (platform === "tiktok") return "TikTok";
  return "Unknown platform";
}

export function SavedListPage() {
  const savedEntries = useSavedProfilesStore((state) => state.entries);
  const clearAll = useSavedProfilesStore((state) => state.clear);
  const [items, setItems] = useState<LoadedSavedProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadAll = async () => {
      setLoading(true);
      const loaded = await Promise.all(
        savedEntries.map(async (entry) => {
          const result = await loadProfileByUsername(entry.username);
          if (!result) return null;
          return { ...entry, profile: result.data.user_profile } satisfies LoadedSavedProfile;
        })
      );
      if (!active) return;
      setItems(loaded.filter((item): item is LoadedSavedProfile => item !== null));
      setLoading(false);
    };

    loadAll();
    return () => {
      active = false;
    };
  }, [savedEntries]);

  const grouped = items.reduce<Record<string, LoadedSavedProfile[]>>((acc, item) => {
    const key = item.platform;
    acc[key] = acc[key] ? [...acc[key], item] : [item];
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl tracking-wide text-ink">MY LIST</h1>
          <p className="text-sm text-ink/50 mt-1">
            {items.length} creator{items.length === 1 ? "" : "s"} shortlisted across platforms
          </p>
        </div>
        {items.length > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="inline-flex items-center gap-1.5 self-start rounded-full border border-ink/15 px-4 py-2 text-xs font-semibold text-ink/60 hover:border-wine/30 hover:text-wine transition-colors"
          >
            <TrashIcon size={14} />
            Clear all
          </button>
        )}
      </div>

      {!loading && items.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-ink/15 py-16 text-center">
          <UsersIcon size={28} className="text-ink/25" />
          <p className="text-ink/50 text-sm max-w-xs">
            No profiles saved yet. Add creators from search to build your campaign shortlist.
          </p>
          <Link
            to="/"
            className="mt-2 rounded-full bg-wine px-5 py-2.5 text-sm font-semibold text-cream hover:bg-wine-dark transition-colors"
          >
            Browse creators
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-10">
          {Object.entries(grouped).map(([platform, entries]) => (
            <div key={platform}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">
                {getPlatformLabel(platform as Platform | "unknown")}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {entries.map(({ username, platform: entryPlatform, profile }) => (
                  <ProfileCard
                    key={`${entryPlatform}-${username}`}
                    profile={profile}
                    platform={entryPlatform === "unknown" ? "instagram" : entryPlatform}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
