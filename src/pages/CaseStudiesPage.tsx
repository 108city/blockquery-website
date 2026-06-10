import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CaseStudies from "@/components/CaseStudies";
import { BOOK_DEMO_HREF } from "@/config/site";

const CaseStudiesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 sm:pt-40 sm:pb-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-6">
            Case studies
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Work that holds up where it matters.
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Sovereign government intelligence, regulator-grade gaming oversight,
            operator fraud response and asset recovery, already in production for
            the institutions that can't afford to get this wrong.
          </p>
        </div>
      </section>

      <CaseStudies showCta={false} />

      {/* Closing CTA */}
      <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Bring us a case.
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Tell us the problem you're trying to solve and we'll show you the
            dashboard, investigation or report that fits.
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

export default CaseStudiesPage;
