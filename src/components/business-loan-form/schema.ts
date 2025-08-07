import { z } from "zod";

// Helper schemas
const ownerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  idNumber: z.string().min(1, "ID number is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  residentialAddress: z.string().min(1, "Residential address is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  maritalStatus: z.string().min(1, "Marital status is required"),
  position: z.string().min(1, "Position is required"),
  ownershipPercentage: z.number().min(0).max(100, "Ownership percentage must be between 0 and 100"),
  bankName: z.string().min(1, "Bank name is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  averageMonthlyBalance: z.number().min(0, "Must be a positive number"),
  spouseName: z.string().optional(),
  spouseIdNumber: z.string().optional(),
  spousePhoneNumber: z.string().optional(),
  nextOfKinName: z.string().min(1, "Next of kin name is required"),
  nextOfKinRelationship: z.string().min(1, "Relationship is required"),
  nextOfKinAddress: z.string().min(1, "Address is required"),
  nextOfKinPhone: z.string().min(1, "Phone number is required"),
  nextOfKinIdNumber: z.string().min(1, "ID number is required"),
});

const referencesSchema = z.object({
  accountant: z.object({
    name: z.string().optional(),
    company: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email("Invalid email").or(z.literal("")).optional(),
  }),
  trade1: z.object({
    company: z.string().optional(),
    contact: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email("Invalid email").or(z.literal("")).optional(),
    relationship: z.string().optional(),
    duration: z.string().optional(),
  }),
  trade2: z.object({
    company: z.string().optional(),
    contact: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email("Invalid email").or(z.literal("")).optional(),
    relationship: z.string().optional(),
    duration: z.string().optional(),
  }),
  bank: z.object({
    name: z.string().optional(),
    branch: z.string().optional(),
    contact: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email("Invalid email").or(z.literal("")).optional(),
    accountType: z.string().optional(),
    accountNumber: z.string().optional(),
    yearsWithBank: z.number().optional(),
  }),
  other1: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    relationship: z.string().optional(),
  }),
  other2: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    relationship: z.string().optional(),
  }),
});

const declarationsSchema = z.object({
  legal: z.object({
    agreement1: z.boolean().refine(val => val === true, "You must agree to the terms"),
    agreement2: z.boolean().refine(val => val === true, "You must agree to the terms"),
    agreement3: z.boolean().refine(val => val === true, "You must agree to the terms"),
    agreement4: z.boolean().refine(val => val === true, "You must agree to the terms"),
  }),
  privacy: z.object({
    agreement: z.boolean().refine(val => val === true, "You must agree to the privacy policy"),
  }),
  marketing: z.object({
    email: z.boolean().default(false),
    sms: z.boolean().default(false),
    phone: z.boolean().default(false),
  }),
  referralSource: z.string().optional(),
  referralSourceOther: z.string().optional(),
  additionalInfo: z.string().optional(),
  signature: z.string().min(1, "Signature is required"),
  signatureDate: z.string().min(1, "Date is required"),
  signatureAgreement: z.boolean().refine(val => val === true, "You must certify the information is correct"),
});

// Main form schema
export const businessLoanFormSchema = z.object({
  // Business Information
  legalBusinessName: z.string().min(2, "Business name is required"),
  tradingName: z.string().optional(),
  registrationNumber: z.string().min(1, "Registration number is required"),
  dateOfRegistration: z.string().min(1, "Date of registration is required"),
  taxIdentificationNumber: z.string().optional(),
  vatNumber: z.string().optional(),
  businessSector: z.string().min(1, "Business sector is required"),
  industry: z.string().min(1, "Industry is required"),
  yearsInBusiness: z.number().min(0, "Must be a positive number"),
  numberOfEmployees: z.number().min(0, "Must be a positive number"),
  businessStructure: z.string().min(1, "Business structure is required"),
  businessAddress: z.string().min(1, "Business address is required"),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  businessEmail: z.string().email("Invalid email address"),
  businessPhone: z.string().min(1, "Business phone is required"),
  website: z.string().url("Invalid URL").or(z.literal("")).optional(),
  businessDescription: z.string().min(10, "Please provide a detailed business description"),
  
  // Financial Information
  annualTurnover: z.number().min(0, "Must be a positive number"),
  projectedTurnover: z.number().min(0, "Must be a positive number"),
  grossProfit: z.number().min(0, "Must be a positive number"),
  netProfit: z.number().min(0, "Must be a positive number"),
  bankName: z.string().min(1, "Bank name is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  averageBalance: z.number().min(0, "Must be a positive number"),
  financialStatements: z.any().optional(),
  bankStatements: z.any().optional(),
  taxReturns: z.any().optional(),
  
  // Loan Details
  loanAmount: z.number().min(1000, "Minimum loan amount is $1,000"),
  loanTerm: z.number().min(1, "Loan term must be at least 1 month"),
  repaymentFrequency: z.string().min(1, "Repayment frequency is required"),
  customRepaymentFrequency: z.string().optional(),
  loanPurpose: z.string().min(10, "Please provide a detailed loan purpose"),
  collateralItems: z.array(
    z.object({
      type: z.string().min(1, "Collateral type is required"),
      value: z.number().min(0, "Value must be a positive number"),
      description: z.string().min(5, "Please provide a description"),
    })
  ).optional(),
  businessPlan: z.any().optional(),
  collateralDocuments: z.any().optional(),
  otherDocuments: z.any().optional(),
  
  // Owners/Directors
  owners: z.array(ownerSchema).min(1, "At least one owner/director is required"),
  
  // References
  references: referencesSchema,
  
  // Declarations
  declarations: declarationsSchema,
});

export type BusinessLoanFormValues = z.infer<typeof businessLoanFormSchema>;
