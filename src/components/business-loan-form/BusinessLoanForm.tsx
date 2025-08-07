import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { BusinessInfoStep } from "./BusinessInfoStep";
import { FinancialInfoStep } from "./FinancialInfoStep";
import { LoanDetailsStep } from "./LoanDetailsStep";
import { OwnerDetailsStep } from "./OwnerDetailsStep";
import { ReferencesStep } from "./ReferencesStep";
import { DeclarationsStep } from "./DeclarationsStep";
import { SuccessStep } from "./SuccessStep";
import { businessLoanFormSchema, BusinessLoanFormValues } from "./schema";

export const BusinessLoanForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationNumber, setApplicationNumber] = useState("");
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const navigate = useNavigate();
  const supabase = createClient();

  const form = useForm<BusinessLoanFormValues>({
    resolver: zodResolver(businessLoanFormSchema),
    defaultValues: {
      legalBusinessName: "",
      tradingName: "",
      registrationNumber: "",
      dateOfRegistration: "",
      // ... other default values
    },
  });

  const steps = [
    { title: "Business Info", component: BusinessInfoStep },
    { title: "Financial Info", component: FinancialInfoStep },
    { title: "Loan Details", component: LoanDetailsStep },
    { title: "Owners/Directors", component: OwnerDetailsStep },
    { title: "References", component: ReferencesStep },
    { title: "Declarations", component: DeclarationsStep },
  ];

  const nextStep = async () => {
    const currentFields = getStepFields(currentStep);
    const isValid = await form.trigger(currentFields as any);
    
    if (isValid) {
      setCompletedSteps(prev => [...new Set([...prev, currentStep])]);
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const getStepFields = (step: number): string[] => {
    switch (step) {
      case 0: return ['legalBusinessName', 'registrationNumber'];
      case 1: return ['annualTurnover', 'bankName'];
      case 2: return ['loanAmount', 'loanPurpose'];
      case 3: return ['owners'];
      case 4: return [];
      case 5: return ['declarations'];
      default: return [];
    }
  };

  const onSubmit = async (data: BusinessLoanFormValues) => {
    
    setIsSubmitting(true);
    const appNumber = `BL-${Date.now().toString().slice(-6)}`;
    setApplicationNumber(appNumber);

    try {
      // Upload files and save to database
      const applicationData = {
        application_number: appNumber,
        user_id: "",
        status: 'submitted',
        // ... map other fields
      };

      const { error } = await supabase
        .from('business_loan_applications')
        .insert([applicationData]);

      if (error) throw error;
      setCurrentStep(6);
    } catch (error) {
      console.error("Error:", error);
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const CurrentStepComponent = steps[currentStep]?.component || (() => null);

  if (currentStep === 6) {
    return <SuccessStep applicationNumber={applicationNumber} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button
        onClick={() => navigate("/")}
        style={{ marginBottom: 16, padding: '8px 16px', borderRadius: 6, background: '#2563eb', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        ← Back to Dashboard
      </button>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Business Loan Application</h1>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                completedSteps.includes(index) 
                  ? 'bg-green-100 text-green-600' 
                  : currentStep === index 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
              }`}>
                {completedSteps.includes(index) ? <Check className="h-5 w-5" /> : index + 1}
              </div>
              <span className="text-xs mt-2 text-center">{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CurrentStepComponent form={form} />
        
        <div className="flex justify-between mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0 || isSubmitting}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          
          {currentStep < steps.length - 1 ? (
            <Button type="button" onClick={nextStep}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
