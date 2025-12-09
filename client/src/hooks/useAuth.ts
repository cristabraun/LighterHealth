import { useQuery } from "@tanstack/react-query";
import type { User } from "@shared/schema";

// Custom query function that returns null on 401 (unauthenticated)
// instead of throwing, which allows proper session checking
async function fetchUser(): Promise<User | null> {
  const res = await fetch("/api/auth/user", {
    credentials: "include",
  });

  // Return null for 401 (not logged in) - this is expected behavior
  if (res.status === 401) {
    return null;
  }

  // For other errors, return null to avoid breaking the app
  // The user will just be treated as logged out
  if (!res.ok) {
    console.warn(`Auth check failed with status ${res.status}`);
    return null;
  }

  return res.json();
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
