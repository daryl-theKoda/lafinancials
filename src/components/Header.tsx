import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-finance-navy">LA Financial Services</h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-finance-gray hover:text-finance-blue transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-finance-gray hover:text-finance-blue transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('values')}
              className="text-finance-gray hover:text-finance-blue transition-colors"
            >
              Values
            </button>
            <button 
              onClick={() => scrollToSection('partners')}
              className="text-finance-gray hover:text-finance-blue transition-colors"
            >
              Partners
            </button>
            <button 
              onClick={() => scrollToSection('documentation')}
              className="text-finance-gray hover:text-finance-blue transition-colors"
            >
              Documentation
            </button>
            <Link to="/auth">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/apply">
              <Button variant="hero" size="sm">
                Apply Now
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-finance-gray hover:text-finance-blue hover:bg-gray-100"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-left text-finance-gray hover:text-finance-blue transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-left text-finance-gray hover:text-finance-blue transition-colors"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('values')}
                className="text-left text-finance-gray hover:text-finance-blue transition-colors"
              >
                Values
              </button>
              <button 
                onClick={() => scrollToSection('partners')}
                className="text-left text-finance-gray hover:text-finance-blue transition-colors"
              >
                Partners
              </button>
              <button 
                onClick={() => scrollToSection('documentation')}
                className="text-left text-finance-gray hover:text-finance-blue transition-colors"
              >
                Documentation
              </button>
              <Link to="/auth" className="w-full">
                <Button variant="outline" size="sm" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link to="/apply" className="w-full">
                <Button variant="hero" size="sm" className="w-full">
                  Apply Now
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;