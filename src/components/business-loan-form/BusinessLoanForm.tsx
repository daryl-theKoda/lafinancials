import { useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase/client";
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
  const { toast } = useToast();

  const form = useForm<BusinessLoanFormValues>({
    defaultValues: {
      legalBusinessName: "",
      tradingName: "",
      registrationNumber: "",
      dateOfRegistration: "",
      taxIdentificationNumber: "",
      vatNumber: "",
      businessSector: "",
      industry: "",
      yearsInBusiness: 0,
      numberOfEmployees: 0,
      businessStructure: "",
      businessAddress: "",
      city: "",
      province: "",
      postalCode: "",
      businessEmail: "",
      businessPhone: "",
      website: "",
      businessDescription: "",
      annualTurnover: 0,
      projectedTurnover: 0,
      grossProfit: 0,
      netProfit: 0,
      bankName: "",
      accountNumber: "",
      averageBalance: 0,
      financialStatements: undefined,
      bankStatements: undefined,
      taxReturns: undefined,
      loanAmount: 0,
      loanTerm: 0,
      repaymentFrequency: "",
      loanPurpose: "",
      collateralItems: [],
      businessPlan: undefined,
      collateralDocuments: undefined,
      otherDocuments: undefined,
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
      references: {
        accountant: { name: "", company: "", phone: "", email: "" },
        trade1: { company: "", contact: "", phone: "", email: "", relationship: "", duration: "" },
        trade2: { company: "", contact: "", phone: "", email: "", relationship: "", duration: "" },
        bank: { name: "", branch: "", contact: "", phone: "", email: "", accountType: "", accountNumber: "", yearsWithBank: undefined as any },
        other1: { name: "", phone: "", relationship: "" },
        other2: { name: "", phone: "", relationship: "" },
      },
      declarations: {
        legal: { agreement1: false, agreement2: false, agreement3: false, agreement4: false },
        privacy: { agreement: false },
        marketing: { email: false, sms: false, phone: false },
        referralSource: "",
        referralSourceOther: "",
        additionalInfo: "",
        signature: "",
        signatureDate: "",
        signatureAgreement: false,
      },
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

  const nextStep = () => {
    // Allow progressing without validation
    setCompletedSteps(prev => [...new Set([...prev, currentStep])]);
    setCurrentStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const onSubmit = async (data: BusinessLoanFormValues) => {
    console.log('Submitting business loan application...');
    toast({ title: 'Submitting application...', description: 'Please wait while we save your details.' });
    setIsSubmitting(true);
    const appNumber = `BL-${Date.now().toString().slice(-6)}`;
    setApplicationNumber(appNumber);

    // Helper to upload a file to Storage and return public URL. If bucket is missing or upload fails, return null.
    const uploadFile = async (file: File, path: string): Promise<string | null> => {
      try {
        const ext = file.name.split('.') .pop();
        const fileName = `${Math.random().toString(36).slice(2)}.${ext}`;
        const filePath = `${path}/${fileName}`;
        const { error: uploadError } = await supabase.storage.from('documents').upload(filePath, file);
        if (uploadError) {
          console.warn('Upload failed or bucket missing, continuing without file:', uploadError?.message || uploadError);
          return null;
        }
        const { data: pub } = supabase.storage.from('documents').getPublicUrl(filePath);
        return pub.publicUrl ?? null;
      } catch (err) {
        console.warn('Upload exception, continuing without file:', err);
        return null;
      }
    };

    try {
      // Get session if available; allow anonymous submissions
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;

      // Upload optional files
      const uploads: Promise<[keyof BusinessLoanFormValues, string | null]>[] = [];
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
      const uploadedMap = Object.fromEntries(uploadedEntries) as Record<string, string | null>;

      // Build application payload mapping to DB columns (with safe defaults)
      const payload = {
        application_number: appNumber,
        user_id: session?.user?.id ?? null,
        status: 'submitted',
        
        // Business Information
        legal_business_name: data.legalBusinessName || 'N/A',
        trading_name: data.tradingName || null,
        registration_number: data.registrationNumber || 'N/A',
        date_of_registration: data.dateOfRegistration || '1970-01-01',
        tax_identification_number: data.taxIdentificationNumber || null,
        vat_number: data.vatNumber || null,
        business_sector: data.businessSector || 'N/A',
        industry: data.industry || 'N/A',
        years_in_business: (data.yearsInBusiness ?? 0),
        number_of_employees: (data.numberOfEmployees ?? 0),
        business_structure: data.businessStructure || 'N/A',
        business_address: data.businessAddress || 'N/A',
        city: data.city || 'N/A',
        province: data.province || 'N/A',
        postal_code: data.postalCode || 'N/A',
        business_email: data.businessEmail || 'na@example.com',
        business_phone: data.businessPhone || 'N/A',
        website: data.website || null,
        business_description: data.businessDescription || 'N/A',

        // Financial Information
        annual_turnover: (data.annualTurnover ?? 0),
        projected_turnover: (data.projectedTurnover ?? 0),
        gross_profit: (data.grossProfit ?? 0),
        net_profit: (data.netProfit ?? 0),
        bank_name: data.bankName || 'N/A',
        account_number: data.accountNumber || 'N/A',
        average_balance: (data.averageBalance ?? 0),
        financial_statements_url: uploadedMap.financialStatements ?? null,
        bank_statements_url: uploadedMap.bankStatements ?? null,
        tax_returns_url: uploadedMap.taxReturns ?? null,

        // Loan Details
        loan_amount: (data.loanAmount ?? 0),
        loan_term: (data.loanTerm ?? 0),
        repayment_frequency: data.repaymentFrequency || 'N/A',
        loan_purpose: data.loanPurpose || 'N/A',
        collateral_items: data.collateralItems ? JSON.stringify(data.collateralItems) : null,
        business_plan_url: uploadedMap.businessPlan ?? null,
        collateral_documents_url: uploadedMap.collateralDocuments ?? null,
        other_documents_url: uploadedMap.otherDocuments ?? null,

        // References and Declarations
        business_references: data.references ? JSON.stringify(data.references) : JSON.stringify({}),
        declarations: data.declarations ? JSON.stringify(data.declarations) : JSON.stringify({}),

        submitted_at: new Date().toISOString(),
      };

      // Do not send application_number from client; DB trigger generates it. Drop if present.
      if ((payload as any).application_number !== undefined) {
        delete (payload as any).application_number;
      }

      // Insert application and return id directly (with fallback for schema cache mismatch)
      const insertApplication = async (pl: Record<string, any>) => {
        return await supabase
          .from('business_loan_applications')
          .insert([pl])
          .select('id')
          .single();
      };

      let applicationId: string | undefined = undefined;
      let firstTry = await insertApplication(payload);
      if (firstTry.error) {
        const code = (firstTry.error as any)?.code || '';
        const msg = (firstTry.error as any)?.message || '';
        // Detect PostgREST schema cache/unknown column error and retry without problematic fields
        if (
          code === 'PGRST204' ||
          /account_number/i.test(msg) ||
          /annual_turnover/i.test(msg) ||
          /application_number/i.test(msg) ||
          /business_address/i.test(msg) ||
          /loan_amount/i.test(msg) ||
          /loan_purpose/i.test(msg) ||
          /collateral_items/i.test(msg) ||
          /bank_statements_url/i.test(msg) ||
          /financial_statements_url/i.test(msg) ||
          /tax_returns_url/i.test(msg) ||
          /business_plan_url/i.test(msg) ||
          /collateral_documents_url/i.test(msg) ||
          /other_documents_url/i.test(msg)
        ) {
          if (/annual_turnover/i.test(msg)) {
            console.warn('Schema mismatch detected (annual_turnover). Retrying insert without annual_turnover.');
          }
          if (/account_number/i.test(msg)) {
            console.warn('Schema mismatch detected (account_number). Retrying insert without bank/account fields.');
          }
          if (/application_number/i.test(msg)) {
            console.warn('Schema mismatch detected (application_number). Retrying insert without application_number.');
          }
          if (/business_address/i.test(msg)) {
            console.warn('Schema mismatch detected (business_address). Retrying insert without business_address.');
          }
          if (/loan_amount/i.test(msg)) {
            console.warn('Schema mismatch detected (loan_amount). Retrying insert without loan_amount.');
          }
          if (/loan_purpose/i.test(msg)) {
            console.warn('Schema mismatch detected (loan_purpose). Retrying insert without loan_purpose.');
          }
          if (/collateral_items/i.test(msg)) {
            console.warn('Schema mismatch detected (collateral_items). Retrying insert without collateral_items.');
          }
          if (/bank_statements_url|financial_statements_url|tax_returns_url|business_plan_url|collateral_documents_url|other_documents_url/i.test(msg) || code === 'PGRST204') {
            console.warn('Schema mismatch detected (one or more *_url fields). Retrying insert without file URL fields.');
          }
          const {
            account_number,
            bank_name,
            average_balance,
            annual_turnover,
            application_number,
            business_address,
            loan_amount,
            loan_purpose,
            collateral_items,
            bank_statements_url,
            financial_statements_url,
            tax_returns_url,
            business_plan_url,
            collateral_documents_url,
            other_documents_url,
            ...fallbackPayload
          } = payload as any;
          const secondTry = await insertApplication(fallbackPayload);
          if (secondTry.error) throw secondTry.error;
          applicationId = (secondTry.data as any)?.id as string | undefined;
        } else {
          throw firstTry.error;
        }
      } else {
        applicationId = (firstTry.data as any)?.id as string | undefined;
      }

      // Insert owners into child table
      if (applicationId && Array.isArray(data.owners) && data.owners.length > 0) {
        const ownersPayload = data.owners.map((o) => ({
          application_id: applicationId,
          full_name: o.fullName || 'N/A',
          id_number: o.idNumber || 'N/A',
          date_of_birth: o.dateOfBirth || '1970-01-01', // YYYY-MM-DD
          gender: o.gender || 'N/A',
          residential_address: o.residentialAddress || 'N/A',
          email: o.email || 'na@example.com',
          phone_number: o.phoneNumber || 'N/A',
          marital_status: o.maritalStatus || 'N/A',
          position: o.position || 'N/A',
          ownership_percentage: (o.ownershipPercentage ?? 0),
          bank_name: o.bankName || 'N/A',
          account_number: o.accountNumber || 'N/A',
          average_monthly_balance: (o.averageMonthlyBalance ?? 0),
          spouse_name: o.spouseName ?? null,
          spouse_id_number: o.spouseIdNumber ?? null,
          spouse_phone_number: o.spousePhoneNumber ?? null,
          next_of_kin_name: o.nextOfKinName || 'N/A',
          next_of_kin_relationship: o.nextOfKinRelationship || 'N/A',
          next_of_kin_address: o.nextOfKinAddress || 'N/A',
          next_of_kin_phone: o.nextOfKinPhone || 'N/A',
          next_of_kin_id_number: o.nextOfKinIdNumber || 'N/A',
        }));
        const { error: ownersError } = await supabase
          .from('business_loan_owners')
          .insert(ownersPayload);
        if (ownersError) throw ownersError;
      }

      toast({ title: 'Application submitted', description: 'Thank you. We will review your application shortly.' });
      setIsSuccess(true);
      navigate('/dashboard');
    } catch (error) {
      const e = error as any;
      const message = e?.message || e?.error?.message || 'Failed to submit application';
      const details = e?.details || e?.hint || e?.error_description || e?.code || '';
      console.error('Business application submission error:', { message, details, raw: e });
      toast({ title: 'Submission failed', description: [message, details].filter(Boolean).join(' | '), variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return <SuccessStep applicationNumber={applicationNumber} />;
  }

  const CurrentStepComponent = steps[currentStep]?.component || (() => null);

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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log('Form submission triggered');
          form.handleSubmit(onSubmit)();
        }}
        noValidate
        className="space-y-6"
      >
        {currentStep === 3 ? (
          <OwnerDetailsStep form={form} ownerIndex={0} isLastOwner={true} />
        ) : (
          <CurrentStepComponent form={form} />
        )}
        
        <div className="flex items-center justify-between mt-8 gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0 || isSubmitting}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>

          <div className="flex items-center gap-2">
            {currentStep < steps.length - 1 && (
              <Button type="button" onClick={nextStep} disabled={isSubmitting}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}

            {/* Always show submit button */}
            <Button
              type="submit"
              onClick={() => {
                console.log('Submit button clicked');
                form.handleSubmit(onSubmit)();
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};