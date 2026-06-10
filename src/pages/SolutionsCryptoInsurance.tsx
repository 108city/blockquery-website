import { FileCheck } from "lucide-react";
import SolutionPageLayout from "@/components/SolutionPageLayout";

const SolutionsCryptoInsurance = () => {
  return (
    <SolutionPageLayout
      eyebrow="For Crypto Insurance"
      headline="Automate claim verification at the scale the market demands."
      subhead="Crypto insurance is a multi-billion dollar market with a fraud-exposure problem and a settlement-time problem. We provide the on-chain verification layer that turns a manual claims-investigation into an automated workflow, with a human investigator only escalated where it actually changes the outcome."
      HeroIcon={FileCheck}
      scenarios={[
        "High-volume small-claim fraud you can't economically investigate manually",
        "Recoverability scoring needed before a claim is paid out",
        "Claimant wallet-history verification under tight settlement SLAs",
        "Subrogation cases where on-chain recovery may offset payouts",
      ]}
      scenarioCaption="Reduce fraud exposure and settlement time at scale, without growing the claims team."
      deliverables={[
        {
          title: "Automated claim verification",
          body: "Every submitted claim runs through wallet history, fund-flow, and counterparty checks automatically: green-lit, flagged, or escalated.",
        },
        {
          title: "Investigation Viability Calculator",
          body: "Predictive scoring on whether assets are recoverable, used pre-settlement to inform payout strategy and subrogation potential.",
        },
        {
          title: "API-first integration",
          body: "Drops into your existing claims-management workflow. JSON in, structured findings out. No new console for your team to learn.",
        },
        {
          title: "Human escalation when stakes warrant it",
          body: "Above a configurable claim threshold, a senior investigator picks up the file. Court-ready output, attached to the claim record.",
        },
      ]}
      proofTitle="Built for high-volume claims environments."
      proofBody="Our recoverability scoring and de-mixing capabilities are already used to assess case viability before resources are committed. The same logic applied to insurance claim economics turns days of analysis into seconds."
      proofItems={[
        { metric: "80%", label: "Routine cases resolved without a human" },
        { metric: "Seconds", label: "From claim submission to first signal" },
        { metric: "API", label: "First-class, built to embed" },
        { metric: "Pre-settle", label: "Recoverability scoring before payout" },
      ]}
      ctaHeadline="See it run against a sample claim file."
      ctaBody="Send us a representative anonymised claim. We'll run it through the verification stack and walk you through the output."
      primaryCtaLabel="Request a Sample Run"
    />
  );
};

export default SolutionsCryptoInsurance;
