import React from 'react';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

export const HeroSection: React.FC = () => {
    return (
        <div className="relative h-screen max-md:h-[100dvh] w-full overflow-hidden flex items-center justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/hero-main.png"
                    alt="Dubai Skyline"
                    className="w-full h-full object-cover animate-pulse-slow"
                />
                {/* Cinema Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 opacity-90" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center max-w-5xl mx-auto mt-20 max-md:mt-12">
                    <ScrollReveal>
                        <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-[10px] md:text-xs font-bold tracking-[0.2em] text-white/80 uppercase mb-4 md:mb-6 backdrop-blur-md">
                            The Official Guide
                        </span>
                        <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl text-white mb-6 md:mb-8 drop-shadow-2xl leading-[1.1] md:leading-[0.9]">
                            Visit <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-white italic pr-2">Dubai</span>
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal delay={200}>
                        <p className="text-base md:text-2xl text-white/80 max-w-2xl mx-auto mb-8 md:mb-12 font-light leading-relaxed px-4">
                            Discover a city where the future is present. From ultra-luxury resorts to timeless desert adventures.
                        </p>
                    </ScrollReveal>

                    {/* Premium Search Bar */}
                    <ScrollReveal delay={400} className="w-full max-w-4xl mx-auto">
                        <div className="p-0 md:p-3 rounded-[2rem] md:rounded-full flex flex-col md:flex-row items-stretch md:items-center gap-0 md:gap-2 backdrop-blur-xl border border-white/20 shadow-2xl relative bg-black/30 md:bg-black/40 mt-8 md:mt-0 pb-8 md:pb-3">

                            {/* Search Input */}
                            <div className="flex-1 flex items-center gap-4 px-6 py-5 border-b border-white/10 md:border-none w-full md:w-auto hover:bg-white/5 transition-colors first:rounded-t-[2rem] md:rounded-3xl">
                                <Search className="w-5 h-5 text-primary shrink-0" />
                                <div className="text-left w-full">
                                    <span className="block text-[10px] text-white/60 uppercase tracking-wider font-bold mb-1">Search</span>
                                    <input
                                        type="text"
                                        placeholder="What are you looking for?"
                                        className="bg-transparent border-none outline-none text-white placeholder-white/40 text-base md:text-sm w-full font-medium p-0"
                                    />
                                </div>
                            </div>

                            {/* Dates Input */}
                            <div className="flex-1 flex items-center gap-4 px-6 py-5 border-b border-white/10 md:border-none w-full md:w-auto hover:bg-white/5 transition-colors md:rounded-3xl cursor-pointer">
                                <Calendar className="w-5 h-5 text-primary shrink-0" />
                                <div className="text-left">
                                    <span className="block text-[10px] text-white/60 uppercase tracking-wider font-bold mb-1">Dates</span>
                                    <span className="text-white text-base md:text-sm font-medium">Anytime</span>
                                </div>
                            </div>


                            {/* Guests Input */}
                            <div className="flex-1 flex items-center gap-4 px-6 py-5 w-full md:w-auto hover:bg-white/5 transition-colors rounded-b-[2rem] md:rounded-3xl cursor-pointer">
                                <Users className="w-5 h-5 text-primary shrink-0" />
                                <div className="text-left">
                                    <span className="block text-[10px] text-white/60 uppercase tracking-wider font-bold mb-1">Guests</span>
                                    <span className="text-white text-base md:text-sm font-medium">Add guests</span>
                                </div>
                            </div>

                            {/* Floating Search Button (Mobile: Center Bottom Overlay, Desktop: Right) */}
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 md:static md:bottom-auto md:left-auto md:translate-x-0 z-20">
                                <button className="bg-primary text-surface hover:bg-primary-soft hover:text-white rounded-full w-16 h-16 flex items-center justify-center shadow-[0_4px_20px_rgba(212,175,55,0.5)] hover:shadow-[0_0_40px_rgba(212,175,55,0.8)] hover:scale-110 transition-all duration-300 cursor-pointer">
                                    <Search className="w-7 h-7" />
                                </button>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>

            {/* Bottom Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
                <span className="text-[10px] uppercase tracking-widest text-white/60">Explore</span>
                <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent" />
            </div>
        </div>
    );
};
