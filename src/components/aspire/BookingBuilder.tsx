"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Hotel, MapPin, Car, Send, TrendingUp, Clock, CheckCircle2, DollarSign, Timer, Sparkles } from 'lucide-react';
import { BookingItem } from '@/data/aspire-demo-data';

interface BookingBuilderProps {
    items: BookingItem[];
    totalValue: string;
    margin: string;
    callDuration: string;
    showSavings: boolean;
    onSendQuote?: () => void;
    quoteSent?: boolean;
}

const TypeIcon = ({ type }: { type: BookingItem['type'] }) => {
    const icons = {
        flight: Plane,
        hotel: Hotel,
        experience: MapPin,
        transfer: Car
    };
    const Icon = icons[type];
    return <Icon className="w-4 h-4" />;
};

const typeConfig = {
    flight: { gradient: 'from-primary to-champagne-500', shadow: 'shadow-primary/20' },
    hotel: { gradient: 'from-champagne-400 to-champagne-500', shadow: 'shadow-champagne-400/20' },
    experience: { gradient: 'from-success to-emerald-500', shadow: 'shadow-success/20' },
    transfer: { gradient: 'from-champagne-300 to-champagne-400', shadow: 'shadow-champagne-300/20' }
};

export const BookingBuilder: React.FC<BookingBuilderProps> = ({
    items,
    totalValue,
    margin,
    callDuration,
    showSavings,
    onSendQuote,
    quoteSent = false
}) => {
    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-text-primary dark:text-white font-serif text-2xl">Itinerary Builder</h2>
                    <p className="text-text-muted dark:text-white/40 text-xs uppercase tracking-wider mt-1">Build & curate the perfect experience</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl">
                        <Timer className="w-4 h-4 text-primary" />
                        <span className="text-text-primary dark:text-white font-mono text-lg font-semibold">{callDuration}</span>
                    </div>
                </div>
            </div>

            {/* Timeline */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
                {items.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                        <div className="text-center max-w-xs">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-primary/10 to-champagne-500/10 flex items-center justify-center border border-primary/20">
                                <Sparkles className="w-10 h-10 text-primary/40" />
                            </div>
                            <h3 className="text-text-primary dark:text-white font-serif text-lg mb-2">Ready to Build</h3>
                            <p className="text-text-muted dark:text-white/40 text-sm font-light leading-relaxed">
                                AI-curated suggestions will appear on the right. Add items with one click to build the perfect itinerary.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-7 top-6 bottom-6 w-px bg-gradient-to-b from-primary via-champagne-400 to-champagne-500" />

                        {/* Items - deduplicated */}
                        <div className="space-y-4">
                            <AnimatePresence>
                                {(() => {
                                    const seen = new Set<string>();
                                    return items.filter(item => {
                                        const key = `${item.type}-${item.title}`;
                                        if (seen.has(key)) return false;
                                        seen.add(key);
                                        return true;
                                    });
                                })().map((item, index) => {
                                    const config = typeConfig[item.type];

                                    return (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, x: -30, scale: 0.95 }}
                                            animate={{ opacity: 1, x: 0, scale: 1 }}
                                            transition={{ delay: index * 0.15, type: 'spring', damping: 20 }}
                                            className="relative flex gap-4"
                                        >
                                            {/* Timeline node */}
                                            <div className={`relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-xl ${config.shadow} text-surface`}>
                                                <TypeIcon type={item.type} />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 glass-card p-5 rounded-2xl">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div>
                                                        <h4 className="text-text-primary dark:text-white font-serif text-base mb-1">{item.title}</h4>
                                                        <p className="text-text-muted dark:text-white/40 text-xs">{item.subtitle}</p>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 border border-success/20">
                                                        <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                                                        <span className="text-success text-[10px] font-semibold uppercase tracking-wider">Confirmed</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between pt-3 border-t border-border-subtle dark:border-white/5">
                                                    <div className="flex items-center gap-4 text-text-muted dark:text-white/40 text-xs">
                                                        <div className="flex items-center gap-1.5">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            <span>{item.date}</span>
                                                        </div>
                                                        {item.time && (
                                                            <span className="text-text-secondary dark:text-white/60">{item.time}</span>
                                                        )}
                                                    </div>
                                                    <span className="text-text-primary dark:text-white font-serif font-semibold text-lg">{item.price}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    </div>
                )}
            </div>

            {/* Savings Banner */}
            <AnimatePresence>
                {showSavings && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="my-4 p-5 rounded-2xl bg-gradient-to-r from-success/10 to-emerald-500/10 border border-success/20"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-success/20 flex items-center justify-center">
                                <TrendingUp className="w-7 h-7 text-success" />
                            </div>
                            <div className="flex-1">
                                <p className="text-success font-serif font-semibold text-lg">Time Saved: 25+ minutes</p>
                                <p className="text-success/60 text-sm">Traditional booking: ~30 min → AI-assisted: {callDuration}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-success/60 text-xs uppercase tracking-wider">Efficiency</p>
                                <p className="text-success font-bold text-2xl">85%</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer */}
            {items.length > 0 && (
                <div className="mt-auto pt-4 border-t border-border-subtle dark:border-white/5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-6">
                            <div>
                                <p className="text-text-muted dark:text-white/40 text-[10px] uppercase tracking-wider mb-1">Total Value</p>
                                <p className="text-text-primary dark:text-white font-serif font-bold text-3xl">{totalValue}</p>
                            </div>
                            <div className="h-10 w-px bg-border-subtle dark:bg-white/10" />
                            <div>
                                <p className="text-text-muted dark:text-white/40 text-[10px] uppercase tracking-wider mb-1">Margin</p>
                                <div className="flex items-center gap-2">
                                    <DollarSign className="w-5 h-5 text-success" />
                                    <p className="text-success font-bold text-2xl">{margin}</p>
                                </div>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: quoteSent ? 1 : 1.02 }}
                            whileTap={{ scale: quoteSent ? 1 : 0.98 }}
                            onClick={!quoteSent ? onSendQuote : undefined}
                            disabled={quoteSent}
                            className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-sm uppercase tracking-wider transition-all shadow-xl ${quoteSent
                                ? 'bg-success/20 text-success border border-success/30 cursor-default shadow-success/10'
                                : 'bg-gradient-to-r from-primary to-champagne-500 text-surface hover:from-champagne-400 hover:to-primary shadow-primary/30'
                                }`}
                        >
                            <Send className="w-5 h-5" />
                            {quoteSent ? 'Quote Sent!' : 'Send Quote to Client'}
                        </motion.button>
                    </div>
                </div>
            )}
        </div>
    );
};
