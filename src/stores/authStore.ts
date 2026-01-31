// Auth Store - Zustand with expo-secure-store persistence
import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import type { User } from '@/api/types';
import { getStoredToken, clearStoredToken, setUnauthorizedHandler } from '@/api/client';
import { getCurrentUser, logout as apiLogout } from '@/api/auth';

const USER_CACHE_KEY = 'lighter_user_cache';

// Flag to prevent multiple 401 redirects
let isHandling401 = false;

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;

  // Actions
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  initialize: () => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isLoading: true,
  isInitialized: false,
  error: null,

  setUser: (user) => {
    set({ user });
    // Cache user data for faster startup
    if (user) {
      SecureStore.setItemAsync(USER_CACHE_KEY, JSON.stringify(user)).catch(() => {});
    } else {
      SecureStore.deleteItemAsync(USER_CACHE_KEY).catch(() => {});
    }
  },

  setToken: (token) => set({ token }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  initialize: async () => {
    try {
      set({ isLoading: true, error: null });

      // Check for stored token
      const token = await getStoredToken();

      if (!token) {
        set({ user: null, token: null, isInitialized: true, isLoading: false });
        return;
      }

      set({ token });

      // Try to load cached user data for instant UI
      try {
        const cachedUser = await SecureStore.getItemAsync(USER_CACHE_KEY);
        if (cachedUser) {
          const parsed = JSON.parse(cachedUser) as User;
          set({ user: parsed });
        }
      } catch {
        // Ignore cache errors
      }

      // Validate token by fetching current user
      try {
        const user = await getCurrentUser();
        get().setUser(user);
        set({ isInitialized: true, isLoading: false });
      } catch (error) {
        // Token invalid or expired
        await clearStoredToken();
        await SecureStore.deleteItemAsync(USER_CACHE_KEY).catch(() => {});
        set({ user: null, token: null, isInitialized: true, isLoading: false });
      }
    } catch (error) {
      set({
        error: 'Failed to initialize auth',
        isInitialized: true,
        isLoading: false,
      });
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true });
      await apiLogout();
      await SecureStore.deleteItemAsync(USER_CACHE_KEY).catch(() => {});
      set({ user: null, token: null, isLoading: false, error: null });
    } catch {
      // Still clear local state even if API call fails
      await clearStoredToken();
      await SecureStore.deleteItemAsync(USER_CACHE_KEY).catch(() => {});
      set({ user: null, token: null, isLoading: false, error: null });
    }
  },

  refreshUser: async () => {
    try {
      const user = await getCurrentUser();
      get().setUser(user);
    } catch {
      // If refresh fails, user may need to re-login
      set({ error: 'Failed to refresh user data' });
    }
  },
}));

// Selectors for optimal re-renders
export const useUser = () => useAuthStore((s) => s.user);
export const useToken = () => useAuthStore((s) => s.token);
export const useIsAuthenticated = () => useAuthStore((s) => !!s.user && !!s.token);
export const useIsLoading = () => useAuthStore((s) => s.isLoading);
export const useIsInitialized = () => useAuthStore((s) => s.isInitialized);
export const useAuthError = () => useAuthStore((s) => s.error);
export const useOnboardingCompleted = () => useAuthStore((s) => s.user?.onboardingCompleted ?? false);

// Setup 401 handler - called when API returns unauthorized
export function setupUnauthorizedHandler() {
  setUnauthorizedHandler(() => {
    if (isHandling401) return;
    isHandling401 = true;

    // Clear auth state
    SecureStore.deleteItemAsync(USER_CACHE_KEY).catch(() => {});
    useAuthStore.setState({ user: null, token: null, error: 'Session expired. Please log in again.' });

    // Reset flag after a short delay
    setTimeout(() => {
      isHandling401 = false;
    }, 1000);
  });
}
