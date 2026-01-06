/**
 * Authentication service for signup, login, and token management
 */

import { post, setTokens, clearTokens, getAccessToken, get } from './api';
import { Token, UserResponse, UserSignup, UserLogin } from './types';

/**
 * Sign up a new user
 */
export async function signup(data: UserSignup): Promise<UserResponse> {
    return post<UserResponse>('/auth/signup', data);
}

/**
 * Login and get tokens
 */
export async function login(data: UserLogin): Promise<Token> {
    const tokens = await post<Token>('/auth/login', data);
    setTokens(tokens);
    return tokens;
}

/**
 * Get current user info
 */
export async function getCurrentUser(): Promise<UserResponse> {
    return get<UserResponse>('/auth/me');
}

/**
 * Logout - clear tokens
 */
export function logout(): void {
    clearTokens();
}

/**
 * Check if user is authenticated (has valid token)
 */
export function isAuthenticated(): boolean {
    return !!getAccessToken();
}

/**
 * Request password reset
 */
export async function requestPasswordReset(email: string): Promise<{ message: string }> {
    return post<{ message: string }>('/auth/password-reset-request', { email });
}

/**
 * Reset password with token
 */
export async function resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    return post<{ message: string }>('/auth/password-reset', {
        token,
        new_password: newPassword,
    });
}

/**
 * Change password (for authenticated users)
 */
export async function changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
    return post<{ message: string }>('/auth/change-password', {
        current_password: currentPassword,
        new_password: newPassword,
    });
}
