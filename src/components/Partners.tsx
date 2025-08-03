import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const Partners = () => {
  const { data: partners, isLoading } = useQuery({
    queryKey: ["partners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("partners")
        .select("*")
        .eq("is_active", true)
        .order("display_order");
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <section id="partners" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="partners" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-finance-navy mb-4">
            Our Strategic Partners
          </h2>
          <p className="text-lg text-finance-gray max-w-3xl mx-auto">
            We collaborate with leading financial institutions and organizations across Zimbabwe 
            to provide comprehensive financial solutions and expand our reach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {partners?.map((partner) => (
            <Card 
              key={partner.id}
              className="shadow-medium hover:shadow-large transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardContent className="p-6 text-center">
                {partner.logo_url && (
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                    <img 
                      src={partner.logo_url} 
                      alt={`${partner.name} logo`}
                      className="max-w-12 max-h-12 object-contain"
                    />
                  </div>
                )}
                
                <h3 className="text-lg font-semibold text-finance-navy mb-2">
                  {partner.name}
                </h3>
                
                {partner.description && (
                  <p className="text-sm text-finance-gray mb-4">
                    {partner.description}
                  </p>
                )}
                
                {partner.website_url && (
                  <a
                    href={partner.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-finance-blue hover:text-finance-navy transition-colors text-sm"
                  >
                    Visit Website
                    <ExternalLink className="ml-1 w-3 h-3" />
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {(!partners || partners.length === 0) && (
          <div className="text-center py-12">
            <p className="text-finance-gray">
              Partnership information will be updated soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Partners;