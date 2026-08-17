type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export function Section({ children, className = "", id }: SectionProps) {
  return (
    <section id={id} className={`py-12 md:py-20 lg:py-28 ${className}`}>
      <div className="container-site">{children}</div>
    </section>
  );
}

export function PageIntro({
  kicker,
  title,
  intro,
}: {
  kicker: string;
  title: string;
  intro: string;
}) {
  return (
    <header className="max-w-3xl">
      <p className="text-xs font-medium tracking-[0.08em] text-muted uppercase">
        {kicker}
      </p>
      <h1 className="mt-4 text-[40px] leading-12 md:text-[48px] md:leading-14 lg:text-[56px] lg:leading-16">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-copy">{intro}</p>
    </header>
  );
}
