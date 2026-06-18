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

/** Headline USP — gets the featured treatment in "Why SatScore". */
const featured = {
  icon: Database,
  metric: SATSCORE.labelCountClaim,
  title: "Bitcoin wallets labelled",
  body: "Risk scoring backed by one of the largest Bitcoin address-label datasets available — the depth behind every verdict.",
};

const usps: { icon: LucideIcon; title: string; body: string }[] = [
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

const stats = [
  { value: SATSCORE.labelCountClaim, label: "Bitcoin wallets labelled" },
  { value: `${SATSCORE.priceSats} sats`, label: "Per check, over Lightning" },
  { value: "1 chain", label: "Bitcoin only, on purpose" },
];

/** Faint node-mesh backdrop — flat line-art that echoes the brand mark. */
const NetworkBackdrop = ({ className = "" }: { className?: string }) => (
  <svg
    className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    viewBox="0 0 1200 600"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
    fill="none"
  >
    <path
      stroke="hsl(var(--brand))"
      strokeWidth="1"
      strokeLinecap="round"
      d="M70 120 L300 70 L470 200 M300 70 L520 300 M470 200 L520 300 L760 160 M520 300 L640 470 M760 160 L980 110 L1140 240 M980 110 L1010 360 M760 160 L1010 360 M640 470 L1010 360 M180 360 L520 300 M180 360 L380 520 M640 470 L380 520"
    />
    <g fill="hsl(var(--brand))">
      <circle cx="70" cy="120" r="2.5" />
      <circle cx="300" cy="70" r="3" />
      <circle cx="470" cy="200" r="2" />
      <circle cx="520" cy="300" r="3.5" />
      <circle cx="760" cy="160" r="2.5" />
      <circle cx="640" cy="470" r="2" />
      <circle cx="980" cy="110" r="2.5" />
      <circle cx="1010" cy="360" r="3" />
      <circle cx="1140" cy="240" r="2" />
      <circle cx="180" cy="360" r="2.5" />
      <circle cx="380" cy="520" r="2" />
    </g>
  </svg>
);

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
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 sm:px-6">
        <NetworkBackdrop className="opacity-[0.06]" />
        <div className="container mx-auto max-w-6xl relative">
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

            {/* Sample agent reply — terminal-style, the one place risk colours appear */}
            <div className="border border-border rounded-xl bg-card overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <div className="flex items-center gap-2.5">
                  <span className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-border-strong" />
                    <span className="w-2 h-2 rounded-full bg-border-strong" />
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">satscore · agent</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Illustrative</span>
              </div>
              <div className="p-6 sm:p-7">
                <p className="text-sm text-foreground mb-5">
                  <span className="font-mono text-primary">&gt; </span>Are any of these risky?
                </p>
                <div className="space-y-2.5">
                  {sampleResults.map((r, i) => (
                    <div
                      key={r.addr}
                      className="flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2.5 animate-fade-in"
                      style={{ animationDelay: `${200 + i * 180}ms`, animationFillMode: "both" }}
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
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Stat band */}
      <section className="relative overflow-hidden py-16 sm:py-20 px-4 sm:px-6">
        <NetworkBackdrop className="opacity-[0.05]" />
        <div className="container mx-auto max-w-5xl relative">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-mono text-4xl sm:text-5xl font-medium text-primary mb-2">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Why SatScore */}
      <section className="relative overflow-hidden py-20 sm:py-28 md:py-36 px-4 sm:px-6 bg-card">
        <NetworkBackdrop className="opacity-[0.05]" />
        <div className="container mx-auto max-w-6xl relative">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary text-center mb-4">
            Why SatScore
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4">
            Single-chain depth, agent-native economics.
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
            Built to do one chain properly — and to be paid for, per call, by the agents that use it.
          </p>

          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Featured headline USP */}
            <div className="lg:col-span-5 border border-border rounded-xl p-8 sm:p-10 bg-background flex flex-col justify-between">
              <div className="w-[34px] h-[34px] rounded-lg bg-brand-tint flex items-center justify-center mb-10">
                <featured.icon className="w-[18px] h-[18px] text-primary" strokeWidth={1.75} />
              </div>
              <div>
                <p className="font-mono text-5xl sm:text-6xl font-medium text-primary mb-4 leading-none">
                  {featured.metric}
                </p>
                <h3 className="text-xl font-medium mb-3">{featured.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{featured.body}</p>
              </div>
            </div>

            {/* Three supporting reasons */}
            <div className="lg:col-span-7 grid gap-4 lg:gap-5 content-start">
              {usps.map((u, i) => (
                <div
                  key={u.title}
                  className="border border-border rounded-xl p-6 sm:p-7 bg-background flex items-start gap-5 hover:border-primary transition-colors duration-300"
                >
                  <div className="w-[34px] h-[34px] rounded-lg bg-brand-tint flex items-center justify-center shrink-0">
                    <u.icon className="w-[18px] h-[18px] text-primary" strokeWidth={1.75} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-3 mb-1.5">
                      <h3 className="text-lg font-medium">{u.title}</h3>
                      <span className="font-mono text-xs text-muted-foreground shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{u.body}</p>
                  </div>
                </div>
              ))}
            </div>
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
      <section id="pricing" className="relative overflow-hidden py-20 sm:py-28 md:py-36 px-4 sm:px-6 bg-card scroll-mt-20">
        <NetworkBackdrop className="opacity-[0.05]" />
        <div className="container mx-auto max-w-3xl text-center relative">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10">
            Pay for exactly what you screen.
          </h2>
          <div className="border border-border rounded-xl bg-background p-8 sm:p-10 max-w-md mx-auto">
            <div className="w-[34px] h-[34px] rounded-lg bg-brand-tint flex items-center justify-center mb-6 mx-auto">
              <Zap className="w-[18px] h-[18px] text-primary" strokeWidth={1.75} />
            </div>
            <p className="mb-1">
              <span className="font-mono text-5xl sm:text-6xl font-medium text-foreground">{SATSCORE.priceSats} sats</span>
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

          {SATSCORE.mcpLive ? (
            <>
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
            </>
          ) : (
            <div className="border border-border rounded-xl bg-card p-8 text-center">
              <p className="text-sm font-medium text-foreground mb-2">Connect details land here shortly.</p>
              <p className="text-sm text-muted-foreground">
                The SatScore MCP endpoint goes live soon. Want early access?{" "}
                <a href="/contact" className="text-primary hover:underline">Talk to us.</a>
              </p>
            </div>
          )}
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
