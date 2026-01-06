"use client";

import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const DashboardHeader: React.FC = () => {
    const { user, logout } = useAuth();
    const [activeDropdown, setActiveDropdown] = React.useState<'notifications' | 'profile' | null>(null);

    return (
        <header className="h-20 px-8 border-b border-border-subtle dark:border-white/5 flex items-center justify-between glass-heavy sticky top-0 z-40 backdrop-blur-md">
            {/* Search */}
            <div className="relative w-96 hidden md:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted dark:text-white/30" />
                <input
                    type="text"
                    placeholder="Search itinerary, flights, or ask Val8..."
                    className="w-full bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/5 rounded-full pl-12 pr-4 py-2.5 text-sm text-text-primary dark:text-white placeholder:text-text-muted dark:placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-surface dark:focus:bg-white/10 transition-all"
                />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6">

                {/* NOTIFICATIONS */}
                <div className="relative">
                    <button
                        onClick={() => setActiveDropdown(activeDropdown === 'notifications' ? null : 'notifications')}
                        className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-colors ${activeDropdown === 'notifications' ? 'bg-surface-alt dark:bg-white/10 text-text-primary dark:text-white' : 'text-text-muted dark:text-white/40 hover:bg-surface-alt dark:hover:bg-white/5 hover:text-text-primary dark:hover:text-white'}`}
                    >
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse border-2 border-surface" />
                    </button>

                    {activeDropdown === 'notifications' && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)} />
                            <div className="absolute right-0 top-full mt-4 w-80 bg-surface dark:bg-[#0A0A0A] border border-border-subtle dark:border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                <div className="p-4 border-b border-border-subtle dark:border-white/5 flex justify-between items-center bg-surface-alt dark:bg-white/5">
                                    <h4 className="text-sm font-medium text-text-primary dark:text-white">Notifications</h4>
                                    <span className="text-[10px] text-primary uppercase tracking-wider cursor-pointer hover:underline">Mark all read</span>
                                </div>
                                <div className="max-h-80 overflow-y-auto">
                                    {[
                                        { title: "Flight Delayed", time: "2m ago", desc: "Emirates EK204 is delayed by 45m." },
                                        { title: "Dinner Confirmed", time: "1h ago", desc: "Ossiano reservation confirmed for 8:00 PM." },
                                        { title: "Concierge Update", time: "3h ago", desc: "Your desert safari itinerary is ready." }
                                    ].map((item, i) => (
                                        <div key={i} className="p-4 border-b border-border-subtle dark:border-white/5 hover:bg-surface-alt dark:hover:bg-white/5 transition-colors cursor-pointer group">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="text-text-primary dark:text-white text-sm font-medium group-hover:text-primary transition-colors">{item.title}</span>
                                                <span className="text-text-muted dark:text-white/30 text-[10px]">{item.time}</span>
                                            </div>
                                            <p className="text-text-secondary dark:text-white/60 text-xs leading-relaxed">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3 text-center bg-surface-alt dark:bg-white/5 hover:bg-surface dark:hover:bg-white/10 transition-colors cursor-pointer">
                                    <span className="text-xs text-text-muted dark:text-white/60">View all notifications</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="h-8 w-[1px] bg-border-subtle dark:bg-white/10" />

                {/* PROFILE */}
                <div className="relative">
                    <div
                        onClick={() => setActiveDropdown(activeDropdown === 'profile' ? null : 'profile')}
                        className="flex items-center gap-3 cursor-pointer group"
                    >
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-text-primary dark:text-white group-hover:text-primary transition-colors">{user?.name || 'Member'}</p>
                            <p className="text-[10px] text-text-muted dark:text-white/40 uppercase tracking-wider">Lumina Noir</p>
                        </div>
                        <div className={`w-10 h-10 rounded-full border flex items-center justify-center text-primary font-serif italic text-lg transition-all ${activeDropdown === 'profile' ? 'bg-primary text-black border-primary' : 'bg-primary/10 border-primary/20 group-hover:bg-primary group-hover:text-black'}`}>
                            {user?.name?.[0] || 'M'}
                        </div>
                    </div>

                    {activeDropdown === 'profile' && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)} />
                            <div className="absolute right-0 top-full mt-4 w-56 bg-surface dark:bg-[#0A0A0A] border border-border-subtle dark:border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                <div className="p-4 border-b border-border-subtle dark:border-white/5 bg-surface-alt dark:bg-white/5">
                                    <p className="text-text-primary dark:text-white text-sm font-medium">{user?.email || 'member@lumina.com'}</p>
                                    <p className="text-text-muted dark:text-white/40 text-xs mt-1">Noir Member #8821</p>
                                </div>
                                <div className="p-2">
                                    {['Account Settings', 'Membership Benefits', 'Billing & History', 'Preferences'].map((item) => (
                                        <div key={item} className="px-4 py-2.5 rounded-lg text-text-secondary dark:text-white/70 text-sm hover:bg-surface-alt dark:hover:bg-white/10 hover:text-text-primary dark:hover:text-white transition-colors cursor-pointer">
                                            {item}
                                        </div>
                                    ))}
                                    <div className="h-[1px] bg-border-subtle dark:bg-white/5 my-2" />
                                    <div
                                        onClick={logout}
                                        className="px-4 py-2.5 rounded-lg text-red-600 dark:text-red-400 text-sm hover:bg-red-500/10 transition-colors cursor-pointer flex items-center justify-between"
                                    >
                                        Sign Out
                                        <User className="w-4 h-4 opacity-50" />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};
