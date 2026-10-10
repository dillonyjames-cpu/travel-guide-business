import type { ReactNode } from "react";

export function SectionLabel({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <p className={`label flex items-center gap-4 ${tone === "light" ? "text-gold" : "text-bronze"}`}>
      <span aria-hidden="true" className={`h-px w-10 ${tone === "light" ? "bg-gold/70" : "bg-bronze/60"}`} />
      {children}
    </p>
  );
}
