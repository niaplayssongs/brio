"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PLACEHOLDERS = [
  "Ask anything about music",
  "Who is Googoosh",
  "Why did disco happen",
  "Sad songs from Korea",
  "Tell me about Beethoven",
  "Music like Kate Bush but global",
];

const EXAMPLE_PILLS = [
  "Who is Googoosh",
  "Why did disco happen",
  "Sad songs from Korea",
  "Tell me about Beethoven",
  "Music like Kate Bush but global",
  "Music history of Brazil",
];

const DECADES = [
  { label: "pre-1900s", tooltip: "The earliest seeds of recorded tradition" },
  { label: "1900s", tooltip: "The dawn of the phonograph age" },
  { label: "1910s", tooltip: "Blues, ragtime, and the jazz spark" },
  { label: "1920s", tooltip: "Jazz Age and the birth of recorded pop" },
  { label: "1930s", tooltip: "The Great Depression gave music its soul" },
  { label: "1940s", tooltip: "War, bebop, and the birth of cool" },
  { label: "1950s", tooltip: "Rock and roll changed everything" },
  { label: "1960s", tooltip: "The decade that changed everything" },
  { label: "1970s", tooltip: "Disco, punk, reggae, and funk" },
  { label: "1980s", tooltip: "Synthesizers and the pop explosion" },
  { label: "1990s", tooltip: "Grunge, hip-hop, and rave culture" },
  { label: "2000s", tooltip: "The digital revolution arrives" },
  { label: "2010s", tooltip: "Streaming changed who gets heard" },
  { label: "2020s", tooltip: "Music for uncertain times" },
];

const MOODS: { label: string; emoji: string }[] = [
  { label: "joy", emoji: "☀️" },
  { label: "longing", emoji: "🌙" },
  { label: "defiance", emoji: "✊" },
  { label: "grief", emoji: "💧" },
  { label: "wonder", emoji: "✨" },
  { label: "nostalgia", emoji: "🎞️" },
  { label: "rage", emoji: "🔥" },
  { label: "awe", emoji: "∞" },
  { label: "reverence", emoji: "🕯️" },
  { label: "melancholy", emoji: "☁️" },
  { label: "celebration", emoji: "🎊" },
  { label: "tension", emoji: "⚡" },
  { label: "hope", emoji: "🌱" },
  { label: "wandering", emoji: "🧭" },
  { label: "beauty", emoji: "🪷" },
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

const SUBJECT_TYPES = ["All", "Songs", "Artists", "Genres", "Countries", "Eras"];

const SUBJECT_TYPE_MAP: Record<string, string> = {
  Songs: "song",
  Artists: "artist",
  Genres: "genre",
  Countries: "country",
  Eras: "era",
};

const SUBJECT_TYPE_COLORS: Record<string, string> = {
  song: "bg-indigo/10 text-indigo",
  artist: "bg-rose-100 text-rose-700",
  genre: "bg-teal-100 text-teal-700",
  country: "bg-amber-100 text-amber-700",
  era: "bg-purple-100 text-purple-700",
};

function toSlug(query: string): string {
  return query
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [placeholderVisible, setPlaceholderVisible] = useState(true);
  const [selectedDecade, setSelectedDecade] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedSubjectType, setSelectedSubjectType] = useState("All");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [entries, setEntries] = useState<any[]>([]);
  const [entriesLoading, setEntriesLoading] = useState(true);

  // Rotate placeholder every 3 seconds with fade
  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderVisible(false);
      setTimeout(() => {
        setPlaceholderIdx((i) => (i + 1) % PLACEHOLDERS.length);
        setPlaceholderVisible(true);
      }, 350);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const fetchEntries = useCallback(async () => {
    setEntriesLoading(true);
    const params = new URLSearchParams();
    if (selectedDecade) params.set("decade", selectedDecade);
    if (selectedRegion !== "All Regions") params.set("region", selectedRegion);
    if (selectedMoods.length > 0) params.set("mood", selectedMoods[0]);
    if (selectedSubjectType !== "All") {
      params.set("subject_type", SUBJECT_TYPE_MAP[selectedSubjectType]);
    }
    try {
      const res = await fetch(`/api/entries?${params.toString()}`);
      const data = await res.json();
      setEntries(Array.isArray(data) ? data : []);
    } catch {
      setEntries([]);
    } finally {
      setEntriesLoading(false);
    }
  }, [selectedDecade, selectedRegion, selectedMoods, selectedSubjectType]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const handleSearch = (q?: string) => {
    const searchQuery = (q || query).trim();
    if (!searchQuery) return;
    const slug = toSlug(searchQuery);
    router.push(`/entry/${slug}?q=${encodeURIComponent(searchQuery)}`);
  };

  const toggleMood = (mood: string) => {
    setSelectedMoods((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]
    );
  };

  return (
    <main className="min-h-screen bg-parchment bg-paper-texture overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-28 px-6 md:px-10 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-8xl md:text-9xl font-semibold text-charcoal tracking-tight mb-4">
            Brio<span className="text-slate">.</span>
          </h1>
          <p className="font-serif text-2xl md:text-3xl text-charcoal-light font-light mb-14 tracking-wide">
            Every song has a world behind it.
          </p>

          {/* Search input */}
          <div className="relative max-w-2xl mx-auto mb-4">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full px-6 py-4 pr-36 rounded-full border border-charcoal/15 bg-white/70 backdrop-blur-sm font-sans text-base text-charcoal focus:outline-none focus:ring-2 focus:ring-indigo/25 focus:border-indigo/40 shadow-sm transition-all duration-300"
              />
              {/* Animated placeholder overlay */}
              {!query && (
                <div
                  className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none font-sans text-base text-mist/70 transition-opacity duration-350 select-none"
                  style={{ opacity: placeholderVisible ? 1 : 0 }}
                >
                  {PLACEHOLDERS[placeholderIdx]}
                </div>
              )}
              <button
                onClick={() => handleSearch()}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-indigo text-parchment rounded-full font-sans text-sm font-medium hover:bg-indigo-dark transition-colors duration-200"
              >
                Search
              </button>
            </div>
          </div>

          <p className="font-sans text-sm text-mist mb-10">
            A song, a question, a vibe, a name. Just ask.
          </p>

          {/* Example pill tags */}
          <div className="flex flex-wrap gap-2 justify-center">
            {EXAMPLE_PILLS.map((pill) => (
              <button
                key={pill}
                onClick={() => handleSearch(pill)}
                className="px-4 py-2 rounded-full border border-charcoal/12 bg-white/40 font-sans text-sm text-charcoal-light hover:border-indigo/35 hover:text-indigo hover:bg-white/70 transition-all duration-200"
              >
                {pill}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Exploration */}
      <section className="pb-28 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-charcoal mb-3 text-center">
            Wander through history.
          </h2>
          <p className="font-sans text-base text-mist text-center mb-14">
            Every filter opens a different door into the world of music.
          </p>

          {/* Decade pills — horizontally scrollable */}
          <div className="mb-8">
            <div
              className="flex gap-2 overflow-x-auto pb-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
            >
              {DECADES.map((d) => (
                <div key={d.label} className="relative group flex-shrink-0">
                  <button
                    onClick={() =>
                      setSelectedDecade(selectedDecade === d.label ? null : d.label)
                    }
                    className={`px-4 py-2 rounded-full border font-sans text-sm whitespace-nowrap transition-all duration-200 ${
                      selectedDecade === d.label
                        ? "bg-indigo text-parchment border-indigo"
                        : "bg-white/50 text-charcoal-light border-charcoal/15 hover:border-indigo/35 hover:text-indigo"
                    }`}
                  >
                    {d.label}
                  </button>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-charcoal text-parchment text-xs font-sans rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
                    {d.tooltip}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-charcoal" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Region dropdown + Subject type pills */}
          <div className="flex flex-wrap gap-3 mb-8 items-center">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-4 py-2 rounded-full border border-charcoal/15 bg-white/50 font-sans text-sm text-charcoal-light focus:outline-none focus:ring-2 focus:ring-indigo/25 focus:border-indigo/40 cursor-pointer hover:border-indigo/35 transition-all duration-200 appearance-none pr-8"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%238C8FA8' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 14px center",
              }}
            >
              {REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            <div className="flex gap-2 flex-wrap">
              {SUBJECT_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedSubjectType(t)}
                  className={`px-4 py-2 rounded-full border font-sans text-sm transition-all duration-200 ${
                    selectedSubjectType === t
                      ? "bg-indigo text-parchment border-indigo"
                      : "bg-white/50 text-charcoal-light border-charcoal/15 hover:border-indigo/35 hover:text-indigo"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Mood filter pills */}
          <div className="flex flex-wrap gap-2 mb-12">
            {MOODS.map((m) => (
              <button
                key={m.label}
                onClick={() => toggleMood(m.label)}
                className={`px-4 py-2 rounded-full border font-sans text-sm transition-all duration-200 flex items-center gap-1.5 ${
                  selectedMoods.includes(m.label)
                    ? "bg-indigo text-parchment border-indigo"
                    : "bg-white/50 text-charcoal-light border-charcoal/15 hover:border-indigo/35 hover:text-indigo"
                }`}
              >
                <span className="text-base leading-none">{m.emoji}</span>
                <span className="capitalize">{m.label}</span>
              </button>
            ))}
          </div>

          {/* Entries grid */}
          {entriesLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-44 rounded-2xl bg-white/40 animate-pulse border border-charcoal/8"
                />
              ))}
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-serif text-2xl text-charcoal-light mb-3">
                Nothing here yet for this combination.
              </p>
              <p className="font-sans text-sm text-mist">
                Try searching something above to be the first to explore it.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {entries.map((entry) => (
                <a
                  key={entry.id}
                  href={`/entry/${entry.slug}`}
                  className="group p-6 rounded-2xl bg-white/50 border border-charcoal/10 hover:border-indigo/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer block"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-sans font-medium ${
                        SUBJECT_TYPE_COLORS[entry.subject_type] ||
                        "bg-slate/10 text-slate"
                      }`}
                    >
                      {entry.subject_type}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-medium text-charcoal mb-2 group-hover:text-indigo transition-colors duration-200 line-clamp-2">
                    {entry.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-mist font-sans mb-3">
                    {entry.region && <span>{entry.region}</span>}
                    {entry.region && entry.decade && (
                      <span className="opacity-40">·</span>
                    )}
                    {entry.decade && <span>{entry.decade}</span>}
                  </div>
                  {Array.isArray(entry.mood_tags) && entry.mood_tags.length > 0 && (
                    <div className="flex gap-1.5 flex-wrap">
                      {entry.mood_tags.slice(0, 3).map((mood: string) => (
                        <span
                          key={mood}
                          className="px-2 py-0.5 rounded-full bg-slate/10 text-slate text-xs font-sans"
                        >
                          {mood}
                        </span>
                      ))}
                    </div>
                  )}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
