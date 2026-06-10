export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  author_name: string;
  published_at: string | null;
}

/**
 * Classifies an article as a client case study (vs. a thought-leadership
 * insight) from its title, since the CMS has no category field. Catches an
 * explicit "case study", a concrete dollar figure, or a named takedown.
 * Tweak this one expression to re-route articles between the two pages.
 */
const CASE_STUDY_RE = /\bcase study\b|\$\s?[\d.,]+|\bbillion-dollar\b|\bdismantling\b/i;

export const isCaseStudy = (title: string) => CASE_STUDY_RE.test(title);
