import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";
import { UsersIcon } from "./icons";

interface ProfileGridProps {
  profiles: UserProfileSummary[];
  platform: Platform;
  onProfileClick?: (username: string) => void;
  emptyMessage?: string;
}

export function ProfileGrid({
  profiles,
  platform,
  onProfileClick,
  emptyMessage = "No profiles found. Try a different search.",
}: ProfileGridProps) {
  if (profiles.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-ink/15 py-16 text-center">
        <UsersIcon size={28} className="text-ink/25" />
        <p className="text-ink/50 text-sm max-w-xs">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.user_id}
          profile={profile}
          platform={platform}
          onProfileClick={onProfileClick}
        />
      ))}
    </div>
  );
}
