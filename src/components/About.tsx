import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Building } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-finance-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-finance-navy mb-4">
            About LA Financial Services
          </h2>
          <p className="text-lg text-finance-gray max-w-3xl mx-auto">
            A registered Zimbabwean company with a Credit Only Microfinance License from the Reserve Bank of Zimbabwe, 
            committed to operating within the country's regulated financial services sector.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* About Card */}
          <Card className="shadow-medium hover:shadow-large transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-6">
                <Building className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-finance-navy mb-4">About Us</h3>
              <p className="text-finance-gray leading-relaxed">
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
              <h3 className="text-xl font-semibold text-finance-navy mb-4">Our Vision</h3>
              <p className="text-finance-gray leading-relaxed">
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
              <h3 className="text-xl font-semibold text-finance-navy mb-4">Our Mission</h3>
              <div className="text-finance-gray leading-relaxed space-y-3">
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