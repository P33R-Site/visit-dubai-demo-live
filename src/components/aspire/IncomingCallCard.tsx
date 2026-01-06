"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Clock, Star, Crown, Gem, PhoneIncoming, Sparkles } from 'lucide-react';
import { Client } from '@/data/aspire-demo-data';

interface IncomingCallCardProps {
    client: Client;
    isActive: boolean;
    callDuration: string;
    onAccept?: () => void;
}

const TierBadge = ({ tier }: { tier: Client['tier'] }) => {
    const config = {
        Platinum: { icon: Star, color: 'text-champagne-200', bg: 'bg-champagne-200/10', border: 'border-champagne-200/30' },
        Diamond: { icon: Gem, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/30' },
        Elite: { icon: Crown, color: 'text-champagne-300', bg: 'bg-champagne-300/10', border: 'border-champagne-300/30' }
    };
    const { icon: Icon, color, bg, border } = config[tier];

    return (
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${bg} ${border} border`}>
            <Icon className={`w-3 h-3 ${color}`} />
            <span className={`text-[10px] font-semibold uppercase tracking-wider ${color}`}>{tier}</span>
        </div>
    );
};

export const IncomingCallCard: React.FC<IncomingCallCardProps> = ({
    client,
    isActive,
    callDuration,
    onAccept
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${isActive
                    ? 'glass-card border-success/30'
                    : 'glass-card border-primary/30 hover:border-primary/50'
                }`}
        >
            {/* Incoming pulse animation */}
            {!isActive && (
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
                </div>
            )}

            <div className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isActive ? 'bg-success/20' : 'bg-primary/20 animate-pulse'
                            }`}>
                            {isActive ? (
                                <Phone className="w-5 h-5 text-success" />
                            ) : (
                                <PhoneIncoming className="w-5 h-5 text-primary" />
                            )}
                        </div>
                        <div>
                            <p className="text-text-primary dark:text-white font-serif text-base">{client.name}</p>
                            <p className="text-text-muted dark:text-white/40 text-xs">{client.phone}</p>
                        </div>
                    </div>
                    <TierBadge tier={client.tier} />
                </div>

                {/* Call info */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-text-muted dark:text-white/40">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-xs font-mono">{callDuration}</span>
                    </div>

                    {!isActive && onAccept && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onAccept}
                            className="px-4 py-1.5 rounded-full bg-primary text-surface text-xs font-semibold uppercase tracking-wider hover:bg-champagne-500 transition-colors shadow-lg shadow-primary/20"
                        >
                            Accept
                        </motion.button>
                    )}

                    {isActive && (
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                            <span className="text-success text-xs font-semibold uppercase tracking-wider">Active</span>
                        </div>
                    )}
                </div>

                {/* AI Quick Insight */}
                {client.recentTrips.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-border-subtle dark:border-white/5">
                        <div className="flex items-center gap-2 mb-1">
                            <Sparkles className="w-3 h-3 text-primary" />
                            <p className="text-primary text-[10px] uppercase tracking-wider font-semibold">AI Insight</p>
                        </div>
                        <p className="text-text-secondary dark:text-white/60 text-xs">
                            Last trip to <span className="text-text-primary dark:text-white font-medium">{client.recentTrips[0].destination}</span> • Spent {client.recentTrips[0].spend}
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};
