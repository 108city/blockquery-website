import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import LogoMarquee from "./LogoMarquee";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-6">
          Intelligence Infrastructure
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          The intelligence layer for blockchain investigation.
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl">
          We build the dashboards, AI agents and investigation tools that law firms,
          regulators, gaming operators, insurers and government agencies rely on to
          detect fraud, verify claims and act on evidence, at a fraction of the cost
          of incumbent platforms.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Button size="lg" className="font-semibold" asChild>
            <Link to="/contact">Book a Platform Demo</Link>
          </Button>
          <Button size="lg" variant="outline-white" className="font-semibold" asChild>
            <Link to="/platform">Explore the Platform</Link>
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
