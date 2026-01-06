"use client";

import React from 'react';
import { Logo } from '@/components/ui/Logo';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-bg text-text-primary font-sans selection:bg-primary/30 flex flex-col">
            <Header />

            <main className="relative z-10 flex-grow pt-32 pb-20 px-6">
                {/* Background Ambience */}
                <div className="fixed top-0 right-1/2 translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0 opacity-50" />

                <div className="container mx-auto relative z-10 max-w-4xl">
                    <div className="glass-heavy rounded-[2rem] p-8 md:p-16 border border-border-subtle relative overflow-hidden">
                        {/* Noise Texture */}
                        <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

                        {/* Header */}
                        <div className="relative z-10 mb-16 border-b border-border-subtle pb-12">
                            <Logo className="mb-8 block" />
                            <h1 className="font-serif text-4xl md:text-5xl text-text-primary mb-6">Terms of Service</h1>
                            <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-2xl">
                                Welcome to Lumina. By accessing our services, you agree to abide by the rigorous standards and protocols defined below.
                            </p>
                            <p className="text-primary/80 text-xs uppercase tracking-widest mt-6">Effective Date: December 7, 2025</p>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 space-y-12 text-text-muted font-light leading-loose">

                            <section>
                                <h2 className="text-text-primary font-serif text-2xl mb-4">1. Membership Acceptance</h2>
                                <p>
                                    Membership to Lumina is by invitation or approved application only. we reserve the absolute right to revoke membership at any time for conduct unbecoming of our community standards.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-text-primary font-serif text-2xl mb-4">2. Service Usage</h2>
                                <p>
                                    Our AI-concierge provides recommendations and booking facilitation. While we strive for perfection, Lumina acts as an intermediary and is not liable for acts or omissions of third-party service providers (airlines, hotels, private estates).
                                </p>
                            </section>

                            <section>
                                <h2 className="text-text-primary font-serif text-2xl mb-4">3. Payment & Concierge Fees</h2>
                                <p>
                                    Members agree to the annual membership fee schedule. Specialized requests may incur additional orchestration fees, which will be transparently communicated prior to execution.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-text-primary font-serif text-2xl mb-4">4. Intellectual Property</h2>
                                <p>
                                    All proprietary technology, algorithms, and curated content provided through the Lumina interface are the exclusive property of Lumina Inc.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-text-primary font-serif text-2xl mb-4">5. Governing Law</h2>
                                <p>
                                    These terms shall be governed by the laws of the State of Delaware, without regard to its conflict of law provisions.
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
