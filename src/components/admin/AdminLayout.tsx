"use client";

import React from 'react';
import { AdminSidebar } from './AdminSidebar';
import { ShieldCheck, Bell } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const { user, logout } = useAuth();
    const [activeDropdown, setActiveDropdown] = React.useState<'notifications' | 'profile' | null>(null);

    return (
        <div className="min-h-screen bg-bg text-text-primary font-sans selection:bg-primary/30 flex">
            {/* Background Ambience (Copied from DashboardLayout) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-primary/5 dark:bg-primary/[0.03] rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-accent/5 dark:bg-surface-100 rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-noise opacity-[0.03]" />
            </div>

            <AdminSidebar />

            <main className="flex-1 ml-64 min-h-screen relative z-10 flex flex-col">
                {/* Admin Header */}
                <header className="h-20 border-b border-border-subtle flex items-center justify-between px-8 bg-glass-heavy backdrop-blur-md sticky top-0 z-40">
                    <div className="flex items-center gap-3 opacity-50">
                        <ShieldCheck className="w-4 h-4 text-text-primary" />
                        <span className="text-xs uppercase tracking-[0.2em] text-text-primary font-light">Mission Control</span>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* NOTIFICATIONS */}
                        <div className="relative">
                            <button
                                onClick={() => setActiveDropdown(activeDropdown === 'notifications' ? null : 'notifications')}
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors relative ${activeDropdown === 'notifications' ? 'bg-surface-100 text-text-primary' : 'hover:bg-surface-100 text-text-secondary'}`}
                            >
                                <Bell className="w-4 h-4" />
                                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                            </button>

                            {activeDropdown === 'notifications' && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)} />
                                    <div className="absolute right-0 top-full mt-4 w-80 bg-surface border border-border-subtle rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                        <div className="p-4 border-b border-border-subtle flex justify-between items-center bg-surface-50">
                                            <h4 className="text-sm font-medium text-text-primary">System Alerts</h4>
                                            <span className="text-[10px] text-primary uppercase tracking-wider cursor-pointer hover:underline">Clear</span>
                                        </div>
                                        <div className="max-h-80 overflow-y-auto">
                                            {[
                                                { title: "High Usage Alert", time: "2m ago", desc: "API Limit reached 80% capacity." },
                                                { title: "New Member", time: "1h ago", desc: "Platinum member registration (ID: #9921)." },
                                                { title: "System Update", time: "3h ago", desc: "Deployment v2.4.1 completed successfully." }
                                            ].map((item, i) => (
                                                <div key={i} className="p-4 border-b border-border-subtle hover:bg-surface-100 transition-colors cursor-pointer group">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <span className="text-text-primary text-sm font-medium group-hover:text-primary transition-colors">{item.title}</span>
                                                        <span className="text-text-muted text-[10px]">{item.time}</span>
                                                    </div>
                                                    <p className="text-text-secondary text-xs leading-relaxed">{item.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* PROFILE */}
                        <div className="relative">
                            <button
                                onClick={() => setActiveDropdown(activeDropdown === 'profile' ? null : 'profile')}
                                className="flex items-center gap-3 group"
                            >
                                <div className="text-right hidden md:block">
                                    <p className="text-sm text-text-primary font-medium group-hover:text-primary transition-colors">Administrator</p>
                                    <p className="text-[10px] text-text-muted uppercase tracking-wider">Level 5 Access</p>
                                </div>
                                <div className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${activeDropdown === 'profile' ? 'bg-text-primary text-bg border-text-primary' : 'bg-gradient-to-br from-surface-100 to-surface-50 border-border-subtle text-primary group-hover:border-primary/50'}`}>
                                    <span className="text-sm font-serif">A</span>
                                </div>
                            </button>

                            {activeDropdown === 'profile' && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)} />
                                    <div className="absolute right-0 top-full mt-4 w-56 bg-surface border border-border-subtle rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                        <div className="p-4 border-b border-border-subtle bg-surface-50">
                                            <p className="text-text-primary text-sm font-medium">admin@lumina.so</p>
                                            <p className="text-text-secondary text-xs mt-1">Super Admin</p>
                                        </div>
                                        <div className="p-2">
                                            {['System Logs', 'Audit Trail', 'Security Keys'].map((item) => (
                                                <div key={item} className="px-4 py-2.5 rounded-lg text-text-secondary text-sm hover:bg-surface-100 hover:text-text-primary transition-colors cursor-pointer">
                                                    {item}
                                                </div>
                                            ))}
                                            <div className="h-[1px] bg-border-subtle my-2" />
                                            <div
                                                onClick={logout}
                                                className="px-4 py-2.5 rounded-lg text-red-400 text-sm hover:bg-red-500/10 transition-colors cursor-pointer flex items-center justify-between"
                                            >
                                                Log Out
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                <div className="p-8 overflow-y-auto flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
};
