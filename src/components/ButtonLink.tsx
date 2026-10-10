import type { ReactNode } from "react";

type Variant = "light-solid" | "light-outline" | "dark-solid" | "dark-outline";

const variants: Record<Variant, string> = {
  "light-solid": "bg-ivory text-forest-deep hover:bg-gold",
  "light-outline": "border border-ivory/50 text-ivory hover:border-ivory hover:bg-ivory/10",
  "dark-solid": "bg-forest-deep text-ivory hover:bg-bronze",
  "dark-outline": "border border-charcoal/30 text-charcoal hover:border-bronze hover:text-bronze",
};

export function ButtonLink({
  href,
  variant = "dark-solid",
  children,
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={`label inline-flex items-center justify-center px-8 py-4 transition-colors duration-300 ${variants[variant]}`}
    >
      {children}
    </a>
  );
}
