"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { experiences } from '@/data/experiences';
import { ArrowLeft, Calendar, Tag, DollarSign, MapPin, Clock, Star, Share2, Heart, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function ExperienceDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params?.slug as string;

    // Find the experience data
    const experience = experiences.find(e => e.slug === slug);

    if (!experience) {
        return (
            <div className="min-h-screen bg-bg text-text-primary flex flex-col items-center justify-center">
                <h1 className="text-4xl font-serif mb-4">Experience Not Found</h1>
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-primary hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg text-text-primary font-sans selection:bg-primary/30">
            <Header />

            {/* Hero Section */}
            <div className="relative h-[70vh] w-full overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={experience.image}
                        alt={experience.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 pb-12">
                    <div className="container mx-auto">
                        <ScrollReveal>
                            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                                            {experience.category}
                                        </span>
                                        {experience.rating && (
                                            <div className="flex items-center gap-1 text-yellow-400 text-sm font-medium">
                                                <Star className="w-4 h-4 fill-yellow-400" />
                                                <span>{experience.rating}</span>
                                                <span className="text-text-muted">({experience.reviews?.toLocaleString()} reviews)</span>
                                            </div>
                                        )}
                                    </div>
                                    <h1 className="text-5xl md:text-7xl font-serif text-white mb-2 leading-tight">
                                        {experience.title}
                                    </h1>
                                    <p className="text-xl md:text-2xl text-text-secondary font-light">
                                        {experience.subtitle}
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors backdrop-blur-md">
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                    <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors backdrop-blur-md">
                                        <Heart className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>

            <main className="relative z-10 pb-24">
                <div className="container mx-auto px-6">
                    <button
                        onClick={() => router.back()}
                        className="my-8 flex items-center gap-2 text-text-secondary hover:text-primary transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium uppercase tracking-wider">Back to Experiences</span>
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-8 space-y-12">
                            {/* Overview */}
                            <section>
                                <h2 className="text-2xl font-serif text-white mb-6">Overview</h2>
                                <div className="prose prose-invert prose-lg text-text-secondary max-w-none leading-relaxed whitespace-pre-line">
                                    {experience.description}
                                </div>
                            </section>

                            {/* Highlights */}
                            {experience.highlights && (
                                <section className="p-8 rounded-[2rem] bg-surface-50 border border-white/5">
                                    <h2 className="text-xl font-serif text-white mb-6 flex items-center gap-2">
                                        <Star className="w-5 h-5 text-primary" />
                                        Highlights
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {experience.highlights.map((highlight, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                                                <span className="text-text-secondary">{highlight}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Location Map Placeholder */}
                            <section>
                                <h2 className="text-2xl font-serif text-white mb-6">Location</h2>
                                <div className="h-[300px] w-full rounded-[2rem] bg-surface-alt border border-white/5 relative overflow-hidden flex items-center justify-center group">
                                    <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/55.2708,25.2048,11,0/800x400@2x?access_token=YOUR_TOKEN')] bg-cover bg-center opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700" />
                                    <div className="absolute inset-0 bg-black/40" />
                                    <div className="relative z-10 flex flex-col items-center gap-3">
                                        <MapPin className="w-10 h-10 text-primary" />
                                        <p className="text-white font-medium text-lg">{experience.location || "Dubai, UAE"}</p>
                                        <button className="px-6 py-2 bg-white text-black rounded-full font-bold text-sm hover:scale-105 transition-transform">
                                            Get Directions
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Sticky Sidebar */}
                        <div className="lg:col-span-4 pl-0 lg:pl-6">
                            <div className="sticky top-24 space-y-6">
                                {/* Booking Card */}
                                <div className="p-6 rounded-[2rem] bg-surface-50 border border-white/10 backdrop-blur-xl shadow-2xl">
                                    <div className="flex justify-between items-end mb-6 border-b border-white/10 pb-6">
                                        <div>
                                            <p className="text-text-secondary text-sm mb-1">Starting from</p>
                                            <span className="text-3xl font-serif text-white">{experience.price}</span>
                                        </div>
                                        <div className="px-3 py-1 rounded bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20">
                                            Available Today
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-6">
                                        <div className="p-4 rounded-xl bg-bg border border-white/5 flex items-center justify-between cursor-pointer hover:border-primary/30 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <Calendar className="w-5 h-5 text-primary" />
                                                <span className="text-white text-sm">Select Date</span>
                                            </div>
                                            <ArrowLeft className="w-4 h-4 rotate-180 text-text-muted" />
                                        </div>

                                        <div className="p-4 rounded-xl bg-bg border border-white/5 flex items-center justify-between cursor-pointer hover:border-primary/30 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <Clock className="w-5 h-5 text-primary" />
                                                <span className="text-white text-sm">Select Time</span>
                                            </div>
                                            <ArrowLeft className="w-4 h-4 rotate-180 text-text-muted" />
                                        </div>
                                    </div>

                                    <button className="w-full py-4 bg-primary text-black font-bold uppercase tracking-widest rounded-xl hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)]">
                                        Book Now
                                    </button>

                                    <p className="text-center text-xs text-text-muted mt-4">
                                        Free cancellation up to 24 hours before
                                    </p>
                                </div>

                                {/* Information Card */}
                                <div className="p-6 rounded-[2rem] bg-surface-alt border border-white/5">
                                    <h3 className="text-white font-serif mb-4">Good to Know</h3>
                                    <ul className="space-y-4">
                                        {(experience.hours) && (
                                            <li className="flex items-start gap-3">
                                                <Clock className="w-5 h-5 text-primary mt-0.5" />
                                                <div>
                                                    <span className="text-white text-sm font-medium block">Opening Hours</span>
                                                    <span className="text-text-secondary text-sm">{experience.hours}</span>
                                                </div>
                                            </li>
                                        )}
                                        <li className="flex items-start gap-3">
                                            <MapPin className="w-5 h-5 text-primary mt-0.5" />
                                            <div>
                                                <span className="text-white text-sm font-medium block">Location</span>
                                                <span className="text-text-secondary text-sm">{experience.location || "Dubai"}</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
