"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, ArrowRight, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface ChangePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose }) => {
    const { changePassword, isLoading, error, clearError } = useAuth();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [localError, setLocalError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError(null);
        clearError();

        // Validation
        if (!currentPassword.trim()) {
            setLocalError('Please enter your current password');
            return;
        }
        if (!newPassword.trim()) {
            setLocalError('Please enter a new password');
            return;
        }
        if (newPassword.length < 8) {
            setLocalError('New password must be at least 8 characters');
            return;
        }
        if (newPassword !== confirmPassword) {
            setLocalError('Passwords do not match');
            return;
        }

        try {
            await changePassword(currentPassword, newPassword);
            setSuccess(true);
            // Clear fields
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch {
            // Error is already set in AuthContext
        }
    };

    const handleClose = () => {
        setLocalError(null);
        setSuccess(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        clearError();
        onClose();
    };

    const displayError = localError || error;

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
                        onClick={handleClose}
                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-alt dark:bg-white/5 flex items-center justify-center text-text-muted dark:text-white/40 hover:text-text-primary dark:hover:text-white hover:bg-surface-200 dark:hover:bg-white/10 transition-colors z-10"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-serif text-text-primary dark:text-white mb-2">
                                Change Password
                            </h2>
                            <p className="text-text-secondary dark:text-white/60 text-sm">
                                Enter your current password and choose a new one.
                            </p>
                        </div>

                        {success ? (
                            <div className="text-center py-6">
                                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-8 h-8 text-green-400" />
                                </div>
                                <p className="text-text-primary dark:text-white mb-2">Password Changed!</p>
                                <p className="text-text-secondary dark:text-white/60 text-sm mb-6">
                                    Your password has been successfully updated.
                                </p>
                                <button
                                    onClick={handleClose}
                                    className="text-primary text-sm hover:underline"
                                >
                                    Done
                                </button>
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
                                    <div className="space-y-2">
                                        <label className="text-xs text-text-secondary dark:text-white/60 uppercase tracking-wider">Current Password</label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted dark:text-white/40" />
                                            <input
                                                type="password"
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                                placeholder="••••••••"
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
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                placeholder="••••••••"
                                                disabled={isLoading}
                                                className="w-full bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-text-primary dark:text-white placeholder-text-muted dark:placeholder-white/20 focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
                                            />
                                        </div>
                                        <p className="text-xs text-text-muted dark:text-white/40">Minimum 8 characters</p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs text-text-secondary dark:text-white/60 uppercase tracking-wider">Confirm Password</label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted dark:text-white/40" />
                                            <input
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="••••••••"
                                                disabled={isLoading}
                                                className="w-full bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-text-primary dark:text-white placeholder-text-muted dark:placeholder-white/20 focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-primary text-surface py-4 rounded-xl font-medium text-sm hover:bg-primary-soft transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Changing...
                                            </>
                                        ) : (
                                            <>
                                                Change Password <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
