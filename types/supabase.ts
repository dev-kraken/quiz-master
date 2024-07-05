export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      answers: {
        Row: {
          created_at: string
          id: number
          is_correct: boolean
          option: string
          question_uuid: string
        }
        Insert: {
          created_at?: string
          id?: number
          is_correct?: boolean
          option: string
          question_uuid: string
        }
        Update: {
          created_at?: string
          id?: number
          is_correct?: boolean
          option?: string
          question_uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "answers_question_uuid_fkey"
            columns: ["question_uuid"]
            isOneToOne: false
            referencedRelation: "quiz_questions"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "answers_question_uuid_fkey"
            columns: ["question_uuid"]
            isOneToOne: false
            referencedRelation: "random_questions"
            referencedColumns: ["uuid"]
          },
        ]
      }
      language_quiz: {
        Row: {
          created_at: string
          id: number
          name: string
          uuid: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          uuid?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          uuid?: string | null
        }
        Relationships: []
      }
      quiz_questions: {
        Row: {
          code: string | null
          created_at: string
          explanation: string
          id: number
          language_uuid: string | null
          question: string
          uuid: string
        }
        Insert: {
          code?: string | null
          created_at?: string
          explanation: string
          id?: number
          language_uuid?: string | null
          question: string
          uuid?: string
        }
        Update: {
          code?: string | null
          created_at?: string
          explanation?: string
          id?: number
          language_uuid?: string | null
          question?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_language_uuid_fkey"
            columns: ["language_uuid"]
            isOneToOne: false
            referencedRelation: "language_quiz"
            referencedColumns: ["uuid"]
          },
        ]
      }
    }
    Views: {
      random_questions: {
        Row: {
          code: string | null
          explanation: string | null
          language_uuid: string | null
          question: string | null
          uuid: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_language_uuid_fkey"
            columns: ["language_uuid"]
            isOneToOne: false
            referencedRelation: "language_quiz"
            referencedColumns: ["uuid"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
