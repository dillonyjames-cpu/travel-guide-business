import { useEffect } from "react";

const SITE_URL = "https://wayasia.travel";

function setMeta(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

/** Sets the document title, description and canonical URL for a page. */
export function usePageMeta({ title, description, path }: { title: string; description: string; path: string }) {
  useEffect(() => {
    document.title = title;
    setMeta(
      'meta[name="description"]',
      () => Object.assign(document.createElement("meta"), { name: "description" }),
      "content",
      description,
    );
    setMeta(
      'link[rel="canonical"]',
      () => Object.assign(document.createElement("link"), { rel: "canonical" }),
      "href",
      `${SITE_URL}${path}`,
    );
  }, [title, description, path]);
}
