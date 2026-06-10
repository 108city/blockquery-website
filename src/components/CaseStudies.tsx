import { Landmark, ShieldCheck, Gamepad2, Coins, Search, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const cases = [
  {
    icon: Landmark,
    tag: "Government",
    title: "National blockchain insights & investigation platform",
    summary:
      "A G7 government commissioned a sovereign command center to give its financial-intelligence and law-enforcement teams unified on-chain visibility, replacing fragmented tooling with a single operational dashboard.",
  },
  {
    icon: ShieldCheck,
    tag: "Regulator",
    title: "Regulator-side oversight for a major gaming jurisdiction",
    summary:
      "We delivered a regulator-grade intelligence layer giving a leading gaming authority real-time visibility into licensed-operator wallet activity, payout patterns, and counterparty risk, without the cost of incumbent enterprise platforms.",
  },
  {
    icon: Gamepad2,
    tag: "iGaming",
    title: "Hack response for a major iGaming platform",
    summary:
      "Cross-chain reconstruction of an exploit on a top-tier iGaming operator. Identified attacker wallet clusters, traced movement across mixers and bridges, and produced enforcement-ready evidence within days.",
  },
  {
    icon: Coins,
    tag: "iGaming",
    title: "Bonus-abuse ring stopped before payout",
    summary:
      "An operator was losing promotional liquidity to a ring of clustered wallets sharing on-chain history. Real-time deposit screening surfaced the cluster, and the operator declined the payouts before funds cleared.",
  },
  {
    icon: Search,
    tag: "Asset recovery",
    title: "Cross-chain trace for an asset-recovery claim",
    summary:
      "A client's funds had been layered through mixers and bridges across three chains. We reconstructed the flow, attributed the destination exchange, and delivered a court-ready evidence package that supported a freezing order.",
  },
];

interface CaseStudiesProps {
  showCta?: boolean;
}

const CaseStudies = ({ showCta = true }: CaseStudiesProps) => {
  return (
    <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            Proof of work
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Deployed where the stakes are highest.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From sovereign government intelligence to regulator-grade gaming
            oversight to asset recovery, our work is already in production for the
            institutions that can't afford to get this wrong.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-14">
          {cases.map((c) => (
            <article
              key={c.title}
              className="border border-border rounded-xl p-6 sm:p-8 hover:border-primary transition-colors duration-300 flex flex-col bg-card"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg border border-border flex items-center justify-center">
                  <c.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {c.tag}
                </span>
              </div>
              <h3 className="text-lg font-medium mb-3 leading-snug">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {c.summary}
              </p>
            </article>
          ))}
        </div>

        {showCta && (
          <div className="text-center">
            <Button size="lg" variant="outline-white" className="font-medium" asChild>
              <Link to="/case-studies">
                More case studies <ArrowUpRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CaseStudies;
