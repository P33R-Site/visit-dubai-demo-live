"use client";

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Mail, Lock, User, AlertCircle } from 'lucide-react';

interface AuthPageProps {
    type: 'login' | 'register';
}

export const AuthPage: React.FC<AuthPageProps> = ({ type }) => {
    const { login } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const from = searchParams.get('from') || '/dashboard';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 800));

            if (!email || !password) {
                throw new Error('Please fill in all fields');
            }

            if (type === 'register' && !name) {
                throw new Error('Please enter your name');
            }

            login(email, name || 'Lumina Member');
            router.replace(from);
        } catch (err: any) {
            setError(err.message || 'Authentication failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-bg flex relative overflow-hidden">
            {/* Static Background Pattern */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[80vw] h-[80vw] bg-primary/[0.02] rounded-full blur-[120px]" />
                <div className="absolute bottom-[0%] left-[0%] w-[60vw] h-[60vw] bg-white/[0.01] rounded-full blur-[100px]" />
            </div>

            {/* Left Panel - Visual */}
            <div className="hidden lg:flex w-1/2 flex-col justify-between items-center text-center p-16 relative z-10 border-r border-border-subtle bg-surface-50">
                <Link href="/" className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors group w-fit">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium tracking-wide">Back to Sanctuary</span>
                </Link>

                <div>
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <span className="h-[1px] w-12 bg-primary"></span>
                        <span className="text-xs font-bold tracking-[0.3em] uppercase text-primary">
                            {type === 'login' ? 'Welcome Back' : 'Begin Application'}
                        </span>
                        <span className="h-[1px] w-12 bg-primary"></span>
                    </div>

                    <h1 className="font-serif text-7xl text-text-primary leading-[0.9] mb-8">
                        {type === 'login' ? 'Return to' : 'Join the'} <br />
                        <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-primary via-text-primary to-primary-soft">
                            Excellence.
                        </span>
                    </h1>

                    <p className="text-text-secondary max-w-md font-light leading-relaxed text-lg mx-auto">
                        {type === 'login'
                            ? 'Access your curated itinerary, personal concierge, and exclusive member benefits.'
                            : 'Step into a world where your desires are anticipated before they are spoken.'}
                    </p>
                </div>

                <div className="text-text-muted text-xs font-light tracking-widest uppercase">
                    © 2025 Lumina Concierge
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">
                <div className="max-w-[420px] w-full">

                    {/* Mobile Back Button */}
                    <Link href="/" className="lg:hidden flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8">
                        <ArrowLeft className="w-5 h-5" />
                        Back
                    </Link>

                    {/* Standard Glass Card */}
                    <div className="glass-card p-8 md:p-10 rounded-3xl border border-border-subtle shadow-2xl relative overflow-hidden">

                        {/* Form Header */}
                        <div className="text-center mb-8">
                            <h2 className="font-serif text-3xl text-text-primary mb-2">
                                {type === 'login' ? 'Member Access' : 'Apply for Membership'}
                            </h2>
                            <p className="text-text-secondary text-sm">
                                {type === 'login' ? 'Enter your credentials to continue' : 'Begin your journey with us'}
                            </p>
                        </div>

                        {/* Social Login with proper SVGs */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <button className="flex items-center justify-center gap-3 bg-surface-100 hover:bg-surface-200 border border-border-subtle rounded-xl py-3 transition-all text-sm text-text-primary font-medium group">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Google
                            </button>
                            <button className="flex items-center justify-center gap-3 bg-surface-100 hover:bg-surface-200 border border-border-subtle rounded-xl py-3 transition-all text-sm text-text-primary font-medium group">
                                <svg className="w-5 h-5 fill-text-primary/80 group-hover:fill-text-primary transition-colors" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74s2.57-.99 3.87-.84c1.61.18 3.47.52 4.02 2.65-.05.02-2.48 1.48-2.42 4.41.05 2.92 2.65 4.19 2.63 4.2-.67 1.95-1.7 3.93-3.18 5.41zm-2.06-14.88c.9.06 1.77-.38 2.24-1.05.7-.93.68-2.6-.08-3.51-.83-.88-2.46-1.1-2.93-.16-.54.91-.4 2.84.77 4.72z" />
                                </svg>
                                Apple
                            </button>
                        </div>

                        <div className="relative mb-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border-subtle"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase tracking-widest">
                                <span className="px-4 text-text-muted bg-surface">Or continue with</span>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-200 text-sm">
                                <AlertCircle className="w-4 h-4 text-red-400" />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {type === 'register' && (
                                <div className="space-y-2 group">
                                    <label className="text-xs font-medium text-text-secondary uppercase tracking-widest pl-1 group-focus-within:text-primary transition-colors">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-surface-100 border border-border-subtle rounded-xl px-12 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:bg-surface-200 transition-all font-light"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2 group">
                                <label className="text-xs font-medium text-text-secondary uppercase tracking-widest pl-1 group-focus-within:text-primary transition-colors">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-surface-100 border border-border-subtle rounded-xl px-12 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:bg-surface-200 transition-all font-light"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 group">
                                <label className="text-xs font-medium text-text-secondary uppercase tracking-widest pl-1 group-focus-within:text-primary transition-colors">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-surface-100 border border-border-subtle rounded-xl px-12 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:bg-surface-200 transition-all font-light"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <button
                                disabled={isLoading}
                                className="w-full bg-primary text-text-on-primary font-bold tracking-wide py-4 rounded-xl hover:bg-text-primary hover:text-bg transition-all mt-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_-10px_rgba(212,175,55,0.3)]"
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-surface/30 border-t-surface rounded-full animate-spin" />
                                        <span>Processing...</span>
                                    </div>
                                ) : (
                                    <>
                                        {type === 'login' ? 'Sign In' : 'Submit Application'}
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Footer Switch */}
                        <div className="mt-8 pt-6 border-t border-border-subtle text-center">
                            <p className="text-text-secondary text-sm">
                                {type === 'login' ? "Don't have an account? " : "Already a member? "}
                                <Link
                                    href={type === 'login' ? '/register' : '/login'}
                                    className="text-primary hover:text-text-primary transition-colors ml-1 font-medium"
                                >
                                    {type === 'login' ? 'Apply Now' : 'Sign In'}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
