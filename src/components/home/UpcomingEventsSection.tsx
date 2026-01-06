"use client";

import React from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Calendar, ArrowRight, MapPin } from 'lucide-react';

import { experiences } from '@/data/experiences';
import Link from 'next/link';

const eventIds = ['dubai-shopping-festival', 'art-dubai', 'dubai-world-cup'];
const eventsData = eventIds.map(id => experiences.find(e => e.id === id)).filter(Boolean);

// Helpers to format date like "15" and "Dec"
const getDay = (str?: string) => str ? str.split(' ')[1].replace('-', '') : '01'; // approximate generic parser
const getMonth = (str?: string) => str ? str.split(' ')[0] : 'JAN';

const events = eventsData.map(e => ({
    title: e!.title,
    date: e!.date,
    day: e!.id === 'dubai-shopping-festival' ? '15' : (e!.id === 'art-dubai' ? '01' : '25'), // Hardcoded for visual consistency w/ mock
    month: e!.id === 'dubai-shopping-festival' ? 'Dec' : 'Mar',
    image: e!.image,
    category: e!.category,
    location: e!.location,
    slug: e!.slug
}));

export const UpcomingEventsSection: React.FC = () => {
    return (
        <section className="py-24 bg-bg relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <ScrollReveal>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
                        <div>
                            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">
                                Save the Date
                            </span>
                            <h2 className="text-4xl md:text-5xl font-serif text-text-primary">
                                Upcoming Events
                            </h2>
                        </div>
                        <a href="#" className="hidden md:flex items-center gap-2 text-primary hover:text-text-primary transition-colors text-sm font-bold uppercase tracking-wider group">
                            View Full Calendar
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {events.map((event, index) => (
                        <ScrollReveal key={index} delay={index * 150}>
                            <Link href={`/experience/${event.slug}`} className="block">
                                <div className="group relative h-[450px] rounded-[2rem] overflow-hidden cursor-pointer bg-surface-alt" style={{ WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}>
                                    {/* Image Background */}
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                                    {/* Date Badge (Floating) */}
                                    <div className="absolute top-6 left-6 glass-panel p-3 rounded-2xl flex flex-col items-center justify-center min-w-[70px] border border-white/10 shadow-lg group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
                                        <span className="text-xs font-bold uppercase tracking-wider text-white/60 group-hover:text-white/80">{event.month}</span>
                                        <span className="text-2xl font-serif font-bold text-white">{event.day}</span>
                                    </div>

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                        <span className="inline-flex items-center gap-2 text-[10px] text-primary font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full glass border border-white/10 bg-white/5 backdrop-blur-md">
                                            <Calendar className="w-3 h-3" />
                                            {event.category}
                                        </span>
                                        <h3 className="text-2xl font-serif text-white mb-2 leading-tight group-hover:text-primary-light transition-colors">
                                            {event.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-white/50 text-sm">
                                            <MapPin className="w-4 h-4" />
                                            <span>{event.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>

                <div className="mt-8 text-left md:hidden">
                    <a href="#" className="inline-flex items-center gap-2 text-primary hover:text-text-primary transition-colors text-sm font-bold uppercase tracking-wider">
                        View Full Calendar
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </section>
    );
};
