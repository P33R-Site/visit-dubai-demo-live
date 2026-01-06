"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Plane, Hotel, Sparkles, Calendar, Users, MessageSquare } from 'lucide-react';

interface QuickActionsBarProps {
    onAction?: (action: string) => void;
    disabled?: boolean;
}

export const QuickActionsBar: React.FC<QuickActionsBarProps> = ({
    onAction,
    disabled = false
}) => {
    const actions = [
        { id: 'flights', label: 'Search Flights', icon: Plane, shortcut: 'F1' },
        { id: 'hotels', label: 'Search Hotels', icon: Hotel, shortcut: 'F2' },
        { id: 'experiences', label: 'Add Experience', icon: Sparkles, shortcut: 'F3' },
        { id: 'calendar', label: 'View Calendar', icon: Calendar, shortcut: 'F4' }
    ];

    return (
        <div className="flex items-center justify-between px-6 py-4 bg-surface-alt/50 dark:bg-white/5 backdrop-blur-md border-t border-border-subtle dark:border-white/5">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted dark:text-white/40" />
                    <input
                        type="text"
                        placeholder="Search inventory, clients, or bookings..."
                        disabled={disabled}
                        className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-surface dark:bg-black/40 border border-border-subtle dark:border-white/10 text-text-primary dark:text-white placeholder:text-text-muted dark:placeholder:text-white/30 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
                {actions.map(action => (
                    <motion.button
                        key={action.id}
                        whileHover={{ scale: disabled ? 1 : 1.05 }}
                        whileTap={{ scale: disabled ? 1 : 0.95 }}
                        onClick={() => !disabled && onAction?.(action.id)}
                        disabled={disabled}
                        className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface dark:bg-black/40 border border-border-subtle dark:border-white/10 text-text-secondary dark:text-white/60 text-sm font-medium hover:bg-surface-alt dark:hover:bg-white/10 hover:text-text-primary dark:hover:text-white hover:border-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-surface dark:disabled:hover:bg-black/40 disabled:hover:text-text-secondary dark:disabled:hover:text-white/60"
                    >
                        <action.icon className="w-4 h-4" />
                        <span className="hidden lg:inline">{action.label}</span>
                        <span className="hidden xl:inline text-[10px] text-text-muted dark:text-white/30 ml-1 px-1 py-0.5 rounded bg-surface-alt/50 dark:bg-white/5 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            {action.shortcut}
                        </span>
                    </motion.button>
                ))}

                {/* Divider */}
                <div className="h-8 w-px bg-border-subtle dark:bg-white/10 mx-2" />

                {/* Quick Stats */}
                <div className="flex items-center gap-4 text-text-muted dark:text-white/40 text-xs">
                    <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        <span>247 clients today</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>98% satisfaction</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
