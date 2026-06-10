import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import handshakeImg from "@/assets/handshake-corporate.jpg";

const Companies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            When digital assets are part of the case, clarity matters.
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            We support law firms, forensic accountants, compliance teams and gaming companies with structured blockchain investigations and formal reporting suitable for legal and regulatory use.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="font-semibold" asChild>
              <a href="#how-we-can-help">Investigation Services</a>
            </Button>
            <Button size="lg" variant="outline-white" className="font-semibold" asChild>
              <Link to="/contact">Discuss Your Case</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* You may be handling a matter involving */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-10">
            You may be handling a matter involving:
          </h2>
          <ul className="text-left space-y-4 max-w-xl mx-auto mb-10">
            {[
              "Undisclosed crypto holdings in a divorce proceeding",
              "Fraud litigation requiring transaction tracing",
              "Suspicious wallet movements across exchanges",
              "Regulatory exposure involving digital assets",
              "Token or NFT-related disputes in gaming environments",
              "Cross-border blockchain transactions requiring reconstruction",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-lg">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-foreground font-semibold text-lg">
            In professional matters, assumptions are not enough. Structured analysis is required.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* How we can help */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 id="how-we-can-help" className="text-3xl sm:text-4xl font-bold text-center mb-4 scroll-mt-24">
            How we can help
          </h2>
          <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
            We provide structured investigative and advisory services where digital assets intersect with legal, compliance and Web3 environments.
          </p>

          <div className="space-y-8">
            {/* Forensic Blockchain Investigation */}
            <div className="border border-border rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4 text-center">Forensic Blockchain Investigation</h3>
              <ul className="text-muted-foreground space-y-2 max-w-md mx-auto mb-6">
                <li className="flex items-start gap-2"><span>•</span> Court-ready evidential documentation</li>
                <li className="flex items-start gap-2"><span>•</span> Cross-chain wallet and transaction tracing</li>
                <li className="flex items-start gap-2"><span>•</span> Structured reporting for legal and advisory use</li>
              </ul>
              <div className="text-center">
                <Link to="/forensic-services" className="text-primary hover:underline inline-flex items-center gap-1 text-sm font-medium">
                  Explore Forensic Investigation <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Compliance & Risk Intelligence */}
            <div className="border border-border rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4 text-center">Compliance &amp; Risk Intelligence</h3>
              <ul className="text-muted-foreground space-y-2 max-w-md mx-auto mb-6">
                <li className="flex items-start gap-2"><span>•</span> Wallet risk assessment and KYT analysis</li>
                <li className="flex items-start gap-2"><span>•</span> Counterparty due diligence</li>
                <li className="flex items-start gap-2"><span>•</span> Regulatory and internal reporting support</li>
              </ul>
              <div className="text-center">
                <Link to="/crypto-compliance" className="text-primary hover:underline inline-flex items-center gap-1 text-sm font-medium">
                  Explore Compliance Services <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Gaming & Web3 Investigations */}
            <div className="border border-border rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4 text-center">Gaming &amp; Web3 Investigations</h3>
              <ul className="text-muted-foreground space-y-2 max-w-md mx-auto mb-6">
                <li className="flex items-start gap-2"><span>•</span> Exploit and breach-related fund tracing</li>
                <li className="flex items-start gap-2"><span>•</span> Token and NFT transaction reconstruction</li>
                <li className="flex items-start gap-2"><span>•</span> Post-incident forensic reporting</li>
              </ul>
              <div className="text-center">
                <Link to="/igaming" className="text-primary hover:underline inline-flex items-center gap-1 text-sm font-medium">
                  Explore Gaming &amp; Web3 Services <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Why professionals choose Blockquery */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">
            Why professionals choose Blockquery
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <ul className="space-y-5">
              {[
                "Court-ready evidential reporting",
                "Cross-chain investigative capability",
                "Independent, objective analysis",
                "Confidential engagement with defined scope",
              ].map((reason) => (
                <li key={reason} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-lg">{reason}</span>
                </li>
              ))}
            </ul>

            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-secondary">
              <img
                src={handshakeImg}
                alt="Professional blockchain investigation"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="text-center mt-14">
            <Button size="lg" className="font-semibold" asChild>
              <Link to="/contact">Discuss Your Case</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Ready to structure your matter? */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to structure your matter?
          </h2>
          <p className="text-muted-foreground text-lg mb-6 max-w-xl mx-auto">
            If digital assets are part of your case, the next step is defining scope and investigative requirements.
          </p>
          <p className="font-semibold text-lg mb-10">
            Choose the option that fits your situation
          </p>

          <div className="grid sm:grid-cols-2 gap-6 max-w-lg mx-auto">
            <div className="text-center">
              <Button variant="outline-white" className="w-full font-semibold mb-3" asChild>
                <Link to="/contact">Request Scope Review</Link>
              </Button>
              <p className="text-sm text-muted-foreground">
                Submit details of the matter and receive a structured response outlining possible next steps.
              </p>
            </div>
            <div className="text-center">
              <Button variant="outline-white" className="w-full font-semibold mb-3" asChild>
                <a href="https://koalendar.com/e/meet-with-greg-schneider-podproza" target="_blank" rel="noopener noreferrer">Schedule Case Discussion</a>
              </Button>
              <p className="text-sm text-muted-foreground">
                Speak directly with an investigator to clarify objectives and determine suitability.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Companies;
