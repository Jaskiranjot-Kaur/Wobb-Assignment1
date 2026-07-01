import { useMemo, useState } from "react";
import type { Platform } from "@/types";
import { Hero } from "@/components/Hero";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileGrid } from "@/components/ProfileGrid";
import MarqueeLogos from "@/components/MarqueeLogos";
import Stats from "@/components/Stats";
import Solutions from "@/components/Solutions";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import PricingCTA from "@/components/PricingCTA";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [searchQuery, setSearchQuery] = useState("");

  const allProfiles = useMemo(() => extractProfiles(platform), [platform]);
  const filtered = useMemo(
    () => filterProfiles(allProfiles, searchQuery),
    [allProfiles, searchQuery]
  );

  return (
    <div>
      <Hero query={searchQuery} onQueryChange={setSearchQuery} resultCount={filtered.length} />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-10 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <PlatformFilter
            selected={platform}
            onChange={(p) => {
              setPlatform(p);
              setSearchQuery("");
            }}
          />
          <p className="text-sm text-ink/50">
            Showing <span className="font-semibold text-ink/70">{filtered.length}</span> of{" "}
            {allProfiles.length} creators
          </p>
        </div>

        <ProfileGrid profiles={filtered} platform={platform} />
      </div>

      <MarqueeLogos />
      <Stats />
      <Solutions />
      <HowItWorks />
      <Testimonials />
      <PricingCTA />
    </div>
  );
}
