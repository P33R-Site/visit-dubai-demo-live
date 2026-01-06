"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, MapPin, CreditCard, MoreHorizontal, ArrowRight, Plane, Utensils, Car } from 'lucide-react';
import { useVal8 } from './Val8Context';

export const PostBookingSummary: React.FC = () => {
    const { selectedHotel, setBookingState, setIsExpanded } = useVal8();

    if (!selectedHotel) return null;

    return (
        <div className="h-full flex flex-col p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 glass-card overflow-hidden flex flex-col relative group"
            >
                {/* Image Header */}
                <div className="h-40 relative">
                    <Image src={selectedHotel.image} alt={selectedHotel.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                        <div className="bg-primary text-surface text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider inline-block mb-1">
                            Confirmed
                        </div>
                        <h3 className="text-xl font-serif text-white">{selectedHotel.name}</h3>
                    </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col gap-6 overflow-y-auto no-scrollbar">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <span className="text-xs text-text-secondary dark:text-white/40 uppercase tracking-wider">Check In</span>
                            <p className="text-text-primary dark:text-white font-medium">Dec 12</p>
                            <span className="text-xs text-text-muted dark:text-white/40">15:00</span>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-text-secondary dark:text-white/40 uppercase tracking-wider">Check Out</span>
                            <p className="text-text-primary dark:text-white font-medium">Dec 16</p>
                            <span className="text-xs text-text-muted dark:text-white/40">11:00</span>
                        </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-border-subtle dark:border-white/5">
                        <h4 className="text-sm font-medium text-text-secondary dark:text-white/80">Enhance Your Stay</h4>
                        {[
                            { icon: Plane, label: 'Airport Transfer', price: '$150' },
                            { icon: Utensils, label: 'Dinner Reservation', price: 'Concierge' },
                            { icon: Car, label: 'Luxury Car Rental', price: 'From $300' },
                        ].map((item, i) => (
                            <button key={i} className="w-full flex items-center justify-between p-3 bg-surface-alt dark:bg-white/5 hover:bg-surface-200 dark:hover:bg-white/10 rounded-xl border border-border-subtle dark:border-white/5 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <item.icon className="w-4 h-4 text-text-muted dark:text-white/40 group-hover:text-primary transition-colors" />
                                    <span className="text-sm text-text-primary dark:text-white/70">{item.label}</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-text-muted dark:text-white/20 group-hover:text-primary transition-colors" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 bg-surface-alt dark:bg-black/20 border-t border-border-subtle dark:border-white/5 flex gap-2">
                    <button
                        onClick={() => setBookingState('idle')}
                        className="flex-1 py-3 rounded-xl bg-surface dark:bg-white/5 hover:bg-surface-200 dark:hover:bg-white/10 text-text-secondary dark:text-white/80 text-sm font-medium transition-colors border border-border-subtle dark:border-white/5"
                    >
                        Return to Chat
                    </button>
                    <button className="w-12 flex items-center justify-center rounded-xl bg-surface dark:bg-white/5 hover:bg-surface-200 dark:hover:bg-white/10 text-text-muted dark:text-white/60 hover:text-text-primary dark:hover:text-white transition-colors border border-border-subtle dark:border-white/5">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
