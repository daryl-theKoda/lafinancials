import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { salaryLoanFormSchema, SalaryLoanFormValues } from "./schema";
import { PersonalInfoStep } from "./PersonalInfoStep";
import { EmploymentDetailsStep } from "./EmploymentDetailsStep";
import { FinancialInfoStep } from "./FinancialInfoStep";
import { LoanDetailsStep } from "./LoanDetailsStep";
import { DocumentUploadStep } from "./DocumentUploadStep";
import { DeclarationStep } from "./DeclarationStep";
import { SuccessStep } from "./SuccessStep";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

const steps = [
  { label: "Personal Information", component: PersonalInfoStep },
  { label: "Employment Details", component: EmploymentDetailsStep },
  { label: "Financial Information", component: FinancialInfoStep },
  { label: "Loan Details", component: LoanDetailsStep },
  { label: "Document Uploads", component: DocumentUploadStep },
  { label: "Declarations & Agreements", component: DeclarationStep },
];

export default function SalaryLoanForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const supabase = createClient();

  const form = useForm<SalaryLoanFormValues>({
    resolver: zodResolver(salaryLoanFormSchema),
    defaultValues: {
      fullName: "",
      nationalId: "",
      dateOfBirth: "",
      gender: "",
      residentialAddress: "",
      email: "",
      cellNumber: "",
      maritalStatus: "",
      dependents: 0,
      educationLevel: "",
      employerName: "",
      employerAddress: "",
      department: "",
      employeeNumber: "",
      jobTitle: "",
      employmentStartDate: "",
      employmentStatus: "",
      hrName: "",
      hrNumber: "",
      grossSalary: 0,
      netSalary: 0,
      otherIncome: "",
      householdExpenses: 0,
      debts: [{ lender: "", monthlyRepayment: 0 }, { lender: "", monthlyRepayment: 0 }],
      loanAmount: 0,
      loanPurpose: "",
      repaymentPeriod: "",
      repaymentFrequency: "",
      idCopy: undefined,
      proofOfResidence: undefined,
      payslip: undefined,
      bankStatements: undefined,
      employerLetter: undefined,
      photos: undefined,
      declarationAccepted: false,
      guaranteeAccepted: false,
      voluntarySurrenderAccepted: false,
      powerOfAttorneyAccepted: false,
      affidavitAccepted: false,
      agreementAccepted: false,
    },
  });

  const StepComponent = steps[currentStep].component;

  const nextStep = async () => {
    const valid = await form.trigger();
    if (valid) setCurrentStep((s) => s + 1);
  };

  const prevStep = () => setCurrentStep((s) => Math.max(0, s - 1));

  const onSubmit = async (values: SalaryLoanFormValues) => {
    setIsSubmitting(true);
    try {
      // Get session and handle non-authenticated users
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;
      
      if (!session?.user?.id) {
        console.log('Submitting salary loan application without authentication');
        // This will work after database schema is updated to allow null user_id
      }

      // Handle file uploads
      const uploadFile = async (fileList: FileList | File[], path: string) => {
        if (!fileList || fileList.length === 0) return undefined;
        const file = fileList[0];
        const { data, error } = await supabase.storage.from("documents").upload(`documents/${path}/${file.name}`, file, { upsert: true });
        if (error) throw error;
        return data?.path;
      };
      const uploads = {
        idCopy: await uploadFile(values.idCopy, "idCopy"),
        proofOfResidence: await uploadFile(values.proofOfResidence, "proofOfResidence"),
        payslip: await uploadFile(values.payslip, "payslip"),
        bankStatements: await uploadFile(values.bankStatements, "bankStatements"),
        employerLetter: await uploadFile(values.employerLetter, "employerLetter"),
        photos: await uploadFile(values.photos, "photos"),
      };
      // Prepare application data
      const applicationData = {
        ...values,
        ...uploads,
        user_id: session?.user?.id || null,
        submitted_at: new Date().toISOString(),
        status: "submitted",
      };
      // Save to Supabase
      const { error } = await supabase.from("salary_loan_applications").insert([applicationData]);
      if (error) throw error;
      setIsSubmitted(true);
    } catch (e) {
      alert("Submission failed: " + (e instanceof Error ? e.message : "Unknown error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) return <SuccessStep onComplete={() => navigate("/dashboard")} />;

  return (
    <>
      <button
        onClick={() => navigate("/")}
        style={{ marginBottom: 16, padding: '8px 16px', borderRadius: 6, background: '#2563eb', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        ← Back to Dashboard
      </button>
      <FormProvider {...form}>
        <form
          className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6"
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <h2 className="text-xl font-bold mb-6 text-center">Salary-Based Loan Application</h2>
          <div className="mb-8">
            <div className="flex justify-between mb-4">
              {steps.map((step, idx) => (
                <div
                  key={step.label}
                  className={`flex-1 text-xs text-center ${idx === currentStep ? "font-bold text-primary" : "text-muted-foreground"}`}
                >
                  {step.label}
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
          <StepComponent />
          <div className="flex justify-between mt-8">
            <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 0}>
              Previous
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </>
  );
}
