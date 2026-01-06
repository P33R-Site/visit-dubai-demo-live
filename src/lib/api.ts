/**
 * Base API client with automatic token handling and error management
 */

import { Token } from './types';

// Configuration from environment
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_PREFIX = process.env.NEXT_PUBLIC_API_PREFIX || '/api/v1';

const BASE_URL = `${API_URL}${API_PREFIX}`;

// Token storage keys
const ACCESS_TOKEN_KEY = 'val8_access_token';
const REFRESH_TOKEN_KEY = 'val8_refresh_token';

/**
 * Get stored access token
 */
export function getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

/**
 * Get stored refresh token
 */
export function getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
}

/**
 * Store tokens in localStorage
 */
export function setTokens(tokens: Token): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access_token);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh_token);
}

/**
 * Clear stored tokens
 */
export function clearTokens(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
}

/**
 * Check if user has valid tokens stored
 */
export function hasStoredTokens(): boolean {
    return !!getAccessToken();
}

/**
 * API Error class for better error handling
 */
export class ApiError extends Error {
    status: number;
    detail: string;

    constructor(status: number, detail: string) {
        super(detail);
        this.status = status;
        this.detail = detail;
        this.name = 'ApiError';
    }
}

/**
 * Refresh the access token using the refresh token
 */
async function refreshAccessToken(): Promise<Token | null> {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return null;

    try {
        const response = await fetch(`${BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (!response.ok) {
            clearTokens();
            return null;
        }

        const tokens: Token = await response.json();
        setTokens(tokens);
        return tokens;
    } catch {
        clearTokens();
        return null;
    }
}

/**
 * Make an API request with automatic token handling
 */
export async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string> || {}),
    };

    // Add auth header if we have a token
    const accessToken = getAccessToken();
    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    let response = await fetch(url, {
        ...options,
        headers,
    });

    // If 401, try to refresh token and retry
    if (response.status === 401 && accessToken) {
        const newTokens = await refreshAccessToken();
        if (newTokens) {
            headers['Authorization'] = `Bearer ${newTokens.access_token}`;
            response = await fetch(url, {
                ...options,
                headers,
            });
        }
    }

    if (!response.ok) {
        let detail = 'An error occurred';
        try {
            const errorData = await response.json();
            detail = errorData.detail || detail;
        } catch {
            // Response wasn't JSON
        }
        throw new ApiError(response.status, detail);
    }

    return response.json();
}

/**
 * Make GET request
 */
export async function get<T>(endpoint: string): Promise<T> {
    return apiRequest<T>(endpoint, { method: 'GET' });
}

/**
 * Make POST request
 */
export async function post<T>(endpoint: string, data?: unknown): Promise<T> {
    return apiRequest<T>(endpoint, {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
    });
}

/**
 * Get the full API URL for a given endpoint
 */
export function getApiUrl(endpoint: string): string {
    return `${BASE_URL}${endpoint}`;
}

/**
 * Get the WebSocket URL for a given endpoint
 */
export function getWsUrl(endpoint: string): string {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000';
    return `${wsUrl}${API_PREFIX}${endpoint}`;
}

/**
 * Health check
 */
export async function healthCheck(): Promise<{ status: string; service: string }> {
    const response = await fetch(`${API_URL}/health`);
    if (!response.ok) {
        throw new ApiError(response.status, 'Backend health check failed');
    }
    return response.json();
}
