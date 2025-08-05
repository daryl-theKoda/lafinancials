import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqData = [
    {
      category: "General Information",
      questions: [
        {
          question: "What is LA Financial Services?",
          answer: "LA Financial Services is a comprehensive financial institution offering various loan products including personal loans, business loans, student loans, agricultural loans, and emergency loans to help individuals and businesses achieve their financial goals."
        },
        {
          question: "How long has LA Financial Services been in business?",
          answer: "We have been serving our community for over 15 years, building trust and helping thousands of clients achieve their financial objectives through our diverse loan products and exceptional customer service."
        },
        {
          question: "What makes LA Financial Services different?",
          answer: "We pride ourselves on personalized service, competitive rates, flexible terms, and a deep understanding of our clients' needs. Our experienced team works closely with each client to find the best financial solution."
        }
      ]
    },
    {
      category: "Loan Applications",
      questions: [
        {
          question: "How do I apply for a loan?",
          answer: "You can apply online through our website by clicking 'Apply Now' or visiting our application page. Simply fill out the application form with your personal and financial information, and our team will review your application promptly."
        },
        {
          question: "What documents do I need to apply?",
          answer: "Required documents typically include: government-issued ID, proof of income (pay stubs, tax returns), bank statements, proof of address, and specific documents based on the loan type (business registration for business loans, school enrollment for student loans, etc.)."
        },
        {
          question: "How long does the approval process take?",
          answer: "Most applications are reviewed within 24-48 hours. Simple applications may be approved the same day, while more complex applications (like business loans) may take 3-5 business days for a complete review."
        },
        {
          question: "What are the eligibility requirements?",
          answer: "General requirements include: minimum age of 18, steady income source, acceptable credit history, and residency requirements. Specific criteria vary by loan type and amount requested."
        }
      ]
    },
    {
      category: "Loan Types",
      questions: [
        {
          question: "What types of loans do you offer?",
          answer: "We offer personal loans, business loans, student loans, agricultural loans, and emergency loans. Each loan type is designed to meet specific financial needs with tailored terms and conditions."
        },
        {
          question: "What are your interest rates?",
          answer: "Interest rates vary based on loan type, amount, term, and creditworthiness. We offer competitive rates starting from 5.99% APR. Contact us for a personalized quote based on your specific situation."
        },
        {
          question: "What loan amounts are available?",
          answer: "Loan amounts range from $1,000 to $500,000 depending on the loan type and your qualifications. Personal loans: $1,000-$50,000, Business loans: $5,000-$500,000, Student loans: $1,000-$100,000."
        },
        {
          question: "Can I pay off my loan early?",
          answer: "Yes, we encourage early repayment and do not charge prepayment penalties. Paying off your loan early can save you money on interest charges."
        }
      ]
    },
    {
      category: "Payments and Account Management",
      questions: [
        {
          question: "How do I make loan payments?",
          answer: "You can make payments through your online dashboard, automatic bank transfers, online banking, or by visiting our office. We recommend setting up automatic payments to ensure you never miss a payment."
        },
        {
          question: "What if I miss a payment?",
          answer: "Contact us immediately if you anticipate missing a payment. We offer various options including payment deferrals, modified payment plans, and hardship programs to help you stay on track."
        },
        {
          question: "How can I check my loan balance?",
          answer: "Log into your online dashboard to view your current balance, payment history, next payment due date, and download statements. You can also call our customer service team for balance information."
        },
        {
          question: "Can I change my payment due date?",
          answer: "Yes, we can often accommodate requests to change your payment due date. Contact our customer service team to discuss options that work better with your budget cycle."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "I'm having trouble logging into my account",
          answer: "Try resetting your password using the 'Forgot Password' link. If you continue to have issues, contact our technical support team at support@lafinancialservices.com or use our live chat feature."
        },
        {
          question: "How do I update my contact information?",
          answer: "Log into your online dashboard and navigate to your profile settings to update your contact information. You can also call us or visit our office to make these changes."
        },
        {
          question: "Is my personal information secure?",
          answer: "Yes, we use bank-level encryption and security measures to protect your personal and financial information. Our systems are regularly audited and comply with industry security standards."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Header />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our services, loan applications, and account management. 
              Can't find what you're looking for? Contact our support team.
            </p>
          </div>

          {/* FAQ Sections */}
          <div className="space-y-8">
            {faqData.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="shadow-lg">
                <CardHeader className="bg-gradient-primary text-white">
                  <CardTitle className="text-xl">{category.category}</CardTitle>
                  <CardDescription className="text-white/90">
                    Common questions about {category.category.toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, questionIndex) => (
                      <AccordionItem 
                        key={questionIndex} 
                        value={`${categoryIndex}-${questionIndex}`}
                        className="border-b border-border/50"
                      >
                        <AccordionTrigger className="text-left hover:text-primary transition-colors">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Section */}
          <Card className="mt-12 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-primary">Still Have Questions?</CardTitle>
              <CardDescription>
                Our customer support team is here to help you with any additional questions
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-primary">Email Support</h3>
                  <p className="text-muted-foreground">daryl24chibange@gmail.com</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-primary">Live Chat</h3>
                  <p className="text-muted-foreground">Available on our website</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-primary">Phone Support</h3>
                  <p className="text-muted-foreground">Mon-Fri, 9AM-5PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;