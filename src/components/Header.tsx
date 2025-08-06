import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

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
            <a href="/">
              <img
                src="/logo.jpg"
                alt="LA Financial Services Logo"
                className="h-14 w-auto mr-4 drop-shadow-md"
                style={{ maxHeight: "56px" }}
              />
            </a>
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
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-finance-gray hover:text-finance-blue transition-colors">
                Documentation
                <ChevronDown className="w-4 h-4 ml-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow-lg border-0 z-50">
                <DropdownMenuItem asChild>
                  <Link to="/apply" className="w-full text-finance-gray hover:text-finance-blue">
                    Loan Application
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/faq" className="w-full text-finance-gray hover:text-finance-blue">
                    FAQ
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-finance-gray hover:text-finance-blue transition-colors">
                  <User className="w-4 h-4 mr-1" />
                  Account
                  <ChevronDown className="w-4 h-4 ml-1" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white shadow-lg border-0 z-50">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="w-full text-finance-gray hover:text-finance-blue">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="w-full text-finance-gray hover:text-finance-blue">
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-finance-gray hover:text-finance-blue cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
            <Link to={user ? "/dashboard" : "/apply"}>
              <Button variant="hero" size="sm">
                {user ? "Dashboard" : "Apply Now"}
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
              <div className="space-y-2">
                <div className="text-finance-gray font-medium">Documentation</div>
                <Link to="/apply" className="block pl-4 text-finance-gray hover:text-finance-blue transition-colors">
                  Loan Application
                </Link>
                <Link to="/faq" className="block pl-4 text-finance-gray hover:text-finance-blue transition-colors">
                  FAQ
                </Link>
              </div>
              
              {user ? (
                <>
                  <Link to="/dashboard" className="text-left text-finance-gray hover:text-finance-blue transition-colors">
                    Dashboard
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" className="text-left text-finance-gray hover:text-finance-blue transition-colors">
                      Admin Panel
                    </Link>
                  )}
                  <button 
                    onClick={handleSignOut}
                    className="text-left text-finance-gray hover:text-finance-blue transition-colors w-full"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;