import { Shield, Search, AlertTriangle, FileCheck, Activity, Briefcase } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CoreCapabilities = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const capabilities = [
    {
      icon: Shield,
      title: "Asset Recovery",
      description:
        "Trace stolen crypto across chains and identify freeze points to maximize recovery.",
    },
    {
      icon: Search,
      title: "Hidden Holdings",
      description:
        "Verify digital asset positions in divorces, bankruptcies, estates, or enforcement actions.",
    },
    {
      icon: AlertTriangle,
      title: "Insider & Employee Misuse",
      description:
        "Expose unauthorized transfers or misuse of corporate crypto with defensible evidence.",
    },
    {
      icon: FileCheck,
      title: "Due Diligence",
      description:
        "Analyze counterparties or targets to detect hidden risks and laundering exposure.",
    },
    {
      icon: Activity,
      title: "Risk Monitoring",
      description:
        "Help wallets, exchanges, and iGaming platforms detect collusion and high-risk flows.",
    },
    {
      icon: Briefcase,
      title: "High-Net-Worth",
      description:
        "Safeguard digital wealth by tracing compromised assets and coordinating recovery.",
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 md:py-32 lg:py-[200px] px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-6">
          Core Capabilities
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground text-center mb-16">
          Actionable blockchain evidence delivered when you need it.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className={`bg-card p-6 sm:p-8 rounded-lg border border-border hover:border-primary transition-all duration-300 group ${
                isVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-4 sm:translate-x-8'
              }`}
              style={{ 
                animationDelay: isVisible ? `${index * 0.1}s` : '0s',
                animationFillMode: 'forwards'
              }}
            >
              <capability.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" strokeWidth={1} />
              <h3 className="text-2xl font-bold mb-3">{capability.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {capability.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreCapabilities;
