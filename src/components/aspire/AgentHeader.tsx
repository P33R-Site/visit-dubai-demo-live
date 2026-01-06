"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Headphones, Phone, Settings, Play, RotateCcw, Volume2, VolumeX, Zap } from 'lucide-react';

interface AgentHeaderProps {
    agentName: string;
    activeCalls: number;
    isPlaying: boolean;
    isMuted: boolean;
    onStartDemo: () => void;
    onResetDemo: () => void;
    onToggleMute: () => void;
}

export const AgentHeader: React.FC<AgentHeaderProps> = ({
    agentName,
    activeCalls,
    isPlaying,
    isMuted,
    onStartDemo,
    onResetDemo,
    onToggleMute
}) => {
    return (
        <header className="h-16 bg-surface-alt/50 dark:bg-white/5 backdrop-blur-md border-b border-border-subtle dark:border-white/5 flex items-center justify-between px-6 shrink-0 relative z-20">
            {/* Left - Branding */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-champagne-500 flex items-center justify-center shadow-lg shadow-primary/20">
                        <span className="text-surface font-serif font-bold text-lg">P</span>
                    </div>
                    <div>
                        <h1 className="text-text-primary dark:text-white font-serif text-lg tracking-wide">PRV8 Concierge</h1>
                        <p className="text-[10px] uppercase tracking-widest font-medium text-primary">
                            Powered by PRV8
                        </p>
                    </div>
                </div>
            </div>

            {/* Center - Demo Controls */}
            <div className="flex items-center gap-3">
                {!isPlaying ? (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onStartDemo}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-surface font-semibold text-sm uppercase tracking-wider hover:bg-champagne-500 transition-all shadow-lg shadow-primary/20"
                    >
                        <Play className="w-4 h-4" />
                        Start Demo
                    </motion.button>
                ) : (
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/30">
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <motion.div
                                        key={i}
                                        animate={{ height: [4, 12, 4] }}
                                        transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.08 }}
                                        className="w-0.5 bg-success rounded-full"
                                    />
                                ))}
                            </div>
                            <span className="text-success text-xs font-semibold uppercase tracking-wider">Demo Running</span>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onToggleMute}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isMuted
                                ? 'bg-surface-alt text-text-muted'
                                : 'bg-surface-alt/50 dark:bg-white/5 text-text-primary dark:text-white hover:bg-surface-alt dark:hover:bg-white/10'
                                }`}
                        >
                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onResetDemo}
                            className="w-10 h-10 rounded-full bg-surface-alt/50 dark:bg-white/5 text-text-muted dark:text-white/40 hover:text-text-primary dark:hover:text-white hover:bg-surface-alt dark:hover:bg-white/10 flex items-center justify-center transition-colors"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </motion.button>
                    </div>
                )}
            </div>

            {/* Right - Agent Info */}
            <div className="flex items-center gap-4">
                {/* Active Calls */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-alt/50 dark:bg-white/5 border border-border-subtle dark:border-white/10">
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    <span className="text-text-primary dark:text-white text-sm font-medium">{activeCalls}</span>
                    <span className="text-text-muted dark:text-white/40 text-xs">calls</span>
                </div>

                {/* AI Status */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                    <Zap className="w-3.5 h-3.5 text-primary" />
                    <span className="text-primary text-xs font-semibold uppercase tracking-wider">AI Active</span>
                </div>

                {/* Agent */}
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-text-primary dark:text-white text-sm font-medium">{agentName}</p>
                        <p className="text-text-muted dark:text-white/40 text-[10px] uppercase tracking-wider">Concierge Agent</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-champagne-400 to-champagne-500 flex items-center justify-center text-surface font-bold text-sm shadow-lg">
                        {agentName.split(' ').map(n => n[0]).join('')}
                    </div>
                </div>
            </div>
        </header>
    );
};
