import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";

type LogoProps = {
  variant?: "horizontal" | "picto";
  className?: string;
  priority?: boolean;
  /** White lockup for dark surfaces */
  inverted?: boolean;
};

export function Logo({
  variant = "horizontal",
  className = "",
  priority = false,
  inverted = false,
}: LogoProps) {
  if (variant === "picto") {
    return (
      <Image
        src="/brand/logo-picto.svg"
        alt={site.name}
        width={40}
        height={40}
        className={`${inverted ? "brightness-0 invert" : ""} ${className}`}
        priority={priority}
        unoptimized
      />
    );
  }

  return (
    <Link href="/" className={`inline-flex items-center ${className}`}>
      <Image
        src="/brand/logo-horizontal.png"
        alt={`${site.name} — ${site.taglineLockup}`}
        width={960}
        height={336}
        className={`h-9 w-auto transition-[filter] duration-300 lg:h-10 ${
          inverted ? "brightness-0 invert" : ""
        }`}
        priority={priority}
      />
    </Link>
  );
}
