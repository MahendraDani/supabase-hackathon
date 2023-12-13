export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      poem_comments: {
        Row: {
          comment: string | null
          comment_id: string
          created_at: string
          poem_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          comment?: string | null
          comment_id?: string
          created_at?: string
          poem_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          comment?: string | null
          comment_id?: string
          created_at?: string
          poem_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "poem_comments_poem_id_fkey"
            columns: ["poem_id"]
            isOneToOne: false
            referencedRelation: "poems"
            referencedColumns: ["poem_id"]
          },
          {
            foreignKeyName: "poem_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          }
        ]
      }
      poem_likes: {
        Row: {
          like_id: string
          liked_at: string
          poem_id: string
          user_id: string
        }
        Insert: {
          like_id?: string
          liked_at?: string
          poem_id: string
          user_id: string
        }
        Update: {
          like_id?: string
          liked_at?: string
          poem_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "poem_likes_poem_id_fkey"
            columns: ["poem_id"]
            isOneToOne: false
            referencedRelation: "poems"
            referencedColumns: ["poem_id"]
          },
          {
            foreignKeyName: "poem_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          }
        ]
      }
      poem_reads: {
        Row: {
          poem_id: string
          read_at: string
          read_id: string
          user_id: string
        }
        Insert: {
          poem_id: string
          read_at?: string
          read_id?: string
          user_id: string
        }
        Update: {
          poem_id?: string
          read_at?: string
          read_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "poem_reads_poem_id_fkey"
            columns: ["poem_id"]
            isOneToOne: false
            referencedRelation: "poems"
            referencedColumns: ["poem_id"]
          },
          {
            foreignKeyName: "poem_reads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          }
        ]
      }
      poems: {
        Row: {
          banner_url: string | null
          comment_count: number | null
          created_at: string | null
          genre: string | null
          is_published: boolean | null
          like_count: number | null
          poem: Json | null
          poem_id: string
          read_count: number | null
          title: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          banner_url?: string | null
          comment_count?: number | null
          created_at?: string | null
          genre?: string | null
          is_published?: boolean | null
          like_count?: number | null
          poem?: Json | null
          poem_id?: string
          read_count?: number | null
          title?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          banner_url?: string | null
          comment_count?: number | null
          created_at?: string | null
          genre?: string | null
          is_published?: boolean | null
          like_count?: number | null
          poem?: Json | null
          poem_id?: string
          read_count?: number | null
          title?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "poems_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          }
        ]
      }
      profiles: {
        Row: {
          about: string | null
          avatar_url: string | null
          city: string | null
          country: string | null
          full_name: string
          gender: string | null
          github_url: string | null
          hashnode_url: string | null
          linkedin_url: string | null
          medium_url: string | null
          poem_comment_count: number | null
          poem_like_count: number | null
          poem_read_count: number | null
          quote_comment_count: number | null
          quote_like_count: number | null
          quote_read_count: number | null
          story_comment_count: number | null
          story_like_count: number | null
          story_read_count: number | null
          tagline: string | null
          twitter_url: string | null
          user_id: string
          username: string
          website_url: string | null
        }
        Insert: {
          about?: string | null
          avatar_url?: string | null
          city?: string | null
          country?: string | null
          full_name: string
          gender?: string | null
          github_url?: string | null
          hashnode_url?: string | null
          linkedin_url?: string | null
          medium_url?: string | null
          poem_comment_count?: number | null
          poem_like_count?: number | null
          poem_read_count?: number | null
          quote_comment_count?: number | null
          quote_like_count?: number | null
          quote_read_count?: number | null
          story_comment_count?: number | null
          story_like_count?: number | null
          story_read_count?: number | null
          tagline?: string | null
          twitter_url?: string | null
          user_id: string
          username: string
          website_url?: string | null
        }
        Update: {
          about?: string | null
          avatar_url?: string | null
          city?: string | null
          country?: string | null
          full_name?: string
          gender?: string | null
          github_url?: string | null
          hashnode_url?: string | null
          linkedin_url?: string | null
          medium_url?: string | null
          poem_comment_count?: number | null
          poem_like_count?: number | null
          poem_read_count?: number | null
          quote_comment_count?: number | null
          quote_like_count?: number | null
          quote_read_count?: number | null
          story_comment_count?: number | null
          story_like_count?: number | null
          story_read_count?: number | null
          tagline?: string | null
          twitter_url?: string | null
          user_id?: string
          username?: string
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      quote_comments: {
        Row: {
          comment: string | null
          comment_id: string
          created_at: string
          quote_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          comment?: string | null
          comment_id?: string
          created_at?: string
          quote_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          comment?: string | null
          comment_id?: string
          created_at?: string
          quote_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quote_comments_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["quote_id"]
          },
          {
            foreignKeyName: "quote_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          }
        ]
      }
      quote_likes: {
        Row: {
          like_id: string
          liked_at: string | null
          quote_id: string
          user_id: string | null
        }
        Insert: {
          like_id?: string
          liked_at?: string | null
          quote_id: string
          user_id?: string | null
        }
        Update: {
          like_id?: string
          liked_at?: string | null
          quote_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quote_likes_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["quote_id"]
          },
          {
            foreignKeyName: "quote_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          }
        ]
      }
      quote_reads: {
        Row: {
          quote_id: string
          read_at: string
          read_id: string
          user_id: string
        }
        Insert: {
          quote_id: string
          read_at?: string
          read_id?: string
          user_id: string
        }
        Update: {
          quote_id?: string
          read_at?: string
          read_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quote_reads_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["quote_id"]
          },
          {
            foreignKeyName: "quote_reads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          }
        ]
      }
      quotes: {
        Row: {
          banner_url: string | null
          comment_count: number | null
          created_at: string | null
          genre: string | null
          is_published: boolean | null
          like_count: number | null
          quote: Json | null
          quote_id: string
          read_count: number | null
          updated_at: string | null
          user_id: string
          written_by: string | null
        }
        Insert: {
          banner_url?: string | null
          comment_count?: number | null
          created_at?: string | null
          genre?: string | null
          is_published?: boolean | null
          like_count?: number | null
          quote?: Json | null
          quote_id?: string
          read_count?: number | null
          updated_at?: string | null
          user_id: string
          written_by?: string | null
        }
        Update: {
          banner_url?: string | null
          comment_count?: number | null
          created_at?: string | null
          genre?: string | null
          is_published?: boolean | null
          like_count?: number | null
          quote?: Json | null
          quote_id?: string
          read_count?: number | null
          updated_at?: string | null
          user_id?: string
          written_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quotes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          }
        ]
      }
      stories: {
        Row: {
          banner_url: string | null
          comment_count: number | null
          created_at: string | null
          genre: string | null
          is_published: boolean | null
          like_count: number | null
          read_count: number | null
          story: Json | null
          story_id: string
          title: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          banner_url?: string | null
          comment_count?: number | null
          created_at?: string | null
          genre?: string | null
          is_published?: boolean | null
          like_count?: number | null
          read_count?: number | null
          story?: Json | null
          story_id?: string
          title?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          banner_url?: string | null
          comment_count?: number | null
          created_at?: string | null
          genre?: string | null
          is_published?: boolean | null
          like_count?: number | null
          read_count?: number | null
          story?: Json | null
          story_id?: string
          title?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stories_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          }
        ]
      }
      story_comments: {
        Row: {
          comment: string | null
          comment_id: string
          created_at: string
          story_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          comment?: string | null
          comment_id?: string
          created_at?: string
          story_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          comment?: string | null
          comment_id?: string
          created_at?: string
          story_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "story_comments_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["story_id"]
          },
          {
            foreignKeyName: "story_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          }
        ]
      }
      story_likes: {
        Row: {
          like_id: string
          liked_at: string
          story_id: string
          user_id: string
        }
        Insert: {
          like_id?: string
          liked_at?: string
          story_id: string
          user_id: string
        }
        Update: {
          like_id?: string
          liked_at?: string
          story_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "story_likes_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["story_id"]
          },
          {
            foreignKeyName: "story_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          }
        ]
      }
      story_reads: {
        Row: {
          read_at: string
          read_id: string
          story_id: string
          user_id: string
        }
        Insert: {
          read_at?: string
          read_id?: string
          story_id: string
          user_id: string
        }
        Update: {
          read_at?: string
          read_id?: string
          story_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "story_reads_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["story_id"]
          },
          {
            foreignKeyName: "story_reads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
