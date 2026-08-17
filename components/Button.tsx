import type { Pathname } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";

type ButtonVariant = "primary" | "secondary" | "text";

type CommonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "inline-flex min-h-11 items-center justify-center rounded-md bg-ink px-5 text-[15px] font-medium text-white transition-[transform,background-color] duration-200 ease-out hover:bg-[#12122a] disabled:cursor-not-allowed disabled:opacity-50",
  secondary:
    "inline-flex min-h-11 items-center justify-center rounded-md border border-line bg-surface px-5 text-[15px] font-medium text-ink transition-colors duration-200 hover:border-ink disabled:cursor-not-allowed disabled:opacity-50",
  text: "inline-flex min-h-11 items-center text-[15px] font-medium text-ink transition-transform duration-200 hover:translate-x-1",
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
