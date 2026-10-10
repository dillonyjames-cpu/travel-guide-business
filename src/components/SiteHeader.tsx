import { useEffect, useState } from "react";

const links = [
  { label: "The Journey", href: "#journey-intro" },
  { label: "Itinerary", href: "#itinerary" },
  { label: "Inquire", href: "#inquire" },
];

/** Transparent over the hero, settling onto a solid bar once the page scrolls. */
export function SiteHeader() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-colors duration-500 ${
        solid ? "bg-forest-deep/95 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <a href="#top" className="label whitespace-nowrap text-ivory">
          Wayasia<span className="text-gold">.</span>travel
        </a>
        <nav aria-label="Main">
          <ul className="flex items-center gap-5 sm:gap-9">
            {links.map((link) => (
              <li key={link.href} className={link.href === "#inquire" ? "" : "hidden sm:block"}>
                <a href={link.href} className="label-sm text-ivory/80 transition-colors hover:text-gold">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
