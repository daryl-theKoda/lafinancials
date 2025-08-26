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
import { supabase } from "@/lib/supabase/client";

const steps = [
  { label: "Personal Information", component: PersonalInfoStep },
  { label: "Employment Details", component: EmploymentDetailsStep },
  { label: "Financial Information", component: FinancialInfoStep },
  { label: "Loan Details", component: LoanDetailsStep },
  { label: "Document Uploads", component: DocumentUploadStep },
  { label: "Declarations & Agreements", component: DeclarationStep },
];

// Fields per step for targeted validation on Next
const stepFields: string[][] = [
  // 0: Personal Information
  [
    "fullName",
    "nationalId",
    "dateOfBirth",
    "gender",
    "residentialAddress",
    "email",
    "cellNumber",
    "maritalStatus",
    "dependents",
    "educationLevel",
  ],
  // 1: Employment Details
  [
    "employerName",
    "employerAddress",
    "department",
    "employeeNumber",
    "jobTitle",
    "employmentStartDate",
    "employmentStatus",
    "hrName",
    "hrNumber",
  ],
  // 2: Financial Information
  [
    "grossSalary",
    "netSalary",
    "otherIncome",
    "householdExpenses",
    "debts",
  ],
  // 3: Loan Details
  [
    "loanAmount",
    "loanPurpose",
    "repaymentPeriod",
    "repaymentFrequency",
  ],
  // 4: Document Uploads
  [
    "idCopy",
    "proofOfResidence",
    "payslip",
    "bankStatements",
    "employerLetter",
    "photos",
  ],
  // 5: Declarations & Agreements
  [
    "declarationAccepted",
    "guaranteeAccepted",
    "voluntarySurrenderAccepted",
    "powerOfAttorneyAccepted",
    "affidavitAccepted",
    "agreementAccepted",
  ],
];

export default function SalaryLoanForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

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
    // Validate only the fields in the current step
    const fields = stepFields[currentStep] || [];
    const valid = await form.trigger(fields as any);
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

      // Handle file uploads (best-effort: do not block submit on storage errors)
      const uploadFile = async (fileList: FileList | File[] | undefined, folder: string) => {
        try {
          if (!fileList || ("length" in fileList && fileList.length === 0)) return undefined;
          const file = (fileList as any)[0] as File;
          // Use a safe object key inside the 'documents' bucket (no bucket name in key)
          const safeName = `${Date.now()}_${file.name}`.replace(/\s+/g, '_');
          const key = `${folder}/${safeName}`;
          const { data, error } = await supabase
            .storage
            .from('documents')
            .upload(key, file, { upsert: true });
          if (error) throw error;
          return data?.path ?? key;
        } catch (err: any) {
          console.warn('Upload skipped due to storage error (continuing without this file)', {
            folder,
            error: err?.message || err,
          });
          return undefined;
        }
      };
      const uploads = {
        idCopy: await uploadFile(values.idCopy, 'idCopy'),
        proofOfResidence: await uploadFile(values.proofOfResidence, 'proofOfResidence'),
        payslip: await uploadFile(values.payslip, 'payslip'),
        bankStatements: await uploadFile(values.bankStatements, 'bankStatements'),
        employerLetter: await uploadFile(values.employerLetter, 'employerLetter'),
        photos: await uploadFile(values.photos, 'photos'),
      };
      // Prepare application data (snake_case for DB columns)
      const applicationData = {
        user_id: session?.user?.id || null,
        submitted_at: new Date().toISOString(),
        status: "submitted",

        // I. Personal Information
        full_name: values.fullName,
        national_id: values.nationalId,
        date_of_birth: values.dateOfBirth,
        gender: values.gender,
        residential_address: values.residentialAddress,
        email: values.email,
        cell_number: values.cellNumber,
        marital_status: values.maritalStatus,
        dependents: values.dependents,
        education_level: values.educationLevel,

        // II. Employment Details
        employer_name: values.employerName,
        employer_address: values.employerAddress,
        department: values.department,
        employee_number: values.employeeNumber,
        job_title: values.jobTitle,
        employment_start_date: values.employmentStartDate,
        employment_status: values.employmentStatus,
        hr_name: values.hrName,
        hr_number: values.hrNumber,

        // III. Financial Information
        gross_salary: values.grossSalary,
        net_salary: values.netSalary,
        other_income: values.otherIncome ?? null,
        household_expenses: values.householdExpenses,
        debts: values.debts ?? null,

        // IV. Loan Details
        loan_amount: values.loanAmount,
        loan_purpose: values.loanPurpose,
        repayment_period: values.repaymentPeriod,
        repayment_frequency: values.repaymentFrequency,

        // V. Documents (storage object paths)
        id_copy: uploads.idCopy ?? null,
        proof_of_residence: uploads.proofOfResidence ?? null,
        payslip: uploads.payslip ?? null,
        bank_statements: uploads.bankStatements ?? null,
        employer_letter: uploads.employerLetter ?? null,
        photos: uploads.photos ?? null,

        // Declarations
        declaration_accepted: values.declarationAccepted,
        guarantee_accepted: values.guaranteeAccepted,
        voluntary_surrender_accepted: values.voluntarySurrenderAccepted,
        power_of_attorney_accepted: values.powerOfAttorneyAccepted,
        affidavit_accepted: values.affidavitAccepted,
        agreement_accepted: values.agreementAccepted,
      } as Record<string, any>;

      // Save to Supabase without returning rows (avoids SELECT under RLS)
      const { error } = await supabase
        .from("salary_loan_applications")
        .insert([applicationData]);
      if (error) throw error;
      // Redirect to dashboard on success
      navigate("/dashboard");
    } catch (e) {
      const err: any = e;
      const message = err?.message || err?.error?.message || 'Failed to submit application';
      const details = err?.details || err?.hint || err?.error_description || err?.code || '';
      console.error('Salary loan submission error:', { message, details, raw: err });
      // Use a basic fallback UI since this file doesn't import toast here
      window.alert(`Submission failed: ${[message, details].filter(Boolean).join(' | ')}`);
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
