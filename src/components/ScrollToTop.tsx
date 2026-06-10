import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * On navigation, scroll to the top — unless the URL carries a hash, in which
 * case scroll the matching section into view. This makes deep links and the
 * /intelligence#anchor redirects (law-firms, igaming, government, …) land in
 * the right place. Sections use `scroll-mt-*` to clear the fixed nav.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      // Defer until the target section has rendered/painted.
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "auto", block: "start" });
        } else {
          window.scrollTo(0, 0);
        }
      });
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
