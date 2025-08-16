import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
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
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const supabase = createClient();
  const { toast } = useToast();

  const form = useForm<BusinessLoanFormValues>({
    resolver: zodResolver(businessLoanFormSchema),
    defaultValues: {
      legalBusinessName: "",
      tradingName: "",
      registrationNumber: "",
      dateOfRegistration: "",
      // ... other default values
      owners: [
        {
          fullName: "",
          idNumber: "",
          dateOfBirth: "",
          gender: "",
          residentialAddress: "",
          email: "",
          phoneNumber: "",
          maritalStatus: "",
          position: "",
          ownershipPercentage: 0,
          bankName: "",
          accountNumber: "",
          averageMonthlyBalance: 0,
          spouseName: "",
          spouseIdNumber: "",
          spousePhoneNumber: "",
          nextOfKinName: "",
          nextOfKinRelationship: "",
          nextOfKinAddress: "",
          nextOfKinPhone: "",
          nextOfKinIdNumber: "",
        },
      ],
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
    const isValid = await form.trigger(currentFields, { shouldFocus: true });
    
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
      case 3: return [
        'owners.0.fullName',
        'owners.0.idNumber',
        'owners.0.dateOfBirth',
        'owners.0.gender',
        'owners.0.residentialAddress',
        'owners.0.email',
        'owners.0.phoneNumber',
        'owners.0.maritalStatus',
        'owners.0.position',
        'owners.0.ownershipPercentage',
        'owners.0.bankName',
        'owners.0.accountNumber',
        'owners.0.averageMonthlyBalance',
        'owners.0.nextOfKinName',
        'owners.0.nextOfKinRelationship',
        'owners.0.nextOfKinAddress',
        'owners.0.nextOfKinPhone',
        'owners.0.nextOfKinIdNumber',
      ];
      case 4: return [];
      case 5: return ['declarations'];
      default: return [];
    }
  };

  const onSubmit = async (data: BusinessLoanFormValues) => {
    setIsSubmitting(true);
    const appNumber = `BL-${Date.now().toString().slice(-6)}`;
    setApplicationNumber(appNumber);

    // Helper to upload a file to Storage and return public URL
    const uploadFile = async (file: File, path: string) => {
      const ext = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).slice(2)}.${ext}`;
      const filePath = `${path}/${fileName}`;
      const { error: uploadError } = await supabase.storage.from('documents').upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data: pub } = supabase.storage.from('documents').getPublicUrl(filePath);
      return pub.publicUrl;
    };

    try {
      // Get session and handle non-authenticated users
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;
      
      if (!session?.user?.id) {
        toast({
          title: 'Sign in required',
          description: 'Please create a free account to submit your application. Your form data will be saved.',
        });
        
        // Save form data to localStorage
        localStorage.setItem('pendingBusinessLoanApplication', JSON.stringify({
          formData: data,
          timestamp: Date.now()
        }));
        
        navigate('/auth?redirect=/apply/business');
        return;
      }

      // Upload optional files
      const uploads: Promise<[keyof BusinessLoanFormValues, string]>[] = [];
      const pushIf = (key: keyof BusinessLoanFormValues, maybe: any, folder: string) => {
        const file = (maybe as FileList | undefined)?.[0];
        if (file) uploads.push(uploadFile(file, folder).then((url) => [key, url]));
      };
      pushIf('financialStatements', data.financialStatements as any, 'documents');
      pushIf('bankStatements', data.bankStatements as any, 'documents');
      pushIf('taxReturns', data.taxReturns as any, 'documents');
      pushIf('businessPlan', data.businessPlan as any, 'documents');
      pushIf('collateralDocuments', data.collateralDocuments as any, 'documents');
      pushIf('otherDocuments', data.otherDocuments as any, 'documents');

      const uploadedEntries = await Promise.all(uploads);
      const uploadedMap = Object.fromEntries(uploadedEntries) as Record<string, string>;

      // Build application payload mapping to DB columns
      const payload = {
        application_number: appNumber,
        user_id: session?.user?.id || null,
        status: 'submitted',
        
        // Business Information
        legal_business_name: data.legalBusinessName,
        trading_name: data.tradingName ?? null,
        registration_number: data.registrationNumber,
        date_of_registration: data.dateOfRegistration, // YYYY-MM-DD
        tax_identification_number: data.taxIdentificationNumber ?? null,
        vat_number: data.vatNumber ?? null,
        business_sector: data.businessSector,
        industry: data.industry,
        years_in_business: data.yearsInBusiness,
        number_of_employees: data.numberOfEmployees,
        business_structure: data.businessStructure,
        business_address: data.businessAddress,
        city: data.city,
        province: data.province,
        postal_code: data.postalCode,
        business_email: data.businessEmail,
        business_phone: data.businessPhone,
        website: data.website || null,
        business_description: data.businessDescription,

        // Financial Information
        annual_turnover: data.annualTurnover,
        projected_turnover: data.projectedTurnover,
        gross_profit: data.grossProfit,
        net_profit: data.netProfit,
        bank_name: data.bankName,
        account_number: data.accountNumber,
        average_balance: data.averageBalance,
        financial_statements_url: uploadedMap.financialStatements ?? null,
        bank_statements_url: uploadedMap.bankStatements ?? null,
        tax_returns_url: uploadedMap.taxReturns ?? null,

        // Loan Details
        loan_amount: data.loanAmount,
        loan_term: data.loanTerm,
        repayment_frequency: data.repaymentFrequency,
        loan_purpose: data.loanPurpose,
        collateral_items: data.collateralItems ? JSON.stringify(data.collateralItems) : null,
        business_plan_url: uploadedMap.businessPlan ?? null,
        collateral_documents_url: uploadedMap.collateralDocuments ?? null,
        other_documents_url: uploadedMap.otherDocuments ?? null,

        // References and Declarations
        references: data.references ? JSON.stringify(data.references) : JSON.stringify({}),
        declarations: data.declarations ? JSON.stringify(data.declarations) : JSON.stringify({}),

        submitted_at: new Date().toISOString(),
      };

      const { data: appRows, error: appError } = await supabase
        .from('business_loan_applications')
        .insert([payload])
        .select('id');
      if (appError) throw appError;
      const applicationId = appRows?.[0]?.id as string;

      // Insert owners into child table
      if (applicationId && Array.isArray(data.owners) && data.owners.length > 0) {
        const ownersPayload = data.owners.map((o) => ({
          application_id: applicationId,
          full_name: o.fullName,
          id_number: o.idNumber,
          date_of_birth: o.dateOfBirth, // YYYY-MM-DD
          gender: o.gender,
          residential_address: o.residentialAddress,
          email: o.email,
          phone_number: o.phoneNumber,
          marital_status: o.maritalStatus,
          position: o.position,
          ownership_percentage: o.ownershipPercentage,
          bank_name: o.bankName,
          account_number: o.accountNumber,
          average_monthly_balance: o.averageMonthlyBalance,
          spouse_name: o.spouseName ?? null,
          spouse_id_number: o.spouseIdNumber ?? null,
          spouse_phone_number: o.spousePhoneNumber ?? null,
          next_of_kin_name: o.nextOfKinName,
          next_of_kin_relationship: o.nextOfKinRelationship,
          next_of_kin_address: o.nextOfKinAddress,
          next_of_kin_phone: o.nextOfKinPhone,
          next_of_kin_id_number: o.nextOfKinIdNumber,
        }));
        const { error: ownersError } = await supabase
          .from('business_loan_owners')
          .insert(ownersPayload);
        if (ownersError) throw ownersError;
      }

      toast({ title: 'Application submitted', description: 'Thank you. We will review your application shortly.' });
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      toast({ title: 'Submission failed', description: 'Please try again.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="p-4 mb-4 text-green-700 bg-green-100 rounded">
        Application submitted successfully! Redirecting to home page...
      </div>
    );
  }

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
        {currentStep === 3 ? (
          <OwnerDetailsStep form={form} ownerIndex={0} isLastOwner={true} />
        ) : (
          <CurrentStepComponent form={form} />
        )}
        
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
