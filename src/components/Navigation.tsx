import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

const solutionsLinks = [
  { name: "Law Firms", href: "/solutions/law-firms" },
  { name: "iGaming Operators", href: "/solutions/igaming-operators" },
  { name: "Gaming Regulators", href: "/solutions/gaming-regulators" },
  { name: "Law Enforcement & Government", href: "/solutions/law-enforcement" },
  { name: "Crypto Insurance", href: "/solutions/crypto-insurance" },
  { name: "Forensic Services", href: "/solutions/forensic-services" },
];

const navLinks = [
  { name: "Platform", href: "/platform" },
  { name: "Case Studies", href: "/insights" },
  { name: "About", href: "/about" },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsSolutionsOpen(false);
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
          <Link to="/" aria-label="Blockquery home" className="flex items-center hover:opacity-80 transition-opacity duration-200">
            <Logo size="text-2xl md:text-3xl" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              <li>
                <Link
                  to="/platform"
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  Platform
                </Link>
              </li>

              {/* Solutions dropdown */}
              <li ref={dropdownRef} className="relative">
                <button
                  onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium inline-flex items-center gap-1"
                >
                  Solutions
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isSolutionsOpen ? "rotate-180" : ""}`} />
                </button>
                {isSolutionsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg py-2 z-50">
                    {solutionsLinks.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.href}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                        onClick={() => setIsSolutionsOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              <li>
                <Link
                  to="/insights"
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  Case Studies
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  About
                </Link>
              </li>
            </ul>
            <Button asChild size="default" className="font-semibold">
              <Link to="/contact">Book a Demo</Link>
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
              <li>
                <Link
                  to="/platform"
                  className="block text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Platform
                </Link>
              </li>

              <li>
                <button
                  onClick={() => setIsMobileSolutionsOpen(!isMobileSolutionsOpen)}
                  className="flex items-center justify-between w-full text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                >
                  Solutions
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileSolutionsOpen ? "rotate-180" : ""}`} />
                </button>
                {isMobileSolutionsOpen && (
                  <div className="pl-4 flex flex-col gap-1 mb-2">
                    {solutionsLinks.map((sub) => (
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

              {navLinks.slice(1).map((link) => (
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
                <Button asChild size="default" className="w-full font-semibold">
                  <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Book a Demo</Link>
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
