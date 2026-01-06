"use client";

import React from 'react';
import { Plus, ArrowUpRight, MapPin, CalendarDays, Compass } from 'lucide-react';

const FEATURED_TRIP = {
    id: 1,
    city: 'Miami',
    country: 'United States',
    dates: 'June 6 - 9, 2025',
    status: 'Upcoming',
    image: 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?q=80&w=2000&auto=format&fit=crop',
    excerpt: 'Design Week delegation. 4 confirmed events.'
};

const PAST_TRIPS = [
    {
        id: 2,
        city: 'Kyoto',
        country: 'Japan',
        dates: 'Oct 2025',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop',
    },
    {
        id: 3,
        city: 'Paris',
        country: 'France',
        dates: 'Feb 2025',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop',
    },
    {
        id: 4,
        city: 'Amalfi',
        country: 'Italy',
        dates: 'Aug 2024',
        image: 'https://images.unsplash.com/photo-1533904350360-ea9361937c0f?q=80&w=2000&auto=format&fit=crop',
    }
];

export default function TripsPage() {
    return (
        <div className="space-y-10 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-border-subtle dark:border-white/5 pb-6">
                <div>
                    <span className="text-primary text-[10px] uppercase tracking-[0.3em] pl-1 mb-1 block">Expeditions</span>
                    <h1 className="text-3xl md:text-4xl font-serif text-text-primary dark:text-white leading-tight">My Journeys</h1>
                </div>
                <button className="group flex items-center gap-2 px-6 py-3 rounded-full bg-text-primary dark:bg-white text-bg dark:text-black hover:bg-primary dark:hover:bg-white/90 transition-all font-medium uppercase tracking-widest text-[10px]">
                    <Plus className="w-3 h-3 transition-transform group-hover:rotate-90" />
                    Curate New
                </button>
            </div>

            {/* Featured Trip (Hero) - Compact */}
            <section className="relative group cursor-pointer">
                <div className="relative h-[280px] w-full rounded-[1.5rem] overflow-hidden">
                    <img
                        src={FEATURED_TRIP.image}
                        alt={FEATURED_TRIP.city}
                        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

                    {/* Floating Badge */}
                    <div className="absolute top-6 right-6">
                        <span className="px-3 py-1.5 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white text-[10px] uppercase tracking-widest">
                            Next Adventure
                        </span>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 p-8 w-full max-w-2xl">
                        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-700 delay-100">
                            <div className="flex items-center gap-4 text-white/60 text-xs tracking-widest mb-2 uppercase">
                                <span className="flex items-center gap-1.5 text-primary border-b border-primary/20 pb-0.5">{FEATURED_TRIP.dates}</span>
                                <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {FEATURED_TRIP.country}</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif text-white mb-3 leading-none tracking-tight">
                                {FEATURED_TRIP.city}
                            </h2>
                            <p className="text-sm text-white/70 font-light max-w-lg leading-relaxed border-l border-white/20 pl-4 truncate">
                                {FEATURED_TRIP.excerpt}
                            </p>
                        </div>
                    </div>

                    {/* View Button */}
                    <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white hover:text-black hover:scale-110">
                        <ArrowUpRight className="w-5 h-5" />
                    </div>
                </div>
            </section>

            {/* Past Collections - Compact Grid */}
            <section className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-6 h-[1px] bg-border-subtle dark:bg-white/20" />
                    <h3 className="text-text-muted dark:text-white/40 text-xs uppercase tracking-[0.2em]">Past Collections</h3>
                    <div className="flex-1 h-[1px] bg-border-subtle dark:bg-white/10" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {PAST_TRIPS.map((trip) => (
                        <div key={trip.id} className="group relative cursor-pointer bg-surface-alt dark:bg-white/5 p-3 rounded-2xl border border-border-subtle dark:border-white/5 flex gap-4 items-center transition-all duration-500 hover:border-primary/50 hover:bg-surface dark:hover:bg-white/10 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10">
                            <div className="w-20 h-20 rounded-xl overflow-hidden relative shrink-0">
                                <img
                                    src={trip.image}
                                    alt={trip.city}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>

                            <div className="flex-1 space-y-1">
                                <span className="text-[10px] text-primary uppercase tracking-widest">{trip.dates}</span>
                                <h4 className="text-xl font-serif text-text-primary dark:text-white group-hover:translate-x-1 transition-transform duration-300">{trip.city}</h4>
                                <p className="text-text-muted dark:text-white/40 text-[10px] uppercase tracking-wide">{trip.country}</p>
                            </div>

                            <ArrowUpRight className="w-4 h-4 text-text-muted dark:text-white/20 group-hover:text-text-primary dark:group-hover:text-white transition-colors group-hover:rotate-45" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Discovery Link */}
            <div className="py-8 border-t border-border-subtle dark:border-white/5 text-center cursor-pointer group hover:bg-surface-alt dark:hover:bg-white/5 transition-colors rounded-2xl">
                <p className="text-text-muted dark:text-white/40 text-[10px] uppercase tracking-[0.3em] mb-3 group-hover:text-primary transition-colors">Discover More</p>
                <div className="flex items-center justify-center gap-2">
                    <Compass className="w-5 h-5 text-text-primary dark:text-white group-hover:rotate-180 transition-transform duration-700" />
                    <span className="text-xl font-serif text-text-primary dark:text-white italic">Explore Curated Destinations</span>
                </div>
            </div>
        </div>
    );
}
