import { currentTour, upcomingTour } from "../data/tours";

export function SiteFooter() {
  return (
    <footer className="bg-forest-deep py-16 text-ivory/70">
      <div className="container-x grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="label text-ivory">
            Wayasia<span className="text-gold">.</span>travel
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            Guided cultural journeys through Japan: temples, traditional villages and historic cities.
          </p>
        </div>
        <div className="md:col-span-3 md:col-start-7">
          <p className="label-sm text-gold">Current Journey</p>
          <p className="mt-3 font-display text-xl text-ivory">{currentTour.name}</p>
          <p className="mt-1 text-sm">{currentTour.dateRange}</p>
        </div>
        <div className="md:col-span-3">
          <p className="label-sm text-gold">Next Journey</p>
          <p className="mt-3 font-display text-xl text-ivory">Coming Soon</p>
          <p className="mt-1 text-sm">{upcomingTour.announcement}</p>
        </div>
      </div>
      <div className="container-x mt-14 border-t border-ivory/10 pt-6 text-xs text-ivory/40">
        © {new Date().getFullYear()} Wayasia.travel
      </div>
    </footer>
  );
}
