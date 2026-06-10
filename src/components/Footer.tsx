import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import { PRODUCTS } from "@/config/site";

const Footer = () => {
  const productLinks = [
    { name: PRODUCTS.intelligence.name, href: PRODUCTS.intelligence.href },
    { name: PRODUCTS.embedded.name, href: PRODUCTS.embedded.href },
    { name: PRODUCTS.lawFirms.name, href: PRODUCTS.lawFirms.href },
    { name: PRODUCTS.walletChecker.name, href: PRODUCTS.walletChecker.href },
  ];

  const useCaseLinks = [
    { name: "Law firms", href: "/intelligence#law-firms" },
    { name: "iGaming operators", href: "/intelligence#igaming" },
    { name: "Gaming regulators", href: "/intelligence#regulators" },
    { name: "Law enforcement & government", href: "/intelligence#government" },
    { name: "Crypto insurance", href: "/intelligence#insurance" },
    { name: "Forensic reports", href: "/intelligence#forensic-reports" },
  ];

  const companyLinks = [
    { name: "About", href: "/about" },
    { name: "Case studies", href: "/case-studies" },
    { name: "Insights", href: "/insights" },
    { name: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { name: "Terms & conditions", href: "/terms" },
    { name: "Privacy policy", href: "/privacy" },
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
            <h4 className="text-sm font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              {productLinks.map((link) => (
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
            <h4 className="text-sm font-semibold mb-4">Use cases</h4>
            <ul className="space-y-2">
              {useCaseLinks.map((link) => (
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
            &copy; {new Date().getFullYear()} BlockQuery.io — on-chain intelligence
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
