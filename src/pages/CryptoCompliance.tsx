import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, ShieldAlert, ShieldCheck, Eye, Search, GitBranch, FileOutput, ArrowRight, Network } from "lucide-react";
import handshakeImg from "@/assets/handshake-corporate.jpg";

const CryptoCompliance = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Crypto compliance &amp; risk intelligence for legal and financial teams
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Case-based wallet risk assessment and counterparty due diligence, delivered through structured reporting for internal and regulatory review.
          </p>
          <Button size="lg" className="font-semibold" asChild>
            <a href="https://koalendar.com/e/meet-with-greg-schneider-podproza" target="_blank" rel="noopener noreferrer">Discuss Your Matter</a>
          </Button>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Crypto activity introduces measurable compliance risk */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">
            Crypto activity introduces measurable compliance risk
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div className="flex items-center justify-center">
              <div className="w-48 h-48 rounded-2xl border border-border bg-card flex items-center justify-center">
                <ShieldAlert className="w-20 h-20 text-muted-foreground/40" strokeWidth={1} />
              </div>
            </div>

            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                As organisations interact with crypto wallets, exchanges and digital asset counterparties, regulatory and reputational exposure increases.
              </p>
              <p>
                Blockchain transparency does not automatically reveal risk. Wallet activity and counterparty relationships must be analysed within a structured compliance framework.
              </p>
              <p>
                Professional crypto compliance review provides documented clarity aligned with regulatory and internal requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* What distinguishes professional crypto compliance review */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">
            What distinguishes professional crypto compliance review from basic blockchain checks?
          </h2>

          {/* Comparison visual */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-14 max-w-3xl mx-auto">
            <div className="border border-border rounded-t-lg md:rounded-l-lg md:rounded-tr-none p-8 bg-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Eye className="w-5 h-5 text-muted-foreground" />
                </div>
                <h3 className="font-bold text-lg">Basic Blockchain Checks</h3>
              </div>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full border border-border flex items-center justify-center shrink-0 mt-0.5 text-xs text-muted-foreground">•</span>
                  <span>Displays raw transaction data</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full border border-border flex items-center justify-center shrink-0 mt-0.5 text-xs text-muted-foreground">•</span>
                  <span>No risk context or exposure mapping</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full border border-border flex items-center justify-center shrink-0 mt-0.5 text-xs text-muted-foreground">•</span>
                  <span>No counterparty analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full border border-border flex items-center justify-center shrink-0 mt-0.5 text-xs text-muted-foreground">•</span>
                  <span>Not suitable for regulatory reporting</span>
                </li>
              </ul>
            </div>

            <div className="border-2 border-primary rounded-b-lg md:rounded-r-lg md:rounded-bl-none p-8 bg-primary/5 relative">
              <div className="absolute -top-3 right-6 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                COMPLIANCE STANDARD
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-lg">Professional Compliance Review</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Wallet risk assessment and KYT analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Counterparty due diligence and exposure mapping</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Cross-chain transaction pattern review</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Documented findings suitable for compliance or regulatory review</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Compliance analysis in practice */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Compliance analysis in practice
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            The following case illustrates how structured crypto wallet assessment and counterparty due diligence supported an internal compliance review.
          </p>

          {/* YouTube Video */}
          <div className="aspect-video rounded-lg overflow-hidden mb-10">
            <iframe
              src="https://www.youtube.com/embed/pVgWz3D6AJk?start=17"
              title="Compliance analysis case study"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          <div className="mb-10">
            <p className="font-semibold mb-3">Key aspects demonstrated:</p>
            <ul className="text-muted-foreground space-y-1">
              <li>• Cross-Chain Transaction Reversal</li>
              <li>• Root Cause Source Identification</li>
              <li>• Operational Recovery Strategy Delivery</li>
            </ul>
          </div>

          <Button size="lg" className="font-semibold" asChild>
            <a href="https://koalendar.com/e/meet-with-greg-schneider-podproza" target="_blank" rel="noopener noreferrer">Discuss Your Case</a>
          </Button>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Our investigative methodology */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Our investigative methodology
          </h2>
          <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
            Professional crypto compliance review follows a defined framework to ensure consistency, objectivity and documented risk assessment.
          </p>

          {/* Desktop steps */}
          <div className="hidden md:flex items-start justify-between mb-14 relative">
            <div className="absolute top-7 left-[60px] right-[60px] h-0.5 bg-border z-0" />
            {[
              { step: "1", label: "Confidential case assessment", icon: ShieldCheck },
              { step: "2", label: "Defined investigative scope", icon: Search },
              { step: "3", label: "Structured wallet and counterparty analysis", icon: GitBranch },
              { step: "4", label: "Formal compliance reporting", icon: FileOutput },
            ].map((item, index) => (
              <div key={item.step} className="flex flex-col items-center text-center flex-1 relative z-10">
                <div className="w-14 h-14 rounded-full border-2 border-primary bg-background flex items-center justify-center mb-3">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Step {item.step}</span>
                <p className="text-sm font-medium max-w-[160px]">{item.label}</p>
                {index < 3 && (
                  <ArrowRight className="absolute top-5 -right-2 w-4 h-4 text-primary z-20" />
                )}
              </div>
            ))}
          </div>

          {/* Mobile steps */}
          <div className="flex md:hidden flex-col gap-0 mb-14">
            {[
              { step: "1", label: "Confidential case assessment", icon: ShieldCheck },
              { step: "2", label: "Defined investigative scope", icon: Search },
              { step: "3", label: "Structured wallet and counterparty analysis", icon: GitBranch },
              { step: "4", label: "Formal compliance reporting", icon: FileOutput },
            ].map((item, index) => (
              <div key={item.step}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-primary bg-background flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">Step {item.step}</span>
                    <p className="text-sm font-medium">{item.label}</p>
                  </div>
                </div>
                {index < 3 && (
                  <div className="ml-6 h-8 border-l-2 border-border" />
                )}
              </div>
            ))}
          </div>

          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            Each engagement follows a structured process, beginning with a confidential assessment and concluding with documented findings, ensuring wallet activity and counterparty exposure are reviewed within a defined compliance framework.
          </p>

          <div className="text-center">
            <Button size="lg" variant="outline-white" className="font-semibold" asChild>
              <a href="https://koalendar.com/e/meet-with-greg-schneider-podproza" target="_blank" rel="noopener noreferrer">Talk To An Expert</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Professional compliance standards */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">
            Professional compliance standards
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="flex items-center justify-center">
              <div className="w-48 h-48 rounded-2xl border border-border bg-card flex items-center justify-center">
                <Network className="w-20 h-20 text-muted-foreground/40" strokeWidth={1} />
              </div>
            </div>

            <ul className="space-y-5">
              {[
                "Independent crypto risk assessment",
                "Structured wallet and counterparty review",
                "Cross-chain transaction analysis capability",
                "Documented findings aligned with regulatory and internal requirements",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Determine whether a formal crypto compliance review is appropriate */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Determine whether a formal crypto compliance review is appropriate
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
            A confidential discussion can clarify regulatory exposure, review scope and next steps.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline-white" className="font-semibold" asChild>
              <Link to="/pricing">Pricing</Link>
            </Button>
            <Button size="lg" variant="outline-white" className="font-semibold" asChild>
              <a href="https://koalendar.com/e/meet-with-greg-schneider-podproza" target="_blank" rel="noopener noreferrer">Schedule Case Discussion</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CryptoCompliance;
