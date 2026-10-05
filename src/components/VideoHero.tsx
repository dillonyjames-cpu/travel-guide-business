import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { Media } from "../lib/media";
import { MediaFrame } from "./MediaFrame";
import { HeroReel } from "./HeroReel";
import { ButtonLink } from "./ButtonLink";
import { SectionLabel } from "./SectionLabel";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.25 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } },
};

/**
 * Full-screen cinematic hero. When a `reel` is supplied, the background rotates
 * through the journey's places (video where the file exists, stills otherwise).
 * Otherwise video plays when the media entry supplies footage, and the still
 * image carries a slow ken-burns drift under the grade.
 */
export function VideoHero({
  media,
  reel,
  eyebrow,
  title,
  subline,
  statement,
  supporting,
  primaryCta,
  secondaryCta,
  children,
}: {
  media: Media;
  /** Rotating sequence of places shown behind the header/hero */
  reel?: Media[];
  eyebrow?: string;
  title: string;
  subline?: string;
  statement?: string;
  supporting?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  children?: ReactNode;
}) {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-forest-deep">
      {reel && reel.length > 0 ? (
        <HeroReel slides={reel} className="absolute inset-0 h-full w-full" />
      ) : (
        <MediaFrame
          media={media}
          className="absolute inset-0 h-full w-full"
          priority
          kenBurns
          grade="hero"
          sizes="100vw"
        />
      )}

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end">
        <div className="container-x w-full pb-24 pt-32 md:pb-28 lg:pb-32">
          <motion.div variants={container} initial="hidden" animate="show">
            {eyebrow && (
              <motion.div variants={item}>
                <SectionLabel tone="light">{eyebrow}</SectionLabel>
              </motion.div>
            )}

            <motion.h1
              variants={item}
              className="display-xl mt-7 text-[clamp(3rem,10.5vw,9.5rem)] text-ivory"
            >
              {title}
            </motion.h1>

            {subline && (
              <motion.p variants={item} className="mt-6 label text-gold">
                {subline}
              </motion.p>
            )}

            {statement && (
              <motion.p
                variants={item}
                className="mt-7 max-w-3xl font-display text-[clamp(1.3rem,2.6vw,2.1rem)] font-light italic leading-snug text-ivory/90"
              >
                {statement}
              </motion.p>
            )}

            {supporting && (
              <motion.p
                variants={item}
                className="mt-7 max-w-xl text-[0.98rem] leading-relaxed text-ivory/75 md:text-lg"
              >
                {supporting}
              </motion.p>
            )}

            {(primaryCta || secondaryCta) && (
              <motion.div
                variants={item}
                className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5"
              >
                {primaryCta && (
                  <ButtonLink href={primaryCta.href} variant="light-solid">
                    {primaryCta.label}
                  </ButtonLink>
                )}
                {secondaryCta && (
                  <ButtonLink href={secondaryCta.href} variant="light-outline">
                    {secondaryCta.label}
                  </ButtonLink>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {children}

      <div className="pointer-events-none absolute bottom-10 right-8 z-10 hidden items-center gap-4 lg:flex">
        <span className="label-sm text-ivory/55 [writing-mode:vertical-rl]">Scroll</span>
        <span className="relative h-16 w-px overflow-hidden bg-ivory/25">
          <span className="scroll-line absolute inset-0 bg-gold" />
        </span>
      </div>
    </section>
  );
}
