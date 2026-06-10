import coinbaseLogo from "@/assets/logos/coinbase.png";
import elementusLogo from "@/assets/logos/elementus.png";
import iknaiLogo from "@/assets/logos/iknaio.png";
import lookintobitcoinLogo from "@/assets/logos/lookintobitcoin.png";
import merkleLogo from "@/assets/logos/merkle.png";
import santimentLogo from "@/assets/logos/santiment.png";
import upsallaLogo from "@/assets/logos/upsalla.png";

interface LogoMarqueeProps {
  inline?: boolean;
}

const LogoMarquee = ({ inline = false }: LogoMarqueeProps) => {
  const companies = [
    { name: "Coinbase", logo: coinbaseLogo },
    { name: "Elementus", logo: elementusLogo },
    { name: "Iknaio", logo: iknaiLogo },
    { name: "Look Into Bitcoin", logo: lookintobitcoinLogo },
    { name: "Merkle", logo: merkleLogo },
    { name: "Santiment", logo: santimentLogo },
    { name: "Upsalla", logo: upsallaLogo },
  ];

  if (inline) {
    return (
      <div className="relative overflow-hidden">
        <div className="flex animate-slide-left">
          {[...companies, ...companies].map((company, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-8 flex items-center justify-center"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="h-6 md:h-8 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 sm:py-24 px-6 border-y border-border">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-muted-foreground">
          The trusted choice of professionals and teams across leading global companies.
        </h2>
        <div className="relative overflow-hidden">
          <div className="flex animate-slide-left">
            {[...companies, ...companies].map((company, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-12 flex items-center justify-center"
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-8 md:h-10 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
