"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TIMELINE_COLORS: Record<string, { border: string; label: string }> = {
  origin:             { border: "#F59E0B", label: "Origin" },
  historical_event:   { border: "#F43F5E", label: "Historical Event" },
  genre_development:  { border: "#14B8A6", label: "Genre Development" },
  sociopolitical:     { border: "#A855F7", label: "Sociopolitical" },
  release:            { border: "#3D3580", label: "Release" },
  influence:          { border: "#525870", label: "Influence" },
  impact:             { border: "#22C55E", label: "Impact" },
  legacy:             { border: "#D97706", label: "Legacy" },
};

const SUBJECT_TYPE_COLORS: Record<string, string> = {
  song:    "bg-indigo/10 text-indigo border-indigo/20",
  artist:  "bg-rose-100 text-rose-700 border-rose-200",
  genre:   "bg-teal-100 text-teal-700 border-teal-200",
  country: "bg-amber-100 text-amber-700 border-amber-200",
  era:     "bg-purple-100 text-purple-700 border-purple-200",
};

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {(text || "")
        .split(/\n\n|\n/)
        .filter((p) => p.trim())
        .map((p, i) => (
          <p key={i} className="font-sans text-base text-charcoal leading-loose">
            {p}
          </p>
        ))}
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EntryDisplay({ entry }: { entry: any }) {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c = entry.content as Record<string, any>;
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const toggle = (idx: number) =>
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) { next.delete(idx); } else { next.add(idx); }
      return next;
    });

  const navigate = (q: string) => {
    if (!q) return;
    router.push(`/entry/${toSlug(q)}?q=${encodeURIComponent(q)}`);
  };

  return (
    <main className="min-h-screen bg-parchment bg-paper-texture">
      <Navbar />

      <article className="max-w-4xl mx-auto px-6 md:px-10 pt-32 pb-28">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-sans text-mist mb-10">
          <a href="/" className="hover:text-indigo transition-colors duration-200">
            Explore
          </a>
          {c.region && (
            <>
              <span className="opacity-40">›</span>
              <span>{c.region}</span>
            </>
          )}
          <span className="opacity-40">›</span>
          <span className="text-charcoal-light truncate max-w-xs">{c.title}</span>
        </nav>

        {/* Title */}
        <h1 className="font-serif text-5xl md:text-6xl font-semibold text-charcoal leading-tight mb-4">
          {c.title}
        </h1>

        {/* Original language name */}
        {c.original_language_name && (
          <p className="font-serif text-xl text-charcoal-light italic mb-6">
            {c.original_language_name}
          </p>
        )}

        {/* Metadata row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {c.subject_type && (
            <span
              className={`px-3 py-1 rounded-full text-xs font-sans font-medium border ${
                SUBJECT_TYPE_COLORS[c.subject_type] || "bg-slate/10 text-slate border-slate/20"
              }`}
            >
              {c.subject_type}
            </span>
          )}
          {c.year && (
            <span className="font-sans text-sm text-charcoal-light">{c.year}</span>
          )}
          {c.country && (
            <>
              <span className="text-mist/40">·</span>
              <span className="font-sans text-sm text-charcoal-light">{c.country}</span>
            </>
          )}
          {c.region && (
            <>
              <span className="text-mist/40">·</span>
              <span className="font-sans text-sm text-charcoal-light">{c.region}</span>
            </>
          )}
        </div>

        {/* Genre + mood tags */}
        {(c.genre_tags?.length > 0 || c.mood_tags?.length > 0) && (
          <div className="flex flex-wrap gap-2 mb-10">
            {c.genre_tags?.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-indigo/8 text-indigo text-xs font-sans border border-indigo/15"
              >
                {tag}
              </span>
            ))}
            {c.mood_tags?.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-slate/8 text-slate text-xs font-sans border border-slate/15"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <hr className="border-charcoal/10 mb-14" />

        {/* Timeline */}
        {c.timeline?.length > 0 && (
          <section className="mb-18">
            <h2 className="font-serif text-2xl font-semibold text-charcoal mb-6">
              Through Time
            </h2>
            {/* Horizontal scroll on desktop, vertical stack on mobile */}
            <div
              className="flex flex-col md:flex-row gap-4 md:overflow-x-auto md:pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
            >
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {c.timeline.map((item: any, idx: number) => {
                const color = TIMELINE_COLORS[item.type] || { border: "#525870", label: item.type };
                const isExpanded = expandedCards.has(idx);
                const sentences = (item.body || "").split(/(?<=\.)\s+/);
                const first = sentences[0] || "";
                const rest = sentences.slice(1).join(" ");

                return (
                  <div
                    key={idx}
                    className="md:flex-shrink-0 md:w-56 p-5 rounded-xl bg-white/60 border border-charcoal/8 cursor-pointer hover:shadow-sm transition-all duration-200 select-none"
                    style={{ borderLeft: `3px solid ${color.border}` }}
                    onClick={() => toggle(idx)}
                  >
                    <div
                      className="font-serif text-lg font-semibold mb-1"
                      style={{ color: "#3D3580" }}
                    >
                      {item.year}
                    </div>
                    <div className="font-sans text-xs text-mist uppercase tracking-wide mb-2">
                      {color.label}
                    </div>
                    <div className="font-sans text-sm font-medium text-charcoal mb-2 leading-snug">
                      {item.label}
                    </div>
                    <p className="font-sans text-xs text-charcoal-light leading-relaxed">
                      {first}
                      {rest && !isExpanded && (
                        <span className="text-mist ml-1 italic">· tap for more</span>
                      )}
                    </p>
                    {isExpanded && rest && (
                      <p className="font-sans text-xs text-charcoal-light leading-relaxed mt-2">
                        {rest}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Story */}
        {c.story && (
          <section className="mb-16">
            <h2 className="font-serif text-2xl font-semibold text-charcoal mb-6">
              The Story
            </h2>
            <div className="space-y-5">
              <Paragraphs text={c.story} />
            </div>
          </section>
        )}

        {/* Sociopolitical context */}
        {c.sociopolitical_context && (
          <section className="mb-16">
            <h2 className="font-serif text-2xl font-semibold text-charcoal mb-6">
              The World Behind the Music
            </h2>
            <div className="space-y-5">
              <Paragraphs text={c.sociopolitical_context} />
            </div>
          </section>
        )}

        {/* Why it matters */}
        {c.why_it_matters && (
          <section className="mb-16 pl-6 border-l-2 border-indigo/25">
            <h2 className="font-serif text-xl font-semibold text-charcoal mb-3">
              Why It Matters
            </h2>
            <p className="font-sans text-base text-charcoal-light leading-loose italic">
              {c.why_it_matters}
            </p>
          </section>
        )}

        {/* Similar across regions */}
        {c.similar_across_regions?.length > 0 && (
          <section className="mb-16">
            <h2 className="font-serif text-2xl font-semibold text-charcoal mb-2">
              Across the World at the Same Moment
            </h2>
            <p className="font-sans text-sm text-mist mb-6 italic">
              You might also feel this
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {c.similar_across_regions.map((item: any, idx: number) => (
                <div
                  key={idx}
                  onClick={() => navigate(item.title || item.artist || "")}
                  className="p-5 rounded-xl bg-white/60 border border-charcoal/8 hover:border-indigo/30 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  <div className="font-serif text-base font-medium text-charcoal mb-1">
                    {item.title}
                  </div>
                  {item.artist && (
                    <div className="font-sans text-xs text-charcoal-light mb-1">
                      {item.artist}
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-xs text-mist font-sans mb-3">
                    {item.region && <span>{item.region}</span>}
                    {item.year && (
                      <>
                        <span className="opacity-40">·</span>
                        <span>{item.year}</span>
                      </>
                    )}
                  </div>
                  {item.connection && (
                    <p className="font-sans text-xs text-charcoal-light leading-relaxed italic">
                      {item.connection}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Genre timeline */}
        {c.genre_timeline?.length > 0 && (
          <section className="mb-16">
            <h2 className="font-serif text-2xl font-semibold text-charcoal mb-6">
              The Genre Story
            </h2>
            <div className="space-y-0">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {c.genre_timeline.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="flex gap-6 py-5 border-b border-charcoal/8 last:border-0"
                >
                  <div className="flex-shrink-0 w-20 font-serif text-lg font-semibold text-indigo pt-0.5">
                    {item.year}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1.5">
                      <span className="font-sans text-sm font-medium text-charcoal">
                        {item.place}
                      </span>
                      {item.key_artist && (
                        <span className="font-sans text-xs text-mist">
                          — {item.key_artist}
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-sm text-charcoal-light leading-relaxed">
                      {item.context}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Influences + Influenced */}
        {(c.influences?.length > 0 || c.influenced?.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            {c.influences?.length > 0 && (
              <section>
                <h2 className="font-serif text-xl font-semibold text-charcoal mb-4">
                  Shaped By
                </h2>
                <div className="space-y-3">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {c.influences.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      onClick={() => navigate(item.title || item.artist || "")}
                      className="p-4 rounded-xl bg-white/50 border border-charcoal/8 hover:border-indigo/20 hover:shadow-sm transition-all duration-200 cursor-pointer"
                    >
                      <div className="font-serif text-sm font-medium text-charcoal mb-0.5">
                        {item.title}
                      </div>
                      {item.artist && (
                        <div className="font-sans text-xs text-mist mb-2">
                          {item.artist}
                          {item.year && ` · ${item.year}`}
                          {item.region && ` · ${item.region}`}
                        </div>
                      )}
                      <p className="font-sans text-xs text-charcoal-light leading-relaxed">
                        {item.note}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {c.influenced?.length > 0 && (
              <section>
                <h2 className="font-serif text-xl font-semibold text-charcoal mb-4">
                  Shaped Forward
                </h2>
                <div className="space-y-3">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {c.influenced.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      onClick={() => navigate(item.title || item.artist || "")}
                      className="p-4 rounded-xl bg-white/50 border border-charcoal/8 hover:border-indigo/20 hover:shadow-sm transition-all duration-200 cursor-pointer"
                    >
                      <div className="font-serif text-sm font-medium text-charcoal mb-0.5">
                        {item.title}
                      </div>
                      {item.artist && (
                        <div className="font-sans text-xs text-mist mb-2">
                          {item.artist}
                          {item.year && ` · ${item.year}`}
                          {item.region && ` · ${item.region}`}
                        </div>
                      )}
                      <p className="font-sans text-xs text-charcoal-light leading-relaxed">
                        {item.note}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* Contemporaries */}
        {c.contemporaries?.length > 0 && (
          <section className="mb-16">
            <h2 className="font-serif text-2xl font-semibold text-charcoal mb-6">
              The World Was Also Making
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {c.contemporaries.map((item: any, idx: number) => (
                <div
                  key={idx}
                  onClick={() => navigate(item.name || "")}
                  className="p-5 rounded-xl bg-white/60 border border-charcoal/8 hover:border-indigo/30 hover:shadow-sm transition-all duration-200 cursor-pointer"
                >
                  <div className="font-serif text-base font-medium text-charcoal mb-1">
                    {item.name}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-mist font-sans mb-3">
                    {item.region && <span>{item.region}</span>}
                    {item.year && (
                      <>
                        <span className="opacity-40">·</span>
                        <span>{item.year}</span>
                      </>
                    )}
                  </div>
                  <p className="font-sans text-xs text-charcoal-light leading-relaxed italic">
                    {item.context}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Accuracy note */}
        {c.accuracy_note && (
          <p className="font-sans text-xs text-mist italic border-t border-charcoal/8 pt-6">
            {c.accuracy_note}
          </p>
        )}
      </article>

      <Footer />
    </main>
  );
}
