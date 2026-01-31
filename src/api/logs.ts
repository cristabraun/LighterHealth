// Daily Logs API
import { get, post, patch } from './client';
import type { DailyLog, CreateLogRequest, UpdateChecklistRequest } from './types';

/**
 * GET /api/logs
 * Returns all logs for the authenticated user
 */
export async function getAllLogs(): Promise<DailyLog[]> {
  return get<DailyLog[]>('/api/logs');
}

/**
 * GET /api/logs/:date
 * Returns log for a specific date (YYYY-MM-DD)
 */
export async function getLogByDate(date: string): Promise<DailyLog> {
  return get<DailyLog>(`/api/logs/${date}`);
}

/**
 * POST /api/logs
 * Create or update a daily log
 */
export async function createOrUpdateLog(data: CreateLogRequest): Promise<DailyLog> {
  return post<DailyLog>('/api/logs', data);
}

/**
 * PATCH /api/logs/:date/checklist
 * Update only the checklist for a specific date
 */
export async function updateChecklist(date: string, data: UpdateChecklistRequest): Promise<DailyLog> {
  return patch<DailyLog>(`/api/logs/${date}/checklist`, data);
}
