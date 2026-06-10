import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import LogoMarquee from "./LogoMarquee";
import { POSITIONING_LINE, BOOK_DEMO_HREF } from "@/config/site";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-6">
          On-chain intelligence
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          {POSITIONING_LINE}
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl">
          Blockquery builds the dashboards, screening tools and investigation
          services that exchanges, regulators, law firms and compliance teams rely
          on, at a fraction of incumbent cost.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Button size="lg" className="font-medium" asChild>
            <Link to={BOOK_DEMO_HREF}>Book a demo</Link>
          </Button>
          <Button size="lg" variant="outline-white" className="font-medium" asChild>
            <a href="#offerings">Explore the products</a>
          </Button>
        </div>

        {/* Trust bar */}
        <div className="border-t border-border pt-10">
          <p className="text-sm text-muted-foreground text-center mb-6">
            Built on the data, tooling and intelligence sources trusted across the industry.
          </p>
          <LogoMarquee inline />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
