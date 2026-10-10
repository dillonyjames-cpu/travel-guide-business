import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { Media } from "../lib/media";
import { imageSrcSet } from "../lib/media";
import { useAvailableVideos } from "../lib/useAvailableVideos";
import { MediaPlaceholder } from "./MediaPlaceholder";

/**
 * A still (or footage, when the file exists) cropped to its frame. A colour
 * placeholder sits underneath, so missing or slow media never leaves a hole.
 */
export function MediaFrame({
  media,
  className = "",
  sizes = "100vw",
  priority = false,
  kenBurns = false,
  grade,
}: {
  media: Media;
  className?: string;
  sizes?: string;
  priority?: boolean;
  kenBurns?: boolean;
  grade?: "hero" | "soft";
}) {
  const reduceMotion = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const available = useAvailableVideos([media.video]);
  const video = media.video && available.has(media.video) ? media.video : undefined;
  const position = /\babsolute\b|\bfixed\b/.test(className) ? "" : "relative";

  return (
    <div className={`${position} overflow-hidden bg-forest-deep ${className}`}>
      <MediaPlaceholder image={media.image} showLabel={!grade || grade === "soft"} />
      {!failed && (
        <img
          src={media.image}
          srcSet={imageSrcSet(media.image)}
          sizes={sizes}
          alt={media.alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover ${
            kenBurns && !reduceMotion && !video ? "ken-burns" : ""
          }`}
        />
      )}
      {failed && <span className="sr-only">{media.alt}</span>}
      {video && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload={priority ? "auto" : "none"}
          poster={media.poster ?? media.image}
        >
          <source src={video} type="video/mp4" />
        </video>
      )}
      {grade === "hero" && <div aria-hidden="true" className="absolute inset-0 media-grade" />}
      {grade === "soft" && <div aria-hidden="true" className="absolute inset-0 media-grade-soft" />}
    </div>
  );
}
