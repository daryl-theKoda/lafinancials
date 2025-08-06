import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  ShoppingCart, 
  GraduationCap, 
  Wheat, 
  AlertCircle, 
  Users,
  ArrowRight, 
  DollarSign
} from "lucide-react";

const Services = () => {
  const services = [
  {
    icon: Briefcase,
    title: "Business Loans",
    description: "Designed to facilitate the growth of various income-generating projects for entrepreneurs and SMEs.",
    details: "Perfect for informal entrepreneurs and emerging businesses seeking to expand operations or capitalize on new opportunities.",
    color: "bg-gradient-primary",
    image: "/business.jpg"
  },
  {
    icon: DollarSign,
    title: "Salary Based Loans",
    description: "For employed individuals with regular income.",
    details: "Provides vital liquidity and acts as a buffer for salary earners facing day-to-day needs.",
    color: "bg-gradient-accent",
    featured: true,
    image: "/consumption loan.webp"
  },
  {
    icon: Users,
    title: "Personal Loans",
    description: "Flexible loans for personal needs and goals.",
    details: "Covers urgent needs, lifestyle expenses, or consolidating debt with simple requirements.",
    color: "bg-purple-500",
    image: "/image 1.jpg"
  }
];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-finance-navy mb-4">
            Our Products & Services
          </h2>
          <p className="text-lg text-finance-gray max-w-3xl mx-auto">
            Comprehensive financial solutions designed to meet diverse needs and drive economic empowerment 
            across individuals, families, and businesses in Zimbabwe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index} 
                className={`shadow-medium hover:shadow-large transition-all duration-300 transform hover:-translate-y-1 overflow-hidden ${
                  service.featured ? 'ring-2 ring-finance-green' : ''
                }`}
              >
                <CardContent className="p-0 flex flex-col h-full">
                  {service.image && (
                    <div className="h-48 relative overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-4`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  
                  {service.featured && (
                    <div className="inline-block bg-finance-green text-white text-xs px-2 py-1 rounded-full mb-2">
                      Core Product
                    </div>
                  )}
                  
                  <h3 className="text-xl font-semibold text-finance-navy mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-finance-gray mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <p className="text-sm text-finance-gray/80 mb-6">
                    {service.details}
                  </p>
                  
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full group mt-auto"
                      onClick={() => window.location.href = '/apply'}
                    >
                      Apply Now
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => window.location.href = '/apply'}
          >
            Apply for a Loan Today
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;