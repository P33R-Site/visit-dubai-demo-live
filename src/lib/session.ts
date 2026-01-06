/**
 * Session management service
 */

import { post, get } from './api';
import { SessionResponse } from './types';

// Session ID storage key
const SESSION_ID_KEY = 'val8_session_id';

/**
 * Get stored session ID
 */
export function getSessionId(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(SESSION_ID_KEY);
}

/**
 * Store session ID
 */
export function setSessionId(sessionId: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(SESSION_ID_KEY, sessionId);
}

/**
 * Clear stored session ID
 */
export function clearSessionId(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(SESSION_ID_KEY);
}

/**
 * Create a new session
 * Returns the session ID
 */
export async function createSession(): Promise<SessionResponse> {
    const response = await post<SessionResponse>('/session');
    setSessionId(response.session_id);
    return response;
}

/**
 * Get session state by ID
 */
export async function getSession(sessionId: string): Promise<SessionResponse> {
    return get<SessionResponse>(`/session/${sessionId}`);
}

/**
 * Get or create session
 * Returns existing session if available, creates new one otherwise
 */
export async function getOrCreateSession(): Promise<SessionResponse> {
    const existingSessionId = getSessionId();

    if (existingSessionId) {
        try {
            return await getSession(existingSessionId);
        } catch {
            // Session doesn't exist on server, create new one
            clearSessionId();
        }
    }

    return createSession();
}

/**
 * Generate a temporary session ID for anonymous users
 * This is used when the backend is not available
 */
export function generateTempSessionId(): string {
    return `temp_${Math.random().toString(36).substring(2, 15)}`;
}
