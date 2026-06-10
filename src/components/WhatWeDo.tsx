import { LayoutDashboard, Bot, Users } from "lucide-react";
import { Link } from "react-router-dom";

const PlatformBuildingBlocks = () => {
  const blocks = [
    {
      icon: LayoutDashboard,
      title: "Industry Dashboards",
      description:
        "Real-time intelligence for the teams on the front line. Live criminal-trend feeds, role-based command centers, and oversight views for regulators and operators, not static PDF reports.",
      href: "/platform#dashboards",
    },
    {
      icon: Bot,
      title: "AI Agents",
      description:
        "Autonomous triage that resolves up to 80% of routine case reviews in seconds. Wallet screening, risk scoring, and pattern detection without a human in the loop.",
      href: "/platform#ai-agents",
    },
    {
      icon: Users,
      title: "Call for Backup",
      description:
        "When complexity spikes, our hybrid network of vetted human investigators picks up where the AI escalates. Court-ready output, scaled by economics that work.",
      href: "/platform#call-for-backup",
    },
  ];

  return (
    <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6">
      <div className="container mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary text-center mb-4">
          The Platform
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4">
          A unified intelligence platform.
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
          Built to replace analyst hours with AI-driven triage and escalation,
          and deployed in weeks, not quarters.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {blocks.map((block) => (
            <Link
              key={block.title}
              to={block.href}
              className="border border-border rounded-lg p-6 sm:p-8 hover:border-primary transition-colors duration-300 group block"
            >
              <div className="aspect-video bg-secondary rounded-md mb-6 flex items-center justify-center">
                <block.icon className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors" strokeWidth={1} />
              </div>
              <h3 className="text-xl font-bold mb-2">{block.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {block.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformBuildingBlocks;
