"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, CreditCard, Calendar, User, ShieldCheck } from 'lucide-react';
import { useVal8 } from './Val8Context';

export const BookingFlow: React.FC = () => {
    const { bookingState, setBookingState, selectedHotel } = useVal8();
    const [formData, setFormData] = useState({ name: '', email: '' });

    if (bookingState === 'idle' || bookingState === 'post-booking') return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute inset-x-0 bottom-0 bg-surface dark:glass-card dark:bg-black/80 backdrop-blur-2xl border-t border-border-subtle dark:border-white/10 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-20 overflow-hidden flex flex-col max-h-[90%] ring-1 ring-border-subtle dark:ring-white/5"
            >
                {/* Header */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-surface-alt/50 dark:bg-white/5 backdrop-blur-md">
                    <h3 className="text-lg font-serif text-text-primary dark:text-white">
                        {bookingState === 'summary' && 'Trip Summary'}
                        {bookingState === 'checkout' && 'Secure Checkout'}
                        {bookingState === 'confirmed' && 'Confirmed'}
                    </h3>
                    <button
                        onClick={() => setBookingState('idle')}
                        className="w-8 h-8 rounded-full bg-surface-alt dark:bg-white/5 flex items-center justify-center text-text-muted dark:text-white/40 hover:text-text-primary dark:hover:text-white hover:bg-surface-200 dark:hover:bg-white/10 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto no-scrollbar">
                    {bookingState === 'summary' && selectedHotel && (
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-border-subtle dark:border-white/10 shrink-0">
                                    <Image src={selectedHotel.image} alt={selectedHotel.name} fill className="object-cover" />
                                </div>
                                <div>
                                    <h4 className="text-text-primary dark:text-white font-medium mb-1">{selectedHotel.name}</h4>
                                    <p className="text-text-secondary dark:text-white/60 text-sm mb-2">{selectedHotel.location}</p>
                                    <div className="flex items-center gap-1 text-primary text-xs">
                                        <StarIcon />
                                        <span>{selectedHotel.rating} Exceptional</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 bg-surface-alt dark:bg-white/5 rounded-xl p-4 border border-border-subtle dark:border-white/5">
                                <div className="flex justify-between text-sm">
                                    <span className="text-text-secondary dark:text-white/60">Dates</span>
                                    <span className="text-text-primary dark:text-white">Dec 12 - Dec 16</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-text-secondary dark:text-white/60">Guests</span>
                                    <span className="text-text-primary dark:text-white">2 Adults</span>
                                </div>
                                <div className="flex justify-between text-sm pt-3 border-t border-border-subtle dark:border-white/5">
                                    <span className="text-text-secondary dark:text-white/60">Total</span>
                                    <span className="text-primary font-medium">$3,400</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setBookingState('checkout')}
                                className="w-full bg-primary text-surface py-4 rounded-xl font-medium text-sm hover:bg-primary-soft transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2"
                            >
                                Continue to Checkout <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {bookingState === 'checkout' && (
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs text-text-secondary dark:text-white/60 uppercase tracking-wider">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted dark:text-white/40" />
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-text-primary dark:text-white placeholder-text-muted dark:placeholder-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-text-secondary dark:text-white/60 uppercase tracking-wider">Email Address</label>
                                    <div className="relative">
                                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted dark:text-white/40" />
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-text-primary dark:text-white placeholder-text-muted dark:placeholder-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-text-muted dark:text-white/40 bg-surface-alt dark:bg-white/5 p-3 rounded-lg">
                                <ShieldCheck className="w-4 h-4 text-primary" />
                                <span className="text-primary">Secure SSL encrypted transaction</span>
                            </div>

                            <button
                                onClick={() => setBookingState('confirmed')}
                                className="w-full bg-primary text-surface py-4 rounded-xl font-medium text-sm hover:bg-primary-soft transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2"
                            >
                                Confirm & Pay <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {bookingState === 'confirmed' && (
                        <div className="flex flex-col items-center text-center py-8">
                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 border border-primary/20">
                                <Check className="w-10 h-10 text-primary" />
                            </div>
                            <h4 className="text-2xl font-serif text-text-primary dark:text-white mb-2">Booking Confirmed</h4>
                            <p className="text-text-secondary dark:text-white/60 text-sm mb-8 max-w-[80%]">
                                Your itinerary has been sent to your email. We&apos;re looking forward to hosting you.
                            </p>
                            <button
                                onClick={() => setBookingState('post-booking')}
                                className="w-full bg-surface-alt dark:bg-white/10 text-text-primary dark:text-white py-4 rounded-xl font-medium text-sm hover:bg-surface-200 dark:hover:bg-white/20 transition-colors border border-border-subtle dark:border-white/5"
                            >
                                View Itinerary
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

const StarIcon = () => (
    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);
