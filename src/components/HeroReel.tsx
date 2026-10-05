import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { Media } from "../lib/media";
import { imageSrcSet } from "../lib/media";
import { useAvailableVideos } from "../lib/useAvailableVideos";

/** How long each stop on the reel stays on screen. */
const SLIDE_MS = 7000;

/**
 * The footage layer for one reel stop. Mounted only while the stop is active so
 * at most one video decodes at a time; fades in once it can actually play.
 */
function ReelVideo({ src, poster }: { src: string; poster: string }) {
  const [ready, setReady] = useState(false);

  return (
    <video
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      onCanPlay={() => setReady(true)}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

/**
 * Rotating cinematic background used behind the header/hero.
 *
 * Crossfades through the journey's places in itinerary order. Each stop plays
 * its video when the file exists in public/videos (probed at runtime) and
 * falls back to the still photograph — with a slow ken-burns drift — when it
 * does not, so the reel works before any footage is supplied and picks up new
 * files with no code changes.
 */
export function HeroReel({ slides, className = "" }: { slides: Media[]; className?: string }) {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(true);
  const available = useAvailableVideos(slides.map((slide) => slide.video));

  // Only rotate while the hero is actually on screen.
  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.05,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion || !inView || slides.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [slides.length, reduceMotion, inView]);

  return (
    <div ref={rootRef} className={`overflow-hidden bg-forest-deep ${className}`}>
      {slides.map((slide, i) => {
        const active = i === index;
        const video = slide.video && available.has(slide.video) ? slide.video : undefined;
        return (
          <div
            key={slide.image}
            aria-hidden="true"
            className={`absolute inset-0 transition-opacity ease-in-out duration-[1600ms] ${
              active ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              srcSet={imageSrcSet(slide.image)}
              sizes="100vw"
              alt=""
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
              decoding="async"
              className={`absolute inset-0 h-full w-full object-cover ${
                active && !video && !reduceMotion ? "ken-burns" : ""
              }`}
            />
            {active && video && <ReelVideo src={video} poster={slide.poster ?? slide.image} />}
          </div>
        );
      })}
      <div aria-hidden="true" className="absolute inset-0 media-grade" />
    </div>
  );
}
