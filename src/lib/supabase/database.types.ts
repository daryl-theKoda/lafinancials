export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
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
      loan_applications: {
        Row: {
          address: string
          admin_notes: string | null
          business_description: string | null
          business_name: string | null
          created_at: string | null
          crop_type: string | null
          email: string
          emergency_description: string | null
          emergency_type: string | null
          employer_name: string | null
          employment_status: string
          farm_size: string | null
          full_name: string
          id: string
          loan_amount: number
          loan_type: string
          monthly_income: number
          phone: string
          reviewed_at: string | null
          school_name: string | null
          status: string | null
          student_name: string | null
          submitted_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address: string
          admin_notes?: string | null
          business_description?: string | null
          business_name?: string | null
          created_at?: string | null
          crop_type?: string | null
          email: string
          emergency_description?: string | null
          emergency_type?: string | null
          employer_name?: string | null
          employment_status: string
          farm_size?: string | null
          full_name: string
          id?: string
          loan_amount: number
          loan_type: string
          monthly_income: number
          phone: string
          reviewed_at?: string | null
          school_name?: string | null
          status?: string | null
          student_name?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          address?: string
          admin_notes?: string | null
          business_description?: string | null
          business_name?: string | null
          created_at?: string | null
          crop_type?: string | null
          email?: string
          emergency_description?: string | null
          emergency_type?: string | null
          employer_name?: string | null
          employment_status?: string
          farm_size?: string | null
          full_name?: string
          id?: string
          loan_amount?: number
          loan_type?: string
          monthly_income?: number
          phone?: string
          reviewed_at?: string | null
          school_name?: string | null
          status?: string | null
          student_name?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          user_id?: string
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
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
    },
  },
} as const
