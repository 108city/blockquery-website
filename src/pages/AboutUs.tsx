import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PartnerCTA from "@/components/PartnerCTA";
import { Users, Shield, Award } from "lucide-react";
import scorechainLogo from "@/assets/logos/scorechain.png";
import ellipticLogo from "@/assets/logos/elliptic.png";
import amlbotLogo from "@/assets/logos/amlbot.png";
import crystalLogo from "@/assets/logos/crystal.png";

const AboutUs = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="py-[200px] px-6">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-8">About us</h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            We are a crypto investigations agency built by the team behind Blockquery, a leader in blockchain data and
            analytics. With expertise in transaction tracing, wallet clustering, and forensic analysis, we track stolen
            assets and uncover illicit activity using internally developed tools and a comprehensive illicit crypto
            database.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mt-6">
            Our strategic partnerships with leading blockchain analytics firms - including Scorechain, Elliptic, AMLBot,
            and Crystal - give us real-time access to critical data, enabling fast and effective investigations.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mt-6">
            We deliver precise, well-documented intelligence for victims, businesses, and law enforcement, ensuring
            every case is handled with accuracy, efficiency, and expertise.
          </p>

          {/* Strategic Partners */}
          <div className="mt-16">
            <h3 className="text-xl md:text-2xl text-center mb-8 text-muted-foreground">Strategic partners</h3>
            <div className="relative overflow-hidden">
              <div className="flex animate-slide-left">
                {[
                  { name: "Scorechain", logo: scorechainLogo },
                  { name: "Elliptic", logo: ellipticLogo },
                  { name: "AMLBot", logo: amlbotLogo },
                  { name: "Crystal", logo: crystalLogo },
                  { name: "Scorechain", logo: scorechainLogo },
                  { name: "Elliptic", logo: ellipticLogo },
                  { name: "AMLBot", logo: amlbotLogo },
                  { name: "Crystal", logo: crystalLogo },
                ].map((partner, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 mx-12 flex items-center justify-center"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-8 md:h-10 object-contain opacity-70 hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics & Compliance Section */}
      <section className="py-[200px] px-6 bg-secondary/20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold">Success metrics & compliance</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-8 border border-border text-center">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" strokeWidth={1} />
              <h3 className="text-xl font-semibold mb-3">10+ years</h3>
              <p className="text-muted-foreground">Combined blockchain investigation experience</p>
            </div>

            <div className="bg-card rounded-lg p-8 border border-border text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" strokeWidth={1} />
              <h3 className="text-xl font-semibold mb-3">Full compliance</h3>
              <p className="text-muted-foreground">Adherence to AML/CFT regulations and data protection laws</p>
            </div>

            <div className="bg-card rounded-lg p-8 border border-border text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" strokeWidth={1} />
              <h3 className="text-xl font-semibold mb-3">Strategic partners</h3>
              <p className="text-muted-foreground">Partnerships with top forensic tool providers</p>
            </div>
          </div>
        </div>
      </section>

      <PartnerCTA />
      <Footer />
    </div>
  );
};

export default AboutUs;
