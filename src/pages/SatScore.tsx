import { useEffect, useState } from "react";
import {
  Bitcoin,
  Zap,
  Bot,
  Database,
  Plug,
  MessageSquare,
  ArrowRight,
  Check,
  Copy,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SATSCORE, PRODUCTS } from "@/config/site";

const PAGE_TITLE = `${PRODUCTS.satscore.name} — Bitcoin KYT for AI agents`;
const PAGE_DESCRIPTION =
  `Risk-check any Bitcoin address in plain language. ${SATSCORE.priceSats} sats per check over Lightning, ` +
  `no account or credit packs. A Bitcoin-only KYT MCP server for AI agents, backed by BlockQuery's ` +
  `${SATSCORE.labelCountClaim} labelled wallets.`;

const usps: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Database,
    title: `${SATSCORE.labelCountClaim} Bitcoin wallets labelled`,
    body: "Risk scoring backed by one of the largest Bitcoin address-label datasets available.",
  },
  {
    icon: Zap,
    title: "Pay per check, never upfront",
    body: `${SATSCORE.priceSats} sats a check over Lightning. Competitors make you buy thousands of credits first. You pay for exactly what you screen.`,
  },
  {
    icon: Bot,
    title: "Built for agents",
    body: "Give your agent a Lightning balance and it screens counterparties autonomously, paying its own way per call.",
  },
  {
    icon: Bitcoin,
    title: "Bitcoin only, on purpose",
    body: "One chain, done properly — not one of many done shallowly.",
  },
];

const steps: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Plug,
    title: "Connect",
    body: "Add the SatScore MCP server to Claude or your agent.",
  },
  {
    icon: MessageSquare,
    title: "Ask",
    body: "Paste addresses or drop a CSV and ask, in plain language, whether any are risky.",
  },
  {
    icon: Zap,
    title: "Pay as you go",
    body: `${SATSCORE.priceSats} sats per check, settled over Lightning. No subscription.`,
  },
];

/** Illustrative sample of what an agent gets back — truncated, not real wallets. */
const sampleResults = [
  { addr: "bc1q…k4n7", verdict: "Clear", reason: "No sanctions or illicit exposure", cls: "bg-safe-tint text-safe" },
  { addr: "3FZb…r9p2", verdict: "Review", reason: "Mixer exposure, 2 hops to a flagged entity", cls: "bg-risk-tint text-risk" },
  { addr: "1Hx9…q7m3", verdict: "Block", reason: "Direct exposure to a sanctioned address", cls: "bg-danger-tint text-danger" },
];

const SatScore = () => {
  const [copied, setCopied] = useState(false);

  // Per-route SEO (no react-helmet in this project) — set and restore.
  useEffect(() => {
    const prevTitle = document.title;
    const metaEl = document.querySelector('meta[name="description"]');
    const prevDesc = metaEl?.getAttribute("content") ?? null;
    document.title = PAGE_TITLE;
    metaEl?.setAttribute("content", PAGE_DESCRIPTION);
    return () => {
      document.title = prevTitle;
      if (metaEl && prevDesc !== null) metaEl.setAttribute("content", prevDesc);
    };
  }, []);

  const snippet =
    `{\n` +
    `  "mcpServers": {\n` +
    `    "satscore": {\n` +
    `      "url": "${SATSCORE.mcpServerUrl}"\n` +
    `    }\n` +
    `  }\n` +
    `}`;

  const copySnippet = () => {
    navigator.clipboard?.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="w-[34px] h-[34px] rounded-lg bg-brand-tint flex items-center justify-center mb-6">
                <Bitcoin className="w-[18px] h-[18px] text-primary" strokeWidth={1.75} />
              </div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
                {PRODUCTS.satscore.name}
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                The Bitcoin KYT server for AI agents.
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-xl">
                Risk-check any Bitcoin address in plain language. Pay {SATSCORE.priceSats} sats
                per check over Lightning. No account, no credit packs, no other chains — and
                that's the point.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="font-medium" asChild>
                  <a href="#connect">Connect the MCP</a>
                </Button>
                <Button size="lg" variant="outline-white" className="font-medium" asChild>
                  <a href="#pricing">See pricing</a>
                </Button>
              </div>
            </div>

            {/* Sample agent reply — the one place risk colours appear */}
            <div className="border border-border rounded-xl bg-card p-6 sm:p-7">
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  Your agent, in plain language
                </span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Illustrative
                </span>
              </div>
              <p className="text-sm text-foreground mb-5">
                <span className="text-muted-foreground">You: </span>
                Are any of these risky?
              </p>
              <div className="space-y-2.5">
                {sampleResults.map((r) => (
                  <div
                    key={r.addr}
                    className="flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2.5"
                  >
                    <span className="font-mono text-xs text-muted-foreground w-20 shrink-0">{r.addr}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium shrink-0 ${r.cls}`}>
                      {r.verdict}
                    </span>
                    <span className="text-xs text-muted-foreground leading-snug">{r.reason}</span>
                  </div>
                ))}
              </div>
              <p className="font-mono text-[11px] text-muted-foreground mt-5">
                {SATSCORE.priceSats} sats / check · settled over Lightning
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* USP row */}
      <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 bg-card">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-14">
            Why SatScore.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {usps.map((u) => (
              <div key={u.title} className="border border-border rounded-xl p-6 sm:p-8 bg-background flex flex-col">
                <div className="w-[34px] h-[34px] rounded-lg bg-brand-tint flex items-center justify-center mb-6">
                  <u.icon className="w-[18px] h-[18px] text-primary" strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-medium mb-3 leading-snug">{u.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* How it works */}
      <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary text-center mb-4">
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-14">
            Connect, ask, pay as you go.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((s, i) => (
              <div key={s.title} className="border border-border rounded-xl p-6 sm:p-8 bg-card">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-[34px] h-[34px] rounded-lg bg-brand-tint flex items-center justify-center">
                    <s.icon className="w-[18px] h-[18px] text-primary" strokeWidth={1.75} />
                  </div>
                  <span className="font-mono text-sm text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="text-lg font-medium mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Pricing */}
      <section id="pricing" className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 bg-card scroll-mt-20">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10">
            Pay for exactly what you screen.
          </h2>
          <div className="border border-border rounded-xl bg-background p-8 sm:p-10 max-w-md mx-auto">
            <p className="mb-1">
              <span className="font-mono text-4xl sm:text-5xl font-medium text-foreground">{SATSCORE.priceSats} sats</span>
              <span className="text-base text-muted-foreground"> / check</span>
            </p>
            <p className="text-xs text-muted-foreground mb-6">≈ $0.10 per check (approx., floats with BTC)</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              Pay-per-use over Lightning. No subscription, no minimum. No credit packs and no
              upfront commitment — you pay only for what you screen.
            </p>
            <Button className="w-full font-medium" asChild>
              <a href="#connect">Connect the MCP</a>
            </Button>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Connect snippet */}
      <section id="connect" className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 scroll-mt-20">
        <div className="container mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary text-center mb-4">
            Connect
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6">
            Add it to Claude in one step.
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            Add the SatScore MCP server to Claude or any MCP-capable client, point it at one or
            more Bitcoin addresses, and ask.
          </p>

          <div className="border border-border rounded-xl bg-card overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
              <span className="font-mono text-xs text-muted-foreground">claude_desktop_config.json</span>
              <button
                onClick={copySnippet}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="font-mono text-sm text-foreground p-4 sm:p-5 overflow-x-auto leading-relaxed">
              {snippet}
            </pre>
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Works with Claude and any MCP-capable agent. Checks settle over Lightning at{" "}
            {SATSCORE.priceSats} sats each.
          </p>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Roadmap teaser */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            Roadmap
          </p>
          <p className="text-lg text-muted-foreground">
            Richer Bitcoin queries are coming — wallet holdings, activity, and label lookups,
            beyond risk scoring.
          </p>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="w-[34px] h-[34px] rounded-lg bg-brand-tint flex items-center justify-center mb-6 mx-auto">
            <Bitcoin className="w-[18px] h-[18px] text-primary" strokeWidth={1.75} />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Give your agent a KYT capability.
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Connect the SatScore MCP server and screen Bitcoin addresses in plain language,
            {" "}{SATSCORE.priceSats} sats at a time.
          </p>
          <Button size="lg" className="font-medium" asChild>
            <a href="#connect">
              Connect the MCP <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SatScore;
