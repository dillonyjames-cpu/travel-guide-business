export type Media = {
  /** Largest still, named `<name>-1920.jpg`; a `-960.jpg` sibling is used for smaller screens */
  image: string;
  alt: string;
  /** Optional footage in public/videos — played only when the file exists */
  video?: string;
  /** Video poster; defaults to the still image */
  poster?: string;
};

/** Builds a srcset from the `-1920` naming convention used in public/media. */
export function imageSrcSet(image: string): string | undefined {
  if (!/-1920\.(jpe?g|webp|png)$/.test(image)) return undefined;
  return `${image.replace("-1920.", "-960.")} 960w, ${image} 1920w`;
}

/** "/media/koyasan-temple-1920.jpg" → "Koyasan Temple" */
export function placeLabel(image: string): string {
  const name = image.split("/").pop() ?? image;
  return name
    .replace(/-\d+\.\w+$/, "")
    .replace(/\.\w+$/, "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

type Tone = { base: string; glow: string; shade: string };

// Stand-in colour fields used until real photographs are supplied, keyed by place.
const tones: [RegExp, Tone][] = [
  [/koyasan|hero-kansai|forest/, { base: "#2b3a2c", glow: "#a4552d", shade: "#121a14" }],
  [/osaka|arrival|night/, { base: "#1c2238", glow: "#c98a3c", shade: "#0c0f1c" }],
  [/shirakawago|next-journey/, { base: "#4b5a52", glow: "#c9a46a", shade: "#1f2924" }],
  [/miyajima|torii/, { base: "#2f4652", glow: "#b8452c", shade: "#13212a" }],
  [/traditional|gosho|kanazawa|intro|dinner/, { base: "#4a3626", glow: "#d0a060", shade: "#1f160f" }],
  [/kyoto|temple/, { base: "#3a2f2a", glow: "#c46a3a", shade: "#17110e" }],
  [/hiroshima|departure/, { base: "#3c3a4a", glow: "#d39a6a", shade: "#191824" }],
];

export function placeholderStyle(image: string): { backgroundImage: string; backgroundColor: string } {
  const tone = tones.find(([pattern]) => pattern.test(image))?.[1] ?? tones[0][1];
  return {
    backgroundColor: tone.base,
    backgroundImage: [
      `radial-gradient(ellipse 70% 55% at 72% 30%, ${tone.glow}cc 0%, transparent 70%)`,
      `radial-gradient(ellipse 90% 60% at 20% 110%, ${tone.shade} 0%, transparent 70%)`,
      `linear-gradient(160deg, ${tone.base} 0%, ${tone.shade} 100%)`,
    ].join(", "),
  };
}
