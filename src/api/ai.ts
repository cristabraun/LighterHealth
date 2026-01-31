// AI Coach API
import { get, post } from './client';
import type {
  AiLimitResponse,
  AskQuestionRequest,
  AskQuestionResponse,
  AiInsightRequest,
  AiInsightResponse,
} from './types';

/**
 * GET /api/ai/limit
 * Get current AI usage limit status
 */
export async function getAiLimit(): Promise<AiLimitResponse> {
  return get<AiLimitResponse>('/api/ai/limit');
}

/**
 * POST /api/ask
 * Ask the AI coach a question
 */
export async function askQuestion(data: AskQuestionRequest): Promise<AskQuestionResponse> {
  return post<AskQuestionResponse>('/api/ask', data);
}

/**
 * POST /api/ai/insight
 * Get AI insight for an experiment
 * Note: This endpoint doesn't require auth per contract
 */
export async function getExperimentInsight(data: AiInsightRequest): Promise<AiInsightResponse> {
  return post<AiInsightResponse>('/api/ai/insight', data, false);
}
