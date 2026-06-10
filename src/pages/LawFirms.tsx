import { Link } from "react-router-dom";
import { Scale, CheckCircle, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PRODUCTS, BOOK_DEMO_HREF } from "@/config/site";

const scenarios = [
  "Asset-tracing requests on contentious divorce, fraud or insolvency matters",
  "Crypto-related disputes where you need defensible on-chain evidence",
  "Clients asking for blockchain investigation capability you don't yet have in-house",
  "Existing partners who deliver slowly, expensively or inconsistently",
];

const deliverables = [
  {
    title: "White-label investigation capability",
    body: "Cases delivered under your firm's brand or ours, your choice. Court-ready output, your client relationship preserved.",
  },
  {
    title: "Referral commission, where permitted",
    body: "Up to 10% on cases you refer. Aligned incentives, no awkward fee conversations.",
  },
  {
    title: "Pre-engagement viability scoring",
    body: "We screen cases before you commit, using our investigation viability calculator, so you only take work that's worth taking.",
  },
  {
    title: "Expert witness & affidavits",
    body: "Senior investigators available for testimony, sworn statements and rebuttal analysis when matters head to court.",
  },
];

const proof = [
  { metric: "27+", label: "Law firms in partnership" },
  { metric: "10%", label: "Referral commission, where permitted" },
  { metric: "Days", label: "From brief to first findings" },
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
            <Scale className="w-[18px] h-[18px] text-primary" strokeWidth={1.75} />
          </div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-6">
            {PRODUCTS.lawFirms.name}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Investigation capability behind your practice.
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            A growing number of law firms advertise blockchain services without an
            in-house investigation function. We're the team that sits quietly behind
            your practice, delivering the analysis, evidence and expert testimony you
            commit to your clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="font-medium" asChild>
              <Link to={BOOK_DEMO_HREF}>Start a conversation</Link>
            </Button>
            <Button size="lg" variant="outline-white" className="font-medium" asChild>
              <Link to="/intelligence">See the platform</Link>
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
          <p className="text-foreground font-medium text-center text-lg">
            In professional matters, assumptions are not enough. Structured analysis is required.
          </p>
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
              <div key={d.title} className="border border-border rounded-xl p-6 sm:p-8 bg-background">
                <h3 className="text-lg font-medium mb-3">{d.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{d.body}</p>
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
                A growing strategic network.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We've partnered with 27+ law firms across multiple jurisdictions.
                Where legal action is the destination, we're the team they call to
                build the evidence.
              </p>
            </div>
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {proof.map((p) => (
                <div key={p.label} className="border border-border rounded-xl p-6 bg-card flex flex-col">
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
      <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 bg-card">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Add investigation capability to your practice.
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Whether you're scoping a single matter or building an ongoing referral
            relationship, the conversation starts the same way.
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
