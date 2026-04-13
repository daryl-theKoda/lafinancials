import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Building } from "lucide-react";
import LazyImage from "@/components/LazyImage";
import growthImage from "@/assets/growth-mountains.jpg";

const About = () => {
  return (
    <section id="about" className="py-20 bg-finance-light relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-5">
        <LazyImage 
          src={growthImage} 
          alt="Growth and prosperity" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 sm:mb-16 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-finance-navy mb-4">
            About LA Financial Services
          </h2>
          <p className="text-base sm:text-lg text-finance-gray max-w-3xl mx-auto">
            A registered Zimbabwean company with a Credit Only Microfinance License from the Reserve Bank of Zimbabwe, 
            committed to operating within the country's regulated financial services sector.
          </p>
        </div>

        {/* Growth Image Feature */}
        <div className="mb-12 sm:mb-16 relative px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <LazyImage 
                src="/nurture.jpg" 
                alt="Nurturing growth and development"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-large"
              />
            </div>
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-finance-navy">
                Nurturing Financial Growth
              </h3>
              <p className="text-finance-gray leading-relaxed text-base sm:text-lg">
                Just as a small seed requires proper care and nurturing to grow into a thriving plant, 
                we believe that with the right financial support and guidance, every individual and 
                business can flourish and achieve sustainable prosperity.
              </p>
              <p className="text-finance-gray leading-relaxed text-sm sm:text-base">
                Our commitment extends beyond providing loans - we cultivate lasting relationships 
                that help our clients build assets, create jobs, and elevate their living standards 
                across Zimbabwe.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 px-4">
          {/* About Card */}
          <Card className="shadow-medium hover:shadow-large transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-6">
                <Building className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-finance-navy mb-4">About Us</h3>
              <p className="text-finance-gray leading-relaxed text-sm sm:text-base">
                LA Financial Services (Pvt.) Ltd is a registered Zimbabwean company, incorporated in terms of the 
                Companies and Other Entities Act [Chapter 24:31]. We hold a Credit Only Microfinance License from 
                the Reserve Bank of Zimbabwe, demonstrating our commitment to operating within the country's 
                regulated financial services sector.
              </p>
            </CardContent>
          </Card>

          {/* Vision Card */}
          <Card className="shadow-medium hover:shadow-large transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-finance-navy mb-4">Our Vision</h3>
              <p className="text-finance-gray leading-relaxed text-sm sm:text-base">
                To be the leading and most preferred Credit-Only Microfinance Institution (MFI) in the Zimbabwean 
                market, recognized for its impactful financial solutions and commitment to socio-economic development.
              </p>
            </CardContent>
          </Card>

          {/* Mission Card */}
          <Card className="shadow-medium hover:shadow-large transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-finance-blue rounded-lg flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-finance-navy mb-4">Our Mission</h3>
              <div className="text-finance-gray leading-relaxed space-y-2 sm:space-y-3 text-sm sm:text-base">
                <p>Drive sustainable wealth creation by providing innovative and lasting financial solutions.</p>
                <p>Help clients build assets, stimulate job creation, and elevate living standards.</p>
                <p>Provide essential bridging consumer loans for effective daily financial management.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;