import { Link } from "react-router-dom";
import { LayoutDashboard, Users, ScanLine, CheckCircle, ArrowRight, LucideIcon } from "lucide-react";
import { PRODUCTS } from "@/config/site";

interface Offering {
  icon: LucideIcon;
  name: string;
  tagline: string;
  href: string;
  cta: string;
  points: string[];
}

const offerings: Offering[] = [
  {
    icon: LayoutDashboard,
    name: PRODUCTS.intelligence.name,
    tagline: PRODUCTS.intelligence.tagline,
    href: PRODUCTS.intelligence.href,
    cta: "Explore Intelligence",
    points: [
      "Industry dashboards and monthly intelligence reporting",
      "Wallet and transaction screening, cross-chain fund-flow reconstruction",
      "On-demand investigators and court-ready forensic reports",
    ],
  },
  {
    icon: Users,
    name: PRODUCTS.embedded.name,
    tagline: PRODUCTS.embedded.tagline,
    href: PRODUCTS.embedded.href,
    cta: "Explore Embedded",
    points: [
      "A named specialist who learns your operation",
      "Proven products deployed in days, not quarters",
      "Bespoke builds for the gaps no product covers",
    ],
  },
  {
    icon: ScanLine,
    name: PRODUCTS.walletChecker.name,
    tagline: PRODUCTS.walletChecker.tagline,
    href: PRODUCTS.walletChecker.href,
    cta: "Explore Wallet Checker",
    points: [
      "Plain-language green, amber or red verdict with a score",
      "Built for OTC desks and money exchangers",
      "Bilingual, local pricing, no blockchain expertise needed",
    ],
  },
];

const ThreeOfferings = () => {
  return (
    <section id="offerings" className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 bg-card border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary text-center mb-4">
          Three ways to work with us
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4">
          One intelligence stack. Three ways to use it.
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
          Buy the platform, embed a specialist, or self-serve a verdict in seconds.
          The same on-chain intelligence, shaped to how you work.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {offerings.map((o) => (
            <Link
              key={o.name}
              to={o.href}
              className="border border-border rounded-xl p-6 sm:p-8 bg-background hover:border-primary transition-colors duration-300 group flex flex-col h-full"
            >
              <div className="w-[34px] h-[34px] rounded-lg bg-brand-tint flex items-center justify-center mb-6">
                <o.icon className="w-[18px] h-[18px] text-primary" strokeWidth={1.75} />
              </div>
              <h3 className="text-xl font-medium mb-2">{o.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{o.tagline}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {o.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5">
                    <CheckCircle className="w-[18px] h-[18px] text-primary flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                    <span className="text-sm text-secondary-foreground leading-snug">{p}</span>
                  </li>
                ))}
              </ul>
              <span className="text-sm text-primary font-medium inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                {o.cta} <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreeOfferings;
