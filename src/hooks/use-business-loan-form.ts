import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from './use-auth'
import { createClient } from '@/lib/supabase/client';
import { uploadFile } from '@/lib/supabase/storage';
import { BusinessLoanFormValues } from '@/components/business-loan-form/schema';

export const useBusinessLoanForm = () => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [applicationNumber, setApplicationNumber] = useState('');
  const supabase = createClient();

  const form = useForm<BusinessLoanFormValues>();

  const steps = [
    { title: 'Business Info', fields: getStepFields(0) },
    { title: 'Financial Info', fields: getStepFields(1) },
    { title: 'Loan Details', fields: getStepFields(2) },
    { title: 'Owners/Directors', fields: getStepFields(3) },
    { title: 'References', fields: getStepFields(4) },
    { title: 'Declarations', fields: getStepFields(5) },
  ];

  function getStepFields(step: number): string[] {
    switch (step) {
      case 0: return ['legalBusinessName', 'registrationNumber', 'businessSector'];
      case 1: return ['annualTurnover', 'bankName', 'accountNumber'];
      case 2: return ['loanAmount', 'loanTerm', 'loanPurpose'];
      case 3: return ['owners'];
      case 4: return ['references'];
      case 5: return ['declarations'];
      default: return [];
    }
  }

  const nextStep = async () => {
    const currentFields = steps[currentStep].fields;
    const isValid = await form.trigger(currentFields as any);
    if (isValid) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => setCurrentStep(prev => prev - 1);

  const submitApplication = async (data: BusinessLoanFormValues) => {
    if (!user) return { success: false, error: 'Not authenticated' };
    
    setIsSubmitting(true);
    const appNumber = `BL-${Date.now().toString().slice(-6)}`;
    setApplicationNumber(appNumber);

    try {
      // Upload files
      const uploadFileIfExists = async (file: File | undefined, path: string) => {
        if (!file) return null;
        return uploadFile(file, `business-loan/${user.id}/${path}`);
      };

      // Upload all files in parallel
      const [financialStatements, bankStatements] = await Promise.all([
        uploadFileIfExists(data.financialStatements?.[0], 'financial-statements'),
        uploadFileIfExists(data.bankStatements?.[0], 'bank-statements')
      ]);

      // Save to database
      const { error } = await supabase
        .from('business_loan_applications')
        .insert([{
          application_number: appNumber,
          user_id: user.id,
          status: 'submitted',
          legal_business_name: data.legalBusinessName,
          registration_number: data.registrationNumber,
          business_sector: data.businessSector,
          annual_turnover: data.annualTurnover,
          bank_name: data.bankName,
          account_number: data.accountNumber,
          loan_amount: data.loanAmount,
          loan_term: data.loanTerm,
          loan_purpose: data.loanPurpose,
          financial_statements_url: financialStatements?.url || null,
          bank_statements_url: bankStatements?.url || null,
          owners: data.owners,
          references: data.references,
          declarations: data.declarations,
          submitted_at: new Date().toISOString(),
        }]);

      if (error) throw error;
      return { success: true, applicationNumber: appNumber };
    } catch (error) {
      console.error('Submission error:', error);
      return { success: false, error: 'Failed to submit application' };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    currentStep,
    steps,
    isSubmitting,
    applicationNumber,
    nextStep,
    prevStep,
    submitApplication,
    canGoBack: currentStep > 0,
    canGoNext: currentStep < steps.length - 1,
    isLastStep: currentStep === steps.length - 1,
  };
};
