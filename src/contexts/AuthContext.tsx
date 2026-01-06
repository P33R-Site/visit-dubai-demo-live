"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as authService from '@/lib/auth';
import * as sessionService from '@/lib/session';
import { hasStoredTokens, clearTokens } from '@/lib/api';
import { UserResponse } from '@/lib/types';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    isVerified: boolean;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    sessionId: string | null;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    requestPasswordReset: (email: string) => Promise<void>;
    resetPassword: (token: string, newPassword: string) => Promise<void>;
    changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
    logout: () => void;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Convert backend user response to frontend User type
 */
function mapUserResponse(response: UserResponse): User {
    return {
        id: response.id,
        name: response.name || response.email?.split('@')[0] || 'User',
        email: response.email || '',
        role: 'user',
        isVerified: response.is_verified,
    };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Initialize: check for existing session and tokens
    useEffect(() => {
        const initialize = async () => {
            setIsLoading(true);

            try {
                // Check if we have stored tokens and try to get current user
                if (hasStoredTokens()) {
                    try {
                        const userResponse = await authService.getCurrentUser();
                        setUser(mapUserResponse(userResponse));
                    } catch {
                        // Token invalid, clear it
                        clearTokens();
                    }
                }

                // Check for existing session
                const existingSessionId = sessionService.getSessionId();
                if (existingSessionId) {
                    setSessionId(existingSessionId);
                }
            } catch (err) {
                console.error('Error during auth initialization:', err);
            } finally {
                setIsLoading(false);
            }
        };

        initialize();
    }, []);

    /**
     * Login with email and password
     */
    const login = useCallback(async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);
        try {
            await authService.login({ email, password });
            const userResponse = await authService.getCurrentUser();
            setUser(mapUserResponse(userResponse));

            // Get or create session for the user
            const session = await sessionService.getOrCreateSession();
            setSessionId(session.session_id);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Login failed';
            setError(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    /**
     * Sign up with name, email and password
     */
    const signup = useCallback(async (name: string, email: string, password: string) => {
        setIsLoading(true);
        setError(null);
        try {
            await authService.signup({ name, email, password });
            // Auto-login after signup
            await login(email, password);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Signup failed';
            setError(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [login]);

    /**
     * Logout - clear tokens and user state
     */
    const logout = useCallback(() => {
        authService.logout();
        sessionService.clearSessionId();
        setUser(null);
        setSessionId(null);
        setError(null);
    }, []);

    /**
     * Clear error state
     */
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    /**
     * Request password reset
     */
    const requestPasswordReset = useCallback(async (email: string) => {
        setIsLoading(true);
        setError(null);
        try {
            await authService.requestPasswordReset(email);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Password reset request failed';
            setError(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    /**
     * Reset password with token
     */
    const resetPassword = useCallback(async (token: string, newPassword: string) => {
        setIsLoading(true);
        setError(null);
        try {
            await authService.resetPassword(token, newPassword);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Password reset failed';
            setError(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    /**
     * Change password for authenticated user
     */
    const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
        setIsLoading(true);
        setError(null);
        try {
            await authService.changePassword(currentPassword, newPassword);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Password change failed';
            setError(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            isLoading,
            sessionId,
            error,
            login,
            signup,
            requestPasswordReset,
            resetPassword,
            changePassword,
            logout,
            clearError,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
