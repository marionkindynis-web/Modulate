"use client";

import { useEffect, useState } from "react";

const CHAPTERS = [
  { id: "home-hero", label: "00" },
  { id: "home-problem", label: "01" },
  { id: "home-improve", label: "02" },
  { id: "home-method", label: "03" },
  { id: "home-work", label: "04" },
  { id: "home-why", label: "05" },
  { id: "home-cta", label: "06" },
] as const;

export function HomeChapterIndicator() {
  const [current, setCurrent] = useState("00");

  useEffect(() => {
    const nodes = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      Boolean,
    ) as HTMLElement[];

    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible?.target.id) return;
        const match = CHAPTERS.find((c) => c.id === visible.target.id);
        if (match) setCurrent(match.label);
      },
      { threshold: [0.25, 0.45, 0.6], rootMargin: "-20% 0px -35% 0px" },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="home-chapter-indicator pointer-events-none fixed right-4 bottom-6 z-30 hidden font-display text-[0.6875rem] tracking-[0.14em] text-muted tabular-nums md:right-8 md:bottom-8 lg:block"
      aria-hidden
    >
      <span className="text-ink">{current}</span>
      <span className="mx-1.5 text-line">/</span>
      <span>06</span>
    </div>
  );
}
