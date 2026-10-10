import { placeLabel, placeholderStyle } from "../lib/media";

/**
 * Colour field shown beneath every image. It is what visitors see until the
 * photograph exists in public/media, and it never flashes blank while one loads.
 */
export function MediaPlaceholder({ image, showLabel = true }: { image: string; showLabel?: boolean }) {
  return (
    <div aria-hidden="true" className="absolute inset-0" style={placeholderStyle(image)}>
      {showLabel && (
        <span className="label-sm absolute bottom-4 left-4 text-ivory/45">{placeLabel(image)}</span>
      )}
    </div>
  );
}
