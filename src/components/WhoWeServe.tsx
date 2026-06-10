import { Scale, Gamepad2, ShieldCheck, Landmark, FileCheck, Search } from "lucide-react";
import { Link } from "react-router-dom";

const audiences = [
  {
    icon: Scale,
    title: "Law Firms",
    blurb: "Equip your blockchain practice with a working investigation capability and a referral pipeline.",
    href: "/solutions/law-firms",
  },
  {
    icon: Gamepad2,
    title: "iGaming Operators",
    blurb: "Real-time fraud monitoring, payout-threshold investigations, and bonus-abuse detection.",
    href: "/solutions/igaming-operators",
  },
  {
    icon: ShieldCheck,
    title: "Gaming Regulators",
    blurb: "Regulator-grade oversight dashboards for licensed operators across your jurisdiction.",
    href: "/solutions/gaming-regulators",
  },
  {
    icon: Landmark,
    title: "Law Enforcement & Government",
    blurb: "National-level blockchain intelligence platforms, without a six-figure annual licence.",
    href: "/solutions/law-enforcement",
  },
  {
    icon: FileCheck,
    title: "Crypto Insurance",
    blurb: "Automate claim verification and recoverability scoring before settlement.",
    href: "/solutions/crypto-insurance",
  },
  {
    icon: Search,
    title: "Forensic Services",
    blurb: "Court-ready expert investigations and witness testimony for the most complex cases.",
    href: "/solutions/forensic-services",
  },
];

const WhoWeServe = () => {
  return (
    <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 bg-card">
      <div className="container mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary text-center mb-4">
          Built for the front line
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4">
          Six industries. One platform.
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-14 max-w-2xl mx-auto">
          Tailored deployments of the same intelligence stack, built around the
          workflows of each sector we serve.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {audiences.map((a) => (
            <Link
              key={a.title}
              to={a.href}
              className="border border-border rounded-lg p-6 sm:p-8 hover:border-primary transition-colors duration-300 group bg-background flex flex-col h-full"
            >
              <div className="w-12 h-12 rounded-lg border border-border flex items-center justify-center mb-5 group-hover:border-primary transition-colors">
                <a.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold mb-2">{a.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {a.blurb}
              </p>
              <p className="text-sm text-primary font-medium mt-4 group-hover:underline">
                Learn more →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeServe;
