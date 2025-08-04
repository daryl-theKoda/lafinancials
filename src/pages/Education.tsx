import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap,
  Users,
  Building,
  Tractor,
  AlertCircle,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Calendar,
  Shield
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Education = () => {
  const loanTypes = [
    {
      id: 'personal',
      title: 'Personal Loans',
      icon: Users,
      description: 'Financial support for your personal needs and goals',
      features: [
        'Flexible loan amounts from ZWL 10,000 to ZWL 500,000',
        'Competitive interest rates starting from 12% per annum',
        'Repayment terms from 6 months to 5 years',
        'Quick approval process within 48 hours',
        'No collateral required for amounts under ZWL 100,000'
      ],
      uses: [
        'Home improvements and renovations',
        'Medical expenses and healthcare',
        'Wedding and event expenses',
        'Debt consolidation',
        'Travel and vacation funding',
        'Emergency financial needs'
      ],
      requirements: [
        'Valid national ID or passport',
        'Proof of stable income for 6 months',
        'Bank statements (3 months)',
        'Employment letter or business registration',
        'Two references with contact details'
      ],
      benefits: [
        'Fast processing and approval',
        'Flexible repayment options',
        'No hidden fees or charges',
        'Early repayment without penalties',
        '24/7 customer support'
      ]
    },
    {
      id: 'business',
      title: 'Business Loans',
      icon: Building,
      description: 'Fuel your entrepreneurial dreams and business growth',
      features: [
        'Loan amounts from ZWL 50,000 to ZWL 2,000,000',
        'Interest rates from 15% per annum',
        'Repayment terms up to 7 years',
        'Grace period available for new businesses',
        'Asset-based lending options available'
      ],
      uses: [
        'Starting a new business venture',
        'Expanding existing operations',
        'Equipment and machinery purchase',
        'Working capital and inventory',
        'Marketing and advertising campaigns',
        'Technology upgrades and systems'
      ],
      requirements: [
        'Business plan and financial projections',
        'Business registration documents',
        'Financial statements (if existing business)',
        'Collateral or guarantee (for larger amounts)',
        'Market analysis and competition study'
      ],
      benefits: [
        'Dedicated business relationship manager',
        'Financial advisory services',
        'Flexible payment schedules',
        'Business networking opportunities',
        'Growth-focused lending approach'
      ]
    },
    {
      id: 'student',
      title: 'Student Loans',
      icon: GraduationCap,
      description: 'Invest in your future with affordable education financing',
      features: [
        'Cover tuition fees up to ZWL 300,000 per year',
        'Low interest rates from 8% per annum',
        'Deferred payments until after graduation',
        'Covers both local and international studies',
        'Living allowance included'
      ],
      uses: [
        'University tuition and fees',
        'Vocational and technical training',
        'Professional certification courses',
        'Study materials and equipment',
        'Accommodation and living expenses',
        'International study programs'
      ],
      requirements: [
        'Letter of admission from institution',
        'Academic transcripts and certificates',
        'Guarantor with stable income',
        'Student ID and passport photos',
        'Course fee structure from institution'
      ],
      benefits: [
        'Payment starts after graduation',
        'Lower interest rates for students',
        'Flexible repayment terms',
        'Academic progress monitoring',
        'Career guidance and support'
      ]
    },
    {
      id: 'agricultural',
      title: 'Agricultural Loans',
      icon: Tractor,
      description: 'Support for farmers and agricultural enterprises',
      features: [
        'Seasonal and long-term financing options',
        'Loan amounts based on farm size and crops',
        'Interest rates from 10% per annum',
        'Seasonal payment schedules available',
        'Equipment and livestock financing'
      ],
      uses: [
        'Seeds, fertilizers, and pesticides',
        'Farm equipment and machinery',
        'Irrigation systems and infrastructure',
        'Livestock purchase and breeding',
        'Processing and storage facilities',
        'Market transportation and logistics'
      ],
      requirements: [
        'Land ownership or lease documents',
        'Farming experience or training certificate',
        'Crop or livestock production plan',
        'Market analysis and sales projections',
        'Insurance coverage for crops/livestock'
      ],
      benefits: [
        'Agricultural expert advisory',
        'Seasonal payment flexibility',
        'Weather insurance options',
        'Market linkage support',
        'Training and capacity building'
      ]
    },
    {
      id: 'emergency',
      title: 'Emergency Loans',
      icon: AlertCircle,
      description: 'Quick financial assistance for urgent situations',
      features: [
        'Rapid approval within 24 hours',
        'Loan amounts up to ZWL 200,000',
        'Minimal documentation required',
        'Short to medium-term repayment',
        'Available 24/7 for genuine emergencies'
      ],
      uses: [
        'Medical emergencies and hospitalization',
        'Funeral and bereavement expenses',
        'Natural disaster recovery',
        'Urgent home repairs',
        'Legal and court expenses',
        'Emergency travel requirements'
      ],
      requirements: [
        'Valid identification documents',
        'Proof of emergency situation',
        'Basic income verification',
        'Contact references',
        'Minimal collateral if required'
      ],
      benefits: [
        'Fastest approval process',
        'Emergency hotline available',
        'Compassionate lending approach',
        'Flexible documentation',
        'Crisis counseling support'
      ]
    }
  ];

  const generalBenefits = [
    {
      icon: Shield,
      title: 'Secure & Transparent',
      description: 'All loans are processed with complete transparency and security'
    },
    {
      icon: DollarSign,
      title: 'Competitive Rates',
      description: 'We offer some of the most competitive interest rates in the market'
    },
    {
      icon: Calendar,
      title: 'Flexible Terms',
      description: 'Customizable repayment schedules to match your financial situation'
    },
    {
      icon: CheckCircle,
      title: 'Quick Approval',
      description: 'Fast processing with decisions made within 24-48 hours'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-finance-light to-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Understanding Our Loan Products
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Learn about our comprehensive range of financial solutions designed to meet your unique needs
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/apply">
              <Button className="bg-white text-finance-blue hover:bg-finance-light">
                Apply Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-finance-blue">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Our Loans */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-finance-navy mb-4">
              Why Choose LAFinServices?
            </h2>
            <p className="text-finance-gray max-w-2xl mx-auto">
              We're committed to providing financial solutions that empower individuals and businesses to achieve their goals
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {generalBenefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-medium transition-shadow">
                <CardContent className="p-6">
                  <benefit.icon className="w-12 h-12 mx-auto mb-4 text-finance-blue" />
                  <h3 className="font-semibold text-finance-navy mb-2">{benefit.title}</h3>
                  <p className="text-finance-gray text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Loan Types Detail */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-finance-navy mb-4">
              Our Loan Products
            </h2>
            <p className="text-finance-gray max-w-2xl mx-auto">
              Explore our comprehensive range of loan products, each designed with specific needs and situations in mind
            </p>
          </div>

          <div className="space-y-12">
            {loanTypes.map((loan, index) => (
              <Card key={loan.id} className="shadow-medium">
                <CardHeader className="bg-gradient-subtle">
                  <CardTitle className="flex items-center text-finance-navy">
                    <loan.icon className="w-8 h-8 mr-3 text-finance-blue" />
                    <div>
                      <h3 className="text-2xl font-bold">{loan.title}</h3>
                      <p className="text-finance-gray font-normal mt-1">{loan.description}</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Features & Uses */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-finance-navy mb-3 flex items-center">
                          <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                          Key Features
                        </h4>
                        <ul className="space-y-2">
                          {loan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="w-2 h-2 bg-finance-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-finance-gray">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-finance-navy mb-3 flex items-center">
                          <DollarSign className="w-5 h-5 mr-2 text-finance-blue" />
                          Common Uses
                        </h4>
                        <ul className="space-y-2">
                          {loan.uses.map((use, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="w-2 h-2 bg-finance-gold rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-finance-gray">{use}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Requirements & Benefits */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-finance-navy mb-3">
                          Requirements
                        </h4>
                        <ul className="space-y-2">
                          {loan.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-finance-gray">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-finance-navy mb-3">
                          Additional Benefits
                        </h4>
                        <ul className="space-y-2">
                          {loan.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-finance-gray">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t">
                    <div className="flex flex-wrap gap-4">
                      <Link to="/apply">
                        <Button className="bg-gradient-primary">
                          Apply for {loan.title}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                      <Button variant="outline">
                        Calculate Repayments
                      </Button>
                      <Button variant="outline">
                        Download Brochure
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-finance-navy mb-4">
              Simple Application Process
            </h2>
            <p className="text-finance-gray max-w-2xl mx-auto">
              Getting your loan approved is easy with our streamlined 4-step process
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'Choose Loan Type', desc: 'Select the loan product that best fits your needs' },
              { step: 2, title: 'Submit Application', desc: 'Complete our simple online application form' },
              { step: 3, title: 'Document Review', desc: 'Our team reviews your documents and verifies information' },
              { step: 4, title: 'Get Approved', desc: 'Receive approval and funds disbursement' }
            ].map((item) => (
              <Card key={item.step} className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-finance-navy mb-2">{item.title}</h3>
                  <p className="text-finance-gray text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/apply">
              <Button className="bg-gradient-primary text-lg px-8 py-3">
                Start Your Application Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Education;