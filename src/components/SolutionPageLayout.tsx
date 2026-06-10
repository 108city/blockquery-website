import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, Sparkles, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface DeliverableItem {
  title: string;
  body: string;
}

interface ProofItem {
  metric?: string;
  label: string;
}

export interface SolutionPageProps {
  eyebrow: string;
  headline: string;
  subhead: string;
  scenarios: string[];
  scenarioCaption?: string;
  deliverables: DeliverableItem[];
  proofTitle: string;
  proofBody: string;
  proofItems?: ProofItem[];
  ctaHeadline: string;
  ctaBody?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  HeroIcon?: LucideIcon;
}

const SolutionPageLayout = ({
  eyebrow,
  headline,
  subhead,
  scenarios,
  scenarioCaption,
  deliverables,
  proofTitle,
  proofBody,
  proofItems,
  ctaHeadline,
  ctaBody,
  primaryCtaLabel = "Book a Platform Demo",
  primaryCtaHref = "/contact",
  secondaryCtaLabel = "See the Platform",
  secondaryCtaHref = "/platform",
  HeroIcon,
}: SolutionPageProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          {HeroIcon && (
            <div className="w-16 h-16 mx-auto rounded-2xl border border-primary/30 bg-primary/5 flex items-center justify-center mb-6">
              <HeroIcon className="w-8 h-8 text-primary" strokeWidth={1.5} />
            </div>
          )}
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-6">
            {eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {headline}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            {subhead}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="font-semibold" asChild>
              <Link to={primaryCtaHref}>{primaryCtaLabel}</Link>
            </Button>
            <Button size="lg" variant="outline-white" className="font-semibold" asChild>
              <Link to={secondaryCtaHref}>{secondaryCtaLabel}</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Scenarios */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
            You may be facing:
          </h2>
          <ul className="space-y-4 max-w-xl mx-auto mb-8">
            {scenarios.map((s) => (
              <li key={s} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-lg">{s}</span>
              </li>
            ))}
          </ul>
          {scenarioCaption && (
            <p className="text-foreground font-semibold text-center text-lg">
              {scenarioCaption}
            </p>
          )}
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Deliverables */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-card">
        <div className="container mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary text-center mb-4">
            What we deliver
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">
            Built around the workflow you actually run.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {deliverables.map((d) => (
              <div
                key={d.title}
                className="border border-border rounded-lg p-6 sm:p-8 bg-background"
              >
                <h3 className="text-lg font-bold mb-3">{d.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Proof */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-2">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
                Proof of work
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
                {proofTitle}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {proofBody}
              </p>
            </div>

            {proofItems && proofItems.length > 0 && (
              <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {proofItems.map((p) => (
                  <div
                    key={p.label}
                    className="border border-border rounded-lg p-6 bg-card flex flex-col h-full"
                  >
                    <div className="w-9 h-9 rounded-lg border border-primary/30 bg-primary/5 flex items-center justify-center mb-4">
                      <Sparkles className="w-4 h-4 text-primary" strokeWidth={1.5} />
                    </div>
                    {p.metric && (
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                        {p.metric}
                      </p>
                    )}
                    <p className="text-base font-semibold leading-snug">
                      {p.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* CTA */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-card">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            {ctaHeadline}
          </h2>
          {ctaBody && (
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              {ctaBody}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="font-semibold" asChild>
              <Link to={primaryCtaHref}>
                {primaryCtaLabel} <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SolutionPageLayout;
