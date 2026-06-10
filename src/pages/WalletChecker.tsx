import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  ShieldX,
  Wallet,
  Send,
  Search,
  CheckCircle,
  Languages,
  Banknote,
  GraduationCap,
  Globe,
} from "lucide-react";
import { PRODUCTS, WALLET_CHECKER_APP_URL } from "@/config/site";

const product = PRODUCTS.walletChecker;

const steps = [
  {
    icon: Wallet,
    title: "Issue a fresh deposit address",
    body: "Generate a clean Tron deposit address for the incoming payment so each counterparty maps to a known intake.",
  },
  {
    icon: Send,
    title: "Counterparty sends funds",
    body: "Share the address and let the counterparty deposit, then wait for the transaction to settle on chain.",
  },
  {
    icon: Search,
    title: "Check the incoming transaction",
    body: "Paste the address or transaction hash to get a Green, Amber, or Red verdict in plain language.",
  },
  {
    icon: CheckCircle,
    title: "Sweep or refuse",
    body: "Sweep clean funds to your treasury, or refuse and return anything the verdict flags for block.",
  },
];

const audienceCards = [
  {
    icon: Languages,
    title: "Bilingual TR and EN",
    body: "Every verdict, label, and prompt reads naturally in Turkish and English, so the whole desk works in one language.",
  },
  {
    icon: Banknote,
    title: "Local pricing",
    body: "Billed in terms that fit a regional desk, not enterprise compliance budgets built for global banks.",
  },
  {
    icon: GraduationCap,
    title: "No blockchain expertise needed",
    body: "The verdict is the answer. Your team acts on Green, Amber, or Red without reading raw chain data.",
  },
];

const tiers = [
  {
    name: "Starter",
    price: "$300",
    period: "/ month",
    quota: "600 queries / month",
    description: "For a single desk running self-serve screening on day-to-day flows.",
    features: [
      "Address and transaction checks",
      "Green, Amber, Red verdicts",
      "Bilingual TR and EN interface",
    ],
  },
  {
    name: "Scaling",
    price: "$550",
    period: "/ month",
    quota: "1,100 queries / month",
    description: "For growing exchangers running steady volume across multiple operators.",
    features: [
      "Everything in Starter",
      "Nearly 2× the monthly query volume",
      "Multiple operator seats",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "$900",
    period: "/ month",
    quota: "1,800 queries / month",
    description: "For multi-branch desks and networks that need volume and support commitments.",
    features: [
      "Everything in Scaling",
      "Highest monthly query volume",
      "Priority support",
    ],
  },
];

const WalletChecker = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* 1. Hero */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 md:pb-36 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
                {product.name}
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Paste a Tron address or transaction hash, get a plain-language
                verdict.
              </h1>
              <p className="text-lg text-muted-foreground mb-10 max-w-xl">
                A Green, Amber, or Red verdict, a score, and labels. No blockchain
                expertise required.
              </p>
              <Button size="lg" className="font-medium" asChild>
                <a
                  href={WALLET_CHECKER_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Wallet Checker
                </a>
              </Button>
            </div>

            {/* Mock verdict card — visual centerpiece */}
            <div className="border border-border rounded-lg p-6 sm:p-8 bg-card">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Verdict
                </span>
                {/* Amber = review */}
                <span className="inline-flex items-center gap-2 rounded-full bg-risk-tint text-risk px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                  <AlertTriangle className="w-3.5 h-3.5" strokeWidth={2} />
                  Amber — review
                </span>
              </div>

              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Tron address
              </p>
              {/* Truncated, illustrative address — not a real wallet */}
              <p className="font-mono text-muted-foreground text-base mb-6 break-all">
                TXYZ...9f2a
              </p>

              <div className="flex items-baseline gap-2 mb-6">
                {/* illustrative */}
                <span className="text-3xl font-bold text-risk">62</span>
                <span className="text-sm text-muted-foreground">/ 100 risk score</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground">
                  Mixer exposure
                </span>
                <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground">
                  New counterparty
                </span>
                <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground">
                  2 hops to flagged entity
                </span>
              </div>

              {/* Legend — one example of each verdict color */}
              <div className="border-t border-border pt-5 flex flex-wrap gap-x-6 gap-y-2">
                <span className="inline-flex items-center gap-2 text-xs font-medium">
                  <ShieldCheck className="w-4 h-4 text-safe" strokeWidth={2} />
                  <span className="text-safe">Green</span>
                  <span className="text-muted-foreground">clear</span>
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-medium">
                  <AlertTriangle className="w-4 h-4 text-risk" strokeWidth={2} />
                  <span className="text-risk">Amber</span>
                  <span className="text-muted-foreground">review</span>
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-medium">
                  <ShieldX className="w-4 h-4 text-danger" strokeWidth={2} />
                  <span className="text-danger">Red</span>
                  <span className="text-muted-foreground">block</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* 2. How it works */}
      <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 bg-card">
        <div className="container mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-14 leading-tight">
            One simple flow, from deposit to decision.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="border border-border rounded-lg p-6 sm:p-8 bg-background"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg border border-primary/30 bg-primary/5 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-mono text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* 3. Built for OTC desks and money exchangers */}
      <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            Who it is for
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-14 leading-tight">
            Built for OTC desks and money exchangers.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {audienceCards.map((card) => (
              <div
                key={card.title}
                className="border border-border rounded-lg p-6 sm:p-8 bg-card"
              >
                <div className="w-10 h-10 rounded-lg border border-primary/30 bg-primary/5 flex items-center justify-center mb-4">
                  <card.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold mb-3">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* 4. Pricing */}
      <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 bg-card">
        <div className="container mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-14 leading-tight">
            Plans that scale with your volume.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`border rounded-xl p-6 sm:p-8 bg-background flex flex-col ${
                  tier.featured ? "border-primary" : "border-border"
                }`}
              >
                <h3 className="text-lg font-medium mb-2">{tier.name}</h3>
                <p className="mb-1">
                  <span className="text-3xl font-bold text-foreground">{tier.price}</span>
                  <span className="text-sm text-muted-foreground"> {tier.period}</span>
                </p>
                <p className="text-sm font-medium text-foreground mb-5">{tier.quota}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {tier.description}
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <CheckCircle
                        className="w-4 h-4 text-primary flex-shrink-0 mt-0.5"
                        strokeWidth={2}
                      />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full font-medium"
                  variant={tier.featured ? "default" : "outline-white"}
                  asChild
                >
                  <a href={WALLET_CHECKER_APP_URL} target="_blank" rel="noopener noreferrer">
                    Start with this plan
                  </a>
                </Button>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground mt-8">
            Need more volume? Add-on query packs are available on request.
          </p>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* 5. Market instances */}
      <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="w-12 h-12 mx-auto rounded-lg border border-primary/30 bg-primary/5 flex items-center justify-center mb-6">
            <Globe className="w-6 h-6 text-primary" strokeWidth={1.5} />
          </div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            Market instances
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Live in Turkey. Built to replicate.
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            A new market is a configuration, not a rebuild. Language, pricing, and
            local rules are settings on the same engine, so a new instance ships
            in weeks.
          </p>
          <Button size="lg" variant="outline-white" className="font-medium" asChild>
            <Link to="/contact">
              Partner and market inquiries <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* 6. Final CTA band */}
      <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Paste an address. Get a verdict.
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Self-serve screening for Tron addresses and transactions. Open the app
            and run your first check.
          </p>
          <Button size="lg" className="font-medium" asChild>
            <a
              href={WALLET_CHECKER_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Wallet Checker
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WalletChecker;
