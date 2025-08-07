import { Database } from "../lib/supabase/database.types";

export type BusinessLoanApplication = Database["public"]["Tables"]["business_loan_applications"]["Row"];
export type BusinessLoanOwner = Database["public"]["Tables"]["business_loan_owners"]["Row"];
export type BusinessLoanApplicationInsert = Database["public"]["Tables"]["business_loan_applications"]["Insert"];
export type BusinessLoanOwnerInsert = Database["public"]["Tables"]["business_loan_owners"]["Insert"];

export interface BusinessLoanApplicationWithOwners extends BusinessLoanApplication {
  owners: BusinessLoanOwner[];
}

export type ApplicationStatus = 
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'requires_more_info'
  | 'cancelled';

export interface CollateralItem {
  type: string;
  value: number;
  description: string;
}

export interface ReferenceContact {
  name?: string;
  company?: string;
  phone?: string;
  email?: string;
  relationship?: string;
  duration?: string;
  branch?: string;
  accountType?: string;
  accountNumber?: string;
  yearsWithBank?: number;
}

export interface References {
  accountant: ReferenceContact;
  trade1: ReferenceContact;
  trade2: ReferenceContact;
  bank: ReferenceContact;
  other1: ReferenceContact;
  other2: ReferenceContact;
}

export interface LegalDeclarations {
  agreement1: boolean;
  agreement2: boolean;
  agreement3: boolean;
  agreement4: boolean;
}

export interface PrivacyDeclarations {
  agreement: boolean;
}

export interface MarketingPreferences {
  email: boolean;
  sms: boolean;
  phone: boolean;
}

export interface Declarations {
  legal: LegalDeclarations;
  privacy: PrivacyDeclarations;
  marketing: MarketingPreferences;
  signature: string;
  signatureDate: string;
  signatureAgreement: boolean;
  referralSource?: string;
  referralSourceOther?: string;
  additionalInfo?: string;
}
