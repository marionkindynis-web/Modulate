type CardProps = {
  kicker?: string;
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
};

export function Card({ kicker, title, children, action }: CardProps) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-line bg-surface p-6">
      {kicker ? (
        <p className="mb-3 text-xs font-medium tracking-[0.08em] text-muted uppercase">
          {kicker}
        </p>
      ) : null}
      <h3 className="font-display text-[28px] leading-9 text-ink">{title}</h3>
      <div className="mt-3 flex-1 text-copy">{children}</div>
      {action ? <div className="mt-6">{action}</div> : null}
    </article>
  );
}
