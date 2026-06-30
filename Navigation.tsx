"use client";

/**
 * components/Navigation.tsx
 * Fixed-position scene indicator dots (one per section) using
 * IntersectionObserver to highlight the active section, plus a
 * light/dark mode toggle persisted to localStorage.
 */
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "Start" },
  { id: "letter", label: "Letter" },
  { id: "timeline", label: "Timeline" },
  { id: "reasons", label: "Reasons" },
  { id: "countdown", label: "Countdown" },
  { id: "love-meter", label: "Love Meter" },
  { id: "wish-jar", label: "Wishes" },
  { id: "lucky-wheel", label: "Wheel" },
  { id: "catch-hearts", label: "Game" },
  { id: "promises", label: "Promises" },
  { id: "wedding-dream", label: "Future" },
  { id: "open-when", label: "Letters" },
  { id: "music", label: "Music" },
  { id: "easter-egg", label: "Surprise" },
];

export default function Navigation() {
  const [activeId, setActiveId] = useState("hero");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("megan-love-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = stored ? stored === "dark" : prefersDark;
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  function toggleTheme() {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("megan-love-theme", next ? "dark" : "light");
      return next;
    });
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav
        aria-label="Page sections"
        className="hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col gap-3"
      >
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={`Go to ${s.label}`}
            aria-current={activeId === s.id ? "true" : undefined}
            className={`group relative w-2.5 h-2.5 rounded-full transition-all ${
              activeId === s.id ? "bg-rose-gold scale-125" : "bg-plum/20 hover:bg-plum/40"
            }`}
          >
            <span className="absolute right-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs bg-plum text-cream px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {s.label}
            </span>
          </a>
        ))}
      </nav>

      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="fixed top-4 left-4 z-40 w-11 h-11 rounded-full bg-white/80 dark:bg-plum/80 backdrop-blur shadow-md flex items-center justify-center text-lg focus-visible:outline focus-visible:outline-2"
      >
        {isDark ? "☀️" : "🌙"}
      </button>
    </>
  );
}
