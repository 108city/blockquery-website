import { Search } from "lucide-react";
import SolutionPageLayout from "@/components/SolutionPageLayout";

const SolutionsForensic = () => {
  return (
    <SolutionPageLayout
      eyebrow="Forensic Services"
      headline="Expert investigation for the cases that demand it."
      subhead="When a matter escapes the AI's confidence threshold, or when court-ready evidence and expert testimony are non-negotiable, our senior investigators take the file. Forensic Services is the human-led tier that sits behind the platform: bespoke, deeply technical, and built for litigation."
      HeroIcon={Search}
      scenarios={[
        "Complex multi-chain or multi-jurisdiction investigations beyond automated scope",
        "Court-ready evidence packages, affidavits and expert-witness testimony",
        "Sophisticated obfuscation: mixers, bridges, privacy chains, cross-asset hops",
        "Cases requiring narrative reconstruction for judges, juries or arbitrators",
      ]}
      scenarioCaption="Where stakes are highest, judgment matters."
      deliverables={[
        {
          title: "Bespoke narrative report",
          body: "Evidential detail, fund-flow charts, attribution rationale and actionable recommendations, written for the audience that will read it.",
        },
        {
          title: "Court-ready evidence package",
          body: "Suitable for filings, asset-freeze applications, criminal referrals, or arbitration submissions. Defensible methodology, documented chain of analysis.",
        },
        {
          title: "Expert witness & advisory",
          body: "Sworn statements, depositions, cross-examination preparation, and live testimony from senior investigators with track record.",
        },
        {
          title: "Legal & enforcement coordination",
          body: "We work alongside your legal team or introduce vetted partners across the jurisdictions where action needs to land.",
        },
      ]}
      proofTitle="The escalation tier behind the platform."
      proofBody="Our senior investigators handle the matters where complexity, sensitivity, or stakes preclude an automated answer: court cases, regulator referrals, treasury exploits, and sovereign engagements."
      proofItems={[
        { metric: "Senior", label: "Investigator on every engagement" },
        { metric: "Court-ready", label: "Evidence by default" },
        { metric: "Cross-chain", label: "BTC, ETH, EVM, mixers, bridges" },
        { metric: "Confidential", label: "NDA from first contact" },
      ]}
      ctaHeadline="Brief us on a matter."
      ctaBody="Confidential initial consultation. We'll tell you within one call whether the matter is investigable, what the realistic outcome looks like, and what an engagement would cost."
      primaryCtaLabel="Schedule a Confidential Briefing"
    />
  );
};

export default SolutionsForensic;
