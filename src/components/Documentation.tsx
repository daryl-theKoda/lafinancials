import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, User, Home, DollarSign, CheckCircle, GraduationCap } from "lucide-react";

const Documentation = () => {
  const loanTypes = [
    {
      title: "Salary Based Loans",
      icon: DollarSign,
      description: "For employed individuals with regular income",
      documents: [
        "Identity Proof (ID, passport)",
        "Proof of Residence",
        "Current pay slip",
        "Proof of Employment",
        "3 months Bank Statements",
        "Guarantor / Collateral"
      ],
      color: "bg-finance-blue"
    },
    {
      title: "Business Loans",
      icon: FileText,
      description: "For entrepreneurs and business owners",
      documents: [
        "Identity Proof (ID, passport)",
        "Proof of Residence",
        "Collateral",
        "Certificate of Incorporation",
        "Memorandum of Association",
        "CR6",
        "CR14",
        "Financial Statements",
        "Latest 6 months Bank Statement",
        "Company Profile"
      ],
      color: "bg-finance-green"
    },
    {
      title: "Educational Loans",
      icon: GraduationCap,
      description: "For education-related expenses",
      documents: [
        "School invoice",
        "Identity Proof (ID, passport)",
        "Proof of Residence",
        "Current pay slip",
        "Proof of Employment",
        "3 months Bank Statements",
        "Guarantor / Collateral"
      ],
      color: "bg-finance-purple"
    }
  ];

  return (
    <section id="documentation" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-finance-navy mb-4">
            Documentation Required
          </h2>
          <p className="text-lg text-finance-gray max-w-3xl mx-auto">
            Ensure you have the necessary documentation ready for a smooth and efficient loan application process.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {loanTypes.map((loanType, index) => {
            const IconComponent = loanType.icon;
            return (
              <Card key={index} className="shadow-medium hover:shadow-large transition-shadow duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto border-4 border-finance-blue shadow-lg bg-white">
  <IconComponent className={`w-14 h-14 ${loanType.title === 'Business Loans' ? 'text-finance-blue' : loanType.title === 'Educational Loans' ? 'text-finance-purple' : 'text-finance-blue'}`} />
</div>
                  <CardTitle className="text-xl text-finance-navy mb-2">
                    {loanType.title}
                  </CardTitle>
                  <p className="text-finance-gray text-sm">
                    {loanType.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {loanType.documents.map((document, docIndex) => (
                      <div key={docIndex} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-finance-green mt-0.5 flex-shrink-0" />
                        <span className="text-finance-gray text-sm">{document}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-finance-blue to-finance-green rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Apply?</h3>
          <p className="text-lg mb-6">
            Have all your documents ready? Start your loan application process today and take the first step 
            towards achieving your financial goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-finance-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Application
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-finance-blue transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Documentation;