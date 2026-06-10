import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ThreeOfferings from "@/components/ThreeOfferings";
import WhoWeServe from "@/components/WhoWeServe";
import CaseStudies from "@/components/CaseStudies";
import WhyChooseBlockquery from "@/components/WhyChooseBlockquery";
import Testimonials from "@/components/Testimonials";
import PartnerCTA from "@/components/PartnerCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ThreeOfferings />
      <WhoWeServe />
      <CaseStudies />
      <WhyChooseBlockquery />
      <Testimonials />
      <PartnerCTA />
      <Footer />
    </div>
  );
};

export default Index;
