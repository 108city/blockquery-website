import { cn } from "@/lib/utils";

/**
 * Blockquery teal node-trace mark — "trace the money, surface the risk".
 * Sized in `em` so it scales with the wordmark's font-size.
 */
export const LogoMark = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 32 32"
    className={className}
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    {/* connectors — navy, emanating from the central hub */}
    <g stroke="hsl(var(--border-strong))" strokeWidth="1.9" strokeLinecap="round">
      <line x1="14.5" y1="16.5" x2="9" y2="11" />
      <line x1="14.5" y1="16.5" x2="20.3" y2="9.2" />
      <line x1="14.5" y1="16.5" x2="10.4" y2="22.6" />
    </g>
    {/* outer nodes */}
    <circle cx="6.5" cy="8.5" r="3" fill="none" stroke="hsl(var(--brand))" strokeWidth="1.8" />
    <circle cx="22.5" cy="6.5" r="3" fill="none" stroke="hsl(var(--brand))" strokeWidth="1.8" />
    <circle cx="22.5" cy="6.5" r="1.35" fill="hsl(var(--brand))" />
    <circle cx="8.5" cy="25.5" r="3" fill="none" stroke="hsl(var(--border-strong))" strokeWidth="1.8" />
    {/* central hub — drawn last so the connectors read as emanating from it */}
    <circle cx="14.5" cy="16.5" r="3.3" fill="hsl(var(--brand))" />
  </svg>
);

interface LogoProps {
  /** Extra classes on the outer wrapper */
  className?: string;
  /** Tailwind text-size class that drives both the wordmark and the mark scale */
  size?: string;
  /** Show the node-trace mark to the left of the wordmark */
  withMark?: boolean;
}

/**
 * Blockquery wordmark: `block` in primary text colour, `query` in brand teal.
 * Always lowercase, medium weight, slight negative tracking.
 */
const Logo = ({ className, size = "text-2xl", withMark = true }: LogoProps) => (
  <span className={cn("inline-flex items-center gap-2 leading-none", size, className)}>
    {withMark && <LogoMark className="h-[1.05em] w-[1.05em] shrink-0" />}
    <span className="font-medium tracking-[-0.5px]">
      <span className="text-foreground">block</span>
      <span className="text-brand">query</span>
    </span>
  </span>
);

export default Logo;
