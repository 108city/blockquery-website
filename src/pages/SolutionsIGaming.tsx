import { Gamepad2 } from "lucide-react";
import SolutionPageLayout from "@/components/SolutionPageLayout";

const SolutionsIGaming = () => {
  return (
    <SolutionPageLayout
      eyebrow="For iGaming Operators"
      headline="Stop fraud at the wallet, not at the payout."
      subhead="Bonus abusers, money launderers and coordinated player rings increasingly drain platform liquidity through complex wallet webs. We give you a real-time fraud-monitoring layer and an investigation workflow that turns suspicious activity into defensible action before payout, not after."
      HeroIcon={Gamepad2}
      scenarios={[
        "Suspicious deposit-and-withdraw patterns ahead of large payouts",
        "Bonus abuse via clustered wallets and shared on-chain history",
        "Counterparty exposure from sanctioned, mixed, or high-risk source funds",
        "Hack response on operator wallets or treasury exploits",
      ]}
      scenarioCaption="Cost-effective investigation as part of standard payout checks, not just incident response after the fact."
      deliverables={[
        {
          title: "Real-time wallet & deposit screening",
          body: "Every incoming wallet scored against risk, sanctions, mixer exposure and on-chain history before funds clear.",
        },
        {
          title: "Payout-threshold investigations",
          body: "Automated investigation triggered above a configurable payout threshold, built into your standard withdrawal workflow.",
        },
        {
          title: "iGaming Fraud Monitoring AI Skill",
          body: "Detects bonus abuse, multi-account collusion and coordinated wallet behaviour at scale, without manual review.",
        },
        {
          title: "Hack response, days not weeks",
          body: "When the worst happens: cross-chain reconstruction, attacker cluster identification, and enforcement-ready evidence.",
        },
      ]}
      proofTitle="Trusted by major iGaming platforms in production."
      proofBody="From multi-million dollar exploit response on top-tier operators to ongoing fraud-monitoring integrations, we already work where the stakes are highest."
      proofItems={[
        { metric: "Real-time", label: "Wallet screening at deposit" },
        { metric: "$1M+", label: "Recovered on iGaming exploit cases" },
        { metric: "Configurable", label: "Payout threshold investigations" },
        { metric: "API-first", label: "Built to embed in your stack" },
      ]}
      ctaHeadline="Build investigation into your payout process."
      ctaBody="We'll show you how the fraud-monitoring layer plugs into your existing risk workflow, typically live in weeks, not quarters."
    />
  );
};

export default SolutionsIGaming;
