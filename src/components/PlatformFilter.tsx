import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
}

export function PlatformFilter({ selected, onChange }: PlatformFilterProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter by platform"
      className="inline-flex items-center gap-1 rounded-full border border-ink/10 bg-white p-1 shadow-sm"
    >
      {PLATFORMS.map((p) => {
        const isActive = selected === p;
        return (
          <button
            key={p}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(p)}
            className={`relative rounded-full px-4 sm:px-5 py-2 text-sm font-semibold transition-colors duration-200 ${
              isActive ? "bg-wine text-cream" : "text-ink/60 hover:text-wine"
            }`}
          >
            {getPlatformLabel(p)}
          </button>
        );
      })}
    </div>
  );
}
