import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import PlatformBuildingBlocks from "@/components/WhatWeDo";
import WhoWeServe from "@/components/WhoWeServe";
import AISkills from "@/components/AISkills";
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
      <PlatformBuildingBlocks />
      <WhoWeServe />
      <AISkills />
      <CaseStudies />
      <WhyChooseBlockquery />
      <Testimonials />
      <PartnerCTA />
      <Footer />
    </div>
  );
};

export default Index;
