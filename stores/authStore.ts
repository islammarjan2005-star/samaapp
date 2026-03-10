import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { Session, User } from "@supabase/supabase-js";

interface UserProfile {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  preferred_categories: string[];
}

interface AuthState {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  hasCompletedOnboarding: boolean;

  setSession: (session: Session | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setIsLoading: (loading: boolean) => void;
  setHasCompletedOnboarding: (completed: boolean) => void;
  fetchProfile: () => Promise<void>;
  updatePreferences: (categories: string[]) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  user: null,
  profile: null,
  isLoading: true,
  hasCompletedOnboarding: false,

  setSession: (session) =>
    set({ session, user: session?.user ?? null }),

  setProfile: (profile) =>
    set({
      profile,
      hasCompletedOnboarding:
        (profile?.preferred_categories?.length ?? 0) > 0,
    }),

  setIsLoading: (loading) => set({ isLoading: loading }),
  setHasCompletedOnboarding: (completed) =>
    set({ hasCompletedOnboarding: completed }),

  fetchProfile: async () => {
    const { user } = get();
    if (!user) return;
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();
    if (data) {
      set({
        profile: data,
        hasCompletedOnboarding:
          (data.preferred_categories?.length ?? 0) > 0,
      });
    }
  },

  updatePreferences: async (categories) => {
    const { user } = get();
    if (!user) return;
    await supabase
      .from("users")
      .update({
        preferred_categories: categories,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);
    set((state) => ({
      profile: state.profile
        ? { ...state.profile, preferred_categories: categories }
        : null,
      hasCompletedOnboarding: categories.length > 0,
    }));
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({
      session: null,
      user: null,
      profile: null,
      hasCompletedOnboarding: false,
    });
  },
}));
