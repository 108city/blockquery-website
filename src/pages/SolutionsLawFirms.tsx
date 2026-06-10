import { Scale } from "lucide-react";
import SolutionPageLayout from "@/components/SolutionPageLayout";

const SolutionsLawFirms = () => {
  return (
    <SolutionPageLayout
      eyebrow="For Law Firms"
      headline="Give your blockchain practice a working investigation capability."
      subhead="A growing number of law firms advertise blockchain services without an in-house investigation function. We're the team that quietly sits behind your practice, delivering the analysis, evidence and expert testimony you commit to your clients."
      HeroIcon={Scale}
      scenarios={[
        "Asset-tracing requests on contentious divorce, fraud or insolvency matters",
        "Crypto-related disputes where you need defensible on-chain evidence",
        "Clients asking for blockchain investigation capability you don't yet have in-house",
        "Existing partners who deliver slowly, expensively, or inconsistently",
      ]}
      scenarioCaption="In professional matters, assumptions are not enough. Structured analysis is required."
      deliverables={[
        {
          title: "White-label investigation capability",
          body: "Cases delivered under your firm's brand or ours, your choice. Court-ready output, your client relationship preserved.",
        },
        {
          title: "Referral commission, where regulation permits",
          body: "Up to 10% on cases you refer. Aligned incentives, no awkward fee conversations.",
        },
        {
          title: "Pre-engagement viability scoring",
          body: "We screen cases before you commit, using our Investigation Viability Calculator, so you only take work that's worth taking.",
        },
        {
          title: "Expert witness & affidavits",
          body: "Senior investigators available for testimony, sworn statements, and rebuttal analysis when matters head to court.",
        },
      ]}
      proofTitle="A growing strategic network."
      proofBody="We've partnered with 27+ law firms across multiple jurisdictions. Where legal action is the destination, we're the team they call to build the evidence."
      proofItems={[
        { metric: "27+", label: "Law firms in partnership" },
        { metric: "10%", label: "Referral commission, where permitted" },
        { metric: "Days", label: "From brief to first findings" },
        { metric: "Court-ready", label: "Evidence packages by default" },
      ]}
      ctaHeadline="Add investigation capability to your practice."
      ctaBody="Whether you're scoping a single matter or building an ongoing referral relationship, the conversation starts the same way."
      primaryCtaLabel="Start a Conversation"
    />
  );
};

export default SolutionsLawFirms;
