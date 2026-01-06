"use client";

import React from 'react';
import { Plane, Car, Utensils, ShoppingBag, Sun, Star, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConciergeVisualsProps {
    mode: 'normal' | 'demo';
    demoStep: number;
}

export const ConciergeVisuals: React.FC<ConciergeVisualsProps> = ({ mode, demoStep }) => {

    // --- NORMAL MODE RENDER ---
    if (mode === 'normal') {
        return (
            <div className="h-full w-full flex flex-col p-6 overflow-hidden relative glass-card rounded-3xl">
                {/* Generic Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/demo/destination-skyline.png"
                        alt="Concierge Abstract"
                        className="w-full h-full object-cover opacity-20 blur-sm mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-surface/80 via-surface/40 to-surface/80 dark:from-black/80 dark:via-black/40 dark:to-black/80" />
                </div>

                <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center space-y-6">
                    <div className="w-20 h-20 rounded-full bg-surface-alt dark:bg-white/5 flex items-center justify-center border border-border-subtle dark:border-white/10 shadow-xl backdrop-blur-md">
                        <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-serif text-text-primary dark:text-white mb-2">Concierge Active</h2>
                        <p className="text-text-muted dark:text-white/40 text-sm font-light max-w-xs mx-auto">
                            I'm here to assist with flights, reservations, and exclusive experiences. How can I help you today?
                        </p>
                    </div>

                    {/* Quick Suggestions */}
                    <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                        {['Book a flight', 'Find a restaurant', 'Schedule a ride', 'Surprise me'].map((text) => (
                            <div key={text} className="p-3 rounded-xl bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/10 text-xs text-text-secondary dark:text-white/60 hover:bg-surface dark:hover:bg-white/10 transition-colors cursor-pointer">
                                {text}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // --- DEMO MODE RENDER ---
    return (
        <div className="h-full w-full flex flex-col p-6 overflow-hidden relative glass-card rounded-3xl">
            {/* Dynamic Background Image based on Step */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="popLayout">
                    <motion.img
                        key={`bg-${demoStep}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        src={
                            demoStep === 0 ? "/images/demo/destination-skyline.png" : // Dubai Skyline
                                demoStep === 1 ? "/images/demo/flight-exterior.png" : // Flight
                                    (demoStep === 2 || demoStep === 3) ? "/images/demo/hotel-exterior.png" : // Luxury Hotel
                                        demoStep === 4 ? "/images/demo/airport-terminal.png" : // Luxury Car (Pickup Context)
                                            demoStep === 5 ? "/images/demo/dining-interior.png" : // Dining
                                                demoStep === 6 ? "/images/demo/shopping-sunscreen.png" : // Shopping
                                                    "/images/demo/destination-desert.png" // Desert
                        }
                        alt="Dubai Context"
                        className="w-full h-full object-cover blur-sm absolute inset-0 mix-blend-overlay"
                    />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-br from-surface/80 via-surface/40 to-surface/80 dark:from-black/80 dark:via-black/40 dark:to-black/80" />
            </div>

            <div className="relative z-10 flex-1 flex flex-col justify-end text-text-primary dark:text-white">
                <AnimatePresence mode="wait">

                    {/* STEP 0: CONTEXT & WEATHER */}
                    {demoStep === 0 && (
                        <motion.div
                            key="step0"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-4"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-primary text-[10px] uppercase tracking-[0.3em] font-medium border border-primary/20 px-2 py-1 rounded inline-block mb-2">
                                        Destination
                                    </span>
                                    <h2 className="text-5xl font-serif leading-none">Dubai</h2>
                                    <p className="text-text-secondary dark:text-white/60 text-lg font-light mt-1">United Arab Emirates</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-light flex items-center gap-2 justify-end">
                                        <Sun className="w-8 h-8 text-primary" />
                                        95°
                                    </div>
                                    <p className="text-text-muted dark:text-white/40 text-xs uppercase tracking-widest mt-1">Sunny & Clear</p>
                                </div>
                            </div>
                            <div className="glass-panel p-4 rounded-2xl border border-border-subtle dark:border-white/10 bg-surface-alt/50 dark:bg-white/5 backdrop-blur-md">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-text-primary dark:text-white/80 text-sm font-medium">Upcoming Trip</p>
                                    <span className="text-xs text-text-muted dark:text-white/40">June 2025</span>
                                </div>
                                <div className="h-1 w-full bg-surface dark:bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full w-1/12 bg-primary" />
                                </div>
                                <p className="text-xs text-text-muted dark:text-white/40 mt-2">Planning in progress...</p>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 1: FLIGHT */}
                    {demoStep === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="bg-surface/50 dark:bg-black/40 backdrop-blur-xl rounded-3xl p-6 border border-border-subtle dark:border-white/10">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <p className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1">Flight Option</p>
                                    <h3 className="text-2xl text-text-primary dark:text-white font-serif">Emirates</h3>
                                </div>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg" alt="Emirates" className="h-8 opacity-80 filter dark:invert" />
                            </div>
                            <div className="flex items-center justify-between mb-8">
                                <div className="text-center">
                                    <p className="text-4xl font-bold text-text-primary dark:text-white tracking-tight">SFO</p>
                                    <p className="text-xs text-text-muted dark:text-white/40 mt-1">San Francisco</p>
                                </div>
                                <div className="flex-1 flex flex-col items-center px-4">
                                    <div className="flex items-center gap-2 text-text-muted dark:text-white/40 text-xs mb-1">15h 45m • Non-stop</div>
                                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-text-muted dark:via-white/40 to-transparent relative">
                                        <Plane className="w-4 h-4 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90" />
                                    </div>
                                    <div className="text-primary text-[10px] mt-2 uppercase tracking-wide">Business Class</div>
                                </div>
                                <div className="text-center">
                                    <p className="text-4xl font-bold text-text-primary dark:text-white tracking-tight">DXB</p>
                                    <p className="text-xs text-text-muted dark:text-white/40 mt-1">Dubai Int'l</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-border-subtle dark:border-white/10">
                                <div>
                                    <p className="text-text-primary dark:text-white text-lg font-medium">$8,450</p>
                                    <p className="text-text-muted dark:text-white/40 text-xs">Round Trip</p>
                                </div>
                                <button className="px-4 py-2 bg-primary text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-white transition-colors">
                                    Select
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2: HOTEL */}
                    {(demoStep === 2 || demoStep === 3) && (
                        <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                            <span className="text-primary text-[10px] uppercase tracking-[0.3em] font-medium border border-primary/20 px-2 py-1 rounded inline-block">
                                Recommended Stay
                            </span>
                            <h2 className="text-3xl font-serif text-text-primary dark:text-white leading-tight">One&Only Royal Mirage</h2>
                            <div className="flex items-center gap-1 text-yellow-500 mb-2">
                                <Star className="w-4 h-4 fill-current" />
                                <Star className="w-4 h-4 fill-current" />
                                <Star className="w-4 h-4 fill-current" />
                                <Star className="w-4 h-4 fill-current" />
                                <Star className="w-4 h-4 fill-current" />
                                <span className="text-text-muted dark:text-white/40 text-xs ml-2">(4.9/5)</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <img src="/images/demo/hotel-bedroom.png" className="rounded-xl h-32 w-full object-cover" />
                                <img src="/images/demo/hotel-pool.png" className="rounded-xl h-32 w-full object-cover" />
                            </div>
                            <div className="glass-panel p-4 rounded-xl border border-border-subtle dark:border-white/10 bg-surface-alt/50 dark:bg-white/5">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="text-text-primary dark:text-white font-medium">Arabian Court Suite</h4>
                                        <p className="text-text-muted dark:text-white/40 text-xs">Sea View • 2 Adults</p>
                                    </div>
                                    <span className="text-lg text-text-primary dark:text-white">$1,250<span className="text-xs text-text-muted dark:text-white/40">/night</span></span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: RIDE */}
                    {demoStep === 4 && (
                        <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="bg-surface/50 dark:bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-border-subtle dark:border-white/10 flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-surface-alt dark:bg-white/5 flex items-center justify-center mb-4">
                                <Car className="w-8 h-8 text-text-primary dark:text-white" />
                            </div>
                            <h3 className="text-2xl text-text-primary dark:text-white font-serif mb-1">Chauffeur Service</h3>
                            <p className="text-primary text-xs uppercase tracking-widest mb-6">Emirates Business Class</p>
                            <div className="w-full space-y-3">
                                <div className="flex justify-between items-center p-3 bg-surface-alt dark:bg-white/5 rounded-xl border border-border-subtle dark:border-white/5">
                                    <span className="text-text-secondary dark:text-white/60 text-xs">Pickup</span>
                                    <span className="text-text-primary dark:text-white text-sm font-medium">DXB Terminal 3</span>
                                </div>
                                <div className="flex justify-center">
                                    <div className="h-4 w-[1px] bg-border-subtle dark:bg-white/10" />
                                </div>
                                <div className="flex justify-between items-center p-3 bg-surface-alt dark:bg-white/5 rounded-xl border border-border-subtle dark:border-white/5">
                                    <span className="text-text-secondary dark:text-white/60 text-xs">Dropoff</span>
                                    <span className="text-text-primary dark:text-white text-sm font-medium">One&Only Royal Mirage</span>
                                </div>
                            </div>
                            <p className="text-text-muted dark:text-white/40 text-[10px] mt-6">Complimentary with your flight</p>
                        </motion.div>
                    )}

                    {/* STEP 5: DINING */}
                    {demoStep === 5 && (
                        <motion.div key="step4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            <img src="/images/demo/dining-interior.png" className="w-full h-48 object-cover rounded-2xl mb-4 opacity-80" />
                            <div className="flex justify-between items-end mb-2">
                                <div>
                                    <h2 className="text-3xl font-serif text-text-primary dark:text-white">Ossiano</h2>
                                    <p className="text-primary text-xs uppercase tracking-widest">Underwater Fine Dining</p>
                                </div>
                                <div className="bg-surface-alt dark:bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                                    <span className="text-text-primary dark:text-white text-xs font-medium">Michelin Star</span>
                                </div>
                            </div>
                            <p className="text-text-secondary dark:text-white/60 text-sm font-light mb-4">
                                A progressive fine dining experience inspired by the ocean, located at Atlantis, The Palm.
                            </p>
                            <div className="glass-panel p-3 rounded-xl border border-border-subtle dark:border-white/10 flex justify-between items-center cursor-pointer hover:bg-surface-alt dark:hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-3">
                                    <Utensils className="w-4 h-4 text-text-muted dark:text-white/60" />
                                    <div>
                                        <p className="text-text-primary dark:text-white text-sm">Reservation Request</p>
                                        <p className="text-text-muted dark:text-white/40 text-[10px]">Friday, June 6 • 8:00 PM</p>
                                    </div>
                                </div>
                                <span className="text-primary text-xs font-bold">CONFIRM</span>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 6: ESSENTIALS */}
                    {demoStep === 6 && (
                        <motion.div key="step5" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full justify-center">
                            <div className="glass-panel p-6 rounded-3xl border border-border-subtle dark:border-white/10 bg-surface-alt/50 dark:bg-white/5 backdrop-blur-md relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4">
                                    <div className="px-2 py-1 rounded bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
                                        Essential
                                    </div>
                                </div>
                                <ShoppingBag className="w-10 h-10 text-text-primary dark:text-white mb-4" />
                                <h3 className="text-2xl font-serif text-text-primary dark:text-white mb-1">SunSport SPF 50</h3>
                                <div className="flex gap-1 mb-4">
                                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                </div>
                                <p className="text-text-secondary dark:text-white/60 text-sm mb-6">High performance sun protection, perfect for Dubai's intense sun. Delivered to your suite.</p>
                                <div className="flex justify-between items-center pt-4 border-t border-border-subtle dark:border-white/10">
                                    <span className="text-xl text-text-primary dark:text-white font-medium">$18.50</span>
                                    <button className="h-8 w-8 rounded-full bg-text-primary dark:bg-white flex items-center justify-center text-surface dark:text-black hover:bg-primary transition-colors">
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 7+: EXPERIENCES / SUMMARY */}
                    {demoStep >= 7 && (
                        <motion.div key="step6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                            <span className="text-primary text-[10px] uppercase tracking-[0.3em] font-medium border border-primary/20 px-2 py-1 rounded inline-block">
                                Signature Experience
                            </span>
                            <h2 className="text-3xl font-serif text-text-primary dark:text-white leading-tight">Private Desert Safari</h2>
                            <img src="/images/demo/destination-desert.png" className="w-full h-40 object-cover rounded-xl opacity-90" />
                            <div className="space-y-2">
                                <div className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                                    <p className="text-text-secondary dark:text-white/80 text-sm font-light">Vintage Land Rover collection from your hotel.</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                                    <p className="text-text-secondary dark:text-white/80 text-sm font-light">Sunset falconry display and traditional dinner.</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                                    <p className="text-text-secondary dark:text-white/80 text-sm font-light">Stargazing with private astronomer.</p>
                                </div>
                            </div>
                            <button className="w-full py-3 mt-4 bg-surface-alt dark:bg-white/10 hover:bg-surface dark:hover:bg-white/20 border border-border-subtle dark:border-white/10 text-text-primary dark:text-white rounded-xl text-xs uppercase tracking-widest transition-colors">
                                View Full Itinerary
                            </button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
};
