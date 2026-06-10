export function transformRichTextHtml(html: string): string {
  if (!html) return html;

  try {
    const doc = new DOMParser().parseFromString(html, "text/html");

    const normalizeUrl = (raw: string) => {
      const s = (raw || "").trim();
      if (!s) return s;

      // Handle common CMS/editor outputs that omit protocol
      if (/^www\./i.test(s)) return `https://${s}`;
      if (/^(youtube\.com|m\.youtube\.com|youtu\.be|youtube-nocookie\.com)\//i.test(s)) return `https://${s}`;
      return s;
    };

    const extractYouTubeId = (rawUrl: string): string | null => {
      const url = normalizeUrl(rawUrl);

      try {
        const u = new URL(url);
        const host = u.hostname.replace(/^www\./, "");

        // youtu.be/<id>
        if (host === "youtu.be") {
          const id = u.pathname.split("/").filter(Boolean)[0];
          return id || null;
        }

        // youtube.com / m.youtube.com / youtube-nocookie.com
        if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
          // /watch?v=<id>
          const v = u.searchParams.get("v");
          if (v) return v;

          // /embed/<id>
          const parts = u.pathname.split("/").filter(Boolean);
          const embedIndex = parts.indexOf("embed");
          if (embedIndex >= 0 && parts[embedIndex + 1]) return parts[embedIndex + 1];
        }

        return null;
      } catch {
        return null;
      }
    };

    const createYouTubeEmbed = (videoId: string) => {
      const wrapper = doc.createElement("div");
      wrapper.className = "youtube-embed";

      const iframe = doc.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${videoId}`;
      iframe.title = "YouTube video";
      iframe.setAttribute(
        "allow",
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      );
      iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      iframe.allowFullscreen = true;

      wrapper.appendChild(iframe);
      return wrapper;
    };

    // 1) Normalize/upgrade links and convert YouTube links (<a href="..."></a>) to embeds
    const anchors = Array.from(doc.querySelectorAll("a[href]")) as HTMLAnchorElement[];
    for (const a of anchors) {
      const rawHref = a.getAttribute("href") || "";
      const href = normalizeUrl(rawHref);

      // Normalize common "www." / bare-domain links so they actually work when clicked
      if (href !== rawHref) a.setAttribute("href", href);
      if (/^[a-z0-9.-]+\.[a-z]{2,}(?:[/?#].*)?$/i.test(href) && !/^[a-z][a-z0-9+.-]*:/.test(href)) {
        a.setAttribute("href", `https://${href}`);
      }

      // Ensure all links open in a new tab when reading articles
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");

      const finalHref = a.getAttribute("href") || "";
      const videoId = extractYouTubeId(finalHref);
      if (!videoId) continue;

      a.replaceWith(createYouTubeEmbed(videoId));
    }

    // 2) Convert plain-text YouTube URLs (common when users just paste a URL)
    // We handle:
    // - a whole element containing ONLY the URL
    // - a text node inside a paragraph/span that is ONLY the URL

    const isBareUrlText = (s: string) => {
      const t = (s || "").trim();
      if (!t) return false;
      // Accept common youtube URL forms (with or without protocol)
      return /^(https?:\/\/)?(www\.)?(youtube\.com|m\.youtube\.com|youtu\.be)\//i.test(t);
    };

    // 2a) element-level conversion (fast path)
    const maybeUrlBlocks = Array.from(doc.querySelectorAll("p, div, li")) as HTMLElement[];
    for (const el of maybeUrlBlocks) {
      const text = (el.textContent || "").trim();
      if (!isBareUrlText(text)) continue;

      // Don’t convert if the element already has a link/embed/media
      if (el.querySelector("a, iframe, img")) continue;

      const videoId = extractYouTubeId(text);
      if (!videoId) continue;

      el.replaceWith(createYouTubeEmbed(videoId));
    }

    // 2b) text-node conversion (Google Docs often wraps URLs in spans)
    const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
    const textNodes: Text[] = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode as Text);
    }

    for (const node of textNodes) {
      const t = (node.textContent || "").trim();
      if (!isBareUrlText(t)) continue;

      const parent = node.parentElement;
      if (!parent) continue;
      if (parent.closest("a, .youtube-embed")) continue;

      const videoId = extractYouTubeId(t);
      if (!videoId) continue;

      parent.replaceWith(createYouTubeEmbed(videoId));
    }

    return doc.body.innerHTML;
  } catch {
    return html;
  }
}

