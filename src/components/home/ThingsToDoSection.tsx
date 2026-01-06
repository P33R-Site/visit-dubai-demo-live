import React from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArrowUpRight } from 'lucide-react';

import { experiences } from '@/data/experiences';
import Link from 'next/link';

const activities = experiences.filter(e => e.type === 'activity').slice(0, 4);

export const ThingsToDoSection: React.FC = () => {
    return (
        <section className="py-32 bg-bg relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <ScrollReveal>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                        <div>
                            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">
                                Curated Experiences
                            </span>
                            <h2 className="text-4xl md:text-5xl font-serif text-text-primary leading-tight">
                                Top 4 things to do <br />
                                <span className="text-text-muted italic">this week</span>
                            </h2>
                        </div>
                        <p className="text-text-secondary max-w-sm hidden md:block text-sm leading-relaxed">
                            Handpicked selections for the discerning traveler. Experience the very best Dubai has to offer, from heights to heritage.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {activities.map((activity, index) => (
                        <ScrollReveal key={index} delay={index * 100} className="h-full">
                            <Link href={`/experience/${activity.slug}`} className="block h-full">
                                <div className="group relative h-[500px] overflow-hidden rounded-[2rem] cursor-pointer border border-white/5 bg-surface-50" style={{ WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}>
                                    {/* Image Layer */}
                                    <img
                                        src={activity.image}
                                        alt={activity.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                    {/* Content Content */}
                                    <div className="absolute inset-0 p-8 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <div className="glass px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                                                <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                                                    {activity.category}
                                                </span>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 border border-white/20 text-white">
                                                <ArrowUpRight className="w-5 h-5" />
                                            </div>
                                        </div>

                                        <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                                            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                                {activity.subtitle}
                                            </p>
                                            <h3 className="text-2xl font-serif text-white mb-2 leading-tight">
                                                {activity.title}
                                            </h3>
                                            <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                                <span className="text-white/60 text-xs">Starting from</span>
                                                <span className="text-white font-medium text-sm border-b border-primary/50 pb-0.5">
                                                    {activity.price}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};
