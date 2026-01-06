"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Minimize2, Maximize2, User, Sparkles, Bot, LogOut, Map } from 'lucide-react';
import { useVal8, Val8Provider } from './Val8Context';
import { useAuth } from '@/contexts/AuthContext';
import { ChatInterface } from './ChatInterface';
import { BookingFlow } from './BookingFlow';
import { PostBookingSummary } from './PostBookingSummary';
import { ExitModal } from './ExitModal';
import { LoginModal } from './LoginModal';
import { Dashboard } from './Dashboard';
import { DemoCard } from './DemoCard';
import { ProfileModal } from './ProfileModal';
import { ChangePasswordModal } from './ChangePasswordModal';
import { TripPlanCard } from './TripPlanCard';
import { PlanItemCard } from './PlanItemCard';
import { approveTrip } from '@/lib/trip';
import { getSessionId } from '@/lib/session';

// Trip Plan Panel Component - shows on desktop only in chat view
const TripPlanPanel: React.FC = () => {
    const { activeTripPlan, sendMessage, planItems } = useVal8();
    const [isApproving, setIsApproving] = useState(false);

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

    return (
        <div className="hidden md:flex flex-col w-[350px] border-l border-border-subtle dark:border-white/10 bg-surface-alt/50 dark:bg-white/5 h-full">
            <div className="px-4 py-3 border-b border-border-subtle dark:border-white/10 flex items-center gap-2">
                <Map className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-text-primary dark:text-white">Trip Plan</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                {/* Incremental Plan Items */}
                {planItems.length > 0 && (
                    <div className="mb-4 space-y-3">
                        <p className="text-xs text-text-muted dark:text-white/40 uppercase tracking-wider">Building your plan...</p>
                        {planItems.map((item, idx) => (
                            <PlanItemCard key={`${item.type}-${idx}`} item={item} className="text-sm" />
                        ))}
                    </div>
                )}

                {/* Full Trip Plan Card */}
                {activeTripPlan ? (
                    <TripPlanCard
                        tripPlan={activeTripPlan}
                        onApprove={handleApproveTrip}
                        isApproving={isApproving}
                    />
                ) : planItems.length === 0 ? (
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

const Val8WidgetContent: React.FC = () => {
    const {
        isExpanded,
        setIsExpanded,
        bookingState,
        chatHistory,
        setShowExitModal,
        view,
        setView,
        user,
        setShowLoginModal,
        activeAction,
        clearActiveAction,
        addMessage,
    } = useVal8();
    const { user: authUser, logout: authLogout } = useAuth();
    const [showLoader, setShowLoader] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

    // Handle incoming widget actions and external messages
    React.useEffect(() => {
        // Handle internal actions
        if (activeAction) {
            addMessage({ sender: 'user', text: activeAction });
            setTimeout(() => {
                addMessage({
                    sender: 'val8',
                    text: `I can certainly help you with "${activeAction}". What specific details would you like to know?`
                });
            }, 1000);
            clearActiveAction();
        }

        // Handle external window messages
        const handleMessage = (event: MessageEvent) => {
            if (event.data?.type === 'LUMINE_WIDGET_SEARCH' && event.data.query) {
                // Determine layout on mobile vs desktop
                if (window.innerWidth < 768) {
                    setView('chat'); // Force chat view on mobile
                }

                // Force widget expansion
                setIsExpanded(true);

                addMessage({
                    sender: 'user',
                    text: `Search for: ${event.data.query}`
                });

                // Simulate AI finding results
                setTimeout(() => {
                    addMessage({
                        sender: 'val8',
                        text: `I found some great options for "${event.data.query}". Would you like to see the top recommendations?`
                    });
                }, 1000);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [activeAction, addMessage, clearActiveAction, setView, setIsExpanded]);



    const handleExpand = () => {
        setIsExpanded(true);
        setShowLoader(true);
        // Simulate loading delay
        setTimeout(() => {
            setShowLoader(false);
        }, 2000);
    };

    const handleClose = () => {
        if (chatHistory.length > 0 && bookingState !== 'confirmed' && bookingState !== 'post-booking') {
            setShowExitModal(true);
        } else {
            setIsExpanded(false);
        }
    };

    const handleProfileClick = () => {
        if (authUser) {
            setShowProfileModal(true);
        } else {
            setShowLoginModal(true);
        }
    };

    return (

        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className={`fixed z-50 overflow-hidden flex flex-col bg-surface dark:bg-[#050505]/95 backdrop-blur-3xl border border-border-subtle dark:border-white/10 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
                                   ${view === 'dashboard' && window.innerWidth >= 768
                                ? 'fixed inset-[5vw] top-[7.5vh] bottom-[7.5vh] w-auto h-auto rounded-[32px]'
                                : 'max-md:inset-0 max-md:w-full max-md:h-[100dvh] max-md:rounded-none md:bottom-6 md:right-6 md:w-[800px] md:h-[700px] md:rounded-[32px]'
                            }`}
                        style={{ transformOrigin: 'bottom right' }}
                    >
                        {/* Header */}
                        <div className="h-16 bg-surface-alt/50 dark:bg-white/5 backdrop-blur-md border-b border-border-subtle dark:border-white/5 flex items-center justify-between px-6 shrink-0 relative z-20">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-primary">
                                    <span className="font-serif font-bold text-surface text-lg">V</span>
                                </div>
                                <div>
                                    <h1 className="text-text-primary dark:text-white font-serif text-lg tracking-wide">Val8</h1>
                                    <p className="text-[10px] uppercase tracking-widest font-medium text-primary">
                                        Powered by PRV8.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {/* Logout Button - only shows when user is logged in */}
                                {authUser && (
                                    <button
                                        onClick={() => authLogout()}
                                        className="w-8 h-8 rounded-full bg-surface-alt/50 dark:bg-surface-100 flex items-center justify-center text-text-muted dark:text-white/40 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                                        title="Logout"
                                    >
                                        <LogOut className="w-4 h-4" />
                                    </button>
                                )}
                                <button
                                    onClick={handleProfileClick}
                                    className="w-8 h-8 rounded-full bg-surface-alt/50 dark:bg-surface-100 flex items-center justify-center text-text-muted dark:text-white/40 hover:text-text-primary dark:hover:text-white hover:bg-surface-alt dark:hover:bg-surface-200 transition-colors"
                                >
                                    {user ? (
                                        <div className="w-full h-full rounded-full bg-primary text-surface flex items-center justify-center font-bold text-xs">
                                            {user?.name?.charAt(0)}
                                        </div>
                                    ) : (
                                        <User className="w-4 h-4" />
                                    )}
                                </button>
                                <button
                                    onClick={() => setView(view === 'chat' ? 'dashboard' : 'chat')}
                                    className="w-8 h-8 rounded-full bg-surface-alt/50 dark:bg-surface-100 flex items-center justify-center text-text-muted dark:text-white/40 hover:text-text-primary dark:hover:text-white hover:bg-surface-alt dark:hover:bg-surface-200 transition-colors"
                                >
                                    {view === 'chat' ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={handleClose}
                                    className="w-8 h-8 rounded-full bg-surface-alt/50 dark:bg-surface-100 flex items-center justify-center text-text-muted dark:text-white/40 hover:text-text-primary dark:hover:text-white hover:bg-surface-alt dark:hover:bg-surface-200 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="flex-1 relative overflow-hidden">


                            <AnimatePresence mode="wait">
                                {showLoader ? (
                                    <motion.div
                                        key="loader"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                                    >
                                        <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center mb-6 relative">
                                            <div className="absolute inset-0 rounded-full border border-primary/10 animate-ping" />
                                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                                        </div>
                                        <h3 className="text-lg font-serif text-text-primary dark:text-white mb-2">Preparing your experience...</h3>
                                        <p className="text-xs text-text-muted dark:text-white/40 font-light tracking-wide">Connecting to global concierge network</p>
                                    </motion.div>
                                ) : view === 'dashboard' ? (
                                    <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col md:flex-row relative z-10 animate-in fade-in">
                                        {/* Left Panel: Chat Interface */}
                                        <div className="w-full md:w-[400px] hidden md:flex flex-col bg-surface dark:bg-[#050505] backdrop-blur-xl relative z-10 border-b md:border-b-0 md:border-r border-border-subtle dark:border-white/10 h-full">
                                            <ChatInterface />
                                            <BookingFlow />
                                            <PostBookingSummary />
                                        </div>

                                        {/* Right Panel: Dashboard */}
                                        <div className="flex-1 bg-surface-alt dark:bg-black/20 relative z-0 flex flex-col">
                                            <Dashboard />
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full relative z-10 flex">
                                        {/* Chat Panel */}
                                        <div className="flex-1 flex flex-col h-full">
                                            <ChatInterface />
                                            <BookingFlow />
                                            <PostBookingSummary />
                                        </div>

                                        {/* Trip Plan Panel - Only on desktop */}
                                        <TripPlanPanel />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Modals */}
                            <ExitModal />
                            <LoginModal />
                            <ProfileModal
                                isOpen={showProfileModal}
                                onClose={() => setShowProfileModal(false)}
                                onOpenChangePassword={() => setShowChangePasswordModal(true)}
                            />
                            <ChangePasswordModal
                                isOpen={showChangePasswordModal}
                                onClose={() => setShowChangePasswordModal(false)}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Launcher */}
            <AnimatePresence>
                {!isExpanded && (
                    <motion.button
                        layoutId="launcher"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleExpand}
                        className="bg-surface text-text-primary dark:text-white pl-2 pr-6 py-2 rounded-full shadow-2xl flex items-center gap-3 border border-border-subtle dark:border-white/10 group z-50
                                 max-md:bottom-4 max-md:right-4 max-md:transform max-md:scale-90"
                    >
                        <div className="w-10 h-10 rounded-full bg-primary overflow-hidden border-2 border-white dark:border-white/20 shadow-lg relative">
                            <img
                                src="https://api.dicebear.com/7.x/personas/svg?seed=Nora&backgroundColor=b6e3f4&hair=long&hairColor=2c1b18&eyes=happy&mouth=smile&nose=smallRound&skinColor=f5cfa0"
                                alt="Nora AI Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="font-medium tracking-wide">Speak to Nora</span>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export const Val8Widget: React.FC = () => {
    return (
        <Val8Provider>
            <Val8WidgetContent />
        </Val8Provider>
    );
};
