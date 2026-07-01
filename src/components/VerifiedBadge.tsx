import { CheckBadgeIcon } from "./icons";

interface VerifiedBadgeProps {
  verified: boolean;
}

export function VerifiedBadge({ verified }: VerifiedBadgeProps) {
  if (!verified) return null;
  return (
    <span className="inline-flex ml-1 -mt-0.5 text-gold-dark align-middle" title="Verified">
      <CheckBadgeIcon size={14} strokeWidth={2.5} />
    </span>
  );
}
