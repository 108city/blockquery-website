import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WhyChooseBlockquery = () => {
  const reasons = [
    {
      title: "We don't compete with the incumbents. We build above them.",
      body: "Existing forensic vendors give you raw data. We build the automation, AI agents and dashboards that turn that data into decisions.",
    },
    {
      title: "Fast, for what you're getting.",
      body: "A working capability in weeks, not the quarters legacy platforms take to deploy. Fast for the scope, with a clear path from first pilot to live operation.",
    },
    {
      title: "Hybrid economics that actually scale.",
      body: "AI handles 80% of the heavy lifting. Human investigators escalate only where complexity demands it, keeping cost-per-case sustainable.",
    },
    {
      title: "Already deployed where it matters.",
      body: "From national-level government intelligence platforms to regulator-side oversight in major gaming jurisdictions.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 bg-card">
      <div className="container mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary text-center mb-4">
          Why BlockQuery
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-14">
          A new kind of investigation infrastructure.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-12">
          {reasons.map((r) => (
            <div key={r.title} className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold mb-2">{r.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{r.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="font-medium" asChild>
            <Link to="/contact">Book a demo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseBlockquery;
