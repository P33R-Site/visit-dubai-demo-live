"use client";

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, Lock, Smartphone, Globe, ChevronRight } from 'lucide-react';

const Toggle = ({ active, onToggle }: { active: boolean; onToggle: () => void }) => (
    <button
        onClick={onToggle}
        className={`w-14 h-8 rounded-full relative transition-all duration-500 border ${active ? 'bg-primary border-primary' : 'bg-transparent border-border-subtle dark:border-white/20'}`}
    >
        <div className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white dark:bg-white transition-all duration-500 shadow-md ${active ? 'translate-x-6' : 'translate-x-0'}`} />
    </button>
);

export default function SettingsPage() {
    const { user, logout } = useAuth();
    const [push, setPush] = useState(true);
    const [email, setEmail] = useState(true);

    return (
        <div className="max-w-3xl mx-auto space-y-16 pb-20">
            {/* Header */}
            <div className="text-center space-y-6">
                <div className="w-32 h-32 mx-auto rounded-full p-1 border border-border-subtle dark:border-white/10 relative group cursor-pointer">
                    <div className="w-full h-full rounded-full bg-surface-alt dark:bg-white/5 overflow-hidden relative">
                        <div className="absolute inset-0 flex items-center justify-center text-4xl font-serif italic text-text-muted dark:text-white/20 group-hover:text-primary transition-colors">
                            {user?.name?.[0] || 'M'}
                        </div>
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-xs text-white uppercase tracking-widest">Change</span>
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className="text-3xl font-serif text-text-primary dark:text-white">{user?.name}</h1>
                    <p className="text-text-muted dark:text-white/40 mt-2">{user?.email}</p>
                </div>
                <div className="flex justify-center gap-4">
                    <span className="px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs uppercase tracking-widest">Noir Member</span>
                </div>
            </div>

            {/* Settings Sections */}
            <div className="space-y-12">

                {/* Section 1 */}
                <section className="space-y-6">
                    <h3 className="text-text-muted dark:text-white/40 text-xs uppercase tracking-[0.2em] pl-4">Notifications</h3>
                    <div className="glass-panel rounded-3xl overflow-hidden border border-border-subtle dark:border-white/5">
                        <div className="p-6 flex items-center justify-between border-b border-border-subtle dark:border-white/5 hover:bg-surface-alt dark:hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-4">
                                <Bell className="w-5 h-5 text-text-muted dark:text-white/60" />
                                <span className="text-text-primary dark:text-white font-medium">Push Notifications</span>
                            </div>
                            <Toggle active={push} onToggle={() => setPush(!push)} />
                        </div>
                        <div className="p-6 flex items-center justify-between hover:bg-surface-alt dark:hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-5 h-5" /> {/* Spacer */}
                                <span className="text-text-primary dark:text-white font-medium">Email Updates</span>
                            </div>
                            <Toggle active={email} onToggle={() => setEmail(!email)} />
                        </div>
                    </div>
                </section>

                {/* Section 2 */}
                <section className="space-y-6">
                    <h3 className="text-text-muted dark:text-white/40 text-xs uppercase tracking-[0.2em] pl-4">Security & Privacy</h3>
                    <div className="glass-panel rounded-3xl overflow-hidden border border-border-subtle dark:border-white/5">
                        <button className="w-full p-6 flex items-center justify-between border-b border-border-subtle dark:border-white/5 hover:bg-surface-alt dark:hover:bg-white/5 transition-colors group text-left">
                            <div className="flex items-center gap-4">
                                <Lock className="w-5 h-5 text-text-muted dark:text-white/60" />
                                <span className="text-text-primary dark:text-white font-medium">Change Password</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-text-muted dark:text-white/20 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="w-full p-6 flex items-center justify-between hover:bg-surface-alt dark:hover:bg-white/5 transition-colors group text-left">
                            <div className="flex items-center gap-4">
                                <Smartphone className="w-5 h-5 text-text-muted dark:text-white/60" />
                                <span className="text-text-primary dark:text-white font-medium">Biometric Login</span>
                            </div>
                            <span className="text-primary text-xs">Enabled</span>
                        </button>
                    </div>
                </section>

                {/* Section 3 */}
                <section className="space-y-6">
                    <h3 className="text-text-muted dark:text-white/40 text-xs uppercase tracking-[0.2em] pl-4">Preferences</h3>
                    <div className="glass-panel rounded-3xl overflow-hidden border border-border-subtle dark:border-white/5">
                        <button className="w-full p-6 flex items-center justify-between border-b border-border-subtle dark:border-white/5 hover:bg-surface-alt dark:hover:bg-white/5 transition-colors group text-left">
                            <div className="flex items-center gap-4">
                                <Globe className="w-5 h-5 text-text-muted dark:text-white/60" />
                                <span className="text-text-primary dark:text-white font-medium">Language</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-text-muted dark:text-white/40 text-sm">English (US)</span>
                                <ChevronRight className="w-4 h-4 text-text-muted dark:text-white/20 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </button>
                    </div>
                </section>

                <div className="pt-8 text-center">
                    <button onClick={logout} className="text-red-400 text-sm hover:text-red-300 transition-colors border-b border-transparent hover:border-red-400">
                        Sign Out / Switch Account
                    </button>
                    <p className="text-text-muted dark:text-white/20 text-xs mt-6">Version 2.4.0 (Build 8842)</p>
                </div>

            </div>
        </div>
    );
}
