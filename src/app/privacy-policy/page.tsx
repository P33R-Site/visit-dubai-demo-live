"use client";

import React from 'react';
import { Logo } from '@/components/ui/Logo';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';

export default function PrivacyPolicy() {
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
                            <h1 className="font-serif text-4xl md:text-5xl text-text-primary mb-6">Privacy Policy</h1>
                            <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-2xl">
                                At Lumina, privacy is the ultimate luxury. We are committed to protecting your personal data with the same rigorous standards we apply to our concierge services.
                            </p>
                            <p className="text-primary/80 text-xs uppercase tracking-widest mt-6">Last Updated: December 7, 2025</p>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 space-y-12 text-text-muted font-light leading-loose">

                            <section>
                                <h2 className="text-text-primary font-serif text-2xl mb-4">1. Information Collection</h2>
                                <p className="mb-4">
                                    We collect minimal personal information necessary to provide our exclusive services. This may include your name, contact details, payment information, and specific preferences related to specialized requests.
                                </p>
                                <ul className="list-disc pl-5 space-y-2 marker:text-primary">
                                    <li>Identity Data (Name, Title, DOB)</li>
                                    <li>Contact Data (Email, Phone, Address)</li>
                                    <li>Financial Data (Payment details, Transaction history)</li>
                                    <li>Lifestyle Data (Travel preferences, dietary requirements)</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-text-primary font-serif text-2xl mb-4">2. Usage of Information</h2>
                                <p>
                                    Your data is used solely to orchestrate your requests and enhance your membership experience. We do not sell, rent, or trade your personal information to third parties. Data processing involves secure algorithms to tailor our recommendations to your unique profile.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-text-primary font-serif text-2xl mb-4">3. Data Security</h2>
                                <p>
                                    We employ enterprise-grade encryption and security protocols to safeguard your data. Access is strictly limited to authorized personnel and vetted partners essential to service fulfillment.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-text-primary font-serif text-2xl mb-4">4. Your Rights</h2>
                                <p>
                                    As a member, you retain full control over your data. You may request access, correction, or deletion of your personal information at any time by contacting your dedicated concierge or our data protection officer.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-text-primary font-serif text-2xl mb-4">5. Contact Us</h2>
                                <p>
                                    For privacy-related inquiries, please contact us securely at:<br />
                                    <a href="mailto:privacy@lumina.inc" className="text-primary hover:text-text-primary transition-colors border-b border-primary/30 pb-0.5">privacy@lumina.inc</a>
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
