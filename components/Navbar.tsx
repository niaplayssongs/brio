"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-parchment/90 backdrop-blur-md shadow-[0_1px_20px_rgba(44,44,44,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="font-serif text-3xl font-semibold tracking-wide text-charcoal hover:text-indigo transition-colors duration-300"
        >
          Brio
          <span className="text-slate ml-0.5">.</span>
        </a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-10">
          {["Explore", "Discover", "Learn"].map((link) => (
            <a
              key={link}
              href="#"
              className="font-sans text-base font-medium text-charcoal-light hover:text-indigo transition-colors duration-300 relative group"
            >
              {link}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-slate group-hover:w-full transition-all duration-300" />
            </a>
          ))}

          <a
            href="#"
            className="ml-2 px-6 py-2.5 rounded-full border border-indigo text-indigo font-sans text-base font-medium hover:bg-indigo hover:text-parchment transition-all duration-300"
          >
            Sign In
          </a>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-1" aria-label="Menu">
          <span className="w-6 h-px bg-charcoal block" />
          <span className="w-4 h-px bg-charcoal block" />
          <span className="w-6 h-px bg-charcoal block" />
        </button>
      </div>
    </nav>
  );
}
