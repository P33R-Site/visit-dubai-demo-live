"use client";

import React, { useEffect, useState } from 'react';
import { ChatInterface } from '@/components/val8/ChatInterface';
import { Val8Provider, useVal8 } from '@/components/val8/Val8Context';
import { User, Maximize2, Minimize2, X, LogOut } from 'lucide-react';
import { BookingFlow } from '@/components/val8/BookingFlow';
import { PostBookingSummary } from '@/components/val8/PostBookingSummary';
import { Dashboard } from '@/components/val8/Dashboard';
import { ExitModal } from '@/components/val8/ExitModal';
import { LoginModal } from '@/components/val8/LoginModal';
import { ProfileModal } from '@/components/val8/ProfileModal';
import { ChangePasswordModal } from '@/components/val8/ChangePasswordModal';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const WidgetHeader = ({ onClose }: { onClose: () => void }) => {
    const { setView, view, user, setShowLoginModal } = useVal8();
    const { user: authUser, logout: authLogout } = useAuth();
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

    const handleProfileClick = () => {
        if (authUser) {
            setShowProfileModal(true);
        } else {
            setShowLoginModal(true);
        }
    };

    const handleToggleFullscreen = () => {
        const nextView = view === 'chat' ? 'dashboard' : 'chat';
        setView(nextView);
        const isFullscreen = nextView === 'dashboard';
        window.parent.postMessage({ type: 'LUMINE_WIDGET_MODE', mode: isFullscreen ? 'fullscreen' : 'standard' }, '*');
    };

    return (
        <>
            <div className="h-16 bg-surface-alt/50 dark:bg-white/5 backdrop-blur-md border-b border-border-subtle dark:border-white/5 flex items-center justify-between px-6 shrink-0 relative z-20">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary">
                        <span className="font-serif font-bold text-surface text-lg">V</span>
                    </div>
                    <div>
                        <h1 className="text-text-primary dark:text-white font-serif text-lg tracking-wide">Val8</h1>
                        <p className="text-[10px] uppercase tracking-widest font-medium text-primary">Powered by PRV8.</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {/* Logout Button - Only show when authenticated */}
                    {authUser && (
                        <button
                            onClick={() => {
                                authLogout();
                                window.parent.postMessage({ type: 'LUMINE_WIDGET_CLOSE' }, '*');
                            }}
                            className="w-8 h-8 rounded-full bg-surface-alt/50 dark:bg-surface-100 flex items-center justify-center text-text-muted dark:text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                            title="Logout"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    )}
                    <button
                        onClick={handleProfileClick}
                        className="w-8 h-8 rounded-full bg-surface-alt/50 dark:bg-surface-100 flex items-center justify-center text-text-muted dark:text-white/40 hover:text-text-primary dark:hover:text-white hover:bg-surface-alt dark:hover:bg-surface-200 transition-colors"
                    >
                        {authUser ? (
                            <div className="w-full h-full rounded-full bg-primary text-surface flex items-center justify-center font-bold text-xs">
                                {authUser?.name?.charAt(0).toUpperCase()}
                            </div>
                        ) : (
                            <User className="w-4 h-4" />
                        )}
                    </button>
                    <button
                        onClick={handleToggleFullscreen}
                        className="w-8 h-8 rounded-full bg-surface-alt/50 dark:bg-surface-100 flex items-center justify-center text-text-muted dark:text-white/40 hover:text-text-primary dark:hover:text-white hover:bg-surface-alt dark:hover:bg-surface-200 transition-colors"
                    >
                        {view === 'chat' ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                    </button>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-surface-alt/50 dark:bg-surface-100 flex items-center justify-center text-text-muted dark:text-white/40 hover:text-text-primary dark:hover:text-white hover:bg-surface-alt dark:hover:bg-surface-200 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Modals rendered inside header context */}
            <ProfileModal
                isOpen={showProfileModal}
                onClose={() => setShowProfileModal(false)}
                onOpenChangePassword={() => setShowChangePasswordModal(true)}
            />
            <ChangePasswordModal
                isOpen={showChangePasswordModal}
                onClose={() => setShowChangePasswordModal(false)}
            />
        </>
    );
};

const WidgetContent = () => {
    const {
        view,
        setIsExpanded,
        chatHistory,
        bookingState,
        setShowExitModal,
        activeAction,
        addMessage,
        clearActiveAction,
        isExpanded: isExpandedContext
    } = useVal8();

    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (activeAction) {
            addMessage({
                sender: 'user',
                text: activeAction
            });

            setTimeout(() => {
                addMessage({
                    sender: 'val8',
                    text: `I can certainly help you with "${activeAction}". What specific details would you like to know?`
                });
            }, 1000);

            clearActiveAction();
        }
    }, [activeAction, addMessage, clearActiveAction]);

    useEffect(() => {
        if (!isExpandedContext) {
            window.parent.postMessage({ type: 'LUMINE_WIDGET_CLOSE' }, '*');
            setIsExpanded(true);
        }
    }, [isExpandedContext, setIsExpanded]);

    const handleCloseRequest = () => {
        if (chatHistory.length > 0 && bookingState !== 'confirmed' && bookingState !== 'post-booking') {
            setShowExitModal(true);
        } else {
            window.parent.postMessage({ type: 'LUMINE_WIDGET_CLOSE' }, '*');
        }
    };

    const isFullscreenMode = view === 'dashboard';

    return (
        <motion.div
            layout
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
            className={`
                overflow-hidden glass-panel border border-border-subtle dark:border-white/10 shadow-2xl flex flex-col bg-surface dark:bg-[#050505]/95 backdrop-blur-3xl
                ${isFullscreenMode
                    ? 'w-full h-full md:w-[90vw] md:h-[85vh] md:m-auto md:rounded-[32px] rounded-none'
                    : 'h-full w-full rounded-[32px]'
                }
            `}
        >
            <WidgetHeader onClose={handleCloseRequest} />

            <div className="flex-1 relative overflow-hidden flex flex-col">
                <AnimatePresence mode="wait">
                    {showLoader ? (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-surface dark:bg-[#050505] z-50"
                        >
                            <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center mb-6 relative">
                                <div className="absolute inset-0 rounded-full border border-primary/10 animate-ping" />
                                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            </div>
                            <h3 className="text-lg font-serif text-text-primary dark:text-white mb-2">Preparing your experience...</h3>
                            <p className="text-xs text-text-muted dark:text-white/40 font-light tracking-wide">Connecting to global concierge network</p>
                        </motion.div>
                    ) : view === 'dashboard' ? (
                        <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col relative z-10 overflow-hidden animate-in fade-in">
                            <div className="flex flex-col md:flex-row h-full">
                                <div className="w-full md:w-[400px] flex-col bg-surface dark:bg-[#050505] backdrop-blur-xl relative z-10 border-b md:border-b-0 md:border-r border-border-subtle dark:border-white/10 hidden md:flex h-full">
                                    <ChatInterface />
                                    <BookingFlow />
                                    <PostBookingSummary />
                                </div>
                                <div className="flex-1 bg-surface-alt dark:bg-black/20 relative z-0 flex flex-col h-full overflow-hidden">
                                    <Dashboard />
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 relative z-10 overflow-hidden flex flex-col">
                            <ChatInterface />
                            <BookingFlow />
                            <PostBookingSummary />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Modals */}
                <ExitModal />
                <LoginModal />
            </div>
        </motion.div>
    );
}

export default function WidgetPage() {
    return (
        <div className="h-screen w-screen flex flex-col bg-transparent p-0 overflow-hidden">
            <Val8Provider initialExpanded={true}>
                <WidgetContent />
            </Val8Provider>
        </div>
    );
}
