"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import EntryDisplay from "./EntryDisplay";

export default function GenerateEntry({
  query,
}: {
  slug: string;
  query: string;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [entry, setEntry] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 300_000); // 5 minutes

    const generate = async () => {
      try {
        const res = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
          signal: controller.signal,
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || "Failed to generate entry");
        }
        const data = await res.json();
        setEntry(data);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          setError("This is taking longer than expected. Please try again.");
        } else {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong. Please try again."
          );
        }
      } finally {
        clearTimeout(timeout);
      }
    };

    generate();
    return () => { controller.abort(); clearTimeout(timeout); };
  }, [query]);

  if (error) {
    return (
      <main className="min-h-screen bg-parchment bg-paper-texture">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 md:px-10 pt-40 text-center">
          <p className="font-serif text-2xl text-charcoal-light mb-4">{error}</p>
          <a
            href="/"
            className="font-sans text-sm text-indigo hover:underline"
          >
            Back to search
          </a>
        </div>
      </main>
    );
  }

  if (!entry) {
    return (
      <main className="min-h-screen bg-parchment bg-paper-texture">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 md:px-10 pt-32">
          {/* Skeleton matching entry page layout */}
          <div className="animate-pulse space-y-6 mb-12">
            <div className="flex gap-2">
              <div className="h-3 bg-charcoal/8 rounded w-12" />
              <div className="h-3 bg-charcoal/8 rounded w-3" />
              <div className="h-3 bg-charcoal/8 rounded w-24" />
              <div className="h-3 bg-charcoal/8 rounded w-3" />
              <div className="h-3 bg-charcoal/8 rounded w-32" />
            </div>
            <div className="h-14 bg-charcoal/8 rounded-lg w-2/3" />
            <div className="h-6 bg-charcoal/8 rounded w-1/3" />
            <div className="flex gap-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-6 bg-charcoal/8 rounded-full w-20" />
              ))}
            </div>
            <div className="h-px bg-charcoal/8" />
            <div className="h-5 bg-charcoal/8 rounded w-40" />
            <div className="flex gap-4 overflow-hidden">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex-shrink-0 h-36 w-48 bg-charcoal/8 rounded-xl" />
              ))}
            </div>
          </div>
          <p className="font-sans text-sm text-mist text-center">
            Researching and writing your entry. This usually takes 30–60 seconds.
          </p>
        </div>
      </main>
    );
  }

  return <EntryDisplay entry={entry} />;
}
