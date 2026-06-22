import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { PRODUCTS, BOOK_DEMO_HREF } from "@/config/site";

const industryLinks = [
  { name: "Law Firms", href: "/investigations#law-firms", desc: "Court-ready evidence, asset tracing and expert testimony." },
  { name: "Government", href: "/investigations#government", desc: "Wide-net intelligence across jurisdictions and high-risk countries." },
  { name: "AML and KYT", href: "/investigations#aml-kyt", desc: "Counterparty screening and monitoring for compliance teams." },
];

const productLinks = [
  { name: PRODUCTS.investigations.short, href: PRODUCTS.investigations.href, desc: PRODUCTS.investigations.tagline },
  { name: PRODUCTS.embedded.short, href: PRODUCTS.embedded.href, desc: PRODUCTS.embedded.tagline },
];

const menus = [
  { key: "industries", label: "Industries", items: industryLinks },
  { key: "products", label: "Products", items: productLinks },
];

const navLinks = [
  { name: "Case studies", href: "/case-studies" },
  { name: "Insights", href: "/insights" },
  { name: "About", href: "/about" },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" aria-label="BlockQuery home" className="flex items-center hover:opacity-80 transition-opacity duration-200">
            <Logo size="text-2xl md:text-3xl" />
          </Link>

          {/* Desktop Navigation */}
          <div ref={navRef} className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {menus.map((menu) => (
                <li key={menu.key} className="relative">
                  <button
                    onClick={() => setOpenMenu(openMenu === menu.key ? null : menu.key)}
                    className="text-foreground hover:text-primary transition-colors duration-200 font-medium inline-flex items-center gap-1"
                  >
                    {menu.label}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openMenu === menu.key ? "rotate-180" : ""}`} />
                  </button>
                  {openMenu === menu.key && (
                    <div className="absolute top-full left-0 mt-2 w-72 bg-background border border-border rounded-lg shadow-lg py-2 z-50">
                      {menu.items.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.href}
                          className="block px-4 py-2.5 hover:bg-accent transition-colors"
                          onClick={() => setOpenMenu(null)}
                        >
                          <span className="block text-sm font-medium text-foreground">{sub.name}</span>
                          <span className="block text-xs text-muted-foreground mt-0.5">{sub.desc}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}

              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Button asChild size="default" className="font-medium">
              <Link to={BOOK_DEMO_HREF}>Book a free consultation</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" strokeWidth={1} /> : <Menu className="h-6 w-6" strokeWidth={1} />}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 bg-background/95 backdrop-blur-sm rounded-lg px-4">
            <ul className="flex flex-col gap-2">
              {menus.map((menu) => (
                <li key={menu.key}>
                  <button
                    onClick={() => setOpenMobileMenu(openMobileMenu === menu.key ? null : menu.key)}
                    className="flex items-center justify-between w-full text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                  >
                    {menu.label}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openMobileMenu === menu.key ? "rotate-180" : ""}`} />
                  </button>
                  {openMobileMenu === menu.key && (
                    <div className="pl-4 flex flex-col gap-1 mb-2">
                      {menu.items.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.href}
                          className="block text-muted-foreground hover:text-primary transition-colors py-1.5 text-sm"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}

              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="block text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Button asChild size="default" className="w-full font-medium">
                  <Link to={BOOK_DEMO_HREF} onClick={() => setIsMobileMenuOpen(false)}>Book a free consultation</Link>
                </Button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
