"use client";

const CARDS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    label: "The Story",
    headline: "Every song has a history worth knowing.",
    body: "From the political moment that inspired a melody to the folk tradition passed through generations — Brio traces the full arc of each piece.",
    accent: "indigo",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    label: "The World",
    headline: "Music mapped across every era and region.",
    body: "Explore by geography, decade, or cultural movement. Discover connections between traditions separated by oceans and centuries.",
    accent: "slate",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
    label: "Your Journey",
    headline: "Build and share annotated playlists.",
    body: "Curate your own musical expeditions — annotate tracks with context, share with others, and contribute to a living encyclopedia.",
    accent: "indigo",
  },
];

export default function FeatureCards() {
  return (
    <section className="py-28 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Divider with label */}
        <div className="flex items-center gap-6 mb-20">
          <div className="flex-1 h-px bg-charcoal/10" />
          <p className="font-sans text-sm font-medium tracking-[0.25em] uppercase text-mist whitespace-nowrap">
            What Brio does
          </p>
          <div className="flex-1 h-px bg-charcoal/10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {CARDS.map((card, i) => (
            <div
              key={card.label}
              className="group relative p-10 rounded-2xl border border-charcoal/8 bg-white/40 backdrop-blur-sm hover:bg-white/60 hover:border-charcoal/14 hover:shadow-[0_8px_48px_rgba(44,44,44,0.08)] transition-all duration-500 cursor-default"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Accent line on hover */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-slate/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />

              {/* Icon */}
              <div
                className={`mb-8 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  card.accent === "slate"
                    ? "text-slate bg-slate/10 group-hover:bg-slate/15"
                    : "text-indigo bg-indigo/8 group-hover:bg-indigo/12"
                }`}
              >
                {card.icon}
              </div>

              {/* Label */}
              <p className="font-sans text-sm font-medium tracking-[0.2em] uppercase text-mist mb-3">
                {card.label}
              </p>

              {/* Headline */}
              <h3 className="font-serif text-2xl font-medium text-charcoal leading-snug mb-4">
                {card.headline}
              </h3>

              {/* Body */}
              <p className="font-sans text-base text-charcoal-light leading-relaxed">
                {card.body}
              </p>

              {/* CTA arrow */}
              <div className="mt-8 flex items-center gap-2 text-indigo font-sans text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                Learn more
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
