"use client";

import React, { useState } from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { MapPin, ArrowRight } from 'lucide-react';

const locations = [
    {
        id: 'downtown',
        name: "Downtown Dubai",
        type: "City Center",
        description: "The heart of the city, home to Burj Khalifa and Dubai Mall.",
        image: "/video-thumb-skyline.png", // Reusing skyline thumb
        coordinates: { top: '30%', left: '45%' }
    },
    {
        id: 'palm',
        name: "Palm Jumeirah",
        type: "Island",
        description: "World-famous man-made island known for luxury resorts.",
        image: "/palm-jumeirah.png",
        coordinates: { top: '20%', left: '25%' }
    },
    {
        id: 'marina',
        name: "Dubai Marina",
        type: "Waterfront",
        description: "A vibrant waterfront community with stunning skyscrapers.",
        image: "/find-relaxation.png", // Reusing relaxation image (beach club/marina feel)
        coordinates: { top: '60%', left: '20%' }
    },
    {
        id: 'desert',
        name: "Desert Reserve",
        type: "Nature",
        description: "Pristine dunes and golden sands for adventure.",
        image: "/video-thumb-desert.png", // Reusing desert thumb
        coordinates: { top: '70%', left: '70%' }
    }
];

export const MapSection: React.FC = () => {
    const [activeLocation, setActiveLocation] = useState(locations[0]);

    return (
        <section className="py-24 bg-bg relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <ScrollReveal>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
                        <div>
                            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">
                                Discover the City
                            </span>
                            <h2 className="text-4xl md:text-5xl font-serif text-text-primary">
                                Explore Destinations
                            </h2>
                        </div>
                        <a href="#" className="hidden md:flex items-center gap-2 text-primary hover:text-white transition-colors text-sm font-bold uppercase tracking-wider group">
                            View Full Map
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Featured Location Display (Map Visual Replacement) */}
                    <div className="lg:col-span-8 h-[500px] md:h-[600px] rounded-[2.5rem] relative overflow-hidden group border border-white/10 bg-surface-50 shadow-2xl">
                        {/* Background Image of Active Location */}
                        <img
                            key={activeLocation.image} // Force re-render on change for animation
                            src={activeLocation.image}
                            alt={activeLocation.name}
                            className="absolute inset-0 w-full h-full object-cover animate-pulse-slow"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />

                        {/* Interactive Pins Overlay (Simulated Map) */}
                        <div className="absolute inset-0 p-10 hidden md:block">
                            {locations.map((loc) => (
                                <button
                                    key={loc.id}
                                    onClick={() => setActiveLocation(loc)}
                                    style={{ top: loc.coordinates.top, left: loc.coordinates.left }}
                                    className={`absolute w-4 h-4 rounded-full border-2 transition-all duration-300 transform hover:scale-150 ${activeLocation.id === loc.id
                                        ? 'bg-primary border-white shadow-[0_0_20px_rgba(212,175,55,1)] scale-125'
                                        : 'bg-white/20 border-white/50 hover:bg-white hover:border-white'
                                        }`}
                                >
                                    <span className={`absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-bold uppercase tracking-widest bg-black/50 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 transition-opacity duration-300 ${activeLocation.id === loc.id ? 'opacity-100 text-white' : 'opacity-0 text-white/70'}`}>
                                        {loc.name}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Active Location Info Overlay */}
                        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                            <ScrollReveal key={activeLocation.id}>
                                <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">{activeLocation.type}</span>
                                <h3 className="text-3xl md:text-5xl font-serif text-white mb-4">{activeLocation.name}</h3>
                                <p className="text-white/80 text-lg max-w-lg mb-6 leading-relaxed font-light font-sans">{activeLocation.description}</p>
                                <button className="glass-panel px-6 py-3 rounded-full text-sm font-bold text-white uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
                                    Discover {activeLocation.name}
                                </button>
                            </ScrollReveal>
                        </div>
                    </div>

                    {/* Location List (Sidebar) */}
                    <div className="lg:col-span-4 flex flex-col gap-4 h-full">
                        {locations.map((loc, i) => (
                            <div
                                key={i}
                                onClick={() => setActiveLocation(loc)}
                                className={`p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${activeLocation.id === loc.id
                                    ? 'bg-surface-alt border-primary/50 shadow-lg'
                                    : 'glass border-border-subtle hover:bg-surface-alt/50 hover:border-text-muted/20'
                                    }`}
                            >
                                <div className="flex items-center justify-between relative z-10">
                                    <div>
                                        <h4 className={`text-xl font-serif mb-1 transition-colors ${activeLocation.id === loc.id ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'}`}>
                                            {loc.name}
                                        </h4>
                                        <p className="text-text-muted text-xs font-bold uppercase tracking-widest">{loc.type}</p>
                                    </div>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${activeLocation.id === loc.id ? 'bg-primary border-primary text-black' : 'border-border-subtle text-text-muted group-hover:border-text-primary group-hover:text-text-primary'}`}>
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="mt-auto pt-8 border-t border-border-subtle hidden lg:block">
                            <p className="text-text-muted text-sm mb-4">
                                Navigate through Dubai's diverse districts, from the bustling heart of Downtown to the serene dunes of the desert.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-left md:hidden">
                    <a href="#" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors text-sm font-bold uppercase tracking-wider">
                        View Full Map
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </section>
    );
};
