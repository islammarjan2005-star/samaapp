-- =============================================
-- Sama Music App — Supabase Database Schema
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- TABLES
-- =============================================

-- Users (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  preferred_categories TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Artists
CREATE TABLE public.artists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  genre TEXT DEFAULT 'nasheeds',
  followers_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Albums
CREATE TABLE public.albums (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  artist_id UUID NOT NULL REFERENCES public.artists(id) ON DELETE CASCADE,
  cover_url TEXT,
  release_year INTEGER DEFAULT EXTRACT(YEAR FROM NOW()),
  category TEXT DEFAULT 'nasheeds',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tracks
CREATE TABLE public.tracks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  artist_id UUID NOT NULL REFERENCES public.artists(id) ON DELETE CASCADE,
  album_id UUID NOT NULL REFERENCES public.albums(id) ON DELETE CASCADE,
  audio_url TEXT NOT NULL,
  artwork_url TEXT,
  duration INTEGER DEFAULT 0,
  track_number INTEGER DEFAULT 1,
  category TEXT DEFAULT 'nasheeds',
  plays_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Playlists
CREATE TABLE public.playlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  cover_url TEXT,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  is_curated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Playlist Tracks (junction table)
CREATE TABLE public.playlist_tracks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  playlist_id UUID NOT NULL REFERENCES public.playlists(id) ON DELETE CASCADE,
  track_id UUID NOT NULL REFERENCES public.tracks(id) ON DELETE CASCADE,
  position INTEGER DEFAULT 0,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(playlist_id, track_id)
);

-- Likes
CREATE TABLE public.likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  track_id UUID NOT NULL REFERENCES public.tracks(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, track_id)
);

-- Follows
CREATE TABLE public.follows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  artist_id UUID NOT NULL REFERENCES public.artists(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, artist_id)
);

-- Listening History
CREATE TABLE public.listening_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  track_id UUID NOT NULL REFERENCES public.tracks(id) ON DELETE CASCADE,
  played_at TIMESTAMPTZ DEFAULT NOW(),
  duration_listened INTEGER DEFAULT 0
);

-- Downloads
CREATE TABLE public.downloads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  track_id UUID NOT NULL REFERENCES public.tracks(id) ON DELETE CASCADE,
  file_path TEXT NOT NULL,
  downloaded_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, track_id)
);

-- =============================================
-- INDEXES
-- =============================================

CREATE INDEX idx_tracks_artist ON public.tracks(artist_id);
CREATE INDEX idx_tracks_album ON public.tracks(album_id);
CREATE INDEX idx_tracks_category ON public.tracks(category);
CREATE INDEX idx_albums_artist ON public.albums(artist_id);
CREATE INDEX idx_albums_category ON public.albums(category);
CREATE INDEX idx_likes_user ON public.likes(user_id);
CREATE INDEX idx_likes_track ON public.likes(track_id);
CREATE INDEX idx_follows_user ON public.follows(user_id);
CREATE INDEX idx_follows_artist ON public.follows(artist_id);
CREATE INDEX idx_history_user ON public.listening_history(user_id);
CREATE INDEX idx_history_played ON public.listening_history(played_at DESC);
CREATE INDEX idx_playlist_tracks_playlist ON public.playlist_tracks(playlist_id);
CREATE INDEX idx_playlists_user ON public.playlists(user_id);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playlist_tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listening_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;

-- Users: users can read/update their own profile
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Artists: everyone can read
CREATE POLICY "Anyone can view artists" ON public.artists
  FOR SELECT USING (true);

-- Albums: everyone can read
CREATE POLICY "Anyone can view albums" ON public.albums
  FOR SELECT USING (true);

-- Tracks: everyone can read
CREATE POLICY "Anyone can view tracks" ON public.tracks
  FOR SELECT USING (true);

-- Playlists: users can read curated + own, write own
CREATE POLICY "Users can view curated and own playlists" ON public.playlists
  FOR SELECT USING (is_curated = true OR user_id = auth.uid());
CREATE POLICY "Users can create playlists" ON public.playlists
  FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own playlists" ON public.playlists
  FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can delete own playlists" ON public.playlists
  FOR DELETE USING (user_id = auth.uid());

-- Playlist tracks: read curated + own playlists, write own
CREATE POLICY "Users can view playlist tracks" ON public.playlist_tracks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.playlists
      WHERE id = playlist_id
      AND (is_curated = true OR user_id = auth.uid())
    )
  );
CREATE POLICY "Users can manage own playlist tracks" ON public.playlist_tracks
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.playlists
      WHERE id = playlist_id AND user_id = auth.uid()
    )
  );
CREATE POLICY "Users can delete own playlist tracks" ON public.playlist_tracks
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.playlists
      WHERE id = playlist_id AND user_id = auth.uid()
    )
  );

-- Likes: users can read/write their own
CREATE POLICY "Users can view own likes" ON public.likes
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can like tracks" ON public.likes
  FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can unlike tracks" ON public.likes
  FOR DELETE USING (user_id = auth.uid());

-- Follows: users can read/write their own
CREATE POLICY "Users can view own follows" ON public.follows
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can follow artists" ON public.follows
  FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can unfollow artists" ON public.follows
  FOR DELETE USING (user_id = auth.uid());

-- Listening history: users can read/write their own
CREATE POLICY "Users can view own history" ON public.listening_history
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can record listens" ON public.listening_history
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Downloads: users can read/write their own
CREATE POLICY "Users can view own downloads" ON public.downloads
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can download tracks" ON public.downloads
  FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can remove downloads" ON public.downloads
  FOR DELETE USING (user_id = auth.uid());

-- =============================================
-- STORAGE BUCKETS
-- =============================================

INSERT INTO storage.buckets (id, name, public) VALUES ('audio-files', 'audio-files', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('artwork-images', 'artwork-images', true);

CREATE POLICY "Public audio access" ON storage.objects
  FOR SELECT USING (bucket_id = 'audio-files');
CREATE POLICY "Public artwork access" ON storage.objects
  FOR SELECT USING (bucket_id = 'artwork-images');

-- =============================================
-- AUTO-CREATE USER PROFILE ON SIGNUP
-- =============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, display_name)
  VALUES (new.id, new.email, COALESCE(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
