import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const PartnerCTA = () => {
  return (
    <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 bg-card border-t border-border">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
          Pilot a deployment in weeks, not quarters.
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          Most of our engagements move from first conversation to a live workflow
          inside 60 days. Tell us the problem you're trying to solve and we'll
          show you the dashboard, agent, or skill that fits.
        </p>
        <ul className="space-y-4 max-w-xl mx-auto text-left mb-10">
          <li className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-lg">Tailored deployment, not a forced product fit.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-lg">Fixed-fee pilots with a clear outcome and timeline.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-lg">Sovereign cloud option for government clients.</span>
          </li>
        </ul>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="font-medium" asChild>
            <Link to="/contact">Book a demo</Link>
          </Button>
          <Button size="lg" variant="outline-white" className="font-medium" asChild>
            <a href="#offerings">Explore the products</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PartnerCTA;
