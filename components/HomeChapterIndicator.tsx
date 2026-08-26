"use client";

import { useEffect } from "react";

/** Barre de progression en tête — pas de numérotation de chapitres. */
export function HomeChapterIndicator() {
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

  return <div className="scroll-progress" aria-hidden />;
}
