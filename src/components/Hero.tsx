import { useEffect, useState } from "react";
import { SearchIcon, ArrowRightIcon } from "./icons";

interface HeroProps {
  query: string;
  onQueryChange: (value: string) => void;
  resultCount: number;
}

const niches = ["beauty creators", "fashion editors", "tech reviewers", "comedy skits", "finance explainers"];

function AnimatedPlaceholder() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % niches.length), 2400);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="pointer-events-none absolute left-14 top-1/2 -translate-y-1/2 text-ink/40 text-[15px] sm:text-base overflow-hidden hidden sm:inline-block">
      Try &ldquo;<span className="text-wine/70 font-medium">{niches[index]}</span>&rdquo;
    </span>
  );
}

export function Hero({ query, onQueryChange, resultCount }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-wine pt-16 pb-14 sm:pt-20 sm:pb-16">
      <div className="grain absolute inset-0" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(232,200,118,0.16) 0%, rgba(107,36,56,0) 70%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <h1 className="leading-[0.95]">
          <span className="block font-script text-4xl sm:text-6xl text-cream/70 -mb-1 sm:-mb-3 animate-fade-up [animation-delay:0ms] opacity-0">
            Discover
          </span>
          <span className="block font-display text-[15vw] sm:text-6xl md:text-7xl tracking-wide text-gold animate-fade-up [animation-delay:120ms] opacity-0">
            INFLUENCERS
          </span>
          <span className="mt-1 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 animate-fade-up [animation-delay:240ms] opacity-0">
            <span className="font-script text-2xl sm:text-4xl text-cream/70">that elevate your</span>
            <span className="font-display text-4xl sm:text-6xl md:text-7xl tracking-wide text-cream">
              BRAND
            </span>
          </span>
        </h1>

        <div className="relative mx-auto mt-8 sm:mt-10 max-w-xl animate-fade-up [animation-delay:360ms] opacity-0">
          <SearchIcon size={19} className="absolute left-6 top-1/2 -translate-y-1/2 text-wine/50" />
          {query.length === 0 && <AnimatedPlaceholder />}
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            type="text"
            aria-label="Search for influencers by username or name"
            className="w-full rounded-full bg-cream py-4 sm:py-5 pl-14 pr-16 text-ink shadow-[0_20px_50px_-15px_rgba(0,0,0,0.45)] outline-none ring-1 ring-transparent focus:ring-gold transition-shadow"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-wine h-11 w-11 sm:h-12 sm:w-12 text-cream">
            <ArrowRightIcon size={18} />
          </span>
        </div>

        <p className="mt-4 text-sm text-cream/55 animate-fade-up [animation-delay:480ms] opacity-0">
          {resultCount.toLocaleString()} creator{resultCount === 1 ? "" : "s"} match your search
        </p>
      </div>

      <svg className="relative block w-full text-cream mt-10" viewBox="0 0 1440 50" preserveAspectRatio="none">
        <path d="M0,26 C240,50 480,0 720,16 C960,32 1200,4 1440,22 L1440,50 L0,50 Z" fill="currentColor" />
      </svg>
    </section>
  );
}
