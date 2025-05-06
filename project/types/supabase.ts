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
      events: {
        Row: {
          id: string
          name: string
          date: string
          location: string
          type: 'hackathon' | 'workshop' | 'talk'
          link: string
          description: string
          source: 'manual' | 'scraped'
          created_at: string
          user_id: string | null
        }
        Insert: {
          id?: string
          name: string
          date: string
          location: string
          type: 'hackathon' | 'workshop' | 'talk'
          link: string
          description: string
          source?: 'manual' | 'scraped'
          created_at?: string
          user_id?: string | null
        }
        Update: {
          id?: string
          name?: string
          date?: string
          location?: string
          type?: 'hackathon' | 'workshop' | 'talk'
          link?: string
          description?: string
          source?: 'manual' | 'scraped'
          created_at?: string
          user_id?: string | null
        }
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
  }
}