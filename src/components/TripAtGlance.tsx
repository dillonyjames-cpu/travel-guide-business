import type { Tour } from "../data/tours";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

/** The journey's key facts and its route, drawn from the itinerary itself. */
export function TripAtGlance({ tour }: { tour: Tour }) {
  const facts = [
    { label: "Dates", value: tour.dateRange },
    { label: "Duration", value: tour.duration },
    { label: "Region", value: tour.region },
    { label: "Style", value: tour.style },
  ];

  const stops = tour.days
    .filter((day) => day.variant !== "quiet" && day.variant !== "closing")
    .flatMap((day) =>
      day.title
        .replace(/^Arrival in /, "")
        .split(/\s*(?:→|&)\s*/)
        .map((place) => ({ place, day: day.day })),
    );

  return (
    <section className="bg-forest-deep py-20 text-ivory md:py-28" aria-labelledby="at-a-glance">
      <div className="container-x">
        <Reveal>
          <SectionLabel tone="light">At a Glance</SectionLabel>
          <h2 id="at-a-glance" className="sr-only">
            The journey at a glance
          </h2>
        </Reveal>

        <dl className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 border-t border-ivory/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label} className="min-w-0">
              <dt className="label-sm text-ivory/50">{fact.label}</dt>
              <dd className="mt-3 font-display text-[1.7rem] font-light leading-tight text-ivory">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 border-t border-ivory/15 pt-10">
          <p className="label-sm text-ivory/50">The Route</p>
          <ol className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-4">
            {stops.map((stop, i) => (
              <li key={`${stop.place}-${stop.day}`} className="flex items-baseline gap-3">
                <span className="flex items-baseline gap-2">
                  <span className="label-sm tabular-nums text-gold/80">D{stop.day}</span>
                  <span className="font-display text-xl text-ivory md:text-2xl">{stop.place}</span>
                </span>
                {i < stops.length - 1 && (
                  <span aria-hidden="true" className="text-gold/60">
                    —
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
