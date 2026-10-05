# Supplied footage

Drop the WAYASIA.TRAVEL video files here, then reference them from `src/data/tours.ts`
on any media entry:

```ts
{
  image: "/media/koyasan-temple-1920.jpg",
  alt: "Temple architecture at Koyasan surrounded by autumn forest",
  video: "/videos/koyasan.mp4",   // ← added when the file exists
  poster: "/media/koyasan-temple-960.jpg", // optional, defaults to the still image
}
```

## Header / hero reel

The homepage header background is a rotating reel of the journey's places
(`heroReel` in `src/data/tours.ts`). Each stop probes for its video at runtime:

- File present → the video plays for that stop (muted, looping).
- File absent → the still photograph shows with a slow ken-burns drift.

So footage can be dropped in at any time — no code changes needed. Expected
reel filenames: wayasia-hero.mp4, kansai-arrival.mp4, koyasan.mp4, osaka.mp4,
shirakawago.mp4, kyoto-night.mp4, miyajima.mp4.

Behaviour:

- Video plays muted, looping, autoplaying (no controls, decorative).
- The still image stays underneath as poster/fallback, so a missing or slow file
  never leaves a blank section.
- Sections below the hero lazy-load; only the hero video is preloaded.

Suggested filenames already wired as comments in `src/data/tours.ts`:

- wayasia-hero.mp4 (homepage hero)
- kansai-arrival.mp4, koyasan.mp4, osaka.mp4, shirakawago.mp4,
  gosho-house.mp4, kanazawa.mp4, kyoto-night.mp4, miyajima.mp4
