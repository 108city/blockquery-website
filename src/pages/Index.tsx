import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import Offerings from "@/components/Offerings";
import WhoWeServe from "@/components/WhoWeServe";
import CaseStudies from "@/components/CaseStudies";
import WhyChooseBlockquery from "@/components/WhyChooseBlockquery";
import PartnerCTA from "@/components/PartnerCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <Offerings />
      <WhoWeServe />
      <CaseStudies />
      <WhyChooseBlockquery />
      <PartnerCTA />
      <Footer />
    </div>
  );
};

export default Index;
