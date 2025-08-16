import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Form } from '@/components/ui/form';
import {
  ApplicationTypeStep,
  PersonalInfoStep,
  FamilyReferencesStep,
  LoanCollateralStep,
  EmploymentFinancialStep,
  TermsConditionsStep,
  SuccessStep
} from './loan-form';
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  // Group/Individual Info
  applicationType: z.string().min(1, 'Please select application type'),
  groupName: z.string().optional(),
  
  // Personal Info
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  nationalId: z.string().min(5, 'Please enter a valid ID number'),
  dateOfBirth: z.preprocess((v) => {
    if (v instanceof Date) return v.toISOString().slice(0, 10); // normalize
    return v;
  }, z.string().min(1, 'Please enter your date of birth')),
  gender: z.string().min(1, 'Please select your gender'),
  maritalStatus: z.string().min(1, 'Please select your marital status'),
  cellNumber: z.string().min(10, 'Please enter a valid phone number'),
  emailAddress: z.string().email('Please enter a valid email'),
  residentialAddress: z.string().min(5, 'Please enter your address'),
  idPhoto: z.instanceof(FileList).optional(),
  proofOfResidence: z.instanceof(FileList).optional(),
  
  // Family & References
  spouseFullName: z.string().optional(),
  spouseAddress: z.string().optional(),
  spouseCellNumber: z.string().optional(),
  spouseNationalId: z.string().optional(),
  nextOfKinName: z.string().min(2, "Next of kin's name is required"),
  nextOfKinRelationship: z.string().min(1, 'Please specify relationship'),
  nextOfKinAddress: z.string().min(5, 'Please enter next of kin address'),
  nextOfKinCell: z.string().min(10, 'Please enter a valid phone number'),
  nextOfKinId: z.string().min(5, 'Please enter a valid ID number'),
  
  // Loan & Collateral
  loanAmount: z.number().min(1, 'Please enter loan amount'),
  loanPurpose: z.string().min(5, 'Please describe the loan purpose'),
  collateral1: z.string().optional(),
  collateral2: z.string().optional(),
  collateral3: z.string().optional(),
  collateral4: z.string().optional(),
  collateral5: z.string().optional(),
  
  // Employment & Financial
  employmentStatus: z.string().min(1, 'Please select employment status'),
  employer: z.string().optional(),
  jobTitle: z.string().optional(),
  annualIncome: z.number().min(0, 'Income cannot be negative'),
  employmentLength: z.string().optional(),
  monthlyRent: z.number().min(0, 'Amount cannot be negative'),
  otherMonthlyDebts: z.number().min(0, 'Amount cannot be negative'),
  savingsAmount: z.number().min(0, 'Amount cannot be negative'),
  checkingAmount: z.number().min(0, 'Amount cannot be negative'),
  
  // Terms & Declarations
  applicationFeeAccepted: z.boolean(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions',
  }),
  declarationAccepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the declarations',
  }),
});

type FormData = z.infer<typeof formSchema>;

interface LoanApplicationFormProps {
  loanType: 'personal' | 'business' | 'salary';
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

const steps = [
  { id: 1, title: 'Application Type', description: 'Individual or Group application' },
  { id: 2, title: 'Personal Information', description: 'Your basic details' },
  { id: 3, title: 'Family & References', description: 'Spouse and next of kin details' },
  { id: 4, title: 'Loan & Collateral', description: 'Loan details and security' },
  { id: 5, title: 'Employment & Income', description: 'Work and financial information' },
  { id: 6, title: 'Terms & Conditions', description: 'Legal agreements and declarations' },
];

export function LoanApplicationForm({ loanType, onSuccess, onError }: LoanApplicationFormProps) {
  const navigate = useNavigate();
  const supabase = createClient();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monthlyRent: 0,
      otherMonthlyDebts: 0,
      savingsAmount: 0,
      checkingAmount: 0,
      applicationFeeAccepted: false,
      termsAccepted: false,
      declarationAccepted: false,
    },
  });

  if (loanType !== 'personal' && loanType !== 'salary') {
    onError?.(new Error('This form is for personal loan applications only'));
    navigate('/apply');
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <div className="bg-blue-50 p-6 rounded-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Incorrect Loan Type</h2>
          <p className="text-gray-600 mb-6">
            This form is for personal loan applications only. Please return to the loans page.
          </p>
          <Button
            onClick={() => navigate('/loans')}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
          >
            Back to Loans
          </Button>
        </div>
      </div>
    );
  }

  // Helper function to upload file to Supabase Storage
  const uploadFile = async (file: File, path: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${path}/${fileName}`;
    
    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, file);
      
    if (uploadError) throw uploadError;
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('documents')
      .getPublicUrl(filePath);
      
    return publicUrl;
  };

  if (isSuccess) {
    return (
      <div className="p-4 mb-4 text-green-700 bg-green-100 rounded">
        Application submitted successfully! Redirecting to home page...
      </div>
    );
  }

  // Combined onSubmit function with file uploads and database save
  const onSubmit = async (formData: FormData) => {
    try {
      // Get session but don't require authentication for submission
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;

      // Upload files if they exist
      const uploads: Promise<Record<string, string>>[] = [];
      if (formData.idPhoto?.[0]) {
        uploads.push(
          uploadFile(formData.idPhoto[0], 'documents').then((url) => ({ idPhoto: url }))
        );
      }
      if (formData.proofOfResidence?.[0]) {
        uploads.push(
          uploadFile(formData.proofOfResidence[0], 'documents').then((url) => ({ proofOfResidence: url }))
        );
      }

      // Wait for all uploads to complete
      const uploadResults = await Promise.all(uploads);
      const uploadedFiles = uploadResults.reduce((acc, curr) => ({ ...acc, ...curr }), {} as Record<string, string>);

      // Remove raw FileList objects for JSON serialization and merge uploaded URLs
      const cleanFormData = {
        ...formData,
        idPhoto: undefined,
        proofOfResidence: undefined,
      };

      // Map form fields to match loan_applications schema
      const applicationData = {
        user_id: session?.user?.id || null,
        application_type: formData.applicationType,
        group_name: formData.groupName || null,
        
        // Personal Information
        full_name: formData.fullName,
        national_id: formData.nationalId,
        date_of_birth: formData.dateOfBirth,
        gender: formData.gender,
        marital_status: formData.maritalStatus,
        cell_number: formData.cellNumber,
        email_address: formData.emailAddress,
        residential_address: formData.residentialAddress,
        id_photo_url: (uploadedFiles as any).idPhoto ?? null,
        proof_of_residence_url: (uploadedFiles as any).proofOfResidence ?? null,
        
        // Family & References
        spouse_full_name: formData.spouseFullName || null,
        spouse_address: formData.spouseAddress || null,
        spouse_cell_number: formData.spouseCellNumber || null,
        spouse_national_id: formData.spouseNationalId || null,
        next_of_kin_name: formData.nextOfKinName,
        next_of_kin_relationship: formData.nextOfKinRelationship,
        next_of_kin_address: formData.nextOfKinAddress,
        next_of_kin_cell: formData.nextOfKinCell,
        next_of_kin_id: formData.nextOfKinId,
        
        // Loan & Collateral
        loan_amount: formData.loanAmount,
        loan_purpose: formData.loanPurpose,
        collateral1: formData.collateral1 || null,
        collateral2: formData.collateral2 || null,
        collateral3: formData.collateral3 || null,
        collateral4: formData.collateral4 || null,
        collateral5: formData.collateral5 || null,
        
        // Employment & Financial
        employment_status: formData.employmentStatus,
        employer: formData.employer || null,
        job_title: formData.jobTitle || null,
        annual_income: formData.annualIncome,
        employment_length: formData.employmentLength || null,
        monthly_rent: formData.monthlyRent,
        other_monthly_debts: formData.otherMonthlyDebts,
        savings_amount: formData.savingsAmount,
        checking_amount: formData.checkingAmount,
        
        // Application Metadata
        loan_type: loanType,
        status: 'submitted',
        
        // Terms & Declarations
        terms_accepted: formData.termsAccepted,
        declaration_accepted: formData.declarationAccepted,
        marketing_consent: formData.applicationFeeAccepted || false,
      };

      // For now, require users to be authenticated to submit applications
      // This is a temporary solution until we can update the database schema
      if (!session?.user?.id) {
        throw new Error('Please sign in to submit your loan application. You can create a free account in just a few seconds.');
      }
      
      const { data, error } = await supabase
        .from('loan_applications')
        .insert([applicationData])
        .select();

      if (error) throw error;
      if (!data || data.length === 0) throw new Error('No data returned from server');

      // Mark as submitted and trigger success callback
      setIsSubmitted(true);
      toast({
        title: 'Application submitted',
        description: 'Thank you. We will review your application shortly.',
      });
      onSuccess?.();
      setIsSuccess(true);
      setTimeout(() => navigate('/'), 3000);
    } catch (error) {
      console.error('Error submitting application:', error);
      onError?.(error instanceof Error ? error : new Error('Failed to submit application'));
      toast({
        title: 'Submission failed',
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  const nextStep = async () => {
    const currentStepFields = getStepFields(currentStep);
    const isValid = await form.trigger(currentStepFields, { shouldFocus: true });
    
    if (isValid) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      } else {
        await form.handleSubmit(onSubmit)();
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const getStepFields = (step: number): (keyof FormData)[] => {
    switch (step) {
      case 1:
        return ['applicationType', 'groupName'];
      case 2:
        return [
          'fullName', 
          'nationalId', 
          'dateOfBirth', 
          'gender', 
          'maritalStatus', 
          'cellNumber', 
          'emailAddress', 
          'residentialAddress',
          'idPhoto',
          'proofOfResidence'
        ];
      case 3:
        return [
          'spouseFullName', 
          'spouseAddress', 
          'spouseCellNumber', 
          'spouseNationalId', 
          'nextOfKinName', 
          'nextOfKinRelationship', 
          'nextOfKinAddress', 
          'nextOfKinCell', 
          'nextOfKinId'
        ];
      case 4:
        return [
          'loanAmount', 
          'loanPurpose', 
          'collateral1', 
          'collateral2', 
          'collateral3', 
          'collateral4', 
          'collateral5'
        ];
      case 5:
        return [
          'employmentStatus', 
          'employer', 
          'jobTitle', 
          'annualIncome', 
          'employmentLength', 
          'monthlyRent', 
          'otherMonthlyDebts', 
          'savingsAmount', 
          'checkingAmount'
        ];
      case 6:
        return [
          'applicationFeeAccepted', 
          'termsAccepted', 
          'declarationAccepted'
        ];
      default:
        return [];
    }
  };

  const progress = (currentStep / steps.length) * 100;

  if (isSubmitted) {
    return (
      <SuccessStep 
        onComplete={() => {
          form.reset();
          setCurrentStep(1);
          setIsSubmitted(false);
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-foreground">Loan Application</h1>
              <div className="text-sm text-muted-foreground">
                Step {currentStep} of {steps.length}
              </div>
            </div>
            
            <div className="mb-6">
              <Progress value={progress} className="h-2" />
            </div>

            {/* Step Indicators */}
            <div className="flex justify-between">
              {steps.map((step) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                      step.id < currentStep
                        ? 'bg-success text-success-foreground'
                        : step.id === currentStep
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {step.id < currentStep ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="ml-2 hidden md:block">
                    <div className="text-sm font-medium">{step.title}</div>
                    <div className="text-xs text-muted-foreground">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <Card className="shadow-form bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-2xl">{steps[currentStep - 1].title}</CardTitle>
              <CardDescription>{steps[currentStep - 1].description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(
                    onSubmit,
                    async () => {
                      // Focus first invalid field and show feedback
                      await form.trigger();
                      toast({
                        title: 'Please fix the highlighted fields',
                        description: 'Some required information is missing or invalid.',
                        variant: 'destructive',
                      });
                    }
                  )}
                  className="space-y-6"
                >
                  {currentStep === 1 && <ApplicationTypeStep form={form} />}
                  {currentStep === 2 && <PersonalInfoStep form={form} />}
                  {currentStep === 3 && <FamilyReferencesStep form={form} />}
                  {currentStep === 4 && <LoanCollateralStep form={form} />}
                  {currentStep === 5 && <EmploymentFinancialStep form={form} />}
                  {currentStep === 6 && <TermsConditionsStep form={form} />}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    
                    <Button
                      type={currentStep === steps.length ? 'submit' : 'button'}
                      variant={currentStep === steps.length ? 'accent' : 'default'}
                      onClick={currentStep === steps.length ? undefined : nextStep}
                      className="flex items-center gap-2"
                    >
                      {currentStep === steps.length ? (
                        'Submit Application'
                      ) : (
                        <>
                          Next
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}