import { Scale, Search, Banknote, Wallet, Fingerprint, Network, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Generative, on-brand cover for Insights articles. Reflects the article topic
 * (derived from the title) and renders in the Forensic Deep palette with the
 * BlockQuery wordmark — replacing the legacy uploaded covers. Flat surfaces only.
 * The title isn't drawn here; it sits adjacent in the card/article header.
 */

const TOPICS: { test: RegExp; label: string; Icon: LucideIcon }[] = [
  { test: /phish|fraud|scam|iceberg|billion/i, label: "Fraud investigation", Icon: Fingerprint },
  { test: /froze?n|freeze|crisis|unthinkable/i, label: "Wallet crisis", Icon: Wallet },
  { test: /divorce|due diligence|whale|forensic/i, label: "Forensics", Icon: Search },
  { test: /recover|stolen|reclaim|justice/i, label: "Asset recovery", Icon: Banknote },
  { test: /inheritance|estate|romania|serbia|brazil|canada|netherland|protocol|roadmap|judicial|regulat|frontier|legal/i, label: "Legal & jurisdictions", Icon: Scale },
];
const DEFAULT_TOPIC = { label: "On-chain intelligence", Icon: Network };

const topicFor = (title: string) => TOPICS.find((t) => t.test.test(title)) ?? DEFAULT_TOPIC;

/** Display-only: surface the current brand name for legacy DB content. */
export const cleanBrand = (s: string) =>
  s.replace(/Chainlabs Investigations?/gi, "BlockQuery").replace(/Chainlabs/gi, "BlockQuery");

const seedOf = (s: string) => Array.from(s).reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
const caseRef = (seed: number) => "BQ-" + ("0000" + (seed % 0xffff).toString(16)).slice(-4).toUpperCase();

/** Faint node-trace decoration; position/rotation varies per article. */
const NodeField = ({ seed }: { seed: number }) => {
  const rot = (seed % 24) - 12;
  const dx = (seed % 40) - 20;
  return (
    <svg
      viewBox="0 0 240 160"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <g
        transform={`translate(${120 + dx} 80) rotate(${rot}) translate(-120 -80)`}
        stroke="hsl(var(--brand))"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="hsl(var(--brand))"
      >
        <line x1="40" y1="40" x2="120" y2="80" />
        <line x1="40" y1="120" x2="120" y2="80" />
        <line x1="120" y1="80" x2="200" y2="40" />
        <line x1="120" y1="80" x2="205" y2="120" />
        <circle cx="40" cy="40" r="5" fill="none" />
        <circle cx="40" cy="120" r="5" fill="none" />
        <circle cx="120" cy="80" r="6" />
        <circle cx="200" cy="40" r="5" fill="none" />
        <circle cx="205" cy="120" r="4" />
      </g>
    </svg>
  );
};

interface ArticleCoverProps {
  title: string;
  className?: string;
  /** Tighter type for small card thumbnails. */
  compact?: boolean;
}

const ArticleCover = ({ title, className, compact = false }: ArticleCoverProps) => {
  const { label, Icon } = topicFor(title);
  const seed = seedOf(title);

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-card", className)}>
      {/* faint node-trace + large topic watermark */}
      <div className="absolute inset-0 opacity-[0.08]">
        <NodeField seed={seed} />
      </div>
      <Icon
        className="absolute -bottom-5 -right-4 h-32 w-32 text-brand opacity-[0.06]"
        strokeWidth={1}
        aria-hidden="true"
      />

      <div className="relative flex h-full flex-col justify-between p-5">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-tint">
            <Icon className="h-4 w-4 text-brand" strokeWidth={1.75} />
          </span>
          <span className="rounded-full bg-brand-tint px-2.5 py-1 text-[11px] font-medium text-brand">
            {label}
          </span>
        </div>

        <div className="flex items-end justify-between">
          <span className={cn("font-medium tracking-[-0.3px]", compact ? "text-sm" : "text-base")}>
            <span className="text-foreground">Block</span>
            <span className="text-brand">Query</span>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {caseRef(seed)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCover;
