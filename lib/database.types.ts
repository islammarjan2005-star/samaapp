export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          display_name: string | null;
          avatar_url: string | null;
          preferred_categories: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          display_name?: string | null;
          avatar_url?: string | null;
          preferred_categories?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          preferred_categories?: string[];
          updated_at?: string;
        };
      };
      artists: {
        Row: {
          id: string;
          name: string;
          bio: string | null;
          image_url: string | null;
          genre: string;
          followers_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          bio?: string | null;
          image_url?: string | null;
          genre?: string;
          followers_count?: number;
          created_at?: string;
        };
        Update: {
          name?: string;
          bio?: string | null;
          image_url?: string | null;
          genre?: string;
          followers_count?: number;
        };
      };
      albums: {
        Row: {
          id: string;
          title: string;
          artist_id: string;
          cover_url: string | null;
          release_year: number;
          category: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          artist_id: string;
          cover_url?: string | null;
          release_year?: number;
          category?: string;
          created_at?: string;
        };
        Update: {
          title?: string;
          artist_id?: string;
          cover_url?: string | null;
          release_year?: number;
          category?: string;
        };
      };
      tracks: {
        Row: {
          id: string;
          title: string;
          artist_id: string;
          album_id: string;
          audio_url: string;
          artwork_url: string | null;
          duration: number;
          track_number: number;
          category: string;
          plays_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          artist_id: string;
          album_id: string;
          audio_url: string;
          artwork_url?: string | null;
          duration?: number;
          track_number?: number;
          category?: string;
          plays_count?: number;
          created_at?: string;
        };
        Update: {
          title?: string;
          audio_url?: string;
          artwork_url?: string | null;
          duration?: number;
          track_number?: number;
          category?: string;
          plays_count?: number;
        };
      };
      playlists: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          cover_url: string | null;
          user_id: string | null;
          is_curated: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          cover_url?: string | null;
          user_id?: string | null;
          is_curated?: boolean;
          created_at?: string;
        };
        Update: {
          title?: string;
          description?: string | null;
          cover_url?: string | null;
          is_curated?: boolean;
        };
      };
      playlist_tracks: {
        Row: {
          id: string;
          playlist_id: string;
          track_id: string;
          position: number;
          added_at: string;
        };
        Insert: {
          id?: string;
          playlist_id: string;
          track_id: string;
          position?: number;
          added_at?: string;
        };
        Update: {
          position?: number;
        };
      };
      likes: {
        Row: {
          id: string;
          user_id: string;
          track_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          track_id: string;
          created_at?: string;
        };
        Update: Record<string, never>;
      };
      follows: {
        Row: {
          id: string;
          user_id: string;
          artist_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          artist_id: string;
          created_at?: string;
        };
        Update: Record<string, never>;
      };
      listening_history: {
        Row: {
          id: string;
          user_id: string;
          track_id: string;
          played_at: string;
          duration_listened: number;
        };
        Insert: {
          id?: string;
          user_id: string;
          track_id: string;
          played_at?: string;
          duration_listened?: number;
        };
        Update: {
          duration_listened?: number;
        };
      };
      downloads: {
        Row: {
          id: string;
          user_id: string;
          track_id: string;
          file_path: string;
          downloaded_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          track_id: string;
          file_path: string;
          downloaded_at?: string;
        };
        Update: {
          file_path?: string;
        };
      };
    };
  };
}
