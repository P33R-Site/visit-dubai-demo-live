"use client";

import React from 'react';
import { Plane, Calendar as CalendarIcon, MapPin, Clock, ArrowUpRight } from 'lucide-react';

export default function ItineraryPage() {
    return (
        <div className="space-y-12 pb-20">
            {/* Cinematic Hero Header */}
            <div className="relative h-[400px] w-full rounded-[2rem] overflow-hidden group">
                <img
                    src="https://images.unsplash.com/photo-1535498730771-e735b998cd64?q=80&w=2000&auto=format&fit=crop"
                    alt="Miami Design Week"
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-10 left-10 max-w-2xl">
                    <span className="px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-white/80 text-xs uppercase tracking-widest backdrop-blur-md mb-4 inline-block">
                        Current Trip
                    </span>
                    <h1 className="text-5xl md:text-6xl font-serif text-white mb-4 leading-tight">
                        Miami Design Week
                    </h1>
                    <div className="flex items-center gap-6 text-white/60 text-sm tracking-wide">
                        <span className="flex items-center gap-2"><CalendarIcon className="w-4 h-4" /> June 6 - 9, 2025</span>
                        <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Miami, Florida</span>
                    </div>
                </div>

                <div className="absolute bottom-10 right-10 flex gap-3">
                    <button className="h-12 w-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all flex items-center justify-center backdrop-blur-md border border-white/20">
                        <ArrowUpRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Timeline - Elegant & Minimal */}
                <div className="lg:col-span-8 space-y-16">

                    {/* Day 01 */}
                    <div className="relative border-l border-border-subtle dark:border-white/10 pl-8 ml-4">
                        <div className="absolute -left-1.5 top-0 w-3 h-3 bg-primary rounded-full ring-4 ring-bg" />

                        <div className="mb-8">
                            <h2 className="text-3xl font-serif text-text-primary dark:text-white">Day 01</h2>
                            <p className="text-text-muted dark:text-white/40 uppercase tracking-widest text-sm mt-1">Friday, June 6</p>
                        </div>

                        <div className="space-y-8">
                            {/* Flight Card */}
                            <div className="glass-panel p-6 rounded-2xl flex items-center gap-6 group hover:bg-surface-alt dark:hover:bg-white/5 transition-colors cursor-pointer border border-border-subtle dark:border-white/5">
                                <div className="w-16 h-16 rounded-full bg-surface-alt dark:bg-white/5 flex items-center justify-center shrink-0">
                                    <Plane className="w-6 h-6 text-text-muted dark:text-white/60 group-hover:text-primary transition-colors" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-medium text-text-primary dark:text-white">Flight to Miami (MIA)</h3>
                                            <p className="text-text-muted dark:text-white/40 text-sm mt-1">American Airlines • AA 294 • First Class</p>
                                        </div>
                                        <span className="text-text-primary dark:text-white small-caps">10:00 AM</span>
                                    </div>
                                </div>
                            </div>

                            {/* Hotel Check-In */}
                            <div className="glass-panel p-0 rounded-2xl overflow-hidden group cursor-pointer border border-border-subtle dark:border-white/5">
                                <div className="grid grid-cols-3 h-40">
                                    <div className="col-span-1 relative overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Hotel" />
                                    </div>
                                    <div className="col-span-2 p-6 flex flex-col justify-center bg-surface/50 dark:bg-transparent">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-medium text-text-primary dark:text-white">Check-in: The Setai</h3>
                                            <span className="text-text-primary dark:text-white small-caps">03:00 PM</span>
                                        </div>
                                        <p className="text-text-muted dark:text-white/40 text-sm mb-4">Ocean View Suite • Confirmed</p>
                                        <div className="flex gap-4">
                                            <span className="text-xs border border-border-subtle dark:border-white/10 px-3 py-1 rounded-full text-text-secondary dark:text-white/60">Early Check-in Requested</span>
                                            <span className="text-xs border border-border-subtle dark:border-white/10 px-3 py-1 rounded-full text-text-secondary dark:text-white/60">Champagne on Arrival</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day 02 */}
                    <div className="relative border-l border-border-subtle dark:border-white/10 pl-8 ml-4">
                        <div className="absolute -left-1.5 top-0 w-3 h-3 bg-surface-alt dark:bg-white/20 rounded-full ring-4 ring-bg" />

                        <div className="mb-8">
                            <h2 className="text-3xl font-serif text-text-primary dark:text-white">Day 02</h2>
                            <p className="text-text-muted dark:text-white/40 uppercase tracking-widest text-sm mt-1">Saturday, June 7</p>
                        </div>

                        <div className="space-y-8">
                            <div className="glass-panel p-6 rounded-2xl flex items-center gap-6 group hover:bg-surface-alt dark:hover:bg-white/5 transition-colors cursor-pointer border border-border-subtle dark:border-white/5">
                                <div className="w-16 h-16 rounded-full bg-surface-alt dark:bg-white/5 flex items-center justify-center shrink-0">
                                    <MapPin className="w-6 h-6 text-text-muted dark:text-white/60 group-hover:text-primary transition-colors" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-medium text-text-primary dark:text-white">Private Design District Tour</h3>
                                            <p className="text-text-muted dark:text-white/40 text-sm mt-1">Guided by Elena Rossi • 3 Hours</p>
                                        </div>
                                        <span className="text-text-primary dark:text-white small-caps">11:00 AM</span>
                                    </div>
                                </div>
                            </div>

                            {/* Restaurant Reservation */}
                            <div className="glass-panel p-6 rounded-2xl flex items-center gap-6 group hover:bg-surface-alt dark:hover:bg-white/5 transition-colors cursor-pointer border border-border-subtle dark:border-white/5 relative overflow-hidden">
                                <div className="absolute inset-0">
                                    <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity" alt="Dinner" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-transparent" />
                                </div>
                                <div className="relative w-16 h-16 rounded-full border border-border-subtle dark:border-white/10 flex items-center justify-center shrink-0 backdrop-blur-md bg-surface-alt/50 dark:bg-transparent">
                                    <Clock className="w-6 h-6 text-text-primary dark:text-white/80" />
                                </div>
                                <div className="flex-1 relative">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-serif text-text-primary dark:text-white">Dinner at Komodo</h3>
                                            <p className="text-text-muted dark:text-white/40 text-sm mt-1">Reservation for 2 • Main Dining Room</p>
                                        </div>
                                        <span className="text-text-primary dark:text-white small-caps">08:00 PM</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Sidebar - Quick Facts */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="glass-panel p-8 rounded-[2rem] border border-border-subtle dark:border-white/5">
                        <h3 className="text-lg font-serif text-text-primary dark:text-white mb-6">Trip Summary</h3>

                        <div className="space-y-6">
                            <div className="flex justify-between items-center py-4 border-b border-border-subtle dark:border-white/5">
                                <span className="text-text-muted dark:text-white/40 text-sm">Weather</span>
                                <span className="text-text-primary dark:text-white font-medium">84° Sunny</span>
                            </div>
                            <div className="flex justify-between items-center py-4 border-b border-border-subtle dark:border-white/5">
                                <span className="text-text-muted dark:text-white/40 text-sm">Transportation</span>
                                <span className="text-text-primary dark:text-white font-medium">Black SUV</span>
                            </div>
                            <div className="flex justify-between items-center py-4 border-b border-border-subtle dark:border-white/5">
                                <span className="text-text-muted dark:text-white/40 text-sm">Concierge</span>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-text-primary dark:text-white font-medium">Active</span>
                                </div>
                            </div>
                        </div>

                        <button className="w-full mt-8 py-4 rounded-xl bg-text-primary dark:bg-white text-bg dark:text-black font-medium hover:bg-primary dark:hover:bg-white/90 transition-colors uppercase tracking-widest text-xs">
                            Download Itinerary PDF
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
