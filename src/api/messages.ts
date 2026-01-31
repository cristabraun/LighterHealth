// Messages API
import { get, post, patch } from './client';
import type { Message, CreateMessageRequest } from './types';

/**
 * GET /api/messages
 * Returns all messages for the authenticated user
 */
export async function getAllMessages(): Promise<Message[]> {
  return get<Message[]>('/api/messages');
}

/**
 * POST /api/messages
 * Send a new message
 */
export async function createMessage(data: CreateMessageRequest): Promise<Message> {
  return post<Message>('/api/messages', data);
}

/**
 * GET /api/admin/messages
 * Admin only - get all messages
 */
export async function getAdminMessages(): Promise<Message[]> {
  return get<Message[]>('/api/admin/messages');
}

/**
 * PATCH /api/admin/messages/:id
 * Admin only - respond to a message
 */
export async function respondToMessage(id: string, response: string): Promise<Message> {
  return patch<Message>(`/api/admin/messages/${id}`, { response });
}
