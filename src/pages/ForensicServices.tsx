import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Scale, FileText, Eye, ShieldCheck, Search, GitBranch, FileOutput, ArrowRight } from "lucide-react";
import handshakeImg from "@/assets/handshake-corporate.jpg";

const ForensicServices = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Forensic blockchain investigation for legal and financial matters
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Structured crypto asset tracing and blockchain analytics for litigation, dispute resolution and regulatory matters.
          </p>
          <Button size="lg" className="font-semibold" asChild>
            <a href="https://koalendar.com/e/meet-with-greg-schneider-podproza" target="_blank" rel="noopener noreferrer">Discuss Your Matter</a>
          </Button>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Digital assets have introduced new evidential challenges */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">
            Digital assets have introduced new evidential challenges
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div className="flex items-center justify-center">
              <div className="w-48 h-48 rounded-2xl border border-border bg-card flex items-center justify-center">
                <Scale className="w-20 h-20 text-muted-foreground/40" strokeWidth={1} />
              </div>
            </div>

            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                As crypto adoption increases, digital asset disputes are no longer rare exceptions.
              </p>
              <p>
                However, blockchain data alone does not constitute structured evidence. Transaction history must be reconstructed, contextualised and interpreted according to legal and regulatory standards.
              </p>
              <p>
                That is where forensic crypto investigation differs from informal blockchain analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* What distinguishes forensic crypto investigation */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">
            What distinguishes forensic crypto investigation from basic blockchain tracing?
          </h2>

          {/* Comparison visual */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-14 max-w-3xl mx-auto">
            {/* Basic tracing side */}
            <div className="border border-border rounded-t-lg md:rounded-l-lg md:rounded-tr-none p-8 bg-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Eye className="w-5 h-5 text-muted-foreground" />
                </div>
                <h3 className="font-bold text-lg">Basic Blockchain Tracing</h3>
              </div>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full border border-border flex items-center justify-center shrink-0 mt-0.5 text-xs text-muted-foreground">•</span>
                  <span>Displays raw transaction data</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full border border-border flex items-center justify-center shrink-0 mt-0.5 text-xs text-muted-foreground">•</span>
                  <span>Single-chain visibility only</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full border border-border flex items-center justify-center shrink-0 mt-0.5 text-xs text-muted-foreground">•</span>
                  <span>No contextual interpretation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full border border-border flex items-center justify-center shrink-0 mt-0.5 text-xs text-muted-foreground">•</span>
                  <span>Not suitable for legal proceedings</span>
                </li>
              </ul>
            </div>

            {/* Forensic investigation side */}
            <div className="border-2 border-primary rounded-b-lg md:rounded-r-lg md:rounded-bl-none p-8 bg-primary/5 relative">
              <div className="absolute -top-3 right-6 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                FORENSIC STANDARD
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Scale className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-lg">Forensic Investigation</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Cross-chain reconstruction of fund movements</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Identification of wallet relationships</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Assessment of exchange interactions</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Structured evidential documentation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Forensic analysis in practice */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Forensic analysis in practice
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            The following case study outlines how structured crypto tracing supported a formal dispute matter involving multi-wallet activity.
          </p>

          {/* YouTube Video */}
          <div className="aspect-video rounded-lg overflow-hidden mb-10">
            <iframe
              src="https://www.youtube.com/embed/Ga8AltajNGA"
              title="Forensic analysis case study"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          <div className="mb-10">
            <p className="font-semibold mb-3">Key aspects demonstrated:</p>
            <ul className="text-muted-foreground space-y-1">
              <li>• Cluster &amp; Behavioral Analysis</li>
              <li>• Syndicate &amp; Sanction Mapping</li>
              <li>• Law Enforcement-Ready Evidence Bundles</li>
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
            Forensic crypto analysis requires more than transaction visibility. It demands a structured methodology aligned with legal and regulatory standards.
          </p>

          {/* Steps - Mobile: vertical, Desktop: horizontal with connectors */}
          <div className="hidden md:flex items-start justify-between mb-14 relative">
            {/* Connecting line */}
            <div className="absolute top-7 left-[60px] right-[60px] h-0.5 bg-border z-0" />
            
            {[
              { step: "1", label: "Confidential case assessment", icon: ShieldCheck },
              { step: "2", label: "Defined investigative scope", icon: Search },
              { step: "3", label: "Structured blockchain reconstruction", icon: GitBranch },
              { step: "4", label: "Formal forensic reporting", icon: FileOutput },
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

          {/* Mobile vertical steps */}
          <div className="flex md:hidden flex-col gap-0 mb-14">
            {[
              { step: "1", label: "Confidential case assessment", icon: ShieldCheck },
              { step: "2", label: "Defined investigative scope", icon: Search },
              { step: "3", label: "Structured blockchain reconstruction", icon: GitBranch },
              { step: "4", label: "Formal forensic reporting", icon: FileOutput },
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
            Each engagement follows a structured investigative process, beginning with a confidential case assessment and concluding with formal reporting, ensuring blockchain activity is reconstructed and documented in accordance with legal and evidential standards.
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

      {/* Professional forensic standards */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">
            Professional forensic standards
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="flex items-center justify-center">
              <div className="w-48 h-48 rounded-2xl border border-border bg-card flex items-center justify-center">
                <ShieldCheck className="w-20 h-20 text-muted-foreground/40" strokeWidth={1} />
              </div>
            </div>

            <ul className="space-y-5">
              {[
                "Court-ready evidential documentation",
                "Independent and objective analysis",
                "Cross-chain investigative capability",
                "Confidential engagement with defined scope",
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

      {/* Determine whether forensic crypto investigation is appropriate */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Determine whether forensic crypto investigation is appropriate for your matter
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
            A confidential discussion can clarify scope, evidential requirements and next steps.
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

export default ForensicServices;
