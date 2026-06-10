/**
 * Central site configuration.
 *
 * "BlockQuery Intelligence" and "BlockQuery Embedded" are working names —
 * rename them here once and every surface updates.
 */

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
  walletChecker: {
    name: "Wallet Checker by BlockQuery",
    short: "Wallet Checker",
    href: "/wallet-checker",
    tagline: "Paste an address. Get a verdict. Self-serve KYT.",
  },
} as const;

/** Site-wide positioning line. */
export const POSITIONING_LINE = "Trace the money. Surface the risk.";

/**
 * The live Wallet Checker app. Hand-off target for "Open Wallet Checker".
 * Single source of truth — it will move to a blockquery.io subdomain later.
 */
export const WALLET_CHECKER_APP_URL = "https://turkish-kyt.chainprint.tech";

/** Primary marketing CTA destinations. */
export const BOOK_DEMO_HREF = "/contact";
export const DISCOVERY_CALL_HREF = "/contact";
