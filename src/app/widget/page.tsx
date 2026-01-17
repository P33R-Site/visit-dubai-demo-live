"use client";

/**
 * Embedded Widget Page - Full-featured standalone chat widget
 * Matches all features from the main Val8Widget
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, X, LogOut, Plus, Maximize2, Minimize2, Map } from 'lucide-react';
import { ChatInterface } from '@/components/val8/ChatInterface';
import { Val8Provider, useVal8 } from '@/components/val8/Val8Context';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { BookingFlow } from '@/components/val8/BookingFlow';
import { PostBookingSummary } from '@/components/val8/PostBookingSummary';
import { Dashboard } from '@/components/val8/Dashboard';
import { ExitModal } from '@/components/val8/ExitModal';
import { LoginModal } from '@/components/val8/LoginModal';
import { ProfileModal } from '@/components/val8/ProfileModal';
import { ChangePasswordModal } from '@/components/val8/ChangePasswordModal';
import { TripPlanCard } from '@/components/val8/TripPlanCard';
import { PlanItemCard } from '@/components/val8/PlanItemCard';
import { approveTrip } from '@/lib/trip';
import { getSessionId } from '@/lib/session';

// Trip Plan Panel - Full featured, matches main widget
const TripPlanPanel: React.FC = () => {
    const {
        activeTripPlan,
        sendMessage,
        planItems,
        chatHistory,
        pendingTripPlan,
        hasPendingTrip,
        confirmPendingTrip,
        declinePendingTrip,
        isTripApprovedByAI,
        hasReachedFullContext,
    } = useVal8();

    const hasActiveConversation = chatHistory.length > 0;
    const [isApproving, setIsApproving] = useState(false);

    // Handle trip approval - same as main widget
    const handleApproveTrip = async () => {
        if (!activeTripPlan?.id) return;
        const sessionId = getSessionId();
        if (!sessionId) {
            console.error('No session ID available');
            return;
        }
        setIsApproving(true);
        try {
            const result = await approveTrip(activeTripPlan.id, sessionId);
            if (result.status === 'booked' || result.status === 'confirmed') {
                sendMessage('Trip approved and booked successfully!');
            }
        } catch (error) {
            console.error('Failed to approve trip:', error);
        } finally {
            setIsApproving(false);
        }
    };

    const sectionLabels: Record<string, string> = {
        weather: '🌤️ Weather',
        flight: '✈️ Flights',
        hotel: '🏨 Accommodation',
        experience: '✨ Experiences',
        event: '📅 Events',
        attraction: '🏛️ Attractions',
        transport: '🚗 Transport',
        other: '📋 Other',
    };

    const categorizedItems = React.useMemo(() => {
        const categories: Record<string, typeof planItems> = {
            weather: [], flight: [], hotel: [], experience: [],
            event: [], attraction: [], transport: [], other: [],
        };
        planItems.forEach(item => {
            const type = item.type.toLowerCase();
            if (categories[type]) categories[type].push(item);
            else categories.other.push(item);
        });
        return categories;
    }, [planItems]);

    const displayOrder = ['weather', 'flight', 'hotel', 'experience', 'event', 'attraction', 'transport', 'other'];

    return (
        <div className="flex flex-col w-[350px] border-l border-border-subtle dark:border-white/10 bg-surface-alt/50 dark:bg-white/5 h-full flex-shrink-0">
            <div className="px-4 py-3 border-b border-border-subtle dark:border-white/10 flex items-center gap-2">
                <Map className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-text-primary dark:text-white">Trip Plan</h3>
                {hasReachedFullContext && (
                    <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                        Full Context
                    </span>
                )}
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                {/* Pending Trip Confirmation */}
                {hasPendingTrip && pendingTripPlan && (
                    <div className="mb-4 space-y-4">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-lg">📋</span>
                                <p className="text-sm font-semibold text-text-primary dark:text-white">
                                    Previous Trip Found
                                </p>
                            </div>
                            <p className="text-xs text-text-secondary dark:text-white/60 mb-3">
                                You have a pending trip to <span className="font-medium text-primary">{pendingTripPlan.destination}</span> from a previous session.
                            </p>
                            <div className="text-xs text-text-muted dark:text-white/40 mb-4 space-y-1">
                                <p>📅 {pendingTripPlan.start_date} - {pendingTripPlan.end_date}</p>
                                <p>💰 ${pendingTripPlan.total_price?.toLocaleString() || 0} {pendingTripPlan.currency || 'USD'}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={confirmPendingTrip}
                                    className="flex-1 px-3 py-2 bg-primary text-black text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    Continue Trip
                                </button>
                                <button
                                    onClick={declinePendingTrip}
                                    className="flex-1 px-3 py-2 bg-white/10 text-text-secondary dark:text-white/60 text-sm font-medium rounded-lg hover:bg-white/20 transition-colors"
                                >
                                    Start Fresh
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Categorized Plan Items */}
                {hasActiveConversation && planItems.length > 0 && !hasPendingTrip && (
                    <div className="mb-4 space-y-4">
                        <p className="text-xs text-text-muted dark:text-white/40 uppercase tracking-wider">Building your plan...</p>
                        {displayOrder.map(type => {
                            const items = categorizedItems[type];
                            if (!items || items.length === 0) return null;
                            return (
                                <div key={type} className="space-y-2">
                                    <p className="text-xs font-semibold text-text-secondary dark:text-white/60 uppercase tracking-wider">
                                        {sectionLabels[type]}
                                    </p>
                                    {items.map((item, idx) => (
                                        <PlanItemCard key={`${item.type}-${idx}`} item={item} className="text-sm" />
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Full Trip Plan Card */}
                {activeTripPlan && !hasPendingTrip ? (
                    <TripPlanCard
                        tripPlan={activeTripPlan}
                        onApprove={handleApproveTrip}
                        isApproving={isApproving}
                        showBookButton={isTripApprovedByAI}
                    />
                ) : !hasPendingTrip && (!hasActiveConversation || planItems.length === 0) ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-8">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                            <Map className="w-6 h-6 text-primary/50" />
                        </div>
                        <p className="text-sm text-text-muted dark:text-white/40">No trip plan yet</p>
                        <p className="text-xs text-text-muted/60 dark:text-white/30 mt-1">Chat with Val8 to create one</p>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

// Widget Header
const WidgetHeader: React.FC<{ onClose: () => void; widgetTitle?: string }> = ({ onClose, widgetTitle }) => {
    const { setView, view, startNewTrip, chatHistory, setShowLoginModal } = useVal8();
    const { user: authUser, logout: authLogout } = useAuth();
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

    const handleProfileClick = () => {
        if (authUser) setShowProfileModal(true);
        else setShowLoginModal(true);
    };

    const handleToggleFullscreen = () => {
        const nextView = view === 'chat' ? 'dashboard' : 'chat';
        setView(nextView);
        window.parent.postMessage({ type: 'LUMINE_WIDGET_MODE', mode: nextView === 'dashboard' ? 'fullscreen' : 'standard' }, '*');
    };

    return (
        <>
            <div className="h-14 bg-surface dark:bg-[#0a0a0a] border-b border-border-subtle dark:border-white/10 flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary">
                        <span className="font-serif font-bold text-surface text-lg">{(widgetTitle || 'Val8').charAt(0)}</span>
                    </div>
                    <div>
                        <h1 className="text-text-primary dark:text-white font-serif text-base">{widgetTitle || 'Val8'}</h1>
                        <p className="text-[9px] uppercase tracking-widest text-primary">AI Concierge</p>
                    </div>
                </div>
                <div className="flex items-center gap-1.5">
                    {chatHistory.length > 0 && (
                        <button onClick={startNewTrip} className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-text-muted dark:text-white/40 hover:text-primary hover:bg-primary/10 transition-colors" title="New Trip">
                            <Plus className="w-3.5 h-3.5" />
                        </button>
                    )}
                    {authUser && (
                        <button onClick={() => authLogout()} className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-text-muted dark:text-white/40 hover:text-red-500 transition-colors" title="Logout">
                            <LogOut className="w-3.5 h-3.5" />
                        </button>
                    )}
                    <button onClick={handleProfileClick} className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-text-muted dark:text-white/40 hover:text-text-primary dark:hover:text-white transition-colors">
                        {authUser ? (
                            <div className="w-full h-full rounded-full bg-primary text-surface flex items-center justify-center font-bold text-xs">
                                {authUser.name?.charAt(0).toUpperCase()}
                            </div>
                        ) : (
                            <User className="w-3.5 h-3.5" />
                        )}
                    </button>
                    <button onClick={handleToggleFullscreen} className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-text-muted dark:text-white/40 hover:text-text-primary dark:hover:text-white transition-colors">
                        {view === 'chat' ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
                    </button>
                    <button onClick={onClose} className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-text-muted dark:text-white/40 hover:text-text-primary dark:hover:text-white transition-colors">
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            <ProfileModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} onOpenChangePassword={() => setShowChangePasswordModal(true)} />
            <ChangePasswordModal isOpen={showChangePasswordModal} onClose={() => setShowChangePasswordModal(false)} />
        </>
    );
};

// Main Widget Content
const WidgetContent: React.FC = () => {
    const { view, chatHistory, bookingState, setShowExitModal } = useVal8();
    const [showLoader, setShowLoader] = useState(true);
    const [widgetTitle, setWidgetTitle] = useState<string>('Val8');

    useEffect(() => {
        // Read widgetTitle from URL params
        const urlParams = new URLSearchParams(window.location.search);
        const title = urlParams.get('widgetTitle');
        if (title) setWidgetTitle(decodeURIComponent(title));
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setShowLoader(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        if (chatHistory.length > 0 && bookingState !== 'confirmed' && bookingState !== 'post-booking') {
            setShowExitModal(true);
        } else {
            window.parent.postMessage({ type: 'LUMINE_WIDGET_CLOSE' }, '*');
        }
    };

    return (
        <div className="h-full w-full flex flex-col bg-surface dark:bg-[#050505] overflow-hidden rounded-[20px] shadow-2xl border border-white/10">
            <WidgetHeader onClose={handleClose} widgetTitle={widgetTitle} />

            <div className="flex-1 flex overflow-hidden">
                <AnimatePresence mode="wait">
                    {showLoader ? (
                        <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                            <div className="w-14 h-14 rounded-full border border-primary/30 flex items-center justify-center mb-4 relative">
                                <div className="absolute inset-0 rounded-full border border-primary/10 animate-ping" />
                                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            </div>
                            <h3 className="text-base font-serif text-white mb-1">Connecting...</h3>
                            <p className="text-xs text-white/40">Setting up your concierge</p>
                        </motion.div>
                    ) : view === 'dashboard' ? (
                        <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex">
                            <div className="w-[350px] flex-shrink-0 border-r border-white/10 flex flex-col">
                                <ChatInterface />
                                <BookingFlow />
                                <PostBookingSummary />
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <Dashboard />
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex">
                            {/* Chat Area */}
                            <div className="flex-1 flex flex-col overflow-hidden">
                                <ChatInterface />
                                <BookingFlow />
                                <PostBookingSummary />
                            </div>
                            {/* Trip Plan Sidebar - 350px to match main widget */}
                            <TripPlanPanel />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Modals */}
            <ExitModal />
            <LoginModal />
        </div>
    );
};

// Branding customization interface
interface BrandingConfig {
    // Colors
    primaryColor?: string;
    accentColor?: string;
    headerBackground?: string;
    surfaceColor?: string;
    textColor?: string;
    // Typography & Layout
    fontFamily?: string;
    borderRadius?: string;
    // Text & Labels
    widgetTitle?: string;
    subtitle?: string;
    welcomeMessage?: string;
    inputPlaceholder?: string;
    // Avatar & Logo
    avatarUrl?: string;
    logoUrl?: string;
}

// Main Page Export - with theme detection and branding customization
export default function WidgetPage() {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [branding, setBranding] = useState<BrandingConfig>({});

    useEffect(() => {
        // Get theme and branding from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const urlTheme = urlParams.get('theme');
        if (urlTheme === 'light' || urlTheme === 'dark') {
            setTheme(urlTheme);
        }

        // Read all branding config from URL
        const brandingConfig: BrandingConfig = {};
        const paramKeys = [
            'primaryColor', 'accentColor', 'headerBackground', 'surfaceColor', 'textColor',
            'fontFamily', 'borderRadius',
            'widgetTitle', 'subtitle', 'welcomeMessage', 'inputPlaceholder',
            'avatarUrl', 'logoUrl'
        ];
        paramKeys.forEach(key => {
            const value = urlParams.get(key);
            if (value) (brandingConfig as any)[key] = decodeURIComponent(value);
        });
        setBranding(brandingConfig);

        // Listen for theme changes from parent website
        const handleMessage = (event: MessageEvent) => {
            if (event.data?.type === 'LUMINE_THEME_CHANGE') {
                const newTheme = event.data.theme;
                if (newTheme === 'light' || newTheme === 'dark') {
                    setTheme(newTheme);
                }
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    // Apply theme class and branding CSS variables
    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);

        // Apply branding CSS custom properties
        const root = document.documentElement;

        // Colors
        if (branding.primaryColor) {
            root.style.setProperty('--color-primary', branding.primaryColor);
            root.style.setProperty('--color-primary-soft', `${branding.primaryColor}33`);
        }
        if (branding.accentColor) {
            root.style.setProperty('--color-accent', branding.accentColor);
        }
        if (branding.headerBackground) {
            root.style.setProperty('--color-header-bg', branding.headerBackground);
        }
        if (branding.surfaceColor) {
            root.style.setProperty('--color-surface', branding.surfaceColor);
            root.style.setProperty('--color-bg', branding.surfaceColor);
        }
        if (branding.textColor) {
            root.style.setProperty('--color-text-primary', branding.textColor);
        }

        // Typography
        if (branding.fontFamily) {
            root.style.setProperty('--font-family-body', branding.fontFamily);
        }
    }, [theme, branding]);

    return (
        <div className={`h-screen w-screen p-2 bg-transparent ${theme}`}>
            <AuthProvider>
                <Val8Provider initialExpanded={true}>
                    <WidgetContent />
                </Val8Provider>
            </AuthProvider>
        </div>
    );
}
