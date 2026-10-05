import { useEffect, useState } from "react";

/**
 * Probes a list of optional video paths (HEAD request + video content-type) and
 * returns the set of paths that actually exist on the server.
 *
 * This lets sections reference footage (e.g. "/videos/koyasan.mp4") before the
 * file has been supplied: missing files are simply skipped and the still image
 * carries the section, while dropped-in files start playing without code edits.
 */
export function useAvailableVideos(paths: (string | undefined)[]): Set<string> {
  const key = paths.filter(Boolean).join("|");
  const [available, setAvailable] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    if (!key) {
      setAvailable(new Set());
      return;
    }
    let cancelled = false;

    const probe = async (path: string): Promise<string | null> => {
      try {
        const res = await fetch(path, { method: "HEAD" });
        const type = res.headers.get("content-type") ?? "";
        // A SPA dev server may answer unknown paths with index.html (200 + text/html),
        // so require a video content type before treating the file as present.
        if (res.ok && type.includes("video")) return path;
      } catch {
        // Network error → treat as absent; the still fallback already renders.
      }
      return null;
    };

    Promise.all(key.split("|").map(probe)).then((found) => {
      if (cancelled) return;
      setAvailable(new Set(found.filter((path): path is string => path !== null)));
    });

    return () => {
      cancelled = true;
    };
  }, [key]);

  return available;
}
