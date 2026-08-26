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
  const [onDark, setOnDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      root.style.setProperty("--scroll-progress", String(progress));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        if (match) {
          setCurrent(match.label);
          setOnDark(match.id === "home-hero" || match.id === "home-cta");
        }
      },
      { threshold: [0.2, 0.4, 0.55], rootMargin: "-18% 0px -40% 0px" },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden />

      <nav className="home-chapter-rail" aria-label="Chapitres">
        {CHAPTERS.map((chapter) => (
          <a
            key={chapter.id}
            href={`#${chapter.id}`}
            className={`${current === chapter.label ? "is-active" : ""} ${
              onDark ? "is-on-dark" : ""
            }`}
            aria-current={current === chapter.label ? "true" : undefined}
          >
            {chapter.label}
          </a>
        ))}
      </nav>

      <div
        className={`home-chapter-indicator pointer-events-none fixed right-4 bottom-6 z-30 hidden font-display text-[0.75rem] tracking-[0.16em] tabular-nums md:right-8 md:bottom-8 lg:block ${
          onDark ? "text-white/70" : "text-muted"
        }`}
        aria-hidden
      >
        <span className={onDark ? "text-white" : "text-ink"}>{current}</span>
        <span className="mx-1.5 opacity-40">/</span>
        <span>06</span>
      </div>
    </>
  );
}
