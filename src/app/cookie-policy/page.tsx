"use client";

import React from 'react';
import { Logo } from '@/components/ui/Logo';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';

export default function CookiePolicy() {
    return (
        <div className="min-h-screen bg-bg text-text-primary font-sans selection:bg-primary/30 flex flex-col">
            <Header />

            <main className="relative z-10 flex-grow pt-32 pb-20 px-6">
                {/* Background Ambience */}
                <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0 opacity-50" />

                <div className="container mx-auto relative z-10 max-w-4xl">
                    <div className="glass-heavy rounded-[2rem] p-8 md:p-16 border border-border-subtle relative overflow-hidden">
                        {/* Noise Texture */}
                        <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

                        {/* Header */}
                        <div className="relative z-10 mb-16 border-b border-border-subtle pb-12">
                            <Logo className="mb-8 block" />
                            <h1 className="font-serif text-4xl md:text-5xl text-text-primary mb-6">Cookie Policy</h1>
                            <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-2xl">
                                We use cookies to enhance your digital experience, ensuring our platform remembers your preferences and anticipates your needs.
                            </p>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 space-y-12 text-text-muted font-light leading-loose">

                            <section>
                                <h2 className="text-text-primary font-serif text-2xl mb-4">1. What Are Cookies?</h2>
                                <p>
                                    Cookies are small data files stored on your device that allow our neural networks to recognize you and provide a seamless, personalized interface.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-text-primary font-serif text-2xl mb-4">2. Types of Cookies We Use</h2>
                                <ul className="list-disc pl-5 space-y-4 marker:text-primary">
                                    <li>
                                        <strong className="text-text-primary">Essential Cookies:</strong> Vital for the platform's core functionality and security.
                                    </li>
                                    <li>
                                        <strong className="text-text-primary">Preference Cookies:</strong> Remember your language, currency, and travel settings.
                                    </li>
                                    <li>
                                        <strong className="text-text-primary">Analytics Cookies:</strong> Help us understand how you interact with our concierge interface to improve performance.
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-text-primary font-serif text-2xl mb-4">3. Managing Your Preferences</h2>
                                <p>
                                    You can control your cookie preferences through your browser settings. However, disabling certain cookies may limit the intelligent features of the Lumina platform.
                                </p>
                            </section>

                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
