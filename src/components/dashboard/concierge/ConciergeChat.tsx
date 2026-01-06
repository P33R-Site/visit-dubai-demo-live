"use client";

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export interface Message {
    id: string;
    sender: 'AI' | 'User';
    content: string;
}

interface ConciergeChatProps {
    messages: Message[];
    input: string;
    isSpeaking: boolean;
    isAutoPlaying: boolean;
    onStartDemo: () => void;
    onStopDemo: () => void;
    onInputChange?: (val: string) => void;
    onSendMessage?: () => void;
    placeholder?: string;
}

const AICore = ({ state }: { state: 'idle' | 'listening' | 'speaking' | 'processing' }) => {
    return (
        <div className="relative w-16 h-16 md:w-24 md:h-24 flex items-center justify-center pointer-events-none select-none transition-all duration-700">
            {/* Ambient Core */}
            <div className={`absolute inset-0 bg-primary/20 blur-3xl rounded-full transition-all duration-1000 ${state === 'speaking' ? 'scale-150 opacity-60' : 'scale-100 opacity-20'}`} />
            <div className="relative w-full h-full rounded-full border border-primary/10 flex items-center justify-center bg-surface-alt/50 dark:bg-black/40 backdrop-blur-md">
                <AnimatePresence mode="wait">
                    {state === 'speaking' ? (
                        <div className="flex gap-1 items-center h-8">
                            {[1, 2, 3, 4, 3, 2, 1].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{ height: [10, 25, 10] }}
                                    transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                                    className="w-1 bg-primary rounded-full"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export const ConciergeChat: React.FC<ConciergeChatProps> = ({
    messages,
    input,
    isSpeaking,
    isAutoPlaying,
    onStartDemo,
    onStopDemo,
    onInputChange,
    onSendMessage,
    placeholder = "Type your request..."
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSendMessage?.();
        }
    };

    return (
        <div className="flex-1 flex flex-col relative glass-panel rounded-[2rem] border border-border-subtle dark:border-white/10 overflow-hidden bg-surface/50 dark:bg-black/60 backdrop-blur-3xl shadow-2xl h-full">
            <div className="flex items-center justify-between p-6 border-b border-border-subtle dark:border-white/5">
                <div className="flex items-center gap-4">
                    <AICore state={isSpeaking ? 'speaking' : 'idle'} />
                    <div>
                        <h1 className="font-serif text-xl tracking-wide text-text-primary dark:text-white">Lumine AI</h1>
                        <p className="text-[10px] uppercase tracking-widest text-text-muted dark:text-white/40">Concierge • Online</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={isAutoPlaying ? onStopDemo : onStartDemo}
                        className={`text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${isAutoPlaying ? 'bg-primary text-black border-primary' : 'border-border-subtle dark:border-white/10 hover:bg-surface-alt dark:hover:bg-white/10 text-text-secondary dark:text-white'}`}
                    >
                        {isAutoPlaying ? 'Stop Demo' : 'Play Demo'}
                    </button>
                </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex flex-col ${msg.sender === 'User' ? 'items-end' : 'items-start'}`}
                    >
                        <span className="text-[9px] uppercase tracking-widest mb-2 text-text-muted dark:text-white/30">
                            {msg.sender === 'AI' ? 'Assistant' : 'You'}
                        </span>
                        <div className={`max-w-[85%] p-4 rounded-2xl ${msg.sender === 'User' ? 'bg-surface-alt dark:bg-white/10 text-text-primary dark:text-white rounded-br-none' : 'bg-primary/10 text-text-primary dark:text-white/90 rounded-bl-none border border-primary/10'}`}>
                            <p className="font-light leading-relaxed text-sm md:text-base">{msg.content}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="p-4 bg-gradient-to-t from-surface dark:from-black/40 to-transparent">
                <div className="relative glass-panel rounded-full border border-border-subtle dark:border-white/10 flex items-center p-1.5 pr-2 shadow-xl bg-surface-alt/50 dark:bg-black/40">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => onInputChange?.(e.target.value)}
                        onKeyDown={handleKeyDown}
                        readOnly={isAutoPlaying} // Lock input during demo
                        placeholder={isAutoPlaying ? "AI Demo running..." : placeholder}
                        className="flex-1 bg-transparent border-none text-text-primary dark:text-white placeholder:text-text-muted dark:placeholder:text-white/20 focus:outline-none text-sm md:text-base font-light px-4 h-10"
                    />
                    <button
                        onClick={onSendMessage}
                        disabled={isAutoPlaying || !input.trim()}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${!input.trim() || isAutoPlaying ? 'bg-surface dark:bg-white/5 cursor-not-allowed text-text-muted/50 dark:text-white/20' : 'bg-surface-alt dark:bg-white/20 hover:bg-surface dark:hover:bg-white/30 text-text-primary dark:text-white'}`}
                    >
                        <ArrowUpRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};
