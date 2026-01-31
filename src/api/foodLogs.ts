// Food Logs API
import { get, post, del } from './client';
import type { FoodLog, CreateFoodLogRequest, ApiSuccessResponse } from './types';

/**
 * GET /api/food-logs
 * Returns all food logs, optionally filtered by date
 */
export async function getAllFoodLogs(date?: string): Promise<FoodLog[]> {
  const endpoint = date ? `/api/food-logs?date=${date}` : '/api/food-logs';
  return get<FoodLog[]>(endpoint);
}

/**
 * GET /api/food-logs/:date
 * Returns food logs for a specific date (YYYY-MM-DD)
 */
export async function getFoodLogsByDate(date: string): Promise<FoodLog[]> {
  return get<FoodLog[]>(`/api/food-logs/${date}`);
}

/**
 * POST /api/food-logs
 * Create a new food log entry
 */
export async function createFoodLog(data: CreateFoodLogRequest): Promise<FoodLog> {
  return post<FoodLog>('/api/food-logs', data);
}

/**
 * DELETE /api/food-logs/:id
 * Delete a food log entry
 */
export async function deleteFoodLog(id: string): Promise<ApiSuccessResponse> {
  return del<ApiSuccessResponse>(`/api/food-logs/${id}`);
}
