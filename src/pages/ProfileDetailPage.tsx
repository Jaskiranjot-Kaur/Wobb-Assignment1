import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { SaveButton } from "@/components/SaveButton";
import { ArrowRightIcon, ExternalLinkIcon, ChartIcon } from "@/components/icons";
import type { FullUserProfile, ProfileDetailResponse } from "@/types";
import { getAvatarFallbackUrl } from "@/utils/avatar";
import { formatEngagementRate, formatFollowers } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";
import type { SavedPlatform } from "@/store/useSavedProfilesStore";

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-ink/10 bg-white p-4">
      <p className="text-[11px] uppercase tracking-wide text-ink/45">{label}</p>
      <p className="mt-1 font-display text-2xl text-wine tracking-wide">{value}</p>
    </div>
  );
}

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = (searchParams.get("platform") || "unknown") as SavedPlatform;

  const [result, setResult] = useState<{
    username: string;
    data: ProfileDetailResponse | null;
  } | null>(null);

  useEffect(() => {
    if (!username) return;
    let active = true;

    loadProfileByUsername(username).then((data) => {
      if (!active) return;
      setResult({ username, data });
    });

    return () => {
      active = false;
    };
  }, [username]);

  const isCurrent = result !== null && result.username === username;
  const profileData = isCurrent ? result.data : null;
  const status: "loading" | "ready" | "error" = !isCurrent
    ? "loading"
    : profileData
      ? "ready"
      : "error";

  if (!username) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-16 text-center">
        <p className="text-ink/60">Invalid profile.</p>
        <Link to="/" className="mt-4 inline-block text-wine underline">
          Back to search
        </Link>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-wine/20 border-t-wine" />
        <p className="mt-4 text-ink/45 text-sm">Loading @{username}&rsquo;s profile...</p>
      </div>
    );
  }

  if (status === "error" || !profileData) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-16 text-center">
        <p className="text-wine">Could not load profile details for @{username}.</p>
        <Link to="/" className="mt-4 inline-block text-wine underline">
          Back to search
        </Link>
      </div>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;
  const fallbackAvatar = getAvatarFallbackUrl(user.fullname || user.username);

  return (
    <div>
      <div className="bg-wine relative overflow-hidden pb-20 pt-10 sm:pt-14">
        <div className="grain absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-cream/70 hover:text-cream transition-colors"
          >
            <span className="rotate-180 inline-flex">
              <ArrowRightIcon size={14} />
            </span>
            Back to search
          </Link>

          <div className="mt-6 flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
            <img
              src={user.picture}
              alt={user.fullname}
              className="h-24 w-24 sm:h-28 sm:w-28 rounded-full border-4 border-cream object-cover shadow-lg"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = fallbackAvatar;
              }}
            />
            <div>
              <h1 className="flex items-center justify-center sm:justify-start font-display text-2xl sm:text-3xl tracking-wide text-cream">
                @{user.username}
                <VerifiedBadge verified={user.is_verified} />
              </h1>
              <p className="text-cream/70 mt-1">{user.fullname}</p>
              <p className="text-xs text-cream/45 mt-1 capitalize">
                {platform === "unknown" ? "" : `${platform} · `}
                {user.gender ? `${user.gender.toLowerCase()} · ` : ""}
                {user.age_group ?? ""}
              </p>
            </div>
          </div>
        </div>

        <svg
          className="absolute bottom-0 left-0 w-full text-cream"
          viewBox="0 0 1440 40"
          preserveAspectRatio="none"
        >
          <path d="M0,20 C360,40 1080,0 1440,18 L1440,40 L0,40 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="mx-auto max-w-4xl px-5 sm:px-8 -mt-10 relative pb-16">
        {user.description && (
          <div className="rounded-2xl border border-ink/10 bg-white p-5 mb-6">
            <p className="text-sm text-ink/70 leading-relaxed">{user.description}</p>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard label="Followers" value={formatFollowers(user.followers)} />
          <StatCard label="Engagement Rate" value={formatEngagementRate(user.engagement_rate)} />
          {user.engagements !== undefined && (
            <StatCard label="Avg Engagements" value={formatFollowers(user.engagements)} />
          )}
          {user.posts_count !== undefined && (
            <StatCard label="Posts" value={user.posts_count.toLocaleString()} />
          )}
          {user.avg_likes !== undefined && (
            <StatCard label="Avg Likes" value={formatFollowers(user.avg_likes)} />
          )}
          {user.avg_comments !== undefined && (
            <StatCard label="Avg Comments" value={formatFollowers(user.avg_comments)} />
          )}
          {user.avg_views !== undefined && user.avg_views > 0 && (
            <StatCard label="Avg Views" value={formatFollowers(user.avg_views)} />
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <SaveButton username={user.username} platform={platform} size="md" />
          {user.url && (
            <a
              href={user.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink/70 hover:border-wine/30 hover:text-wine transition-colors"
            >
              View on platform
              <ExternalLinkIcon size={15} />
            </a>
          )}
        </div>

        <div className="mt-10 flex items-start gap-3 rounded-xl bg-cream-dark/60 p-4 text-xs text-ink/50">
          <ChartIcon size={16} className="shrink-0 mt-0.5 text-wine/60" />
          <p>
            Stats shown are illustrative sample data included with this demo and don&rsquo;t reflect
            live platform figures.
          </p>
        </div>
      </div>
    </div>
  );
}
