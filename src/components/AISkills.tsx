import { Calculator, Layers, Activity } from "lucide-react";

const skills = [
  {
    icon: Calculator,
    name: "Investigation Viability Calculator",
    description:
      "Predictive modelling for asset clawbacks. Surfaces a recoverability score before a case is opened, reducing client-service work by up to 80%.",
  },
  {
    icon: Layers,
    name: "De-mixing Algorithm",
    description:
      "Untangles obfuscation tactics across mixers, bridges and chain hops to reconstruct the underlying flow of funds, eliminating days of manual tracing.",
  },
  {
    icon: Activity,
    name: "iGaming Fraud Monitoring",
    description:
      "Real-time detection of bonus abuse, multi-account collusion and suspicious payout patterns across operator wallets and counterparties, at scale, without human review.",
  },
];

const AISkills = () => {
  return (
    <section id="ai-skills" className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 bg-card">
      <div className="container mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary text-center mb-4">
          Proprietary Intelligence
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4">
          AI Skills shipped, deployed, in production.
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
          We don't just consume on-chain data. We build the automation layer above it.
          New skills ship weekly via our vibe-code hackathon cadence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {skills.map((s) => (
            <div
              key={s.name}
              className="border border-border rounded-lg p-6 sm:p-8 bg-background"
            >
              <div className="w-12 h-12 rounded-lg border border-primary/30 bg-primary/5 flex items-center justify-center mb-5">
                <s.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold mb-3">{s.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12">
          More skills in active development. Want one built for your workflow?{" "}
          <span className="text-primary font-medium">Talk to us.</span>
        </p>
      </div>
    </section>
  );
};

export default AISkills;
