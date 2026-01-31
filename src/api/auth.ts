// Auth API - POST /api/auth/token for mobile token auth
import { get, post, setStoredToken, clearStoredToken } from './client';
import type {
  User,
  TokenRequest,
  TokenResponse,
  RegisterRequest,
  PasswordResetRequest,
  PasswordResetConfirm,
  OnboardingRequest,
  IsAdminResponse,
  ApiSuccessResponse,
} from './types';

/**
 * POST /api/auth/token
 * Mobile-specific endpoint that returns JWT in JSON body
 */
export async function loginWithToken(credentials: TokenRequest): Promise<TokenResponse> {
  const response = await post<TokenResponse>('/api/auth/token', credentials, false);
  // Store the token for future requests
  await setStoredToken(response.token);
  return response;
}

/**
 * POST /api/auth/register
 * Note: This returns user only. For mobile, call loginWithToken after registration.
 */
export async function register(data: RegisterRequest): Promise<User> {
  return post<User>('/api/auth/register', data, false);
}

/**
 * Register and get token in one flow for mobile
 */
export async function registerAndGetToken(data: RegisterRequest): Promise<TokenResponse> {
  // First register
  await register(data);
  // Then get token
  return loginWithToken({ email: data.email, password: data.password });
}

/**
 * GET /api/auth/user
 * Returns current authenticated user
 */
export async function getCurrentUser(): Promise<User> {
  return get<User>('/api/auth/user');
}

/**
 * GET /api/logout
 * Clear token locally (server clears cookie if any)
 */
export async function logout(): Promise<void> {
  try {
    await get<ApiSuccessResponse>('/api/logout', true);
  } catch {
    // Ignore errors - we're logging out anyway
  }
  await clearStoredToken();
}

/**
 * POST /api/auth/request-password-reset
 */
export async function requestPasswordReset(data: PasswordResetRequest): Promise<{ message: string }> {
  return post<{ message: string }>('/api/auth/request-password-reset', data, false);
}

/**
 * POST /api/auth/reset-password
 */
export async function resetPassword(data: PasswordResetConfirm): Promise<{ message: string }> {
  return post<{ message: string }>('/api/auth/reset-password', data, false);
}

/**
 * POST /api/user/onboarding
 */
export async function completeOnboarding(data: OnboardingRequest): Promise<User> {
  return post<User>('/api/user/onboarding', data);
}

/**
 * GET /api/auth/is-admin
 */
export async function checkIsAdmin(): Promise<IsAdminResponse> {
  return get<IsAdminResponse>('/api/auth/is-admin');
}

/**
 * DELETE /api/account
 */
export async function deleteAccount(): Promise<ApiSuccessResponse> {
  const { del } = await import('./client');
  const result = await del<ApiSuccessResponse>('/api/account');
  await clearStoredToken();
  return result;
}
