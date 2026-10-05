import { currentTour } from "../data/tours";
import { usePageMeta } from "../lib/usePageMeta";
import { VideoHero } from "../components/VideoHero";
import { TripAtGlance } from "../components/TripAtGlance";
import { ItineraryDay } from "../components/ItineraryDay";
import { InquirySection } from "../components/InquirySection";
import { SectionLabel } from "../components/SectionLabel";
import { Reveal } from "../components/Reveal";
import { MediaFrame } from "../components/MediaFrame";

export default function CurrentTourPage() {
  usePageMeta({
    title: "Kansai Japan Tour | Wayasia.travel",
    description:
      "The Kansai & Japan Journey — November 20–29, 2026. A ten-day guided cultural journey through Koyasan, Osaka, Shirakawa-go, Kanazawa, Kyoto, Miyajima and Hiroshima.",
    path: "/",
  });

  return (
    <>
      <VideoHero
        media={currentTour.hero}
        reel={currentTour.heroReel}
        eyebrow="Current Journey"
        title={currentTour.heroTitle}
        subline={currentTour.dateRange}
        supporting="A curated journey through temples, traditional villages, historic cities, and cultural landmarks across Japan."
        primaryCta={{ label: "Explore the journey", href: "#itinerary" }}
        secondaryCta={{ label: "Inquire about this tour", href: "#inquire" }}
      />

      {/* Large editorial introduction */}
      <section className="bg-ivory py-24 md:py-36" aria-labelledby="journey-intro">
        <div className="container-x grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Reveal>
              <SectionLabel>The Journey</SectionLabel>
              <h2 id="journey-intro" className="display-xl mt-7 text-[clamp(2.4rem,5vw,4.25rem)] text-charcoal">
                A Journey <em className="italic text-bronze">Through</em> Japan
              </h2>
            </Reveal>
            <Reveal delay={0.15} className="mt-10 hidden md:block">
              <MediaFrame
                media={currentTour.intro.image}
                className="aspect-[4/5] w-full"
                sizes="(max-width: 768px) 100vw, 40vw"
                kenBurns
              />
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7 md:pt-14">
            <Reveal delay={0.1}>
              {currentTour.intro.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="body-lg text-smoke">
                  {paragraph}
                </p>
              ))}
              <a
                href="#itinerary"
                className="group mt-9 inline-flex items-center gap-3 border-b border-charcoal/25 pb-1.5 label text-charcoal transition-colors duration-300 hover:border-bronze hover:text-bronze"
              >
                View the full itinerary
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-y-1"
                >
                  ↓
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <TripAtGlance tour={currentTour} />

      {/* Chronological itinerary */}
      <section id="itinerary" className="scroll-mt-24 bg-paper pt-24 md:pt-36" aria-label="Itinerary">
        <div className="container-x grid gap-8 pb-16 md:grid-cols-12 md:pb-24">
          <div className="md:col-span-6">
            <Reveal>
              <SectionLabel>The Itinerary</SectionLabel>
              <h2 className="display-xl mt-7 text-[clamp(2.4rem,5vw,4.25rem)] text-charcoal">
                Ten Days, <em className="italic text-bronze">Day by Day</em>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5 md:col-start-8 md:pt-10">
            <Reveal delay={0.1}>
              <p className="body-lg text-smoke">
                Chronological from arrival at Kansai International Airport to departure —{" "}
                {currentTour.dateRange}.
              </p>
              <p className="mt-5 label text-bronze">
                {currentTour.style} · {currentTour.region}
              </p>
            </Reveal>
          </div>
        </div>

        {currentTour.days.map((day, index) => (
          <ItineraryDay key={day.day} day={day} index={index} />
        ))}
      </section>

      <InquirySection />
    </>
  );
}
