// Investigations services page - serves law firms, government / law enforcement,
// and AML and KYT. Routed at /investigations.
import { Link } from "react-router-dom";
import {
  Search,
  Scale,
  Landmark,
  ShieldCheck,
  CheckCircle,
  Sparkles,
  ArrowRight,
  LayoutDashboard,
  Gauge,
  Network,
  Globe,
  FileText,
  Lock,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BOOK_DEMO_HREF, SATSCORE } from "@/config/site";

const audiences: { icon: LucideIcon; title: string; body: string; href: string }[] = [
  {
    icon: Landmark,
    title: "Government and law enforcement",
    body: "A bird's eye view on the intersection of national security and the submerged economy.",
    href: "#government",
  },
  {
    icon: Scale,
    title: "Law firms",
    body: "Court-ready evidence, asset tracing and expert testimony, delivered quietly behind your practice.",
    href: "#law-firms",
  },
  {
    icon: ShieldCheck,
    title: "AML and KYT",
    body: "Counterparty screening and monitoring for compliance teams, backed by our address intelligence.",
    href: "#aml-kyt",
  },
];

const highlights: { icon: LucideIcon; title: string; body: string; points: string[] }[] = [
  {
    icon: LayoutDashboard,
    title: "A case management platform",
    body: "Our own platform to manage your active recovery cases end to end, so you always know where a matter stands.",
    points: [
      "Real-time recovery estimates on every matter",
      "Report costing, so you see the spend before you commit",
      "One place to track case status, evidence and next steps",
    ],
  },
  {
    icon: Gauge,
    title: "Case triage",
    body: "A simplified, low-cost report that tells you whether a case is worth taking, before you invest the hours.",
    points: [
      "A fast, low-cost first-look assessment",
      "A clear call: take it on, decline, or take it on risk",
      "So you only pursue the cases worth pursuing",
    ],
  },
];

const lawFirmDeliverables = [
  {
    title: "White-label investigation capability",
    body: "Cases delivered under your firm's brand or ours, your choice. Court-ready output, your client relationship preserved.",
  },
  {
    title: "Referral commission, where permitted",
    body: "Up to 10% on cases you refer. Aligned incentives, no awkward fee conversations.",
  },
  {
    title: "Confidential by default",
    body: "NDAs from first contact, conflict checks before we engage, and discreet handling that protects your client relationship.",
  },
  {
    title: "Expert witness and affidavits",
    body: "Senior investigators available for testimony, sworn statements and rebuttal analysis when matters head to court.",
  },
];

const govDeliverables: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Network,
    title: "Wide coverage of illicit actors",
    body: "A map of the actors that matter - sanctioned entities, illicit services and the clusters around them - across chains and jurisdictions.",
  },
  {
    icon: Globe,
    title: "A jurisdiction-level risk picture",
    body: "Where risk concentrates by country and corridor, including high-risk jurisdictions, so analysts know where to look - not just what one address did.",
  },
  {
    icon: FileText,
    title: "Briefings your analysts can act on",
    body: "Structured intelligence and periodic briefings framed for decision-makers, not raw transaction dumps.",
  },
  {
    icon: Lock,
    title: "Discreet, sovereign handling",
    body: "NDAs from first contact and deployment options that keep sensitive work inside your perimeter.",
  },
];

const proof = [
  { metric: "27+", label: "Law firms in partnership" },
  { metric: "Government", label: "Intelligence deployments delivered" },
  { metric: "Multi-chain", label: "Coverage across jurisdictions" },
  { metric: "Court-ready", label: "Evidence packages by default" },
];

const LawFirms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="w-[34px] h-[34px] mx-auto rounded-lg bg-brand-tint flex items-center justify-center mb-6">
            <Search className="w-[18px] h-[18px] text-primary" strokeWidth={1.75} />
          </div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-6">
            Intelligence and investigations
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Blockchain intelligence and investigations for law firms, law enforcement, and government.
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            We give legal teams, law enforcement and government the on-chain analysis, evidence
            and intelligence they rely on - from a single case to a wide view across jurisdictions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="font-medium" asChild>
              <Link to={BOOK_DEMO_HREF}>Start a conversation</Link>
            </Button>
            <Button size="lg" variant="outline-white" className="font-medium" asChild>
              <Link to="/case-studies">See case studies</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Who we serve */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-card">
        <div className="container mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary text-center mb-4">
            Who we serve
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4">
            One capability, three kinds of buyer.
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
            The same on-chain intelligence, shaped to the question you are actually asking.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {audiences.map((a) => (
              <a
                key={a.title}
                href={a.href}
                className="border border-border rounded-xl p-6 sm:p-8 bg-background hover:border-primary transition-colors duration-300 group flex flex-col"
              >
                <div className="w-[34px] h-[34px] rounded-lg bg-brand-tint flex items-center justify-center mb-6">
                  <a.icon className="w-[18px] h-[18px] text-primary" strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-medium mb-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{a.body}</p>
                <span className="text-sm text-primary font-medium inline-flex items-center gap-1.5 mt-5 group-hover:gap-2.5 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Government and law enforcement */}
      <section id="government" className="py-20 sm:py-28 px-4 sm:px-6 scroll-mt-20">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-[34px] h-[34px] rounded-lg bg-brand-tint flex items-center justify-center">
              <Landmark className="w-[18px] h-[18px] text-primary" strokeWidth={1.75} />
            </div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              For government and law enforcement
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight max-w-3xl">
            A bird's eye view on the submerged economy.
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
            Where national security meets illicit finance, the value moves on-chain. We give
            intelligence and law-enforcement teams a wide view of that activity across many
            jurisdictions and high-risk countries - broad coverage of the known illicit economy,
            not single-transaction enforcement detail.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {govDeliverables.map((d) => (
              <div key={d.title} className="border border-border rounded-xl p-6 sm:p-8 bg-card">
                <div className="w-[34px] h-[34px] rounded-lg bg-brand-tint flex items-center justify-center mb-5">
                  <d.icon className="w-[18px] h-[18px] text-primary" strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-medium mb-3">{d.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* For law firms */}
      <section id="law-firms" className="py-20 sm:py-28 px-4 sm:px-6 bg-card scroll-mt-20">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-[34px] h-[34px] rounded-lg bg-brand-tint flex items-center justify-center">
              <Scale className="w-[18px] h-[18px] text-primary" strokeWidth={1.75} />
            </div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">For law firms</p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight max-w-3xl">
            Investigation capability behind your practice.
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
            We sit quietly behind your practice, delivering the analysis, evidence and expert
            testimony you commit to your clients - plus the tooling to decide which cases to take.
          </p>

          {/* Two tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
            {highlights.map((h) => (
              <div key={h.title} className="border border-border rounded-xl p-6 sm:p-8 bg-background flex flex-col">
                <div className="w-[34px] h-[34px] rounded-lg bg-brand-tint flex items-center justify-center mb-6">
                  <h.icon className="w-[18px] h-[18px] text-primary" strokeWidth={1.75} />
                </div>
                <h3 className="text-xl font-medium mb-3">{h.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{h.body}</p>
                <ul className="space-y-3">
                  {h.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <CheckCircle className="w-[18px] h-[18px] text-primary flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                      <span className="text-sm text-secondary-foreground leading-snug">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Deliverables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {lawFirmDeliverables.map((d) => (
              <div key={d.title} className="border border-border rounded-xl p-6 sm:p-8 bg-background">
                <h3 className="text-lg font-medium mb-3">{d.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* AML and KYT */}
      <section id="aml-kyt" className="py-20 sm:py-28 px-4 sm:px-6 scroll-mt-20">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-3">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-[34px] h-[34px] rounded-lg bg-brand-tint flex items-center justify-center">
                  <ShieldCheck className="w-[18px] h-[18px] text-primary" strokeWidth={1.75} />
                </div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">For AML and KYT</p>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
                Screening and monitoring, backed by our address intelligence.
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Compliance teams use the same labelled-wallet intelligence to screen counterparties
                and monitor exposure - turning our address data into a clear risk decision.
              </p>
              <ul className="space-y-3 max-w-xl">
                {[
                  "Counterparty screening against known illicit entities and clusters",
                  "Plain-language risk verdicts, not raw transaction dumps",
                  "Per-check pricing, with no platform to buy up front",
                ].map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-lg">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SatScore tool card */}
            <div className="lg:col-span-2 border border-border rounded-xl p-6 sm:p-8 bg-card">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">The tool</p>
              <h3 className="text-xl font-medium mb-3">SatScore</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Our self-serve KYT tool for Bitcoin. Paste an address, get a plain-language risk
                verdict, and pay {SATSCORE.priceSats} sats per check over Lightning.
              </p>
              <Button variant="outline-white" className="font-medium w-full" asChild>
                <Link to={SATSCORE.route}>
                  Explore SatScore <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Proof */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-card">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-2">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
                Proof of work
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
                Trusted where the stakes are highest.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We work with law firms across multiple jurisdictions and have delivered intelligence
                for government clients. Where the answer has to hold up, we are the team they call.
              </p>
            </div>
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {proof.map((p) => (
                <div key={p.label} className="border border-border rounded-xl p-6 bg-background flex flex-col">
                  <div className="w-9 h-9 rounded-lg bg-brand-tint flex items-center justify-center mb-4">
                    <Sparkles className="w-4 h-4 text-primary" strokeWidth={1.75} />
                  </div>
                  <p className="text-sm font-medium text-primary mb-1">{p.metric}</p>
                  <p className="text-sm text-muted-foreground leading-snug">{p.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* CTA */}
      <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Talk to our investigations team.
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Whether you are scoping a single matter or briefing an intelligence team, the
            conversation starts the same way.
          </p>
          <Button size="lg" className="font-medium" asChild>
            <Link to={BOOK_DEMO_HREF}>
              Start a conversation <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LawFirms;
