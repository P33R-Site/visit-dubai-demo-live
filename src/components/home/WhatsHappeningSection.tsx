import React from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArrowUpRight, Calendar, Star } from 'lucide-react';

import { experiences } from '@/data/experiences';
import Link from 'next/link';

const featuredEvent = experiences.find(e => e.slug === 'atlantis-royal') || experiences[0];
const subEvents = experiences.filter(e => e.type === 'event' && e.slug !== 'atlantis-royal').slice(0, 4);

export const WhatsHappeningSection: React.FC = () => {
    return (
        <section className="py-24 bg-bg relative">
            <div className="container mx-auto px-6">
                <ScrollReveal>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="w-8 h-[1px] bg-primary"></span>
                                <span className="text-primary font-bold tracking-widest uppercase text-xs">Trending Now</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif text-text-primary">
                                What's happening <span className="italic text-primary">new</span>
                            </h2>
                        </div>
                        <a href="#" className="hidden md:flex items-center gap-2 text-text-primary hover:text-primary transition-colors group">
                            <span className="uppercase tracking-widest text-xs font-bold">View Full Calendar</span>
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[600px] lg:h-[500px]">
                    {/* Main Featured Item */}
                    <div className="lg:col-span-7 h-full">
                        <ScrollReveal className="h-full">
                            <div className="relative h-full rounded-[2rem] overflow-hidden group cursor-pointer shadow-2xl" style={{ WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}>
                                <Link href={`/experience/${featuredEvent.slug}`} className="block h-full">
                                    <img
                                        src={featuredEvent.image}
                                        alt={featuredEvent.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

                                    <div className="absolute top-6 left-6 flex gap-3">
                                        <div className="glass px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md bg-primary/20">
                                            <span className="text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1">
                                                <Star className="w-3 h-3 fill-white" /> {featuredEvent.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 p-8 w-full">
                                        <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                                            <h3 className="text-4xl md:text-5xl font-serif text-white mb-4 leading-tight">
                                                {featuredEvent.title}
                                            </h3>
                                            <p className="text-white/70 max-w-md text-sm md:text-base leading-relaxed mb-6 line-clamp-2">
                                                {featuredEvent.description}
                                            </p>
                                            <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 text-white">
                                                <ArrowUpRight className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Side Grid Items */}
                    <div className="lg:col-span-5 grid grid-cols-2 gap-4 h-full">
                        {subEvents.map((event, index) => (
                            <ScrollReveal key={index} delay={index * 100 + 200} className="relative rounded-[1.5rem] overflow-hidden group cursor-pointer bg-surface-alt" style={{ WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}>
                                <Link href={`/experience/${event.slug}`} className="block h-full w-full">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />

                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100">
                                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                                            <ArrowUpRight className="w-4 h-4" />
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 p-5 w-full">
                                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1 block">
                                            {event.category}
                                        </span>
                                        <h4 className="text-lg font-serif text-white leading-tight mb-2">
                                            {event.title}
                                        </h4>
                                        <div className="flex items-center gap-2 text-white/50 text-xs">
                                            <Calendar className="w-3 h-3" />
                                            <span>{event.date}</span>
                                        </div>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>

                <div className="mt-8 text-left md:hidden">
                    <a href="#" className="inline-flex items-center gap-2 text-primary hover:text-text-primary transition-colors">
                        <span className="uppercase tracking-widest text-xs font-bold">View Full Calendar</span>
                        <ArrowUpRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </section>
    );
};
