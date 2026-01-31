// Lighter API Client - Bearer token auth for React Native
// No cookies - uses Authorization header with token from SecureStore

import * as SecureStore from 'expo-secure-store';
import type { ApiError } from './types';

const API_BASE_URL = 'https://getlighterapp.com';
const TOKEN_KEY = 'lighter_auth_token';

// Callback for 401 handling - set by auth store
let onUnauthorized: (() => void) | null = null;

export function setUnauthorizedHandler(handler: () => void) {
  onUnauthorized = handler;
}

// ============ TOKEN MANAGEMENT ============

export async function getStoredToken(): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch {
    return null;
  }
}

export async function setStoredToken(token: string): Promise<void> {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function clearStoredToken(): Promise<void> {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}

// ============ API CLIENT ============

export class ApiClientError extends Error {
  status: number;
  data: ApiError | null;

  constructor(status: number, message: string, data: ApiError | null = null) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.data = data;
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
  requiresAuth?: boolean;
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = 'GET', body, requiresAuth = true } = options;

  const headers: Record<string, string> = {};

  if (body) {
    headers['Content-Type'] = 'application/json';
  }

  if (requiresAuth) {
    const token = await getStoredToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const url = `${API_BASE_URL}${endpoint}`;

  console.log(`[API] ${method} ${url}`);

  let response: Response;
  try {
    response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (networkError) {
    console.log('[API] Network error:', networkError);
    throw new Error('Unable to connect to server. Please check your internet connection.');
  }

  console.log(`[API] Response status: ${response.status}`);

  // Handle empty responses (204, or empty body)
  const contentType = response.headers.get('content-type');
  let data: T | null = null;

  if (contentType?.includes('application/json')) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    // Handle 401 Unauthorized - clear token and trigger redirect
    if (response.status === 401 && requiresAuth && onUnauthorized) {
      await clearStoredToken();
      onUnauthorized();
    }

    const errorData = data as ApiError | null;
    throw new ApiClientError(
      response.status,
      errorData?.message ?? `Request failed with status ${response.status}`,
      errorData
    );
  }

  return data as T;
}

// ============ CONVENIENCE METHODS ============

export function get<T>(endpoint: string, requiresAuth = true): Promise<T> {
  return apiRequest<T>(endpoint, { method: 'GET', requiresAuth });
}

export function post<T>(endpoint: string, body?: unknown, requiresAuth = true): Promise<T> {
  return apiRequest<T>(endpoint, { method: 'POST', body, requiresAuth });
}

export function patch<T>(endpoint: string, body?: unknown, requiresAuth = true): Promise<T> {
  return apiRequest<T>(endpoint, { method: 'PATCH', body, requiresAuth });
}

export function del<T>(endpoint: string, requiresAuth = true): Promise<T> {
  return apiRequest<T>(endpoint, { method: 'DELETE', requiresAuth });
}
