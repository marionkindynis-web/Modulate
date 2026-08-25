import type { Pathname } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";

type ButtonVariant = "primary" | "secondary" | "text" | "inverted";

type CommonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "inline-flex min-h-11 items-center justify-center rounded-sm bg-ink px-6 text-[0.9375rem] font-medium tracking-wide text-white transition-[transform,background-color] duration-200 ease-out hover:bg-[#12122a] disabled:cursor-not-allowed disabled:opacity-50",
  secondary:
    "inline-flex min-h-11 items-center justify-center rounded-sm border border-line bg-transparent px-6 text-[0.9375rem] font-medium text-ink transition-colors duration-200 hover:border-ink disabled:cursor-not-allowed disabled:opacity-50",
  inverted:
    "inline-flex min-h-11 items-center justify-center rounded-sm bg-white px-6 text-[0.9375rem] font-medium tracking-wide text-ink transition-colors duration-200 hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50",
  text: "inline-flex min-h-11 items-center text-[0.9375rem] font-medium text-ink transition-transform duration-200 hover:translate-x-1",
};

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${variantClass[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: CommonProps & { href: Pathname }) {
  return (
    <Link href={href} className={`${variantClass[variant]} ${className}`}>
      {children}
    </Link>
  );
}
