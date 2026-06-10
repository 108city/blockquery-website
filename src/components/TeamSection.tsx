import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const TeamSection = () => {
  const [currentMember, setCurrentMember] = useState(0);

  const team = [
    {
      name: "Dr. Sarah Chen",
      title: "Chief Investigation Officer",
      bio: "Former FBI cybercrime investigator with 15+ years tracking digital assets. Led recovery operations totaling over $50M in cryptocurrency.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    },
    {
      name: "Michael Rodriguez",
      title: "Head of Blockchain Analytics",
      bio: "Pioneer in on-chain forensics with expertise in cross-chain tracing. Previously built compliance systems for major cryptocurrency exchanges.",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop",
    },
    {
      name: "Emma Watson",
      title: "Legal Evidence Specialist",
      bio: "Certified forensic accountant specializing in digital asset litigation. Expert witness in over 50 cryptocurrency-related court cases.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    },
  ];

  const nextMember = () => {
    setCurrentMember((prev) => (prev + 1) % team.length);
  };

  const prevMember = () => {
    setCurrentMember((prev) => (prev - 1 + team.length) % team.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMember((prev) => (prev + 1) % team.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-[200px] px-6">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
          Our Team of Investigation Experts
        </h2>

        <div className="relative overflow-hidden">
          <div className="bg-card rounded-lg p-8 md:p-12">
            <div key={currentMember} className="flex flex-col md:flex-row items-center gap-8 animate-slide-in-right">
              <img
                src={team[currentMember].image}
                alt={team[currentMember].name}
                className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover"
              />
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-bold mb-2">
                  {team[currentMember].name}
                </h3>
                <p className="text-xl text-primary mb-4">
                  {team[currentMember].title}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {team[currentMember].bio}
                </p>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2"
            onClick={prevMember}
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={1} />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2"
            onClick={nextMember}
          >
            <ChevronRight className="h-6 w-6" strokeWidth={1} />
          </Button>

          <div className="flex justify-center gap-2 mt-8">
            {team.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentMember ? "bg-primary w-8" : "bg-muted"
                }`}
                onClick={() => setCurrentMember(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
