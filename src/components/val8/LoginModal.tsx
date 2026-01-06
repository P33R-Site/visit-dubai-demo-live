"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, ArrowRight, Loader2, AlertCircle, CheckCircle, Key, User } from 'lucide-react';
import { useVal8 } from './Val8Context';
import { useAuth } from '@/contexts/AuthContext';

type AuthMode = 'login' | 'signup' | 'forgot' | 'reset';

export const LoginModal: React.FC = () => {
    const { showLoginModal, setShowLoginModal, setView } = useVal8();
    const { login, signup, requestPasswordReset, resetPassword, isLoading, error, clearError } = useAuth();

    const [mode, setMode] = useState<AuthMode>('login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [localError, setLocalError] = useState<string | null>(null);
    const [resetSuccess, setResetSuccess] = useState(false);
    const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);

    if (!showLoginModal) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError(null);
        clearError();

        if (mode === 'forgot') {
            if (!email.trim()) {
                setLocalError('Please enter your email');
                return;
            }
            try {
                await requestPasswordReset(email);
                setResetSuccess(true);
            } catch {
                // Error is already set in AuthContext
            }
            return;
        }

        if (mode === 'reset') {
            if (!token.trim()) {
                setLocalError('Please enter the reset token');
                return;
            }
            if (!password.trim() || password.length < 8) {
                setLocalError('Password must be at least 8 characters');
                return;
            }
            try {
                await resetPassword(token, password);
                setPasswordResetSuccess(true);
            } catch {
                // Error is already set in AuthContext
            }
            return;
        }

        // Login or Signup
        if (mode === 'signup' && !name.trim()) {
            setLocalError('Please enter your name');
            return;
        }
        if (!email.trim()) {
            setLocalError('Please enter your email');
            return;
        }
        if (!password.trim()) {
            setLocalError('Please enter your password');
            return;
        }
        if (password.length < 8) {
            setLocalError('Password must be at least 8 characters');
            return;
        }

        try {
            if (mode === 'signup') {
                await signup(name, email, password);
            } else {
                await login(email, password);
            }
            // Success - close modal and go to dashboard
            setShowLoginModal(false);
            setView('dashboard');
        } catch {
            // Error is already set in AuthContext
        }
    };

    const switchMode = (newMode: AuthMode) => {
        setMode(newMode);
        setName('');
        setLocalError(null);
        setResetSuccess(false);
        setPasswordResetSuccess(false);
        clearError();
    };

    const displayError = localError || error;

    const getTitle = () => {
        if (mode === 'reset') return 'Set New Password';
        if (mode === 'forgot') return 'Reset Password';
        if (mode === 'signup') return 'Create Account';
        return 'Welcome Back';
    };

    const getSubtitle = () => {
        if (mode === 'reset') return 'Enter the token from your email and set a new password.';
        if (mode === 'forgot') return "Enter your email and we'll send you a reset link.";
        if (mode === 'signup') return 'Sign up to start planning your trip.';
        return 'Sign in to access your dashboard.';
    };

    return (
        <AnimatePresence>
            <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-surface/80 dark:bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full max-w-sm glass-card shadow-2xl relative overflow-hidden bg-surface dark:bg-black/80"
                >
                    <button
                        onClick={() => setShowLoginModal(false)}
                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-alt dark:bg-white/5 flex items-center justify-center text-text-muted dark:text-white/40 hover:text-text-primary dark:hover:text-white hover:bg-surface-200 dark:hover:bg-white/10 transition-colors z-10"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-serif text-text-primary dark:text-white mb-2">
                                {getTitle()}
                            </h2>
                            <p className="text-text-secondary dark:text-white/60 text-sm">
                                {getSubtitle()}
                            </p>
                        </div>

                        {passwordResetSuccess ? (
                            <div className="text-center py-6">
                                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-8 h-8 text-green-400" />
                                </div>
                                <p className="text-text-primary dark:text-white mb-2">Password Reset Successfully!</p>
                                <p className="text-text-secondary dark:text-white/60 text-sm mb-6">
                                    You can now sign in with your new password.
                                </p>
                                <button
                                    onClick={() => switchMode('login')}
                                    className="text-primary text-sm hover:underline"
                                >
                                    Sign In
                                </button>
                            </div>
                        ) : resetSuccess ? (
                            <div className="text-center py-6">
                                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-8 h-8 text-green-400" />
                                </div>
                                <p className="text-text-primary dark:text-white mb-2">Check your email</p>
                                <p className="text-text-secondary dark:text-white/60 text-sm mb-4">
                                    If the email exists, we&apos;ve sent password reset instructions.
                                </p>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => switchMode('reset')}
                                        className="text-primary text-sm hover:underline block mx-auto"
                                    >
                                        I have a reset token
                                    </button>
                                    <button
                                        onClick={() => switchMode('login')}
                                        className="text-text-muted text-xs hover:text-primary transition-colors block mx-auto"
                                    >
                                        Back to Sign In
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                {displayError && (
                                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-400 text-sm">
                                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                        <span>{displayError}</span>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {mode === 'reset' ? (
                                        <>
                                            <div className="space-y-2">
                                                <label className="text-xs text-text-secondary dark:text-white/60 uppercase tracking-wider">Reset Token</label>
                                                <div className="relative">
                                                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted dark:text-white/40" />
                                                    <input
                                                        type="text"
                                                        value={token}
                                                        onChange={(e) => setToken(e.target.value)}
                                                        placeholder="Paste token from email"
                                                        disabled={isLoading}
                                                        className="w-full bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-text-primary dark:text-white placeholder-text-muted dark:placeholder-white/20 focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs text-text-secondary dark:text-white/60 uppercase tracking-wider">New Password</label>
                                                <div className="relative">
                                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted dark:text-white/40" />
                                                    <input
                                                        type="password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        placeholder="••••••••"
                                                        disabled={isLoading}
                                                        className="w-full bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-text-primary dark:text-white placeholder-text-muted dark:placeholder-white/20 focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
                                                    />
                                                </div>
                                                <p className="text-xs text-text-muted dark:text-white/40">Minimum 8 characters</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {mode === 'signup' && (
                                                <div className="space-y-2">
                                                    <label className="text-xs text-text-secondary dark:text-white/60 uppercase tracking-wider">Full Name</label>
                                                    <div className="relative">
                                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted dark:text-white/40" />
                                                        <input
                                                            type="text"
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                            placeholder="John Doe"
                                                            disabled={isLoading}
                                                            className="w-full bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-text-primary dark:text-white placeholder-text-muted dark:placeholder-white/20 focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            <div className="space-y-2">
                                                <label className="text-xs text-text-secondary dark:text-white/60 uppercase tracking-wider">Email</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted dark:text-white/40" />
                                                    <input
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="you@example.com"
                                                        disabled={isLoading}
                                                        className="w-full bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-text-primary dark:text-white placeholder-text-muted dark:placeholder-white/20 focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
                                                    />
                                                </div>
                                            </div>

                                            {mode !== 'forgot' && (
                                                <div className="space-y-2">
                                                    <label className="text-xs text-text-secondary dark:text-white/60 uppercase tracking-wider">Password</label>
                                                    <div className="relative">
                                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted dark:text-white/40" />
                                                        <input
                                                            type="password"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            placeholder="••••••••"
                                                            disabled={isLoading}
                                                            className="w-full bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-text-primary dark:text-white placeholder-text-muted dark:placeholder-white/20 focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
                                                        />
                                                    </div>
                                                    {mode === 'signup' && (
                                                        <p className="text-xs text-text-muted dark:text-white/40">Minimum 8 characters</p>
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-primary text-surface py-4 rounded-xl font-medium text-sm hover:bg-primary-soft transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                {mode === 'reset' ? 'Resetting...' : mode === 'forgot' ? 'Sending...' : mode === 'signup' ? 'Creating Account...' : 'Signing In...'}
                                            </>
                                        ) : (
                                            <>
                                                {mode === 'reset' ? 'Reset Password' : mode === 'forgot' ? 'Send Reset Link' : mode === 'signup' ? 'Create Account' : 'Sign In'} <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </form>

                                <div className="mt-6 text-center space-y-2">
                                    {mode === 'login' && (
                                        <button
                                            onClick={() => switchMode('forgot')}
                                            disabled={isLoading}
                                            className="block w-full text-xs text-text-muted dark:text-white/40 hover:text-primary transition-colors disabled:opacity-50"
                                        >
                                            Forgot your password?
                                        </button>
                                    )}
                                    {mode === 'forgot' && (
                                        <button
                                            onClick={() => switchMode('reset')}
                                            disabled={isLoading}
                                            className="block w-full text-xs text-text-muted dark:text-white/40 hover:text-primary transition-colors disabled:opacity-50"
                                        >
                                            I have a reset token
                                        </button>
                                    )}
                                    <button
                                        onClick={() => switchMode(mode === 'signup' ? 'login' : mode === 'forgot' || mode === 'reset' ? 'login' : 'signup')}
                                        disabled={isLoading}
                                        className="text-xs text-text-secondary dark:text-white/40 hover:text-primary transition-colors disabled:opacity-50"
                                    >
                                        {mode === 'signup' ? 'Already have an account? Sign In' : mode === 'forgot' || mode === 'reset' ? 'Back to Sign In' : "Don't have an account? Sign Up"}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
