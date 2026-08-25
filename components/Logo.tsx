import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";

type LogoProps = {
  variant?: "horizontal" | "picto";
  className?: string;
  priority?: boolean;
};

export function Logo({
  variant = "horizontal",
  className = "",
  priority = false,
}: LogoProps) {
  if (variant === "picto") {
    return (
      <Image
        src="/brand/logo-picto.svg"
        alt={site.name}
        width={40}
        height={40}
        className={className}
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
        className="h-9 w-auto lg:h-10"
        priority={priority}
      />
    </Link>
  );
}
