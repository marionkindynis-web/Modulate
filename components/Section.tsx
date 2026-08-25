type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export function Section({ children, className = "", id }: SectionProps) {
  return (
    <section id={id} className={`py-16 md:py-24 lg:py-32 ${className}`}>
      <div className="container-site">{children}</div>
    </section>
  );
}

export function PageIntro({
  kicker,
  title,
  intro,
  brandAsHero = false,
}: {
  kicker: string;
  title: string;
  intro: string;
  /** Home: brand name as hero signal; other pages keep quiet kicker */
  brandAsHero?: boolean;
}) {
  return (
    <header className="max-w-3xl">
      {brandAsHero ? (
        <>
          <p className="type-brand motion-rise">{kicker}</p>
          <span className="accent-rule motion-rise motion-rise-delay-1 mt-6" />
          <h1 className="type-display-xl motion-rise motion-rise-delay-1 mt-8">
            {title}
          </h1>
        </>
      ) : (
        <>
          <p className="type-kicker">{kicker}</p>
          <span className="accent-rule mt-5" />
          <h1 className="type-display-xl mt-6">{title}</h1>
        </>
      )}
      <p
        className={`type-body-lg mt-6 max-w-xl text-muted ${
          brandAsHero ? "motion-rise motion-rise-delay-2" : ""
        }`}
      >
        {intro}
      </p>
    </header>
  );
}

export function SectionHeading({
  kicker,
  title,
  intro,
}: {
  kicker: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="type-kicker">{kicker}</p>
      <h2 className="type-display-lg mt-4">{title}</h2>
      {intro ? <p className="type-body mt-5 max-w-xl text-muted">{intro}</p> : null}
    </div>
  );
}
