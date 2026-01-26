import { useQuery } from "@tanstack/react-query";
import type { User } from "@shared/schema";

// Custom query function that returns null on 401 (unauthenticated)
// instead of throwing, which allows proper session checking
async function fetchUser(): Promise<User | null> {
  // Debug logging for auth troubleshooting on custom domains
  if (process.env.NODE_ENV === 'development' || window.location.hostname !== 'localhost') {
    console.log('[Auth Debug] Fetching user from:', window.location.origin + '/api/auth/user');
  }
  
  const res = await fetch("/api/auth/user", {
    credentials: "include",
  });

  // Return null for 401 (not logged in) - this is expected behavior
  if (res.status === 401) {
    if (window.location.hostname !== 'localhost') {
      console.log('[Auth Debug] 401 response - user not authenticated');
    }
    return null;
  }

  // For other errors, return null to avoid breaking the app
  // The user will just be treated as logged out
  if (!res.ok) {
    console.warn(`[Auth Debug] Auth check failed with status ${res.status} on ${window.location.origin}`);
    return null;
  }

  const user = await res.json();
  if (window.location.hostname !== 'localhost') {
    console.log('[Auth Debug] User authenticated:', user?.email?.substring(0, 3) + '***');
  }
  return user;
}

export function useAuth() {
  const { data: user, isLoading, error } = useQuery<User | null>({
    queryKey: ["/api/auth/user"],
    queryFn: fetchUser,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes - recheck auth periodically
    refetchOnWindowFocus: true, // Check auth when user returns to tab
  });

  return {
    user: error ? null : user,
    isLoading,
    isAuthenticated: !!user && !error,
  };
}
