import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { SaveButton } from "./SaveButton";
import { getAvatarFallbackUrl } from "@/utils/avatar";
import { formatFollowers, formatEngagementRate } from "@/utils/formatters";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  onProfileClick?: (username: string) => void;
}

export function ProfileCard({ profile, platform, onProfileClick }: ProfileCardProps) {
  const navigate = useNavigate();
  const fallbackAvatar = getAvatarFallbackUrl(profile.fullname || profile.username);

  const handleClick = () => {
    onProfileClick?.(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  return (
    <article
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      role="button"
      tabIndex={0}
      className="group flex flex-col rounded-2xl border border-ink/10 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgba(31,21,18,0.25)] hover:border-wine/25 cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <img
          src={profile.picture}
          alt={profile.fullname}
          loading="lazy"
          className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-cream-dark"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = fallbackAvatar;
          }}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center font-serif text-[15px] font-semibold text-ink truncate">
            @{profile.username}
            <VerifiedBadge verified={profile.is_verified} />
          </div>
          <p className="truncate text-sm text-ink/55">{profile.fullname}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-cream px-3 py-2">
          <p className="text-[10px] uppercase tracking-wide text-ink/45">Followers</p>
          <p className="font-display text-lg text-wine tracking-wide">
            {formatFollowers(profile.followers)}
          </p>
        </div>
        <div className="rounded-lg bg-cream px-3 py-2">
          <p className="text-[10px] uppercase tracking-wide text-ink/45">Engagement</p>
          <p className="font-display text-lg text-wine tracking-wide">
            {formatEngagementRate(profile.engagement_rate)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <span className="text-xs text-ink/40 capitalize">{platform}</span>
        <SaveButton username={profile.username} platform={platform} />
      </div>
    </article>
  );
}
