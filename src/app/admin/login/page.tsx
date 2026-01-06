"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Logo } from '@/components/ui/Logo';
import { ShieldAlert, KeyRound, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        // For demo purposes, use hardcoded admin credentials
        // In production, this would use the backend auth
        if (email === 'admin' && password === 'admin') {
            try {
                await login('admin@lumina.so', 'adminpass123');
                router.push('/admin');
            } catch {
                // If backend login fails, show error
                setError('Backend authentication failed. Please ensure the backend is running.');
                setIsSubmitting(false);
            }
        } else {
            setError('Invalid credentials or insufficient clearance.');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-bg flex items-center justify-center relative overflow-hidden font-sans selection:bg-primary/30">
            {/* Ambient Background */}
            <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-primary/[0.05] rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-white/[0.02] rounded-full blur-[100px]" />
            <div className="absolute inset-0 bg-noise opacity-[0.03]" />

            <div className="w-full max-w-md relative z-10 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center mb-10"
                >
                    <Logo className="mb-6 scale-125" />
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.05] backdrop-blur-md">
                        <ShieldAlert className="w-3 h-3 text-primary" />
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-light">Secure Gateway</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="glass-card p-8 rounded-3xl border border-white/[0.05] shadow-2xl shadow-black/50"
                >
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/30 ml-1">Admin Identity</label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3.5 text-white placeholder-white/10 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all duration-300"
                                placeholder="Enter ID"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/30 ml-1">Security Key</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3.5 text-white placeholder-white/10 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all duration-300"
                                placeholder="Enter Phrase"
                            />
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-light"
                            >
                                {error}
                            </motion.div>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-white text-black hover:bg-white/90 rounded-xl py-4"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            ) : (
                                <span className="flex items-center gap-2 text-sm font-medium tracking-wide">
                                    Authenticate <ArrowRight className="w-4 h-4 ml-1" />
                                </span>
                            )}
                        </Button>
                    </form>
                </motion.div>

                <div className="mt-8 text-center">
                    <p className="text-white/20 text-[10px] uppercase tracking-widest font-light">
                        Protected by Lumina Sentinel™
                    </p>
                </div>
            </div>
        </div>
    );
}
