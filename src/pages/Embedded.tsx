import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Users,
  Layers,
  Wrench,
  Search,
  Rocket,
  Hammer,
  Anchor,
  Dice5,
  Scale,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import { PRODUCTS, DISCOVERY_CALL_HREF } from "@/config/site";

const layers = [
  {
    number: "01",
    label: "The people",
    icon: Users,
    body: "A named specialist embeds with your team, learns the operation end to end, and owns the outcome. You work with a person, not a ticket queue.",
  },
  {
    number: "02",
    label: "The products",
    icon: Layers,
    body: "Deploy proven tools in days, not procurement cycles. The shelf is already built and battle-tested in regulated environments.",
  },
  {
    number: "03",
    label: "The bespoke build",
    icon: Wrench,
    body: "AI-assisted engineering builds what's missing in days, not quarters. The gaps that no off-the-shelf product covers become yours.",
  },
];

const steps = [
  {
    number: "01",
    label: "Discover",
    icon: Search,
    body: "We map the operation, the data, and the risk before a single tool ships.",
  },
  {
    number: "02",
    label: "Deploy",
    icon: Rocket,
    body: "We stand up proven products against your real workflow, not a demo dataset.",
  },
  {
    number: "03",
    label: "Build",
    icon: Hammer,
    body: "We engineer the missing pieces so the workflow is complete, not approximate.",
  },
  {
    number: "04",
    label: "Stay",
    icon: Anchor,
    body: "We stay embedded as the operation scales and the requirements move.",
  },
];

const industries = [
  {
    label: "iGaming",
    icon: Dice5,
    body: "Catch fraud and bonus abuse at the wallet, before the payout clears and the account disappears.",
  },
  {
    label: "Legal & law enforcement",
    icon: Scale,
    body: "Produce court-ready evidence and run sovereign deployments inside your own perimeter.",
  },
  {
    label: "Payments",
    icon: CreditCard,
    body: "Screen counterparties and monitor transactions with KYT that fits your settlement flow.",
  },
];

const Embedded = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            BlockQuery Embedded
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Embedded analytics. A partner, not a portal.
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            A named specialist learns your operation, deploys proven BlockQuery
            products, and builds what's missing. You get a partner embedded in
            your team, not a license to administer on your own.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="font-medium" asChild>
              <Link to={DISCOVERY_CALL_HREF}>Book a discovery call</Link>
            </Button>
            <Button size="lg" variant="outline-white" className="font-medium" asChild>
              <Link to="/#offerings">Explore the products</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Three layers */}
      <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 bg-card">
        <div className="container mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            Three layers
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-14 leading-tight">
            People, products, and the build in between.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {layers.map((layer) => {
              const Icon = layer.icon;
              return (
                <div
                  key={layer.number}
                  className="border border-border rounded-lg p-6 sm:p-8 bg-background flex flex-col"
                >
                  <div className="w-12 h-12 rounded-lg border border-primary/30 bg-primary/5 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
                    {layer.number} — {layer.label}
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {layer.body}
                  </p>
                  {layer.number === "02" && (
                    <div className="mt-6 flex flex-col gap-2">
                      <Link
                        to={PRODUCTS.intelligence.href}
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                      >
                        {PRODUCTS.intelligence.name}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Link
                        to={PRODUCTS.walletChecker.href}
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                      >
                        {PRODUCTS.walletChecker.name}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Four-step engagement */}
      <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            The engagement
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-14 leading-tight">
            Four steps, then we stay.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="border border-border rounded-lg p-6 sm:p-8 bg-card flex flex-col"
                >
                  <div className="w-12 h-12 rounded-lg border border-primary/30 bg-primary/5 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
                    {step.number}
                  </p>
                  <h3 className="text-lg font-bold mb-3">{step.label}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {step.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Industries */}
      <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 bg-card">
        <div className="container mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            Where we embed
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-14 leading-tight">
            Built for operations that carry real risk.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <div
                  key={industry.label}
                  className="border border-border rounded-lg p-6 sm:p-8 bg-background flex flex-col"
                >
                  <div className="w-12 h-12 rounded-lg border border-primary/30 bg-primary/5 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{industry.label}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {industry.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* CTA band */}
      <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Start with a discovery call.
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Tell us what your operation needs to see. We will map the work, name
            the specialist who will own it, and show you what ships first.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* TODO: swap to a BlockQuery-branded booking link when supplied */}
            <Button size="lg" className="font-medium" asChild>
              <Link to={DISCOVERY_CALL_HREF}>
                Book a discovery call <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Embedded;
