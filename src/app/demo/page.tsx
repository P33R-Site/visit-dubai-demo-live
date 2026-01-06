"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { DEMO_SCRIPT, ScriptStep } from '@/components/demo/demo-data';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, ArrowRight, Play, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { FlightWidget } from '@/components/dashboard/FlightWidget';
import { StayWidget } from '@/components/dashboard/StayWidget';
import { RideWidget } from '@/components/dashboard/RideWidget';
import { ActivityWidget } from '@/components/dashboard/ActivityWidget';
import { CalendarWidget } from '@/components/dashboard/CalendarWidget';
import { DashboardState } from '@/components/val8/Dashboard';

// --- Widget Wrapper for Animation ---
const WidgetContainer = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
);

const DEMO_DATA: DashboardState = {
    flight: {
        origin: "SFO",
        destination: "DXB",
        carrier: "Emirates",
        class: "First Class",
        date: "June 5 - June 9",
        flightNumber: "EK 226",
        price: "$6,200"
    },
    stay: {
        hotelName: "Burj Al Arab",
        roomType: "Royal Suite",
        guests: 2,
        checkIn: "June 6",
        checkOut: "June 9",
        price: "$15,000"
    },
    ride: {
        pickup: "Dubai Int'l (DXB)",
        serviceLevel: "Luxury",
        dropoff: "Burj Al Arab",
        price: "Included"
    },
    weather: {
        unit: 'F',
        alerts: false
    },
    location: {
        current: "Dubai, UAE"
    },
    timezone: {
        primary: "Gulf Standard Time",
        secondary: "Pacific Standard Time"
    }
};

export default function DemoPage() {
    const { speak, isSpeaking, stop } = useTextToSpeech();
    const [currentStepId, setCurrentStepId] = useState<string>('start');
    const [history, setHistory] = useState<string[]>([]);

    // Auto-start mechanic
    const [hasStarted, setHasStarted] = useState(false);

    // Active widgets state for grid accumulation
    const [visibleWidgets, setVisibleWidgets] = useState<string[]>([]);

    const step = DEMO_SCRIPT[currentStepId];

    // Effect to handle system speaking when step changes
    useEffect(() => {
        if (!hasStarted) return;

        if (step) {
            // Small delay to feel natural
            const timeout = setTimeout(() => {
                speak(step.text, () => {
                    // On finished speaking

                    // 1. Reveal Widget (if any)
                    if (step.triggerWidget && step.triggerWidget !== 'none') {
                        setVisibleWidgets((prev) => {
                            if (prev.includes(step.triggerWidget!)) return prev;
                            return [...prev, step.triggerWidget!];
                        });
                    }

                    // 2. Auto-advance (if needed)
                    if (step.autoAdvance && step.nextStepId) {
                        setCurrentStepId(step.nextStepId);
                    }
                });
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [currentStepId, hasStarted, speak, step]);

    const handleOptionClick = (nextId: string) => {
        if (isSpeaking) stop();
        setHistory([...history, currentStepId]);
        setCurrentStepId(nextId);
    };

    const startDemo = () => {
        setHasStarted(true);
    };

    const resetDemo = () => {
        stop();
        setHasStarted(false);
        setCurrentStepId('start');
        setHistory([]);
        setVisibleWidgets([]);
    };

    // --- Render Logic for Widgets ---
    // Returns the grid item for a specific widget ID
    const renderWidget = (widgetId: string) => {
        switch (widgetId) {
            case 'flights':
                return (
                    <WidgetContainer key="flights" className="md:col-span-8 h-full">
                        <div className="glass-card rounded-3xl overflow-hidden h-full">
                            <FlightWidget data={DEMO_DATA.flight} />
                        </div>
                    </WidgetContainer>
                );
            case 'hotel':
                return (
                    <WidgetContainer key="hotel" className="md:col-span-4 h-full">
                        <div className="glass-card rounded-3xl overflow-hidden h-full">
                            <StayWidget data={DEMO_DATA.stay} />
                        </div>
                    </WidgetContainer>
                );
            case 'ride':
                return (
                    <WidgetContainer key="ride" className="md:col-span-4 h-full">
                        <div className="glass-card rounded-3xl overflow-hidden h-full">
                            <RideWidget data={DEMO_DATA.ride} />
                        </div>
                    </WidgetContainer>
                );
            case 'dining':
                return (
                    <WidgetContainer key="dining" className="md:col-span-4 h-full">
                        <div className="glass-card rounded-3xl overflow-hidden h-full">
                            <ActivityWidget
                                title="Waterfront Kitchen"
                                subtitle="$30-50 | American"
                                image="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop"
                                category="Dining"
                            />
                        </div>
                    </WidgetContainer>
                );
            case 'shopping':
                return (
                    <WidgetContainer key="shopping" className="md:col-span-4 h-full">
                        <div className="glass-card rounded-3xl overflow-hidden h-full">
                            <ActivityWidget
                                title="SPF 50 Sunscreen"
                                subtitle="124k ratings"
                                price="$8.97"
                                image="https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=2070&auto=format&fit=crop"
                                category="Shopping"
                            />
                        </div>
                    </WidgetContainer>
                );
            case 'experiences':
                return (
                    <WidgetContainer key="experiences" className="md:col-span-8 h-full">
                        <div className="glass-card rounded-3xl overflow-hidden h-full">
                            <ActivityWidget
                                title="Sunrise Paddle Boarding"
                                subtitle="Guided Tour"
                                image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop"
                                category="Experiences"
                            />
                        </div>
                    </WidgetContainer>
                );
            case 'itinerary':
            case 'summary':
                // Check if we already rendered one of them to avoid duplicates if logic allows both
                return (
                    <WidgetContainer key="summary" className="md:col-span-4 h-full">
                        <div className="glass-card rounded-3xl overflow-hidden h-full">
                            <CalendarWidget />
                        </div>
                    </WidgetContainer>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-bg relative overflow-x-hidden flex flex-col items-center justify-start p-6">

            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none fixed">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
            </div>

            {/* Header / Exit */}
            <div className="absolute top-6 left-6 z-50 fixed">
                <Link href="/dashboard" className="text-white/40 hover:text-white text-xs uppercase tracking-widest flex items-center gap-2">
                    <ArrowRight className="w-3 h-3 rotate-180" /> Exit Demo
                </Link>
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-8 pt-12 pb-24">

                {/* 1. VISUALIZER (The "Voice") */}
                <div className="fixed top-6 right-6 z-50 flex items-center gap-4">
                    {hasStarted && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-black/40 backdrop-blur-md rounded-full px-6 py-2 border border-white/10 flex items-center gap-3"
                        >
                            <div className="flex gap-1 items-center h-4">
                                {[1, 2, 3, 4, 3, 2, 1].map((i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ height: isSpeaking ? [4, 12, 4] : 4 }}
                                        transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                                        className="w-0.5 bg-primary rounded-full"
                                    />
                                ))}
                            </div>
                            <span className="text-white/60 text-xs font-mono uppercase">Lumine AI Recording</span>
                        </motion.div>
                    )}
                </div>


                {/* 2. CAPTION AREA (Centered Top) */}
                <div className="w-full max-w-2xl text-center space-y-8 min-h-[160px] flex flex-col justify-center">

                    {/* Visualizer Circle (Only for Start) */}
                    {!hasStarted && (
                        <div className="mx-auto relative mb-8">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/20 blur-2xl rounded-full" />
                            <div className="w-24 h-24 rounded-full border border-primary/30 flex items-center justify-center bg-black/40 backdrop-blur-md relative z-10 mx-auto">
                                <Play className="w-8 h-8 text-primary ml-1" />
                            </div>
                        </div>
                    )}

                    {/* Caption */}
                    <AnimatePresence mode="wait">
                        {hasStarted && (
                            <motion.p
                                key={step?.text}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-2xl md:text-3xl font-serif text-white/90 leading-relaxed"
                            >
                                "{step?.text}"
                            </motion.p>
                        )}
                    </AnimatePresence>


                    {/* User Interaction Area */}
                    {!hasStarted ? (
                        <button
                            onClick={startDemo}
                            className="bg-primary text-surface px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-white transition-colors mx-auto"
                        >
                            Start Demo
                        </button>
                    ) : (
                        <div className="flex gap-4 justify-center">
                            {step?.options && step.options.map((opt) => (
                                <button
                                    key={opt.label}
                                    onClick={() => handleOptionClick(opt.nextStepId)}
                                    className={`
                                        px-6 py-2 rounded-full border transition-all duration-300
                                        ${isSpeaking
                                            ? 'border-white/10 text-white/20 cursor-not-allowed hidden'
                                            : 'border-primary text-primary hover:bg-primary hover:text-surface'}
                                    `}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* 3. DYNAMIC WIDGET GRID */}
                <div className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[180px]">
                        <AnimatePresence>
                            {visibleWidgets.map((widgetId) => renderWidget(widgetId))}
                        </AnimatePresence>
                    </div>
                </div>

                {hasStarted && (
                    <button onClick={resetDemo} className="text-xs text-white/20 hover:text-white/60 flex items-center gap-2 mt-8">
                        <RotateCcw className="w-3 h-3" /> Reset
                    </button>
                )}

            </div>
        </div>
    );
}
