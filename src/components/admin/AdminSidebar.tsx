"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    Plane,
    CreditCard,
    Settings,
    LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Logo } from '@/components/ui/Logo';

export const AdminSidebar = () => {
    const pathname = usePathname();
    const { logout } = useAuth();

    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', href: '/admin' },
        { icon: Users, label: 'Members', href: '/admin/users' },
        { icon: Plane, label: 'Concierge', href: '/admin/concierge' },
        { icon: CreditCard, label: 'Revenue', href: '/admin/revenue' },
        { icon: Settings, label: 'System', href: '/admin/settings' },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border-subtle z-50 flex flex-col bg-glass-heavy backdrop-blur-xl">
            {/* Header */}
            <div className="h-20 flex items-center px-8 border-b border-border-subtle">
                <Logo />
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-8 px-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group ${isActive
                                ? 'bg-primary/10 text-text-primary'
                                : 'text-text-muted hover:text-text-primary hover:bg-surface-100'
                                }`}
                        >
                            <item.icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'group-hover:text-text-primary transition-colors'}`} />
                            <span className="text-sm font-light tracking-wide">{item.label}</span>

                            {isActive && (
                                <motion.div
                                    layoutId="admin-nav-indicator"
                                    className="absolute left-0 w-1 h-8 bg-primary rounded-r-full"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-border-subtle">
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-text-muted hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all duration-300 group"
                >
                    <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    <span className="text-sm font-light">End Session</span>
                </button>
            </div>
        </aside>
    );
};
