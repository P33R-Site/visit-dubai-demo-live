"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, X, ArrowRight, Check } from 'lucide-react';
import { useVal8 } from './Val8Context';
import { useAuth } from '@/contexts/AuthContext';

export const ExitModal: React.FC = () => {
    const { showExitModal, setShowExitModal, setIsExpanded, setShowLoginModal } = useVal8();
    const { user } = useAuth();

    if (!showExitModal) return null;

    const handleExit = () => {
        setShowExitModal(false);
        setIsExpanded(false);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 flex items-center justify-center bg-surface/80 dark:bg-black/60 backdrop-blur-sm p-6"
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="w-full max-w-md glass-card p-6 shadow-2xl relative overflow-hidden bg-surface dark:bg-black/80"
                >
                    {/* Background Gradient */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -mr-16 -mt-16" />

                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-full bg-surface-alt dark:bg-white/5 flex items-center justify-center mb-4 border border-border-subtle dark:border-white/5">
                            <Save className="w-6 h-6 text-primary" />
                        </div>

                        {user ? (
                            <>
                                {/* Logged in user - simple confirmation */}
                                <h3 className="text-xl font-serif text-text-primary dark:text-white mb-2">Close chat?</h3>
                                <p className="text-text-secondary dark:text-white/60 text-sm mb-6 leading-relaxed">
                                    Your progress is automatically saved to your account.
                                </p>

                                <div className="space-y-3">
                                    <button
                                        onClick={handleExit}
                                        className="w-full bg-primary text-surface py-3 rounded-xl font-medium text-sm hover:bg-primary-soft transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2"
                                    >
                                        <Check className="w-4 h-4" /> Close Chat
                                    </button>

                                    <button
                                        onClick={() => setShowExitModal(false)}
                                        className="w-full py-3 rounded-xl border border-border-subtle dark:border-white/10 text-text-muted dark:text-white/60 text-sm hover:bg-surface-alt dark:hover:bg-white/5 hover:text-text-primary dark:hover:text-white transition-colors"
                                    >
                                        Continue chatting
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Not logged in - prompt to create account */}
                                <h3 className="text-xl font-serif text-text-primary dark:text-white mb-2">Save your trip?</h3>
                                <p className="text-text-secondary dark:text-white/60 text-sm mb-6 leading-relaxed">
                                    Would you like to save your progress and access this itinerary later?
                                </p>

                                <div className="space-y-3">
                                    <button
                                        onClick={() => {
                                            setShowExitModal(false);
                                            setShowLoginModal(true);
                                        }}
                                        className="w-full bg-primary text-surface py-3 rounded-xl font-medium text-sm hover:bg-primary-soft transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2"
                                    >
                                        Create Account to Save <ArrowRight className="w-4 h-4" />
                                    </button>

                                    <button
                                        onClick={handleExit}
                                        className="w-full py-3 rounded-xl border border-border-subtle dark:border-white/10 text-text-muted dark:text-white/60 text-sm hover:bg-surface-alt dark:hover:bg-white/5 hover:text-text-primary dark:hover:text-white transition-colors"
                                    >
                                        No thanks, just close
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
