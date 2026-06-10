import { Landmark } from "lucide-react";
import SolutionPageLayout from "@/components/SolutionPageLayout";

const SolutionsLawEnforcement = () => {
  return (
    <SolutionPageLayout
      eyebrow="For Law Enforcement & Government"
      headline="National-level blockchain intelligence, without a six-figure annual licence."
      subhead="Tier-one investigation capability has historically meant tier-one budgets and a long bench of in-house specialists. We deliver the same operational outcome, a sovereign command center with AI-powered investigation and on-demand expert support, at a price point and timeline that mid-budget agencies can actually procure."
      HeroIcon={Landmark}
      scenarios={[
        "Cryptocurrency cases stalled because the existing toolchain is out of budget",
        "In-house teams without the deep specialism needed to close complex on-chain matters",
        "International cooperation requests that demand defensible attribution",
        "Emerging asset classes (stablecoins, mixers, cross-chain) outside current capability",
      ]}
      scenarioCaption="Mid-budget agencies deserve front-line capability, not a downgrade."
      deliverables={[
        {
          title: "Sovereign command center",
          body: "A national-level investigation platform deployed inside your perimeter. Your data never leaves jurisdiction. Your access controls, your audit trail.",
        },
        {
          title: "AI-powered investigation, hybrid escalation",
          body: "Autonomous agents handle routine triage. Our network of vetted human investigators escalates the complex cases, billed by the hour, only when needed.",
        },
        {
          title: "Cross-chain & emerging-asset coverage",
          body: "BTC, ETH, EVM, stablecoins, bridges, mixers and de-mixing capability built in, not bolted on after the fact.",
        },
        {
          title: "Training & capability transfer",
          body: "We build for your team to operate. Onboarding, playbooks, and ongoing skill development are part of the engagement.",
        },
      ]}
      proofTitle="A sovereign platform delivered to a G7 government."
      proofBody="Our flagship national-government deployment provides a unified command center for financial-intelligence and law-enforcement teams, replacing fragmented tooling with a single operational dashboard, fully sovereign, fully audited."
      proofItems={[
        { metric: "G7", label: "Government deployment in production" },
        { metric: "Sovereign", label: "In-jurisdiction cloud" },
        { metric: "Hybrid", label: "AI + human investigator escalation" },
        { metric: "Pilot", label: "First workflow live in 60 days" },
      ]}
      ctaHeadline="Brief your team. Pilot the platform."
      ctaBody="We work with agencies under NDA from the first conversation. Pilot engagements are scoped, fixed-fee, and outcome-driven."
      primaryCtaLabel="Request a Confidential Briefing"
    />
  );
};

export default SolutionsLawEnforcement;
