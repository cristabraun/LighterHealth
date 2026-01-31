// Experiments API
import { get, post, patch, del } from './client';
import type {
  ActiveExperiment,
  CreateExperimentRequest,
  ExperimentLogRequest,
  ExperimentTemplateId,
  ApiSuccessResponse,
} from './types';

/**
 * GET /api/experiments
 * Returns all experiments for the authenticated user
 */
export async function getAllExperiments(): Promise<ActiveExperiment[]> {
  return get<ActiveExperiment[]>('/api/experiments');
}

/**
 * POST /api/experiments
 * Start a new experiment
 */
export async function createExperiment(data: CreateExperimentRequest): Promise<ActiveExperiment> {
  return post<ActiveExperiment>('/api/experiments', data);
}

/**
 * GET /api/experiments/by-template/:experimentId
 * Get active experiment by template ID
 */
export async function getExperimentByTemplate(templateId: ExperimentTemplateId): Promise<ActiveExperiment> {
  return get<ActiveExperiment>(`/api/experiments/by-template/${templateId}`);
}

/**
 * POST /api/experiments/:experimentId/log
 * Add a log entry to an experiment (uses template ID)
 */
export async function addExperimentLog(
  templateId: ExperimentTemplateId,
  data: ExperimentLogRequest
): Promise<ActiveExperiment> {
  return post<ActiveExperiment>(`/api/experiments/${templateId}/log`, data);
}

/**
 * POST /api/experiments/:experimentId/complete
 * Mark an experiment as complete (uses template ID)
 */
export async function completeExperiment(templateId: ExperimentTemplateId): Promise<ActiveExperiment> {
  return post<ActiveExperiment>(`/api/experiments/${templateId}/complete`, undefined);
}

/**
 * PATCH /api/experiments/:id
 * Update an experiment (uses database UUID)
 */
export async function updateExperiment(
  id: string,
  data: Partial<ActiveExperiment>
): Promise<ActiveExperiment> {
  return patch<ActiveExperiment>(`/api/experiments/${id}`, data);
}

/**
 * DELETE /api/experiments/:id
 * Delete an experiment (uses database UUID)
 */
export async function deleteExperiment(id: string): Promise<ApiSuccessResponse> {
  return del<ApiSuccessResponse>(`/api/experiments/${id}`);
}
