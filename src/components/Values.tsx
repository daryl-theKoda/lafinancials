import { Card, CardContent } from "@/components/ui/card";
import { 
  MessageCircle, 
  Heart, 
  Shield, 
  BookOpen, 
  Handshake, 
  Award 
} from "lucide-react";

const Values = () => {
  const values = [
    {
      icon: MessageCircle,
      title: "Communication",
      description: "Timely provision of relevant and adequate information.",
      color: "bg-blue-500"
    },
    {
      icon: Heart,
      title: "Respect",
      description: "Honouring and acknowledging diversity and uniqueness of individuals.",
      color: "bg-pink-500"
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "Upholding the virtue of honesty in our conduct.",
      color: "bg-finance-blue"
    },
    {
      icon: BookOpen,
      title: "Learning",
      description: "Continuous personal and organisational development through ensuring an environment that promotes pioneering and innovation.",
      color: "bg-finance-green"
    },
    {
      icon: Handshake,
      title: "Teamwork",
      description: "Each one of the team is committed to building winning relationships.",
      color: "bg-orange-500"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Attaining and surpassing best practice.",
      color: "bg-purple-500"
    }
  ];

  return (
    <section id="values" className="py-20 bg-gradient-to-br from-finance-light to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-finance-navy mb-4">
            Our Core Values
          </h2>
          <p className="text-lg text-finance-gray max-w-3xl mx-auto">
            The principles that guide our operations and shape our commitment to serving 
            clients with excellence and integrity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <Card 
                key={index} 
                className="shadow-medium hover:shadow-large transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${value.color} rounded-full flex items-center justify-center mb-6 mx-auto`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-finance-navy mb-4">
                    {value.title}
                  </h3>
                  
                  <p className="text-finance-gray leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Values;