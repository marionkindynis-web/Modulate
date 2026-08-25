"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/Button";

export function HomeHero() {
  const t = useTranslations("Home");
  const mistRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mist = mistRef.current;
    if (!mist) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 12;
      const y = (event.clientY / window.innerHeight - 0.5) * 8;
      mist.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section
      id="home-hero"
      className="hero-dark relative isolate flex min-h-[min(100svh,56rem)] flex-col justify-end overflow-hidden pb-20 pt-[calc(4.25rem+4rem)] -mt-[4.25rem] md:justify-center md:pb-28 md:pt-[calc(4.75rem+5rem)] lg:-mt-[4.75rem]"
      data-home-chapter="00"
    >
      <div
        ref={mistRef}
        className="hero-dark-mist pointer-events-none absolute inset-0 -z-10 transition-transform duration-700 ease-out"
        aria-hidden
      />
      <div className="hero-dark-grain pointer-events-none absolute inset-0 -z-10" aria-hidden />

      <div className="container-site">
        <div className="max-w-3xl">
          <p className="type-brand text-white motion-rise">{t("kicker")}</p>
          <span className="accent-rule motion-rise motion-rise-delay-1 mt-6" />
          <h1 className="type-display-xl mt-8 text-white motion-rise motion-rise-delay-1">
            {t("title")}
          </h1>
          <p className="type-body-lg mt-6 max-w-xl text-white/65 motion-rise motion-rise-delay-2">
            {t("intro")}
          </p>
          <div className="motion-rise motion-rise-delay-3 mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/contact" variant="inverted">
              {t("primaryCta")}
            </ButtonLink>
            <ButtonLink href="/notre-approche" variant="ghost">
              {t("secondaryCta")}
              <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </ButtonLink>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[var(--color-canvas)]"
        aria-hidden
      />
    </section>
  );
}
