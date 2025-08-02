import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-hero text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute top-40 right-20 w-48 h-48 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 border border-white/20 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Empowering Dreams Through
            <span className="block text-finance-green-light">Financial Solutions</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            LA Financial Services provides innovative microfinance solutions that drive sustainable wealth creation 
            and empower individuals and businesses across Zimbabwe.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/apply">
              <Button variant="accent" size="xl">
                Apply for a Loan
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-finance-navy" onClick={scrollToServices}>
              Learn More
            </Button>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-finance-green-light" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Licensed & Regulated</h3>
              <p className="text-white/80">Authorized by the Reserve Bank of Zimbabwe</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-finance-green-light" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Growth Focused</h3>
              <p className="text-white/80">Driving sustainable wealth creation</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-finance-green-light" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Community Impact</h3>
              <p className="text-white/80">Supporting families and communities</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;