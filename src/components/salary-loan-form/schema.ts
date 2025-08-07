import { z } from "zod";

export const salaryLoanFormSchema = z.object({
  // I. Personal Information
  fullName: z.string().min(2, "Full name is required"),
  nationalId: z.string().min(5, "National ID is required"),
  dateOfBirth: z.string().min(4, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  residentialAddress: z.string().min(5, "Residential address is required"),
  email: z.string().email("Invalid email address"),
  cellNumber: z.string().min(5, "Cell number is required"),
  maritalStatus: z.string().min(1, "Marital status is required"),
  dependents: z.number().min(0, "Number of dependents required"),
  educationLevel: z.string().min(2, "Education level is required"),

  // II. Employment Details
  employerName: z.string().min(2, "Employer name is required"),
  employerAddress: z.string().min(2, "Employer address is required"),
  department: z.string().min(1, "Department is required"),
  employeeNumber: z.string().min(1, "Employee number is required"),
  jobTitle: z.string().min(2, "Job title is required"),
  employmentStartDate: z.string().min(4, "Employment start date is required"),
  employmentStatus: z.string().min(1, "Employment status is required"),
  hrName: z.string().min(2, "HR/Payroll contact name is required"),
  hrNumber: z.string().min(5, "HR/Payroll contact number is required"),

  // III. Financial Information
  grossSalary: z.number().min(0, "Gross salary is required"),
  netSalary: z.number().min(0, "Net salary is required"),
  otherIncome: z.string().optional(),
  householdExpenses: z.number().min(0, "Household expenses required"),
  debts: z.array(z.object({
    lender: z.string().optional(),
    monthlyRepayment: z.number().optional(),
  })).optional(),

  // IV. Loan Details
  loanAmount: z.number().min(1, "Loan amount required"),
  loanPurpose: z.string().min(2, "Loan purpose required"),
  repaymentPeriod: z.string().min(1, "Repayment period required"),
  repaymentFrequency: z.string().min(1, "Repayment frequency required"),

  // V. Documents (as FileList or File[])
  idCopy: z.any(),
  proofOfResidence: z.any(),
  payslip: z.any(),
  bankStatements: z.any(),
  employerLetter: z.any().optional(),
  photos: z.any(),

  // Declaration
  declarationAccepted: z.boolean(),
  guaranteeAccepted: z.boolean(),
  voluntarySurrenderAccepted: z.boolean(),
  powerOfAttorneyAccepted: z.boolean(),
  affidavitAccepted: z.boolean(),
  agreementAccepted: z.boolean(),
});

export type SalaryLoanFormValues = z.infer<typeof salaryLoanFormSchema>;
