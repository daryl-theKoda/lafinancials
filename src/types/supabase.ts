import { Database } from "../lib/supabase/database.types";

// Represents a single loan application, filtered by loan_type in queries.
export type LoanApplication = Database["public"]["Tables"]["loan_applications"]["Row"];
export type LoanApplicationInsert = Database["public"]["Tables"]["loan_applications"]["Insert"];

// Note: The concept of 'owners' is not represented in the current database schema.
// This interface is kept for structure but may need backend changes to be fully implemented.
export interface BusinessLoanApplicationWithOwners extends LoanApplication {
  owners: any[]; // Placeholder for owner data
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
