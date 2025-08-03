import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, MessageCircle } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-finance-navy text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">LA Financial Services</h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              A licensed Credit-Only Microfinance Institution committed to driving sustainable wealth creation 
              and empowering individuals and businesses across Zimbabwe through innovative financial solutions.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-finance-blue cursor-pointer transition-colors">
                <Facebook className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-finance-blue cursor-pointer transition-colors">
                <Twitter className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-finance-blue cursor-pointer transition-colors">
                <Linkedin className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-white/80 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/80 hover:text-white transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#values" className="text-white/80 hover:text-white transition-colors">
                  Core Values
                </a>
              </li>
              <li>
                <a href="#partners" className="text-white/80 hover:text-white transition-colors">
                  Our Partners
                </a>
              </li>
              <li>
                <a href="#documentation" className="text-white/80 hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="/apply" className="text-white/80 hover:text-white transition-colors">
                  Apply Now
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-finance-green" />
                <span className="text-white/80">+263 77 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-finance-green" />
                <span className="text-white/80">info@lafinancial.co.zw</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-finance-green mt-0.5" />
                <span className="text-white/80">
                  Harare, Zimbabwe<br />
                  123 Financial District
                </span>
              </div>
              <a 
                href="https://wa.me/263771234567" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-finance-green hover:text-white transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/80 text-sm mb-4 md:mb-0">
            © {currentYear} LA Financial Services (Pvt.) Ltd. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-white/80 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">
              Regulatory Information
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/20">
          <p className="text-white/60 text-xs text-center">
            LA Financial Services (Pvt.) Ltd is licensed by the Reserve Bank of Zimbabwe as a Credit-Only Microfinance Institution.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;