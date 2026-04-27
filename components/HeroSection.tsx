"use client";

import { useState } from "react";

const PILL_TAGS = [
  "Shostakovich and the Soviet era",
  "Fela Kuti and Afrobeat",
  "Korean psychedelic rock 1970s",
];

const DECADES = [
  "1900s","1910s","1920s","1930s","1940s","1950s",
  "1960s","1970s","1980s","1990s","2000s","2010s","2020s",
];

const REGIONS = [
  "All Regions",
  "North America",
  "South America",
  "Central America and the Caribbean",
  "West Africa",
  "East Africa",
  "North Africa",
  "Southern Africa",
  "Western Europe",
  "Eastern Europe",
  "Scandinavia",
  "West Asia",
  "Central Asia",
  "South Asia",
  "Southeast Asia",
  "East Asia",
  "Oceania and the Pacific",
];

interface HeroSectionProps {
  query: string;
  setQuery: (q: string) => void;
}

export default function HeroSection({ query, setQuery }: HeroSectionProps) {
  const [focused, setFocused] = useState(false);
  const [selectedDecade, setSelectedDecade] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState("All Regions");

  const handleDecade = (decade: string) => {
    setSelectedDecade(prev => (prev === decade ? null : decade));
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-24">
      {/* Ambient glow blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(61,53,128,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(82,88,112,0.07) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Eyebrow */}
      <p
        className="font-sans text-sm font-medium tracking-[0.25em] uppercase text-slate mb-8 animate-fadein"
        style={{ animationDelay: "0.1s" }}
      >
        A music encyclopedia
      </p>

      {/* Headline */}
      <h1
        className="font-serif text-center text-6xl md:text-7xl font-light text-charcoal leading-[1.05] tracking-tight max-w-3xl text-balance animate-fadein"
        style={{ animationDelay: "0.2s" }}
      >
        Every song has a{" "}
        <em className="italic text-indigo not-italic font-medium">world</em>{" "}
        behind it.
      </h1>

      {/* Subheading */}
      <p
        className="mt-8 font-sans text-lg md:text-xl text-charcoal-light font-light leading-relaxed text-center max-w-xl animate-fadein"
        style={{ animationDelay: "0.35s" }}
      >
        The history, culture, and story behind music from every corner of the globe.
      </p>

      {/* Search bar */}
      <div
        className="mt-14 w-full max-w-2xl animate-fadein"
        style={{ animationDelay: "0.5s" }}
      >
        <div
          className={`flex items-center rounded-full overflow-hidden transition-all duration-300 ${
            focused
              ? "shadow-[0_0_0_2px_rgba(61,53,128,0.35),0_4px_24px_rgba(61,53,128,0.12)]"
              : "shadow-[0_2px_20px_rgba(44,44,44,0.1)]"
          } bg-white/70 backdrop-blur-sm`}
        >
          <div className="pl-6 pr-3 text-mist">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search any song, artist, or era…"
            className="flex-1 py-4 pr-2 bg-transparent font-sans text-base md:text-lg text-charcoal placeholder-mist focus:outline-none"
          />
          <button className="m-1.5 px-7 py-3 rounded-full bg-indigo hover:bg-indigo-light text-parchment font-sans text-base font-medium transition-all duration-300 hover:shadow-[0_4px_16px_rgba(61,53,128,0.35)]">
            Search
          </button>
        </div>
      </div>

      {/* Example pill tags */}
      <div
        className="mt-5 flex flex-wrap gap-2 justify-center animate-fadein"
        style={{ animationDelay: "0.65s" }}
      >
        {PILL_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setQuery(tag)}
            className="px-4 py-2 rounded-full border border-charcoal/15 bg-white/40 font-sans text-sm text-charcoal-light hover:border-indigo hover:text-indigo hover:bg-indigo/5 transition-all duration-300 cursor-pointer backdrop-blur-sm"
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Filter row: decade pills + region dropdown */}
      <div
        className="mt-10 w-full max-w-2xl animate-fadein"
        style={{ animationDelay: "0.75s" }}
      >
        <div className="flex items-center gap-4 bg-white/30 backdrop-blur-sm rounded-2xl border border-charcoal/8 px-5 py-4">
          {/* Decade pills — scrollable strip */}
          <div className="flex-1 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {DECADES.map((decade) => (
              <button
                key={decade}
                onClick={() => handleDecade(decade)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full border font-sans text-sm font-medium transition-all duration-200 ${
                  selectedDecade === decade
                    ? "bg-indigo border-indigo text-parchment shadow-[0_2px_10px_rgba(61,53,128,0.3)]"
                    : "border-charcoal/12 text-charcoal-light bg-white/50 hover:border-indigo hover:text-indigo hover:bg-indigo/5"
                }`}
              >
                {decade}
              </button>
            ))}
          </div>

          {/* Vertical divider */}
          <div className="h-7 w-px bg-charcoal/10 flex-shrink-0" />

          {/* Region dropdown */}
          <div className="relative flex-shrink-0">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="appearance-none bg-white/60 border border-charcoal/12 rounded-full pl-4 pr-8 py-1.5 font-sans text-sm text-charcoal cursor-pointer hover:border-indigo focus:outline-none focus:border-indigo transition-colors duration-200 max-w-[170px]"
            >
              {REGIONS.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-mist">
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-float">
        <span className="font-sans text-xs tracking-widest uppercase text-charcoal-light">
          Explore
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-charcoal-light"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
