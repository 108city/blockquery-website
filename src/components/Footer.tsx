import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const Footer = () => {
  const platformLinks = [
    { name: "Platform Overview", href: "/platform" },
    { name: "Industry Dashboards", href: "/platform#dashboards" },
    { name: "AI Agents", href: "/platform#ai-agents" },
    { name: "AI Skills", href: "/platform#ai-skills" },
  ];

  const solutionsLinks = [
    { name: "Law Firms", href: "/solutions/law-firms" },
    { name: "iGaming Operators", href: "/solutions/igaming-operators" },
    { name: "Gaming Regulators", href: "/solutions/gaming-regulators" },
    { name: "Law Enforcement & Government", href: "/solutions/law-enforcement" },
    { name: "Crypto Insurance", href: "/solutions/crypto-insurance" },
    { name: "Forensic Services", href: "/solutions/forensic-services" },
  ];

  const companyLinks = [
    { name: "About", href: "/about" },
    { name: "Case Studies", href: "/insights" },
    { name: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
  ];

  return (
    <footer className="bg-secondary border-t border-border py-12 sm:py-16 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Logo size="text-2xl" className="mb-3" />
            <p className="text-sm text-muted-foreground max-w-xs">
              Productized on-chain intelligence for compliance, forensics, and asset recovery.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              {platformLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2">
              {solutionsLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Blockquery.io — on-chain intelligence
          </p>
          <ul className="flex gap-6">
            {legalLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
