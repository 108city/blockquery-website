import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Bot,
  Users,
  Zap,
  Activity,
  Eye,
  Lock,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Scale,
  Gamepad2,
  ShieldCheck,
  Landmark,
  FileCheck,
  Search,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AISkills from "@/components/AISkills";
import { PRODUCTS, BOOK_DEMO_HREF } from "@/config/site";

interface Pillar {
  id: string;
  icon: LucideIcon;
  title: string;
  body: string;
  points: string[];
}

const pillars: Pillar[] = [
  {
    id: "dashboards",
    icon: LayoutDashboard,
    title: "Industry dashboards",
    body:
      "Live intelligence, not static reports. Real-time criminal-trend feeds, role-based command centers, and jurisdiction-wide oversight views, shaped around the team that uses them.",
    points: [
      "Sovereign cloud deployment",
      "Role-based access for investigators, supervisors and auditors",
      "Continuous data refresh, no overnight batch jobs",
      "Custom views per case, jurisdiction or operator",
    ],
  },
  {
    id: "ai-agents",
    icon: Bot,
    title: "AI agents",
    body:
      "Up to 80% of routine triage, resolved in seconds. Autonomous agents handle the analyst-hours this work used to demand, so human attention goes where it moves the needle.",
    points: [
      "Wallet and transaction screening at scale",
      "Counterparty and cluster analysis",
      "Cross-chain fund-flow reconstruction",
      "Risk scoring with audit-trail explanations",
    ],
  },
  {
    id: "call-for-backup",
    icon: Users,
    title: "On-demand investigators",
    body:
      "When a case escapes the AI's confidence threshold, our network of vetted human investigators picks it up, delivering court-ready output and the judgment only experience produces.",
    points: [
      "On-demand access to specialist investigators",
      "Court-ready evidence packages and expert testimony",
      "Clear escalation thresholds, transparent pricing",
      "Hours billed only when human judgment is required",
    ],
  },
];

const whyCards = [
  { icon: Zap, title: "Built for speed", body: "Pilots live in weeks. New skills shipped weekly via vibe-code sprints." },
  { icon: Activity, title: "Continuous, not periodic", body: "Live intelligence feeds replace point-in-time reports." },
  { icon: Eye, title: "Operator-grade UX", body: "Designed for the analyst on the front line, not for procurement decks." },
  { icon: Lock, title: "Secure by deployment", body: "Sovereign cloud. Your data, your perimeter." },
];

interface UseCase {
  id: string;
  icon: LucideIcon;
  eyebrow: string;
  headline: string;
  subhead: string;
  deliverables: { title: string; body: string }[];
  proof: { metric: string; label: string }[];
  ctaLabel: string;
}

const useCases: UseCase[] = [
  {
    id: "law-firms",
    icon: Scale,
    eyebrow: "For law firms",
    headline: "Give your blockchain practice a working investigation capability.",
    subhead:
      "We sit quietly behind your practice, delivering the analysis, evidence and expert testimony you commit to your clients.",
    deliverables: [
      { title: "White-label investigation capability", body: "Cases delivered under your firm's brand or ours. Court-ready output, your client relationship preserved." },
      { title: "Referral commission, where permitted", body: "Up to 10% on cases you refer. Aligned incentives, no awkward fee conversations." },
      { title: "Pre-engagement viability scoring", body: "We screen cases before you commit, so you only take work that's worth taking." },
      { title: "Expert witness & affidavits", body: "Senior investigators for testimony, sworn statements and rebuttal analysis." },
    ],
    proof: [
      { metric: "27+", label: "Law firms in partnership" },
      { metric: "10%", label: "Referral commission, where permitted" },
      { metric: "Days", label: "From brief to first findings" },
      { metric: "Court-ready", label: "Evidence by default" },
    ],
    ctaLabel: "Start a conversation",
  },
  {
    id: "igaming",
    icon: Gamepad2,
    eyebrow: "For iGaming operators",
    headline: "Stop fraud at the wallet, not at the payout.",
    subhead:
      "A real-time fraud-monitoring layer and investigation workflow that turns suspicious activity into defensible action before payout, not after.",
    deliverables: [
      { title: "Real-time wallet & deposit screening", body: "Every incoming wallet scored against risk, sanctions, mixer exposure and on-chain history before funds clear." },
      { title: "Payout-threshold investigations", body: "Automated investigation above a configurable payout threshold, built into your withdrawal workflow." },
      { title: "Bonus-abuse detection", body: "Detects multi-account collusion and coordinated wallet behaviour at scale, without manual review." },
      { title: "Hack response, days not weeks", body: "Cross-chain reconstruction, attacker-cluster identification and enforcement-ready evidence." },
    ],
    proof: [
      { metric: "Real-time", label: "Wallet screening at deposit" },
      { metric: "$1M+", label: "Recovered on iGaming exploit cases" },
      { metric: "Configurable", label: "Payout-threshold investigations" },
      { metric: "API-first", label: "Built to embed in your stack" },
    ],
    ctaLabel: "Book a demo",
  },
  {
    id: "regulators",
    icon: ShieldCheck,
    eyebrow: "For gaming regulators",
    headline: "Regulator-grade oversight for an entire jurisdiction.",
    subhead:
      "Real-time visibility into operator wallet activity, payout patterns, counterparty risk and emerging threats, without a six-figure annual licence.",
    deliverables: [
      { title: "Jurisdiction-wide oversight dashboard", body: "Every licensed operator's on-chain activity in one view, with drill-down to wallet level." },
      { title: "Operator-level risk scoring", body: "Continuous scoring against AML, sanctions, mixer exposure and abnormal payout signals, refreshed live." },
      { title: "Investigation workflow for your team", body: "When something flags, your investigators get the evidence, fund flows and counterparty intelligence pre-assembled." },
      { title: "Sovereign cloud, your perimeter", body: "In-jurisdiction data residency, your access controls." },
    ],
    proof: [
      { metric: "Live", label: "Continuous operator monitoring" },
      { metric: "All-chain", label: "BTC, ETH, EVM and beyond" },
      { metric: "Sovereign", label: "In-jurisdiction cloud" },
      { metric: "Weeks", label: "From engagement to live pilot" },
    ],
    ctaLabel: "Request a briefing",
  },
  {
    id: "government",
    icon: Landmark,
    eyebrow: "For law enforcement & government",
    headline: "National-level blockchain intelligence, without a six-figure annual licence.",
    subhead:
      "A sovereign command center with AI-powered investigation and on-demand expert support, at a price and timeline mid-budget agencies can actually procure.",
    deliverables: [
      { title: "Sovereign command center", body: "Deployed inside your perimeter. Your data never leaves jurisdiction. Your access controls, your audit trail." },
      { title: "AI-powered investigation, hybrid escalation", body: "Autonomous agents handle triage; vetted human investigators escalate the complex cases, billed only when needed." },
      { title: "Cross-chain & emerging-asset coverage", body: "BTC, ETH, EVM, stablecoins, bridges, mixers and de-mixing built in, not bolted on." },
      { title: "Training & capability transfer", body: "Onboarding, playbooks and ongoing skill development are part of the engagement." },
    ],
    proof: [
      { metric: "G7", label: "Government deployment in production" },
      { metric: "Sovereign", label: "In-jurisdiction cloud" },
      { metric: "Hybrid", label: "AI + human investigator escalation" },
      { metric: "60 days", label: "First workflow live" },
    ],
    ctaLabel: "Request a confidential briefing",
  },
  {
    id: "insurance",
    icon: FileCheck,
    eyebrow: "For crypto insurance",
    headline: "Automate claim verification at the scale the market demands.",
    subhead:
      "An on-chain verification layer that turns manual claims investigation into an automated workflow, with a human escalated only where it changes the outcome.",
    deliverables: [
      { title: "Automated claim verification", body: "Every claim runs through wallet history, fund-flow and counterparty checks: green-lit, flagged or escalated." },
      { title: "Recoverability scoring", body: "Predictive scoring on whether assets are recoverable, used pre-settlement to inform payout and subrogation." },
      { title: "API-first integration", body: "JSON in, structured findings out. No new console for your team to learn." },
      { title: "Human escalation when stakes warrant it", body: "Above a configurable claim threshold, a senior investigator picks up the file." },
    ],
    proof: [
      { metric: "80%", label: "Routine cases resolved without a human" },
      { metric: "Seconds", label: "From claim to first signal" },
      { metric: "API", label: "First-class, built to embed" },
      { metric: "Pre-settle", label: "Recoverability scoring before payout" },
    ],
    ctaLabel: "Request a sample run",
  },
  {
    id: "forensic-reports",
    icon: Search,
    eyebrow: "Forensic reports",
    headline: "Court-ready investigation for the cases that demand it.",
    subhead:
      "The human-led tier behind the platform: bespoke, deeply technical, built for litigation. Senior investigators take the files that escape automated scope.",
    deliverables: [
      { title: "Bespoke narrative report", body: "Evidential detail, fund-flow charts, attribution rationale and recommendations, written for the audience that will read it." },
      { title: "Court-ready evidence package", body: "For filings, asset-freeze applications, criminal referrals or arbitration. Defensible methodology, documented chain of analysis." },
      { title: "Expert witness & advisory", body: "Sworn statements, depositions, cross-examination prep and live testimony." },
      { title: "Legal & enforcement coordination", body: "We work alongside your legal team or introduce vetted partners across jurisdictions." },
    ],
    proof: [
      { metric: "Senior", label: "Investigator on every engagement" },
      { metric: "Court-ready", label: "Evidence by default" },
      { metric: "Cross-chain", label: "BTC, ETH, EVM, mixers, bridges" },
      { metric: "Confidential", label: "NDA from first contact" },
    ],
    ctaLabel: "Schedule a confidential briefing",
  },
];

const Intelligence = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-6">
            {PRODUCTS.intelligence.name}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            A unified intelligence platform for blockchain investigation.
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Industry dashboards, autonomous AI agents, and an on-demand network of
            human investigators, assembled into a single intelligence stack and
            tailored to the workflow of each sector we serve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="font-medium" asChild>
              <Link to={BOOK_DEMO_HREF}>Book a demo</Link>
            </Button>
            <Button size="lg" variant="outline-white" className="font-medium" asChild>
              <a href="#stack">See how it works</a>
            </Button>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* The stack */}
      <section id="stack" className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 bg-card">
        <div className="container mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary text-center mb-4">
            The stack
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-14">
            One stack. AI does the volume, humans handle the complexity.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {pillars.map((p) => (
              <div
                key={p.id}
                id={p.id}
                className="border border-border rounded-xl p-6 sm:p-8 bg-background flex flex-col scroll-mt-24"
              >
                <div className="w-[34px] h-[34px] rounded-lg bg-brand-tint flex items-center justify-center mb-6">
                  <p.icon className="w-[18px] h-[18px] text-primary" strokeWidth={1.75} />
                </div>
                <h3 className="text-xl font-medium mb-3">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{p.body}</p>
                <ul className="space-y-2.5 mt-auto">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5">
                      <CheckCircle className="w-[18px] h-[18px] text-primary flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                      <span className="text-sm text-secondary-foreground leading-snug">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Why this stack works */}
      <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-14">
            Why this stack works.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {whyCards.map((c) => (
              <div key={c.title} className="border border-border rounded-xl p-6 bg-card">
                <div className="w-[34px] h-[34px] rounded-lg bg-brand-tint flex items-center justify-center mb-5">
                  <c.icon className="w-[18px] h-[18px] text-primary" strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-medium mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI skills — shipped weekly (folded in from the homepage) */}
      <AISkills />

      <div className="border-t border-border" />

      {/* Use cases intro */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            Built for the front line
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            One platform, tailored to the workflow of each sector.
          </h2>
          <p className="text-lg text-muted-foreground">
            The same intelligence stack, shaped around the team that uses it.
          </p>
        </div>
      </section>

      {/* Use-case sections (absorbed from the former solution pages) */}
      {useCases.map((uc, i) => (
        <section
          key={uc.id}
          id={uc.id}
          className={`py-20 sm:py-28 px-4 sm:px-6 border-t border-border scroll-mt-20 ${
            i % 2 === 1 ? "bg-card" : ""
          }`}
        >
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-[34px] h-[34px] rounded-lg bg-brand-tint flex items-center justify-center">
                <uc.icon className="w-[18px] h-[18px] text-primary" strokeWidth={1.75} />
              </div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                {uc.eyebrow}
              </p>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight max-w-3xl">
              {uc.headline}
            </h3>
            <p className="text-lg text-muted-foreground mb-10 max-w-3xl">{uc.subhead}</p>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Deliverables */}
              <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {uc.deliverables.map((d) => (
                  <div
                    key={d.title}
                    className={`border border-border rounded-xl p-5 ${i % 2 === 1 ? "bg-background" : "bg-card"}`}
                  >
                    <h4 className="text-base font-medium mb-2 leading-snug">{d.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{d.body}</p>
                  </div>
                ))}
              </div>

              {/* Proof + CTA */}
              <div className="lg:col-span-2 flex flex-col">
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {uc.proof.map((p) => (
                    <div key={p.label} className={`border border-border rounded-xl p-4 ${i % 2 === 1 ? "bg-background" : "bg-card"}`}>
                      <p className="text-sm font-medium text-primary mb-1">{p.metric}</p>
                      <p className="text-xs text-muted-foreground leading-snug">{p.label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-3 mt-auto">
                  <Button className="font-medium w-full sm:w-auto" asChild>
                    <Link to={BOOK_DEMO_HREF}>
                      {uc.ctaLabel} <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  {uc.id === "forensic-reports" && (
                    <Link to="/sample-report" className="text-sm text-primary font-medium hover:underline">
                      Download a sample report →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Closing CTA */}
      <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="w-[34px] h-[34px] rounded-lg bg-brand-tint flex items-center justify-center mb-6 mx-auto">
            <Sparkles className="w-[18px] h-[18px] text-primary" strokeWidth={1.75} />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            See it running on your data.
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            We'll spin up a tailored pilot dashboard against your jurisdiction,
            operator or case load, and walk your team through it.
          </p>
          <Button size="lg" className="font-medium" asChild>
            <Link to={BOOK_DEMO_HREF}>Book a demo</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Intelligence;
