import type { SavedPlatform } from "@/store/useSavedProfilesStore";
import { useIsProfileSaved, useSavedProfilesStore } from "@/store/useSavedProfilesStore";
import { BookmarkIcon } from "./icons";

interface SaveButtonProps {
  username: string;
  platform: SavedPlatform;
  size?: "sm" | "md";
  className?: string;
}

export function SaveButton({ username, platform, size = "sm", className = "" }: SaveButtonProps) {
  const isSaved = useIsProfileSaved(username, platform);
  const toggle = useSavedProfilesStore((state) => state.toggle);

  const sizing = size === "sm" ? "px-3 py-1.5 text-xs gap-1.5" : "px-5 py-2.5 text-sm gap-2";

  return (
    <button
      type="button"
      aria-pressed={isSaved}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggle(username, platform);
      }}
      className={`inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 ${sizing} ${
        isSaved
          ? "bg-wine text-cream hover:bg-wine-dark"
          : "bg-cream-dark text-ink/70 hover:bg-gold hover:text-wine-dark"
      } ${isSaved ? "animate-pop" : ""} ${className}`}
    >
      <BookmarkIcon size={size === "sm" ? 14 : 16} filled={isSaved} />
      {isSaved ? "Added to List" : "Add to List"}
    </button>
  );
}
