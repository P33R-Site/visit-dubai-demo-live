"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { AgentHeader } from '@/components/aspire/AgentHeader';
import { IncomingCallCard } from '@/components/aspire/IncomingCallCard';
import { ClientProfilePanel } from '@/components/aspire/ClientProfilePanel';
import { AIAssistPanel } from '@/components/aspire/AIAssistPanel';
import { BookingBuilder } from '@/components/aspire/BookingBuilder';
import { QuickActionsBar } from '@/components/aspire/QuickActionsBar';
import {
    DEMO_CLIENT,
    DEMO_SCRIPT,
    QUEUED_CALLS,
    AISuggestion,
    BookingItem,
    DemoStep
} from '@/data/aspire-demo-data';
import { Phone, Star, Crown, Gem, X, User, ChevronRight, CheckCircle, Send } from 'lucide-react';

export default function AspireDemoPage() {
    const { speak, stop } = useTextToSpeech();

    // Demo state
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentStepIndex, setCurrentStepIndex] = useState(-1);

    // UI state
    const [showIncomingCall, setShowIncomingCall] = useState(false);
    const [callAccepted, setCallAccepted] = useState(false);
    const [showClient, setShowClient] = useState(false);
    const [isAIListening, setIsAIListening] = useState(false);
    const [aiSuggestions, setAiSuggestions] = useState<AISuggestion[]>([]);
    const [bookingItems, setBookingItems] = useState<BookingItem[]>([]);
    const [addedSuggestionIds, setAddedSuggestionIds] = useState<string[]>([]);
    const [showSavings, setShowSavings] = useState(false);

    // Profile sidebar state
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // Call ended / Quote sent state
    const [quoteSent, setQuoteSent] = useState(false);
    const [callEnded, setCallEnded] = useState(false);

    // Call timer
    const [callDuration, setCallDuration] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Format call duration
    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Calculate totals
    const calculateTotal = () => {
        const total = bookingItems.reduce((sum, item) => {
            const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
            return sum + (isNaN(price) ? 0 : price);
        }, 0);
        return `$${total.toLocaleString()}`;
    };

    // Handle adding suggestion to booking
    const handleAddSuggestion = (suggestion: AISuggestion) => {
        if (addedSuggestionIds.includes(suggestion.id)) return;

        const newItem: BookingItem = {
            id: `b-${suggestion.id}`,
            type: suggestion.type,
            title: suggestion.title,
            subtitle: suggestion.subtitle,
            date: 'June 28-July 2, 2025',
            price: suggestion.price,
            status: 'confirmed'
        };

        setBookingItems(prev => [...prev, newItem]);
        setAddedSuggestionIds(prev => [...prev, suggestion.id]);
    };

    // Handle sending quote - ends the call
    const handleSendQuote = () => {
        // Stop timer
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }

        // Set quote sent and end call
        setQuoteSent(true);
        setCallEnded(true);

        // Close profile sidebar when call ends
        setIsProfileOpen(false);

        // TTS announcement
        if (!isMuted) {
            speak("Quote sent successfully to the client. Call complete.");
        }
    };

    // Process demo step
    const processStep = useCallback((step: DemoStep) => {
        switch (step.action) {
            case 'incoming_call':
                setShowIncomingCall(true);
                break;
            case 'show_client':
                setCallAccepted(true);
                setShowClient(true);
                setIsProfileOpen(true); // Auto-open profile sidebar when call is accepted
                // Start call timer
                timerRef.current = setInterval(() => {
                    setCallDuration(prev => prev + 1);
                }, 1000);
                break;
            case 'ai_listening':
                setIsAIListening(true);
                break;
            case 'ai_suggest':
                setIsAIListening(false);
                if (step.data?.suggestion) {
                    setAiSuggestions(prev => [...prev, step.data!.suggestion!]);
                }
                break;
            case 'add_to_booking':
                if (step.data?.bookingItem) {
                    setBookingItems(prev => [...prev, step.data!.bookingItem!]);
                    const suggestionId = step.data.bookingItem.id.replace('b', 's');
                    setAddedSuggestionIds(prev => [...prev, suggestionId]);
                }
                break;
            case 'show_savings':
                setShowSavings(true);
                break;
            case 'complete':
                break;
        }
    }, []);

    // Run demo
    useEffect(() => {
        if (!isPlaying || currentStepIndex < 0 || currentStepIndex >= DEMO_SCRIPT.length) {
            return;
        }

        const step = DEMO_SCRIPT[currentStepIndex];

        if (!isMuted) {
            speak(step.narration, () => {
                processStep(step);
                if (currentStepIndex < DEMO_SCRIPT.length - 1) {
                    setTimeout(() => {
                        setCurrentStepIndex(prev => prev + 1);
                    }, 1500);
                }
            });
        } else {
            processStep(step);
            if (currentStepIndex < DEMO_SCRIPT.length - 1) {
                const delay = Math.max(3000, step.narration.length * 50);
                setTimeout(() => {
                    setCurrentStepIndex(prev => prev + 1);
                }, delay);
            }
        }
    }, [isPlaying, currentStepIndex, isMuted, speak, processStep]);

    // Start demo
    const startDemo = () => {
        setIsPlaying(true);
        setCurrentStepIndex(0);
    };

    // Reset demo
    const resetDemo = () => {
        stop();
        setIsPlaying(false);
        setCurrentStepIndex(-1);
        setShowIncomingCall(false);
        setCallAccepted(false);
        setShowClient(false);
        setIsAIListening(false);
        setAiSuggestions([]);
        setBookingItems([]);
        setAddedSuggestionIds([]);
        setShowSavings(false);
        setCallDuration(0);
        setIsProfileOpen(false);
        setQuoteSent(false);
        setCallEnded(false);
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    // Toggle mute
    const toggleMute = () => {
        if (!isMuted) {
            stop();
        }
        setIsMuted(prev => !prev);
    };

    // Handle accepting call
    const handleAcceptCall = () => {
        setCallAccepted(true);
        setShowClient(true);
        setIsProfileOpen(true);
    };

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    // Tier badge component
    const QueuedCallTierBadge = ({ tier }: { tier: 'Platinum' | 'Diamond' | 'Elite' }) => {
        const config = {
            Platinum: { icon: Star, color: 'text-champagne-200' },
            Diamond: { icon: Gem, color: 'text-primary' },
            Elite: { icon: Crown, color: 'text-champagne-300' }
        };
        const { icon: Icon, color } = config[tier];
        return <Icon className={`w-3 h-3 ${color}`} />;
    };

    return (
        <div className="h-screen flex flex-col bg-bg overflow-hidden font-sans">
            {/* Ambient Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-champagne-400/5 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-noise opacity-[0.02]" />
            </div>

            {/* Header */}
            <AgentHeader
                agentName="Sarah Mitchell"
                activeCalls={showIncomingCall && !callEnded ? QUEUED_CALLS.length + 1 : QUEUED_CALLS.length}
                isPlaying={isPlaying}
                isMuted={isMuted}
                onStartDemo={startDemo}
                onResetDemo={resetDemo}
                onToggleMute={toggleMute}
            />

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden relative z-10">
                {/* Left Column - Active Calls */}
                <div className="w-80 flex flex-col border-r border-border-subtle dark:border-white/5 bg-surface/30 dark:bg-black/20 backdrop-blur-sm shrink-0">
                    <div className="p-4 flex-1 overflow-y-auto">
                        <h3 className="text-text-muted dark:text-white/40 text-[10px] uppercase tracking-widest font-semibold mb-3">Active Calls</h3>

                        {/* Incoming Call - only show if call hasn't ended */}
                        {showIncomingCall && !callEnded && (
                            <IncomingCallCard
                                client={DEMO_CLIENT}
                                isActive={callAccepted}
                                callDuration={formatDuration(callDuration)}
                                onAccept={handleAcceptCall}
                            />
                        )}

                        {/* Queued Calls */}
                        {QUEUED_CALLS.map(call => (
                            <motion.div
                                key={call.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-2 p-3 glass-card rounded-xl"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-surface-alt/50 dark:bg-white/5 flex items-center justify-center">
                                            <Phone className="w-4 h-4 text-text-muted dark:text-white/40" />
                                        </div>
                                        <div>
                                            <p className="text-text-primary dark:text-white text-sm font-medium">{call.name}</p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <QueuedCallTierBadge tier={call.tier} />
                                                <span className="text-text-muted dark:text-white/40 text-[10px]">Waiting {call.waitTime}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Profile Button - at bottom of Active Calls sidebar */}
                    <AnimatePresence>
                        {callAccepted && showClient && !callEnded && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="p-3 border-t border-border-subtle dark:border-white/5"
                            >
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${isProfileOpen
                                        ? 'bg-primary/20 border border-primary/30'
                                        : 'bg-surface-alt/50 dark:bg-white/5 border border-border-subtle dark:border-white/10 hover:bg-primary/10 hover:border-primary/20'
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isProfileOpen ? 'bg-primary text-surface' : 'bg-primary/10'
                                            }`}>
                                            <User className={`w-4 h-4 ${isProfileOpen ? '' : 'text-primary'}`} />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-text-primary dark:text-white text-xs font-medium">Client Profile</p>
                                            <p className={`text-[9px] uppercase tracking-wider ${isProfileOpen ? 'text-primary' : 'text-text-muted dark:text-white/40'}`}>
                                                {isProfileOpen ? 'Visible' : 'Click to view'}
                                            </p>
                                        </div>
                                    </div>
                                    <ChevronRight className={`w-4 h-4 text-text-muted dark:text-white/40 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Secondary Sidebar - Client Profile (beside active calls) */}
                <AnimatePresence>
                    {isProfileOpen && callAccepted && !callEnded && (
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 340, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="shrink-0 border-r border-border-subtle dark:border-white/5 bg-surface/50 dark:bg-black/30 backdrop-blur-sm overflow-hidden flex flex-col"
                        >
                            {/* Profile Header */}
                            <div className="flex items-center justify-between p-3 border-b border-border-subtle dark:border-white/5 shrink-0">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <User className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-text-primary dark:text-white font-serif text-sm">Client Profile</h3>
                                        <p className="text-text-muted dark:text-white/40 text-[9px] uppercase tracking-wider">{DEMO_CLIENT.name}</p>
                                    </div>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setIsProfileOpen(false)}
                                    className="w-7 h-7 rounded-lg bg-surface-alt/50 dark:bg-white/5 flex items-center justify-center text-text-muted dark:text-white/40 hover:text-text-primary dark:hover:text-white transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </motion.button>
                            </div>

                            {/* Profile Content */}
                            <div className="flex-1 p-3 overflow-y-auto scrollbar-hide">
                                <ClientProfilePanel client={DEMO_CLIENT} isVisible={showClient} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Center Column - Booking Builder */}
                <div className="flex-1 p-6 overflow-hidden flex flex-col bg-surface/10 dark:bg-transparent min-w-0">
                    {/* Quote Sent Success Message */}
                    <AnimatePresence>
                        {quoteSent && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                className="mb-6 p-6 rounded-2xl bg-gradient-to-r from-success/10 via-success/5 to-transparent border border-success/20"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-success/20 flex items-center justify-center">
                                        <CheckCircle className="w-8 h-8 text-success" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-success font-serif text-xl font-semibold mb-1">Quote Sent Successfully!</h3>
                                        <p className="text-success/70 text-sm">
                                            Itinerary has been sent to {DEMO_CLIENT.email}
                                        </p>
                                        <p className="text-text-muted dark:text-white/40 text-xs mt-2">
                                            Call duration: {formatDuration(callDuration)} • Total value: {calculateTotal()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20">
                                            <Send className="w-4 h-4 text-success" />
                                            <span className="text-success text-sm font-semibold">Call Complete</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <BookingBuilder
                        items={bookingItems}
                        totalValue={calculateTotal()}
                        margin="18%"
                        callDuration={formatDuration(callDuration)}
                        showSavings={showSavings}
                        onSendQuote={handleSendQuote}
                        quoteSent={quoteSent}
                    />
                </div>

                {/* Right Column - AI Assist */}
                <div className="w-96 border-l border-border-subtle dark:border-white/5 bg-surface/30 dark:bg-black/20 backdrop-blur-sm p-4 overflow-hidden shrink-0">
                    <AIAssistPanel
                        isListening={isAIListening}
                        suggestions={aiSuggestions}
                        onAddSuggestion={handleAddSuggestion}
                        addedIds={addedSuggestionIds}
                    />
                </div>
            </div>

            {/* Quick Actions Bar */}
            <QuickActionsBar disabled={!isPlaying} />
        </div>
    );
}
