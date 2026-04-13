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

      {/*
        ROOT CAUSE: The navbar is fixed/sticky and overlaps the top of this section.
        The flex centering distributes space evenly, pushing "Small Loans" up
        behind the navbar.

        FIX: Add pt-20 (80px) on mobile to push content clear of the navbar,
        and pt-24 (96px) on larger screens. Adjust these values to match your
        navbar's actual height if it differs.
      */}
      <div className="container mx-auto px-6 text-center relative z-10 pt-20 pb-10 sm:pt-24 sm:pb-16">
        <div className="max-w-4xl mx-auto">

          <div className="mb-6">
            <h1
              className="font-bold text-white"
              style={{
                fontSize: 'clamp(1.5rem, 5vw + 0.5rem, 3.75rem)',
                lineHeight: 1.15,
                margin: 0,
                padding: 0,
              }}
            >
              Small Loans
            </h1>
            <p
              className="font-bold text-finance-green-light"
              style={{
                fontSize: 'clamp(1.2rem, 3.5vw + 0.5rem, 3rem)',
                lineHeight: 1.15,
                margin: 0,
                padding: 0,
              }}
            >
              Big Possibilities
            </p>
          </div>

          <p
            className="text-white/90 max-w-3xl mx-auto mb-8"
            style={{ fontSize: 'clamp(0.95rem, 1.5vw + 0.5rem, 1.25rem)', lineHeight: 1.6 }}
          >
            LA Financial Services provides innovative microfinance solutions that drive sustainable wealth creation
            and empower individuals and businesses across Zimbabwe.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12">
            <Link to="/apply">
              <Button variant="accent" size="xl" className="w-full sm:w-auto">
                Apply for a Loan
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="xl"
              className="w-full sm:w-auto border-white text-finance-navy hover:bg-white hover:text-finance-navy"
              onClick={scrollToServices}
            >
              Learn More
            </Button>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-finance-green-light" />
              </div>
              <h3 className="text-base font-semibold mb-2">Licensed &amp; Regulated</h3>
              <p className="text-white/80 text-sm">Authorized by the Reserve Bank of Zimbabwe</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-finance-green-light" />
              </div>
              <h3 className="text-base font-semibold mb-2">Growth Focused</h3>
              <p className="text-white/80 text-sm">Driving sustainable wealth creation</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-finance-green-light" />
              </div>
              <h3 className="text-base font-semibold mb-2">Community Impact</h3>
              <p className="text-white/80 text-sm">Supporting families and communities</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;