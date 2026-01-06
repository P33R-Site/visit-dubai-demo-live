"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Plane, Utensils, Hotel, Loader2, Check, MapPin, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useVal8 } from './Val8Context';

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenChangePassword: () => void;
}

type Tab = 'profile' | 'trip';

const PREFS_STORAGE_KEY = 'val8_user_preferences';

interface UserPreferences {
    travelStyle: string;
    accommodationPreference: string;
    diningPreference: string;
    budgetRange: string;
}

const defaultPreferences: UserPreferences = {
    travelStyle: 'relaxation',
    accommodationPreference: 'resort',
    diningPreference: 'fine_dining',
    budgetRange: 'high',
};

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onOpenChangePassword }) => {
    const { user } = useAuth();
    const { activeTripPlan } = useVal8();

    const [activeTab, setActiveTab] = useState<Tab>('profile');
    const [travelStyle, setTravelStyle] = useState(defaultPreferences.travelStyle);
    const [accommodationPreference, setAccommodationPreference] = useState(defaultPreferences.accommodationPreference);
    const [diningPreference, setDiningPreference] = useState(defaultPreferences.diningPreference);
    const [budgetRange, setBudgetRange] = useState(defaultPreferences.budgetRange);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Load preferences from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(PREFS_STORAGE_KEY);
            if (stored) {
                try {
                    const prefs: UserPreferences = JSON.parse(stored);
                    setTravelStyle(prefs.travelStyle || defaultPreferences.travelStyle);
                    setAccommodationPreference(prefs.accommodationPreference || defaultPreferences.accommodationPreference);
                    setDiningPreference(prefs.diningPreference || defaultPreferences.diningPreference);
                    setBudgetRange(prefs.budgetRange || defaultPreferences.budgetRange);
                } catch {
                    // Invalid JSON, use defaults
                }
            }
        }
    }, []);

    if (!isOpen || !user) return null;

    const handleSave = async () => {
        setIsSaving(true);

        // Save to localStorage
        const prefs: UserPreferences = {
            travelStyle,
            accommodationPreference,
            diningPreference,
            budgetRange,
        };
        localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(prefs));

        await new Promise(resolve => setTimeout(resolve, 500));
        setIsSaving(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 1500);
    };

    const ChipButton = ({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) => (
        <button
            onClick={onClick}
            className={`py-1.5 px-2.5 rounded-lg text-xs transition-colors ${selected
                ? 'bg-primary text-surface font-medium'
                : 'bg-surface-alt dark:bg-white/5 text-text-secondary dark:text-white/60 hover:bg-surface-200 dark:hover:bg-white/10'
                }`}
        >
            {children}
        </button>
    );

    return (
        <AnimatePresence>
            <div className="absolute inset-0 z-50 flex items-center justify-center p-3 bg-surface/80 dark:bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full max-w-xs glass-card shadow-2xl relative overflow-hidden bg-surface dark:bg-black/90 max-h-[85vh] overflow-y-auto"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 w-6 h-6 rounded-full bg-surface-alt dark:bg-white/5 flex items-center justify-center text-text-muted dark:text-white/40 hover:text-text-primary dark:hover:text-white transition-colors z-10"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>

                    <div className="p-4">
                        {/* Compact Header */}
                        <div className="mb-4 pb-3 border-b border-border-subtle dark:border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                    <span className="text-lg font-bold text-surface">{user.name.charAt(0).toUpperCase()}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h2 className="text-sm font-medium text-text-primary dark:text-white truncate">{user.name}</h2>
                                    <p className="text-xs text-text-muted dark:text-white/40 truncate">{user.email}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => { onClose(); onOpenChangePassword(); }}
                                className="mt-3 w-full py-2 px-3 rounded-lg bg-surface-alt dark:bg-white/5 text-text-secondary dark:text-white/60 text-xs hover:bg-surface-200 dark:hover:bg-white/10 hover:text-text-primary dark:hover:text-white transition-colors"
                            >
                                Change Password
                            </button>
                        </div>

                        {/* Tab Buttons */}
                        <div className="flex gap-1 mb-4 p-1 bg-surface-alt dark:bg-white/5 rounded-lg">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${activeTab === 'profile'
                                    ? 'bg-primary text-surface'
                                    : 'text-text-secondary dark:text-white/60 hover:text-text-primary dark:hover:text-white'
                                    }`}
                            >
                                Preferences
                            </button>
                            <button
                                onClick={() => setActiveTab('trip')}
                                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${activeTab === 'trip'
                                    ? 'bg-primary text-surface'
                                    : 'text-text-secondary dark:text-white/60 hover:text-text-primary dark:hover:text-white'
                                    }`}
                            >
                                My Trip
                            </button>
                        </div>

                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider text-text-muted dark:text-white/40 mb-1.5 flex items-center gap-1">
                                            <Plane className="w-3 h-3" /> Travel
                                        </p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {['adventure', 'relaxation', 'culture', 'business'].map(s => (
                                                <ChipButton key={s} selected={travelStyle === s} onClick={() => setTravelStyle(s)}>
                                                    {s.charAt(0).toUpperCase() + s.slice(1)}
                                                </ChipButton>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider text-text-muted dark:text-white/40 mb-1.5 flex items-center gap-1">
                                            <Hotel className="w-3 h-3" /> Stay
                                        </p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {[{ v: 'resort', l: 'Resort' }, { v: 'boutique', l: 'Boutique' }, { v: 'city', l: 'City' }, { v: 'villa', l: 'Villa' }].map(a => (
                                                <ChipButton key={a.v} selected={accommodationPreference === a.v} onClick={() => setAccommodationPreference(a.v)}>
                                                    {a.l}
                                                </ChipButton>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider text-text-muted dark:text-white/40 mb-1.5 flex items-center gap-1">
                                            <Utensils className="w-3 h-3" /> Dining
                                        </p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {[{ v: 'fine_dining', l: 'Fine' }, { v: 'casual', l: 'Casual' }, { v: 'local', l: 'Local' }, { v: 'varied', l: 'Mixed' }].map(d => (
                                                <ChipButton key={d.v} selected={diningPreference === d.v} onClick={() => setDiningPreference(d.v)}>
                                                    {d.l}
                                                </ChipButton>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider text-text-muted dark:text-white/40 mb-1.5 flex items-center gap-1">
                                            <CreditCard className="w-3 h-3" /> Budget
                                        </p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {[{ v: 'moderate', l: 'Moderate' }, { v: 'high', l: 'Luxury' }, { v: 'unlimited', l: 'Unlimited' }].map(b => (
                                                <ChipButton key={b.v} selected={budgetRange === b.v} onClick={() => setBudgetRange(b.v)}>
                                                    {b.l}
                                                </ChipButton>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="w-full mt-4 bg-primary text-surface py-2.5 rounded-xl font-medium text-sm hover:bg-primary-soft transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isSaving ? (
                                        <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...</>
                                    ) : saveSuccess ? (
                                        <><Check className="w-3.5 h-3.5" /> Saved!</>
                                    ) : (
                                        'Save Preferences'
                                    )}
                                </button>
                            </>
                        )}

                        {/* Trip Tab */}
                        {activeTab === 'trip' && (
                            <div className="space-y-3">
                                {activeTripPlan ? (
                                    <>
                                        {/* Trip Card */}
                                        <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4 text-primary" />
                                                    <span className="font-medium text-sm text-text-primary dark:text-white">
                                                        {activeTripPlan.destination}
                                                    </span>
                                                </div>
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-medium ${activeTripPlan.status === 'booked'
                                                    ? 'bg-green-500/20 text-green-400'
                                                    : 'bg-amber-500/20 text-amber-400'
                                                    }`}>
                                                    {activeTripPlan.status}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2 text-xs text-text-muted dark:text-white/60 mb-2">
                                                <Calendar className="w-3 h-3" />
                                                <span>{activeTripPlan.start_date} - {activeTripPlan.end_date}</span>
                                            </div>

                                            <div className="flex items-center justify-between pt-2 border-t border-primary/20">
                                                <span className="text-xs text-text-muted dark:text-white/60">
                                                    {activeTripPlan.duration_days} days
                                                </span>
                                                <span className="text-sm font-semibold text-primary">
                                                    {activeTripPlan.currency} {activeTripPlan.total_price?.toLocaleString()}
                                                </span>
                                            </div>

                                            {activeTripPlan.trip_type && (
                                                <div className="mt-2 text-xs text-text-muted dark:text-white/60">
                                                    Type: <span className="capitalize">{activeTripPlan.trip_type}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Quick Stats */}
                                        <div className="grid grid-cols-3 gap-2 text-center">
                                            <div className="p-2 rounded-lg bg-surface-alt dark:bg-white/5">
                                                <p className="text-lg font-semibold text-primary">{activeTripPlan.flights?.length || 0}</p>
                                                <p className="text-[10px] text-text-muted dark:text-white/40">Flights</p>
                                            </div>
                                            <div className="p-2 rounded-lg bg-surface-alt dark:bg-white/5">
                                                <p className="text-lg font-semibold text-primary">{activeTripPlan.experiences?.length || 0}</p>
                                                <p className="text-[10px] text-text-muted dark:text-white/40">Experiences</p>
                                            </div>
                                            <div className="p-2 rounded-lg bg-surface-alt dark:bg-white/5">
                                                <p className="text-lg font-semibold text-primary">{activeTripPlan.events?.length || 0}</p>
                                                <p className="text-[10px] text-text-muted dark:text-white/40">Events</p>
                                            </div>
                                        </div>

                                        {/* Hotel Info */}
                                        {activeTripPlan.hotel && (
                                            <div className="p-2 rounded-lg bg-surface-alt dark:bg-white/5">
                                                <p className="text-[10px] uppercase tracking-wider text-text-muted dark:text-white/40 mb-1">
                                                    Hotel
                                                </p>
                                                <p className="text-sm text-text-primary dark:text-white font-medium">
                                                    {activeTripPlan.hotel.name}
                                                </p>
                                                <p className="text-xs text-text-muted dark:text-white/60">
                                                    {activeTripPlan.hotel.room_type}
                                                </p>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="w-12 h-12 rounded-full bg-surface-alt dark:bg-white/5 flex items-center justify-center mx-auto mb-3">
                                            <Plane className="w-6 h-6 text-text-muted dark:text-white/40" />
                                        </div>
                                        <p className="text-sm text-text-muted dark:text-white/60">No active trip</p>
                                        <p className="text-xs text-text-muted/60 dark:text-white/30 mt-1">
                                            Start chatting to plan your trip!
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
