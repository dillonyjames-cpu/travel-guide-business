import type { ItineraryDay as Day } from "../data/tours";
import { MediaFrame } from "./MediaFrame";
import { Reveal } from "./Reveal";

function DayHeading({ day, tone = "dark" }: { day: Day; tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <>
      <p className={`label flex flex-wrap items-baseline gap-x-4 gap-y-1 ${light ? "text-gold" : "text-bronze"}`}>
        <span className="tabular-nums">Day {String(day.day).padStart(2, "0")}</span>
        <span className={light ? "text-ivory/60" : "text-smoke"}>
          {day.weekday}, {day.dateLabel}
        </span>
      </p>
      <h3
        className={`display-xl mt-5 text-[clamp(2.2rem,4.6vw,3.9rem)] ${light ? "text-ivory" : "text-charcoal"}`}
      >
        {day.title}
      </h3>
      <p className={`label-sm mt-4 ${light ? "text-ivory/55" : "text-smoke/80"}`}>{day.region}</p>
    </>
  );
}

function DayBody({ day, tone = "dark" }: { day: Day; tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <>
      {day.lead && (
        <p
          className={`mt-8 max-w-xl font-display text-[clamp(1.25rem,2vw,1.6rem)] italic leading-snug ${
            light ? "text-ivory/90" : "text-charcoal/85"
          }`}
        >
          {day.lead}
        </p>
      )}
      {day.activities.length > 0 && (
        <ul className={`mt-8 max-w-md border-t ${light ? "border-ivory/20" : "border-charcoal/15"}`}>
          {day.activities.map((activity) => (
            <li
              key={activity}
              className={`border-b py-3 text-[0.95rem] ${
                light ? "border-ivory/15 text-ivory/80" : "border-charcoal/10 text-smoke"
              }`}
            >
              {activity}
            </li>
          ))}
        </ul>
      )}
      {day.placeholder && (
        <p className={`mt-8 max-w-md text-[0.95rem] leading-relaxed ${light ? "text-ivory/70" : "text-smoke"}`}>
          {day.placeholder}
        </p>
      )}
    </>
  );
}

function Caption({ text }: { text?: string }) {
  if (!text) return null;
  return <p className="label-sm mt-4 text-smoke/80">{text}</p>;
}

/** One day of the itinerary, laid out according to its editorial variant. */
export function ItineraryDay({ day, index }: { day: Day; index: number }) {
  const flip = index % 2 === 1;
  const [first, ...rest] = day.media;

  if (day.variant === "quiet" || !first) {
    return (
      <article className="border-t border-charcoal/10 py-20 md:py-28" aria-label={`Day ${day.day}`}>
        <div className="container-x grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <DayHeading day={day} />
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-6 md:col-start-7 md:pt-12">
            <DayBody day={day} />
          </Reveal>
        </div>
      </article>
    );
  }

  if (day.variant === "closing") {
    return (
      <article className="relative overflow-hidden bg-forest-deep" aria-label={`Day ${day.day}`}>
        <MediaFrame media={first} className="absolute inset-0 h-full w-full" grade="hero" kenBurns />
        <div className="container-x relative z-10 flex min-h-[80svh] flex-col justify-end py-24 md:py-32">
          <Reveal className="max-w-2xl">
            <DayHeading day={day} tone="light" />
            <DayBody day={day} tone="light" />
          </Reveal>
        </div>
      </article>
    );
  }

  if (day.variant === "showcase") {
    return (
      <article className="border-t border-charcoal/10 py-20 md:py-28" aria-label={`Day ${day.day}`}>
        <div className="container-x">
          <Reveal>
            <MediaFrame media={first} className="aspect-[4/3] w-full max-w-full md:aspect-[21/9]" kenBurns grade="soft" />
            <Caption text={day.caption} />
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-12">
            <Reveal className={`md:col-span-5 ${flip ? "md:order-2 md:col-start-8" : ""}`}>
              <DayHeading day={day} />
              <DayBody day={day} />
            </Reveal>
            {rest[0] && (
              <Reveal
                delay={0.12}
                className={`md:col-span-6 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-7"} md:pt-16`}
              >
                <MediaFrame media={rest[0]} className="aspect-[4/5] w-full max-w-full" sizes="(max-width: 768px) 100vw, 45vw" />
              </Reveal>
            )}
          </div>
        </div>
      </article>
    );
  }

  if (day.variant === "sequence") {
    return (
      <article className="border-t border-charcoal/10 py-20 md:py-28" aria-label={`Day ${day.day}`}>
        <div className="container-x">
          <div className="grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <DayHeading day={day} />
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-6 md:col-start-7 md:pt-12">
              <DayBody day={day} />
            </Reveal>
          </div>
          <div className="mt-16 grid gap-5 sm:grid-cols-3">
            {day.media.map((media, i) => (
              <Reveal key={media.image} delay={i * 0.1} className={i === 1 ? "sm:mt-16" : ""}>
                <MediaFrame media={media} className="aspect-[3/4] w-full max-w-full" sizes="(max-width: 640px) 100vw, 33vw" />
              </Reveal>
            ))}
          </div>
          <Caption text={day.caption} />
        </div>
      </article>
    );
  }

  // split
  return (
    <article className="border-t border-charcoal/10 py-20 md:py-28" aria-label={`Day ${day.day}`}>
      <div className="container-x grid items-center gap-10 md:grid-cols-12 md:gap-16">
        <Reveal className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}>
          <MediaFrame media={first} className="aspect-[4/3] w-full max-w-full" sizes="(max-width: 768px) 100vw, 55vw" kenBurns />
          {rest[0] && (
            <MediaFrame
              media={rest[0]}
              className="ml-auto mt-5 aspect-[16/10] w-2/3 max-w-full"
              sizes="(max-width: 768px) 66vw, 35vw"
            />
          )}
          <Caption text={day.caption} />
        </Reveal>
        <Reveal delay={0.1} className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}>
          <DayHeading day={day} />
          <DayBody day={day} />
        </Reveal>
      </div>
    </article>
  );
}
