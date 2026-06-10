import { ShieldCheck } from "lucide-react";
import SolutionPageLayout from "@/components/SolutionPageLayout";

const SolutionsGamingRegulators = () => {
  return (
    <SolutionPageLayout
      eyebrow="For Gaming Regulators & Authorities"
      headline="Regulator-grade oversight for an entire jurisdiction."
      subhead="Licensed crypto-gaming operators are growing faster than the tools regulators have to oversee them. We deliver a regulator-side intelligence platform that gives your authority real-time visibility into operator wallet activity, payout patterns, counterparty risk, and emerging threats, without a six-figure annual licence."
      HeroIcon={ShieldCheck}
      scenarios={[
        "Limited visibility into licensed operators' on-chain treasury activity",
        "Player-protection complaints requiring on-chain verification",
        "Suspected AML or sanctions exposure within licensed platforms",
        "Pressure from international counterparts to demonstrate active oversight",
      ]}
      scenarioCaption="Modern oversight requires modern instrumentation."
      deliverables={[
        {
          title: "Jurisdiction-wide oversight dashboard",
          body: "A regulator-grade command center showing every licensed operator's on-chain activity in one view, with drill-down to wallet level.",
        },
        {
          title: "Operator-level risk scoring",
          body: "Continuous scoring against AML, sanctions, mixer exposure, and abnormal payout-pattern signals, refreshed live, not quarterly.",
        },
        {
          title: "Investigation workflow for your team",
          body: "When something flags, your investigators get a guided workflow with the evidence, fund flows and counterparty intelligence pre-assembled.",
        },
        {
          title: "Sovereign cloud, your perimeter",
          body: "Sovereign cloud deployment. Your data, your jurisdiction's data residency requirements, your access controls.",
        },
      ]}
      proofTitle="Already deployed where it matters."
      proofBody="Our platform is in production delivering regulator-side oversight to a leading gaming jurisdiction, giving the authority continuous visibility into licensed-operator wallet activity at a fraction of the cost of incumbent enterprise tools."
      proofItems={[
        { metric: "Live", label: "Continuous operator monitoring" },
        { metric: "All-chain", label: "BTC, ETH, EVM, and beyond" },
        { metric: "Sovereign", label: "In-jurisdiction cloud" },
        { metric: "Weeks", label: "From engagement to live pilot" },
      ]}
      ctaHeadline="Modernise your oversight infrastructure."
      ctaBody="A pilot deployment can be live for your team to evaluate inside 60 days. Tell us your jurisdiction's mandate and we'll scope the rest."
      primaryCtaLabel="Request a Briefing"
    />
  );
};

export default SolutionsGamingRegulators;
