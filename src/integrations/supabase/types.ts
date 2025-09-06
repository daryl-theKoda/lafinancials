export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      admin_follow_ups: {
        Row: {
          application_id: string | null
          client_id: string
          completed: boolean | null
          completed_at: string | null
          created_at: string
          created_by: string | null
          due_date: string
          follow_up_type: string
          id: string
          notes: string | null
          priority: string | null
        }
        Insert: {
          application_id?: string | null
          client_id: string
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          due_date: string
          follow_up_type: string
          id?: string
          notes?: string | null
          priority?: string | null
        }
        Update: {
          application_id?: string | null
          client_id?: string
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          due_date?: string
          follow_up_type?: string
          id?: string
          notes?: string | null
          priority?: string | null
        }
        Relationships: []
      }
      application_documents: {
        Row: {
          application_id: string
          document_type: string
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          uploaded_at: string | null
        }
        Insert: {
          application_id: string
          document_type: string
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          uploaded_at?: string | null
        }
        Update: {
          application_id?: string
          document_type?: string
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "application_documents_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "loan_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      business_loan_applications: {
        Row: {
          account_number: string | null
          annual_turnover: number | null
          average_balance: number | null
          bank_name: string | null
          bank_statements_url: string | null
          business_address: string | null
          business_description: string | null
          business_email: string | null
          business_phone: string | null
          business_plan_url: string | null
          business_references: Json | null
          business_sector: string | null
          business_structure: string | null
          city: string | null
          collateral_documents_url: string | null
          created_at: string | null
          date_of_registration: string | null
          declarations: Json | null
          financial_statements_url: string | null
          gross_profit: number | null
          id: number
          industry: string | null
          legal_business_name: string | null
          loan_term: number | null
          net_profit: number | null
          number_of_employees: number | null
          other_documents_url: string | null
          postal_code: string | null
          projected_turnover: number | null
          province: string | null
          registration_number: string | null
          repayment_frequency: string | null
          status: string | null
          submitted_at: string | null
          tax_identification_number: string | null
          tax_returns_url: string | null
          trading_name: string | null
          user_id: string | null
          vat_number: string | null
          website: string | null
          years_in_business: number | null
        }
        Insert: {
          account_number?: string | null
          annual_turnover?: number | null
          average_balance?: number | null
          bank_name?: string | null
          bank_statements_url?: string | null
          business_address?: string | null
          business_description?: string | null
          business_email?: string | null
          business_phone?: string | null
          business_plan_url?: string | null
          business_references?: Json | null
          business_sector?: string | null
          business_structure?: string | null
          city?: string | null
          collateral_documents_url?: string | null
          created_at?: string | null
          date_of_registration?: string | null
          declarations?: Json | null
          financial_statements_url?: string | null
          gross_profit?: number | null
          id?: never
          industry?: string | null
          legal_business_name?: string | null
          loan_term?: number | null
          net_profit?: number | null
          number_of_employees?: number | null
          other_documents_url?: string | null
          postal_code?: string | null
          projected_turnover?: number | null
          province?: string | null
          registration_number?: string | null
          repayment_frequency?: string | null
          status?: string | null
          submitted_at?: string | null
          tax_identification_number?: string | null
          tax_returns_url?: string | null
          trading_name?: string | null
          user_id?: string | null
          vat_number?: string | null
          website?: string | null
          years_in_business?: number | null
        }
        Update: {
          account_number?: string | null
          annual_turnover?: number | null
          average_balance?: number | null
          bank_name?: string | null
          bank_statements_url?: string | null
          business_address?: string | null
          business_description?: string | null
          business_email?: string | null
          business_phone?: string | null
          business_plan_url?: string | null
          business_references?: Json | null
          business_sector?: string | null
          business_structure?: string | null
          city?: string | null
          collateral_documents_url?: string | null
          created_at?: string | null
          date_of_registration?: string | null
          declarations?: Json | null
          financial_statements_url?: string | null
          gross_profit?: number | null
          id?: never
          industry?: string | null
          legal_business_name?: string | null
          loan_term?: number | null
          net_profit?: number | null
          number_of_employees?: number | null
          other_documents_url?: string | null
          postal_code?: string | null
          projected_turnover?: number | null
          province?: string | null
          registration_number?: string | null
          repayment_frequency?: string | null
          status?: string | null
          submitted_at?: string | null
          tax_identification_number?: string | null
          tax_returns_url?: string | null
          trading_name?: string | null
          user_id?: string | null
          vat_number?: string | null
          website?: string | null
          years_in_business?: number | null
        }
        Relationships: []
      }
      business_loan_owners: {
        Row: {
          account_number: string
          application_id: number
          average_monthly_balance: number
          bank_name: string
          created_at: string
          date_of_birth: string
          email: string
          full_name: string
          gender: string
          id: number
          id_number: string
          marital_status: string
          next_of_kin_address: string
          next_of_kin_id_number: string
          next_of_kin_name: string
          next_of_kin_phone: string
          next_of_kin_relationship: string
          ownership_percentage: number
          phone_number: string
          position: string
          residential_address: string
          spouse_id_number: string | null
          spouse_name: string | null
          spouse_phone_number: string | null
          updated_at: string
        }
        Insert: {
          account_number: string
          application_id: number
          average_monthly_balance: number
          bank_name: string
          created_at?: string
          date_of_birth: string
          email: string
          full_name: string
          gender: string
          id?: number
          id_number: string
          marital_status: string
          next_of_kin_address: string
          next_of_kin_id_number: string
          next_of_kin_name: string
          next_of_kin_phone: string
          next_of_kin_relationship: string
          ownership_percentage: number
          phone_number: string
          position: string
          residential_address: string
          spouse_id_number?: string | null
          spouse_name?: string | null
          spouse_phone_number?: string | null
          updated_at?: string
        }
        Update: {
          account_number?: string
          application_id?: number
          average_monthly_balance?: number
          bank_name?: string
          created_at?: string
          date_of_birth?: string
          email?: string
          full_name?: string
          gender?: string
          id?: number
          id_number?: string
          marital_status?: string
          next_of_kin_address?: string
          next_of_kin_id_number?: string
          next_of_kin_name?: string
          next_of_kin_phone?: string
          next_of_kin_relationship?: string
          ownership_percentage?: number
          phone_number?: string
          position?: string
          residential_address?: string
          spouse_id_number?: string | null
          spouse_name?: string | null
          spouse_phone_number?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_loan_owners_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "business_loan_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      loan_applications: {
        Row: {
          address: string | null
          admin_notes: string | null
          annual_income: number | null
          application_date: string | null
          application_type: string | null
          business_description: string | null
          business_name: string | null
          cell_number: string | null
          checking_amount: number | null
          collateral1: string | null
          collateral2: string | null
          collateral3: string | null
          collateral4: string | null
          collateral5: string | null
          created_at: string | null
          crop_type: string | null
          date_of_birth: string | null
          declaration_accepted: boolean | null
          email: string | null
          email_address: string | null
          emergency_description: string | null
          emergency_type: string | null
          employer: string | null
          employer_name: string | null
          employment_length: string | null
          employment_status: string
          farm_size: string | null
          full_name: string
          gender: string | null
          group_name: string | null
          id: string
          id_photo_url: string | null
          job_title: string | null
          loan_amount: number
          loan_purpose: string | null
          loan_type: string
          marital_status: string | null
          marketing_consent: boolean | null
          monthly_income: number | null
          monthly_rent: number | null
          national_id: string | null
          next_of_kin_address: string | null
          next_of_kin_cell: string | null
          next_of_kin_id: string | null
          next_of_kin_name: string | null
          next_of_kin_relationship: string | null
          other_monthly_debts: number | null
          phone: string | null
          proof_of_residence_url: string | null
          residential_address: string | null
          reviewed_at: string | null
          savings_amount: number | null
          school_name: string | null
          spouse_address: string | null
          spouse_cell_number: string | null
          spouse_full_name: string | null
          spouse_national_id: string | null
          status: string | null
          student_name: string | null
          submitted_at: string | null
          terms_accepted: boolean | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          address?: string | null
          admin_notes?: string | null
          annual_income?: number | null
          application_date?: string | null
          application_type?: string | null
          business_description?: string | null
          business_name?: string | null
          cell_number?: string | null
          checking_amount?: number | null
          collateral1?: string | null
          collateral2?: string | null
          collateral3?: string | null
          collateral4?: string | null
          collateral5?: string | null
          created_at?: string | null
          crop_type?: string | null
          date_of_birth?: string | null
          declaration_accepted?: boolean | null
          email?: string | null
          email_address?: string | null
          emergency_description?: string | null
          emergency_type?: string | null
          employer?: string | null
          employer_name?: string | null
          employment_length?: string | null
          employment_status: string
          farm_size?: string | null
          full_name: string
          gender?: string | null
          group_name?: string | null
          id?: string
          id_photo_url?: string | null
          job_title?: string | null
          loan_amount: number
          loan_purpose?: string | null
          loan_type: string
          marital_status?: string | null
          marketing_consent?: boolean | null
          monthly_income?: number | null
          monthly_rent?: number | null
          national_id?: string | null
          next_of_kin_address?: string | null
          next_of_kin_cell?: string | null
          next_of_kin_id?: string | null
          next_of_kin_name?: string | null
          next_of_kin_relationship?: string | null
          other_monthly_debts?: number | null
          phone?: string | null
          proof_of_residence_url?: string | null
          residential_address?: string | null
          reviewed_at?: string | null
          savings_amount?: number | null
          school_name?: string | null
          spouse_address?: string | null
          spouse_cell_number?: string | null
          spouse_full_name?: string | null
          spouse_national_id?: string | null
          status?: string | null
          student_name?: string | null
          submitted_at?: string | null
          terms_accepted?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string | null
          admin_notes?: string | null
          annual_income?: number | null
          application_date?: string | null
          application_type?: string | null
          business_description?: string | null
          business_name?: string | null
          cell_number?: string | null
          checking_amount?: number | null
          collateral1?: string | null
          collateral2?: string | null
          collateral3?: string | null
          collateral4?: string | null
          collateral5?: string | null
          created_at?: string | null
          crop_type?: string | null
          date_of_birth?: string | null
          declaration_accepted?: boolean | null
          email?: string | null
          email_address?: string | null
          emergency_description?: string | null
          emergency_type?: string | null
          employer?: string | null
          employer_name?: string | null
          employment_length?: string | null
          employment_status?: string
          farm_size?: string | null
          full_name?: string
          gender?: string | null
          group_name?: string | null
          id?: string
          id_photo_url?: string | null
          job_title?: string | null
          loan_amount?: number
          loan_purpose?: string | null
          loan_type?: string
          marital_status?: string | null
          marketing_consent?: boolean | null
          monthly_income?: number | null
          monthly_rent?: number | null
          national_id?: string | null
          next_of_kin_address?: string | null
          next_of_kin_cell?: string | null
          next_of_kin_id?: string | null
          next_of_kin_name?: string | null
          next_of_kin_relationship?: string | null
          other_monthly_debts?: number | null
          phone?: string | null
          proof_of_residence_url?: string | null
          residential_address?: string | null
          reviewed_at?: string | null
          savings_amount?: number | null
          school_name?: string | null
          spouse_address?: string | null
          spouse_cell_number?: string | null
          spouse_full_name?: string | null
          spouse_national_id?: string | null
          status?: string | null
          student_name?: string | null
          submitted_at?: string | null
          terms_accepted?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      loan_payments: {
        Row: {
          amount_due: number
          amount_paid: number | null
          application_id: string
          created_at: string
          due_date: string
          id: string
          notes: string | null
          paid_date: string | null
          payment_method: string | null
          status: string
          transaction_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount_due: number
          amount_paid?: number | null
          application_id: string
          created_at?: string
          due_date: string
          id?: string
          notes?: string | null
          paid_date?: string | null
          payment_method?: string | null
          status?: string
          transaction_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount_due?: number
          amount_paid?: number | null
          application_id?: string
          created_at?: string
          due_date?: string
          id?: string
          notes?: string | null
          paid_date?: string | null
          payment_method?: string | null
          status?: string
          transaction_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      partners: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          name: string
          updated_at: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name: string
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name?: string
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          client_number: string | null
          created_at: string | null
          full_name: string
          id: string
          phone: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          client_number?: string | null
          created_at?: string | null
          full_name: string
          id?: string
          phone?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          address?: string | null
          client_number?: string | null
          created_at?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      salary_loan_applications: {
        Row: {
          affidavit_accepted: boolean | null
          agreement_accepted: boolean | null
          bank_statements: string | null
          cell_number: string | null
          created_at: string
          date_of_birth: string | null
          debts: Json | null
          declaration_accepted: boolean | null
          department: string | null
          dependents: number | null
          education_level: string | null
          email: string | null
          employee_number: string | null
          employer_address: string | null
          employer_letter: string | null
          employer_name: string | null
          employment_start_date: string | null
          employment_status: string | null
          full_name: string | null
          gender: string | null
          gross_salary: number | null
          guarantee_accepted: boolean | null
          household_expenses: number | null
          hr_name: string | null
          hr_number: string | null
          id: string
          id_copy: string | null
          job_title: string | null
          loan_amount: number | null
          loan_purpose: string | null
          marital_status: string | null
          national_id: string | null
          net_salary: number | null
          other_income: string | null
          payslip: string | null
          photos: string | null
          power_of_attorney_accepted: boolean | null
          proof_of_residence: string | null
          repayment_frequency: string | null
          repayment_period: string | null
          residential_address: string | null
          status: string | null
          submitted_at: string | null
          user_id: string | null
          voluntary_surrender_accepted: boolean | null
        }
        Insert: {
          affidavit_accepted?: boolean | null
          agreement_accepted?: boolean | null
          bank_statements?: string | null
          cell_number?: string | null
          created_at?: string
          date_of_birth?: string | null
          debts?: Json | null
          declaration_accepted?: boolean | null
          department?: string | null
          dependents?: number | null
          education_level?: string | null
          email?: string | null
          employee_number?: string | null
          employer_address?: string | null
          employer_letter?: string | null
          employer_name?: string | null
          employment_start_date?: string | null
          employment_status?: string | null
          full_name?: string | null
          gender?: string | null
          gross_salary?: number | null
          guarantee_accepted?: boolean | null
          household_expenses?: number | null
          hr_name?: string | null
          hr_number?: string | null
          id?: string
          id_copy?: string | null
          job_title?: string | null
          loan_amount?: number | null
          loan_purpose?: string | null
          marital_status?: string | null
          national_id?: string | null
          net_salary?: number | null
          other_income?: string | null
          payslip?: string | null
          photos?: string | null
          power_of_attorney_accepted?: boolean | null
          proof_of_residence?: string | null
          repayment_frequency?: string | null
          repayment_period?: string | null
          residential_address?: string | null
          status?: string | null
          submitted_at?: string | null
          user_id?: string | null
          voluntary_surrender_accepted?: boolean | null
        }
        Update: {
          affidavit_accepted?: boolean | null
          agreement_accepted?: boolean | null
          bank_statements?: string | null
          cell_number?: string | null
          created_at?: string
          date_of_birth?: string | null
          debts?: Json | null
          declaration_accepted?: boolean | null
          department?: string | null
          dependents?: number | null
          education_level?: string | null
          email?: string | null
          employee_number?: string | null
          employer_address?: string | null
          employer_letter?: string | null
          employer_name?: string | null
          employment_start_date?: string | null
          employment_status?: string | null
          full_name?: string | null
          gender?: string | null
          gross_salary?: number | null
          guarantee_accepted?: boolean | null
          household_expenses?: number | null
          hr_name?: string | null
          hr_number?: string | null
          id?: string
          id_copy?: string | null
          job_title?: string | null
          loan_amount?: number | null
          loan_purpose?: string | null
          marital_status?: string | null
          national_id?: string | null
          net_salary?: number | null
          other_income?: string | null
          payslip?: string | null
          photos?: string | null
          power_of_attorney_accepted?: boolean | null
          proof_of_residence?: string | null
          repayment_frequency?: string | null
          repayment_period?: string | null
          residential_address?: string | null
          status?: string | null
          submitted_at?: string | null
          user_id?: string | null
          voluntary_surrender_accepted?: boolean | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_client_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["app_role"]
      }
      get_user_email: {
        Args: { _user_id: string }
        Returns: string
      }
      get_user_id_by_email: {
        Args: { _email: string }
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      application_status:
        | "draft"
        | "submitted"
        | "under_review"
        | "approved"
        | "rejected"
        | "requires_more_info"
        | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      application_status: [
        "draft",
        "submitted",
        "under_review",
        "approved",
        "rejected",
        "requires_more_info",
        "cancelled",
      ],
    },
  },
} as const
