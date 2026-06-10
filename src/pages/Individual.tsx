import { Link } from "react-router-dom";
import { FileText, Search, ClipboardCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { LogoMark } from "@/components/Logo";

const Individual = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Lost crypto? We investigate.
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            If you've been scammed or lost access to digital assets, we provide structured blockchain investigations to help you understand what happened and what steps are possible next.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="font-semibold text-base px-8" asChild>
              <Link to="/investigations">Quick Report</Link>
            </Button>
            <Button size="lg" variant="outline-white" className="font-semibold text-base px-8" asChild>
              <Link to="/contact">Get Help</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* You may be here because */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10">
            You may be here because…
          </h2>
          <ul className="space-y-5 text-left max-w-lg mx-auto">
            {[
              "You sent crypto to someone who disappeared",
              "Funds were moved from your wallet without your consent",
              "An exchange is asking for transaction documentation",
              "You were involved in a scam and don't know what to do next",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary mt-0.5 shrink-0" />
                <span className="text-lg">{item}</span>
              </li>
            ))}
          </ul>
          <p className="font-semibold text-lg mt-10">
            If any of this sounds familiar, the first step is clarity.
          </p>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* How it works */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-16">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center mb-6">
                <FileText className="w-7 h-7 text-muted-foreground" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold mb-3">Share the details</h3>
              <p className="text-muted-foreground text-sm">
                Provide the wallet address or relevant transaction information so we can begin the analysis.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center mb-6">
                <Search className="w-7 h-7 text-muted-foreground" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold mb-3">We investigate</h3>
              <p className="text-muted-foreground text-sm">
                Our team reviews on-chain activity and traces the movement of funds.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center mb-6">
                <ClipboardCheck className="w-7 h-7 text-muted-foreground" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold mb-3">Receive your report</h3>
              <p className="text-muted-foreground text-sm">
                You receive a structured investigation report within 48 hours.
              </p>
            </div>
          </div>
          <p className="text-muted-foreground text-sm mt-12 italic">
            All information is handled confidentially and reviewed by experienced investigators.
          </p>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* See what your report looks like */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-card">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            See what your report looks like
          </h2>
          <p className="text-muted-foreground text-lg mb-4 max-w-2xl mx-auto">
            Download a redacted sample investigation report to understand the structure, format, and level of detail you can expect.
          </p>
          <Link
            to="/sample-report"
            className="text-primary underline text-lg inline-block mb-10"
          >
            Download sample report
          </Link>
          <div>
            <Button size="lg" className="font-semibold text-base px-8" asChild>
              <Link to="/investigations">Get Your Own Report</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* What you can expect */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-14 text-center">
            What you can expect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <ul className="space-y-5">
              {[
                "Clear documentation of wallet activity and fund flows",
                "Identification of relevant exchanges or counterparties",
                "Structured findings you can use for reporting",
                "Clear guidance on possible next steps based on the findings",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary mt-0.5 shrink-0" />
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-center">
              <div className="w-40 h-40 rounded-2xl border border-border flex items-center justify-center">
                <LogoMark className="w-24 h-24 opacity-50" />
              </div>
            </div>
          </div>
          <p className="text-muted-foreground text-sm italic mt-10 text-center">
            We provide clarity and structured findings. We do not guarantee immediate fund recovery or legal enforcement.
          </p>
          <div className="text-center mt-10">
            <Button size="lg" className="font-semibold text-base px-8" asChild>
              <Link to="/investigations">Get Report</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Ready to get clarity? */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-card">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Ready to get clarity?
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            If you've lost crypto and need structured insight into what happened, the first step is understanding the facts.
          </p>
          <p className="font-semibold text-lg mb-10">
            Choose the option that fits your situation
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
            <div className="border border-border rounded-lg p-6 text-center">
              <Button variant="outline-white" className="w-full font-semibold mb-3" asChild>
                <Link to="/investigations">Quick Investigation Report</Link>
              </Button>
              <p className="text-muted-foreground text-sm">
                Structured findings delivered within 48 hours.
              </p>
            </div>
            <div className="border border-border rounded-lg p-6 text-center">
              <Button variant="outline-white" className="w-full font-semibold mb-3" asChild>
                <a
                  href="https://koalendar.com/e/meet-with-greg-schneider-podproza"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Request review
                </a>
              </Button>
              <p className="text-muted-foreground text-sm">
                Not sure yet? Share your details and we'll guide you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Individual;
