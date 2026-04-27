"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WorldMap from "@/components/WorldMap";
import FeatureCards from "@/components/FeatureCards";
import Footer from "@/components/Footer";

export default function Home() {
  const [query, setQuery] = useState("");

  return (
    <main className="min-h-screen bg-parchment bg-paper-texture overflow-x-hidden">
      <Navbar />
      <HeroSection query={query} setQuery={setQuery} />
      <WorldMap />
      <FeatureCards />
      <Footer />
    </main>
  );
}
