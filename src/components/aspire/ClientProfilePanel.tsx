"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Plane, Hotel, UtensilsCrossed, MapPin, Star, Crown, Gem,
    Heart, TrendingUp, Phone, Mail, MessageSquare, Calendar, Gift,
    Award, Globe, Sparkles, ChevronRight, Clock
} from 'lucide-react';
import { Client } from '@/data/aspire-demo-data';

interface ClientProfilePanelProps {
    client: Client | null;
    isVisible: boolean;
}

const TierConfig = {
    Platinum: {
        icon: Star,
        gradient: 'from-champagne-200 via-champagne-300 to-champagne-400',
        glow: 'shadow-champagne-300/30',
        text: 'text-champagne-200'
    },
    Diamond: {
        icon: Gem,
        gradient: 'from-primary via-champagne-400 to-champagne-500',
        glow: 'shadow-primary/40',
        text: 'text-primary'
    },
    Elite: {
        icon: Crown,
        gradient: 'from-champagne-300 via-champagne-400 to-champagne-500',
        glow: 'shadow-champagne-400/30',
        text: 'text-champagne-300'
    }
};

export const ClientProfilePanel: React.FC<ClientProfilePanelProps> = ({
    client,
    isVisible
}) => {
    // Empty state with elegant animation
    if (!client || !isVisible) {
        return (
            <div className="h-full flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <div className="relative w-20 h-20 mx-auto mb-4">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-champagne-500/20 animate-pulse" />
                        <div className="relative w-full h-full rounded-2xl bg-surface-alt/30 dark:bg-white/5 flex items-center justify-center border border-border-subtle dark:border-white/10">
                            <User className="w-10 h-10 text-text-muted/40 dark:text-white/20" />
                        </div>
                    </div>
                    <p className="text-text-primary dark:text-white/80 font-serif text-sm mb-1">Awaiting Connection</p>
                    <p className="text-text-muted dark:text-white/40 text-xs">Client profile will appear here</p>
                </motion.div>
            </div>
        );
    }

    const tierConfig = TierConfig[client.tier];
    const TierIcon = tierConfig.icon;

    // Calculate lifetime value
    const totalSpend = client.recentTrips.reduce((sum, trip) => {
        const value = parseFloat(trip.spend.replace(/[^0-9.]/g, ''));
        return sum + (isNaN(value) ? 0 : value);
    }, 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="h-full flex flex-col gap-3 overflow-hidden"
        >
            {/* Premium Client Card */}
            <div className={`relative p-4 rounded-2xl bg-gradient-to-br from-surface-alt/80 to-surface/60 dark:from-white/[0.08] dark:to-white/[0.03] border border-border-subtle dark:border-white/10 shadow-xl ${tierConfig.glow} overflow-hidden`}>
                {/* Decorative gradient orb */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${tierConfig.gradient} opacity-20 blur-2xl`} />

                <div className="relative flex items-start gap-4">
                    {/* Premium Avatar with tier ring */}
                    <div className="relative">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tierConfig.gradient} flex items-center justify-center shadow-lg ${tierConfig.glow}`}>
                            <span className="text-surface font-serif font-bold text-xl">
                                {client.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </span>
                        </div>
                        {/* Tier badge on avatar */}
                        <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-surface dark:bg-black flex items-center justify-center border-2 border-surface dark:border-black`}>
                            <TierIcon className={`w-3.5 h-3.5 ${tierConfig.text}`} />
                        </div>
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="text-text-primary dark:text-white font-serif text-base font-medium truncate">{client.name}</h3>
                        {client.spouse && (
                            <p className="text-text-muted dark:text-white/40 text-[11px] flex items-center gap-1.5 mt-0.5">
                                <Heart className="w-3 h-3 text-error/60" fill="currentColor" />
                                {client.spouse}
                            </p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-gradient-to-r ${tierConfig.gradient} text-surface text-[9px] font-bold uppercase tracking-wider`}>
                                <TierIcon className="w-3 h-3" />
                                {client.tier} Member
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats Row */}
                <div className="relative mt-4 pt-3 border-t border-border-subtle/50 dark:border-white/5 grid grid-cols-3 gap-2">
                    <div className="text-center">
                        <p className="text-text-muted dark:text-white/40 text-[9px] uppercase tracking-wider mb-0.5">Since</p>
                        <p className="text-text-primary dark:text-white font-medium text-sm">{client.memberSince}</p>
                    </div>
                    <div className="text-center border-x border-border-subtle/50 dark:border-white/5">
                        <p className="text-text-muted dark:text-white/40 text-[9px] uppercase tracking-wider mb-0.5">Bookings</p>
                        <p className="text-text-primary dark:text-white font-medium text-sm">{client.totalBookings || 47}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-text-muted dark:text-white/40 text-[9px] uppercase tracking-wider mb-0.5">Satisfaction</p>
                        <p className="text-success font-bold text-sm">{client.satisfactionScore || 98}%</p>
                    </div>
                </div>
            </div>

            {/* Lifetime Value Banner */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-success/10 via-success/5 to-transparent border border-success/20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center">
                            <TrendingUp className="w-4 h-4 text-success" />
                        </div>
                        <div>
                            <p className="text-text-muted dark:text-white/40 text-[9px] uppercase tracking-wider">Lifetime Value</p>
                            <p className="text-success font-serif font-bold text-lg">${totalSpend.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-text-muted dark:text-white/40 text-[9px] uppercase tracking-wider">YTD Trips</p>
                        <p className="text-text-primary dark:text-white font-semibold">{client.recentTrips.length}</p>
                    </div>
                </div>
            </div>

            {/* Scrollable Sections */}
            <div className="flex-1 overflow-y-auto space-y-2 scrollbar-hide pr-1">
                {/* Important Dates */}
                {(client.anniversary || client.birthday) && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-3 rounded-xl bg-primary/5 border border-primary/15"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Gift className="w-4 h-4 text-primary" />
                            <span className="text-primary text-[10px] uppercase tracking-wider font-semibold">Important Dates</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {client.anniversary && (
                                <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-alt/30 dark:bg-white/5">
                                    <Calendar className="w-3.5 h-3.5 text-error/60" />
                                    <div>
                                        <p className="text-text-muted dark:text-white/40 text-[9px]">Anniversary</p>
                                        <p className="text-text-primary dark:text-white text-xs font-medium">{client.anniversary}</p>
                                    </div>
                                </div>
                            )}
                            {client.birthday && (
                                <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-alt/30 dark:bg-white/5">
                                    <Gift className="w-3.5 h-3.5 text-champagne-400" />
                                    <div>
                                        <p className="text-text-muted dark:text-white/40 text-[9px]">Birthday</p>
                                        <p className="text-text-primary dark:text-white text-xs font-medium">{client.birthday}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Communication Preferences */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="p-3 rounded-xl bg-surface-alt/30 dark:bg-white/[0.03] border border-border-subtle/50 dark:border-white/5"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-text-muted dark:text-white/40" />
                        <span className="text-text-muted dark:text-white/40 text-[10px] uppercase tracking-wider">Communication</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-[10px] font-medium">
                            {client.preferredContact || 'Phone'}
                        </span>
                        <span className="px-2 py-1 rounded-md bg-champagne-400/10 text-champagne-400 text-[10px] font-medium">
                            {client.communicationStyle || 'Efficient'}
                        </span>
                        <span className="px-2 py-1 rounded-md bg-surface-alt dark:bg-white/5 text-text-secondary dark:text-white/60 text-[10px] font-medium">
                            {client.language || 'English'}
                        </span>
                    </div>
                </motion.div>

                {/* Preferences - Compact Cards */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-2 gap-2"
                >
                    {/* Airlines */}
                    <div className="p-2.5 rounded-xl bg-surface-alt/30 dark:bg-white/[0.03] border border-border-subtle/50 dark:border-white/5">
                        <div className="flex items-center gap-1.5 mb-1.5">
                            <Plane className="w-3 h-3 text-primary" />
                            <span className="text-text-muted dark:text-white/40 text-[9px] uppercase tracking-wider">Airlines</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {client.preferences.airlines.slice(0, 2).map(airline => (
                                <span key={airline} className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[9px] font-medium">
                                    {airline.split(' ')[0]}
                                </span>
                            ))}
                            {client.preferences.airlines.length > 2 && (
                                <span className="text-text-muted dark:text-white/30 text-[9px]">+{client.preferences.airlines.length - 2}</span>
                            )}
                        </div>
                    </div>

                    {/* Hotels */}
                    <div className="p-2.5 rounded-xl bg-surface-alt/30 dark:bg-white/[0.03] border border-border-subtle/50 dark:border-white/5">
                        <div className="flex items-center gap-1.5 mb-1.5">
                            <Hotel className="w-3 h-3 text-champagne-400" />
                            <span className="text-text-muted dark:text-white/40 text-[9px] uppercase tracking-wider">Hotels</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {client.preferences.hotels.slice(0, 2).map(hotel => (
                                <span key={hotel} className="px-1.5 py-0.5 rounded bg-champagne-400/10 text-champagne-400 text-[9px] font-medium">
                                    {hotel.split(' ')[0]}
                                </span>
                            ))}
                            {client.preferences.hotels.length > 2 && (
                                <span className="text-text-muted dark:text-white/30 text-[9px]">+{client.preferences.hotels.length - 2}</span>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Dietary & Special Requests */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                    className="p-3 rounded-xl bg-warning/5 border border-warning/15"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <UtensilsCrossed className="w-4 h-4 text-warning" />
                        <span className="text-warning text-[10px] uppercase tracking-wider font-semibold">Dietary & Requests</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {client.preferences.dietary.map(item => (
                            <span key={item} className="px-2 py-1 rounded-lg bg-warning/10 text-warning text-[10px] font-medium border border-warning/20">
                                {item}
                            </span>
                        ))}
                        {client.preferences.specialRequests?.map(req => (
                            <span key={req} className="px-2 py-1 rounded-lg bg-surface-alt dark:bg-white/5 text-text-secondary dark:text-white/60 text-[10px] font-medium">
                                {req}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* Recent Trips - Compact */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-3 rounded-xl bg-surface-alt/30 dark:bg-white/[0.03] border border-border-subtle/50 dark:border-white/5"
                >
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-success" />
                            <span className="text-text-muted dark:text-white/40 text-[10px] uppercase tracking-wider">Recent Trips</span>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        {client.recentTrips.slice(0, 2).map((trip, i) => (
                            <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-surface dark:bg-black/20">
                                <div className="flex items-center gap-2">
                                    <Globe className="w-3 h-3 text-text-muted dark:text-white/30" />
                                    <span className="text-text-primary dark:text-white text-xs font-medium">{trip.destination}</span>
                                </div>
                                <span className="text-success font-semibold text-xs">{trip.spend}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Personal Touches */}
                {client.personalTouches && client.personalTouches.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 }}
                        className="p-3 rounded-xl bg-champagne-400/5 border border-champagne-400/15"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-champagne-400" />
                            <span className="text-champagne-400 text-[10px] uppercase tracking-wider font-semibold">Personal Touches</span>
                        </div>
                        <div className="space-y-1.5">
                            {client.personalTouches.map((touch, i) => (
                                <div key={i} className="flex items-start gap-2">
                                    <ChevronRight className="w-3 h-3 text-champagne-400/60 mt-0.5 shrink-0" />
                                    <p className="text-text-secondary dark:text-white/60 text-[11px] leading-relaxed">{touch}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* VIP Notes */}
                {client.vipNotes && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-champagne-500/5 border border-primary/20"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Heart className="w-4 h-4 text-primary" />
                            <span className="text-primary text-[10px] uppercase tracking-wider font-semibold">VIP Notes</span>
                        </div>
                        <p className="text-text-secondary dark:text-white/60 text-[11px] leading-relaxed">{client.vipNotes}</p>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};
