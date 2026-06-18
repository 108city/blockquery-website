/**
 * Central site configuration.
 *
 * "BlockQuery Intelligence" and "BlockQuery Embedded" are working names —
 * rename them here once and every surface updates.
 */

/**
 * SatScore — Bitcoin-only KYT MCP server (self-serve product).
 * Single source of truth for the page, nav, pricing and connect snippet —
 * non-engineers can change any of these in one line.
 */
export const SATSCORE = {
  name: "SatScore",
  route: "/satscore",
  priceSats: 99,
  labelCountClaim: "500M+",
  /** Connect snippet is framed as live. Swap in the real endpoint when ready. */
  mcpLive: true,
  mcpServerUrl: "https://mcp.blockquery.io/satscore", // TODO: confirm final MCP endpoint
} as const;

export const PRODUCTS = {
  intelligence: {
    name: "BlockQuery Intelligence",
    short: "Intelligence",
    href: "/intelligence",
    tagline: "Dashboards and investigations for regulated operators and governments.",
  },
  embedded: {
    name: "BlockQuery Embedded",
    short: "Embedded",
    href: "/embedded",
    tagline: "A specialist embedded in your team. A partner, not a portal.",
  },
  lawFirms: {
    name: "Investigations for law firms",
    short: "Law firm investigations",
    href: "/law-firms",
    tagline: "White-label blockchain investigation behind your practice.",
  },
  satscore: {
    name: `${SATSCORE.name} by BlockQuery`,
    short: SATSCORE.name,
    href: SATSCORE.route,
    tagline: "Bitcoin KYT for AI agents. Risk-check any address, pay per check over Lightning.",
  },
} as const;

/** Site-wide positioning line. */
export const POSITIONING_LINE = "Intel. Insights. Investigations.";

/** Primary marketing CTA destinations. */
export const BOOK_DEMO_HREF = "/contact";
export const DISCOVERY_CALL_HREF = "/contact";
