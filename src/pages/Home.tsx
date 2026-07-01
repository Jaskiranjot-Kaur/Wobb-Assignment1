import { useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import MarqueeLogos from "@/components/MarqueeLogos";
import Stats from "@/components/Stats";
import Solutions from "@/components/Solutions";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import PricingCTA from "@/components/PricingCTA";
import { Footer } from "@/components/Footer";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const allProfiles = useMemo(() => extractProfiles("instagram"), []);
  const resultCount = useMemo(
    () => filterProfiles(allProfiles, searchQuery).length,
    [allProfiles, searchQuery]
  );

  return (
    <div id="home" className="min-h-screen bg-cream">
      <Navbar />
      <main>
        <Hero query={searchQuery} onQueryChange={setSearchQuery} resultCount={resultCount} />
        <MarqueeLogos />
        <Stats />
        <Solutions />
        <HowItWorks />
        <Testimonials />
        <PricingCTA />
      </main>
      <Footer />
    </div>
  );
}