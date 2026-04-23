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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      faqs: {
        Row: {
          answer: string
          created_at: string
          id: string
          question: string
          sort_order: number
        }
        Insert: {
          answer: string
          created_at?: string
          id?: string
          question: string
          sort_order?: number
        }
        Update: {
          answer?: string
          created_at?: string
          id?: string
          question?: string
          sort_order?: number
        }
        Relationships: []
      }
      impact_stats: {
        Row: {
          created_at: string
          id: string
          label: string
          sort_order: number
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          label: string
          sort_order?: number
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          label?: string
          sort_order?: number
          value?: string
        }
        Relationships: []
      }
      one_time_services: {
        Row: {
          best_value: boolean
          created_at: string
          description: string | null
          id: string
          name: string
          price: string
          sort_order: number
        }
        Insert: {
          best_value?: boolean
          created_at?: string
          description?: string | null
          id?: string
          name: string
          price: string
          sort_order?: number
        }
        Update: {
          best_value?: boolean
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          price?: string
          sort_order?: number
        }
        Relationships: []
      }
      portfolio_items: {
        Row: {
          category: string
          color_gradient: string
          created_at: string
          description: string
          icon: string
          id: string
          result: string
          sort_order: number
          title: string
        }
        Insert: {
          category: string
          color_gradient?: string
          created_at?: string
          description: string
          icon: string
          id?: string
          result: string
          sort_order?: number
          title: string
        }
        Update: {
          category?: string
          color_gradient?: string
          created_at?: string
          description?: string
          icon?: string
          id?: string
          result?: string
          sort_order?: number
          title?: string
        }
        Relationships: []
      }
      pricing_plans: {
        Row: {
          created_at: string
          features: string[]
          id: string
          name: string
          period: string
          popular: boolean
          price: string
          sort_order: number
          subtitle: string | null
        }
        Insert: {
          created_at?: string
          features?: string[]
          id?: string
          name: string
          period?: string
          popular?: boolean
          price: string
          sort_order?: number
          subtitle?: string | null
        }
        Update: {
          created_at?: string
          features?: string[]
          id?: string
          name?: string
          period?: string
          popular?: boolean
          price?: string
          sort_order?: number
          subtitle?: string | null
        }
        Relationships: []
      }
      process_steps: {
        Row: {
          created_at: string
          description: string
          icon: string
          id: string
          step_num: number
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          icon: string
          id?: string
          step_num: number
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          icon?: string
          id?: string
          step_num?: number
          title?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description: string
          icon: string
          id: string
          name: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          description: string
          icon: string
          id?: string
          name: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          description?: string
          icon?: string
          id?: string
          name?: string
          sort_order?: number
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          hero_accent: string
          hero_cta1: string
          hero_cta2: string
          hero_headline: string
          hero_subtitle: string
          id: string
          updated_at: string
        }
        Insert: {
          hero_accent?: string
          hero_cta1?: string
          hero_cta2?: string
          hero_headline?: string
          hero_subtitle?: string
          id?: string
          updated_at?: string
        }
        Update: {
          hero_accent?: string
          hero_cta1?: string
          hero_cta2?: string
          hero_headline?: string
          hero_subtitle?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          created_at: string
          id: string
          initials: string
          name: string
          role: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          id?: string
          initials: string
          name: string
          role: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          id?: string
          initials?: string
          name?: string
          role?: string
          sort_order?: number
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          approved: boolean
          created_at: string
          id: string
          initials: string
          name: string
          role: string
          sort_order: number
          stars: number
          text: string
        }
        Insert: {
          approved?: boolean
          created_at?: string
          id?: string
          initials: string
          name: string
          role: string
          sort_order?: number
          stars?: number
          text: string
        }
        Update: {
          approved?: boolean
          created_at?: string
          id?: string
          initials?: string
          name?: string
          role?: string
          sort_order?: number
          stars?: number
          text?: string
        }
        Relationships: []
      }
      trusted_creators: {
        Row: {
          created_at: string
          id: string
          name: string
          niche: string
          platform: string
          sort_order: number
          subscribers: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          niche: string
          platform: string
          sort_order?: number
          subscribers: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          niche?: string
          platform?: string
          sort_order?: number
          subscribers?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
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
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      redeem_admin_code: { Args: { _code: string }; Returns: boolean }
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
