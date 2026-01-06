"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Calendar,
    MessageSquare,
    Plane,
    CreditCard,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Logo } from '@/components/ui/Logo';

const NAV_ITEMS = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Itinerary', href: '/dashboard/itinerary', icon: Calendar },
    { label: 'Concierge', href: '/dashboard/concierge', icon: MessageSquare },
    { label: 'Trips', href: '/dashboard/trips', icon: Plane },
    { label: 'Wallet', href: '/dashboard/wallet', icon: CreditCard },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export const Sidebar: React.FC<{ isCollapsed: boolean; toggleCollapse: () => void }> = ({ isCollapsed, toggleCollapse }) => {
    const pathname = usePathname();
    const { logout } = useAuth();

    return (
        <aside
            className={`
                relative h-screen flex flex-col border-r border-border-subtle dark:border-white/5 bg-glass-heavy transition-all duration-300 ease-in-out backdrop-blur-xl z-50
                ${isCollapsed ? 'w-20' : 'w-64'}
            `}
        >
            {/* Logo */}
            <div className={`h-20 flex items-center border-b border-border-subtle dark:border-white/5 transition-all duration-300 ${isCollapsed ? 'justify-center' : 'justify-start px-6'}`}>
                <Link href="/">
                    <Logo variant={isCollapsed ? 'icon' : 'full'} />
                </Link>
            </div>

            {/* Toggle Button (Absolute on border) */}
            <button
                onClick={toggleCollapse}
                className="absolute -right-3 top-24 w-6 h-6 rounded-full bg-surface border border-border-subtle dark:border-white/10 flex items-center justify-center text-text-muted dark:text-white/60 hover:text-text-primary dark:hover:text-white transition-colors z-50"
            >
                {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
            </button>

            {/* Navigation */}
            <nav className="flex-1 py-8 px-4 space-y-2">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                                flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group
                                ${isActive
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-text-muted dark:text-white/40 hover:text-text-primary dark:hover:text-white hover:bg-surface-alt dark:hover:bg-white/5'}
                            `}
                        >
                            <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-primary' : 'group-hover:text-text-primary dark:group-hover:text-white'}`} />
                            <span
                                className={`
                                    whitespace-nowrap overflow-hidden transition-all duration-300 font-medium text-sm
                                    ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}
                                `}
                            >
                                {item.label}
                            </span>

                            {/* Hover Tooltip for Collapsed State */}
                            {isCollapsed && (
                                <div className="absolute left-full ml-4 px-2 py-1 bg-surface border border-border-subtle dark:border-white/10 rounded-md text-xs text-text-primary dark:text-white opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                                    {item.label}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* User / Logout */}
            <div className="p-4 border-t border-border-subtle dark:border-white/5">
                <button
                    onClick={logout}
                    className={`
                        w-full flex items-center gap-4 px-3 py-3 rounded-xl text-text-muted dark:text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200
                        ${isCollapsed ? 'justify-center' : ''}
                    `}
                >
                    <LogOut className="w-5 h-5 shrink-0" />
                    <span
                        className={`
                            whitespace-nowrap overflow-hidden transition-all duration-300 font-medium text-sm
                            ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}
                        `}
                    >
                        Sign Out
                    </span>
                </button>
            </div>
        </aside>
    );
};
