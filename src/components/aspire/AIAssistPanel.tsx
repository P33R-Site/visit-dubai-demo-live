"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Plus, Plane, Hotel, MapPin, Car, Check, Zap, Brain } from 'lucide-react';
import { AISuggestion } from '@/data/aspire-demo-data';

interface AIAssistPanelProps {
    isListening: boolean;
    suggestions: AISuggestion[];
    onAddSuggestion: (suggestion: AISuggestion) => void;
    addedIds: string[];
}

const TypeIcon = ({ type }: { type: AISuggestion['type'] }) => {
    const icons = {
        flight: Plane,
        hotel: Hotel,
        experience: MapPin,
        transfer: Car
    };
    const Icon = icons[type];
    return <Icon className="w-4 h-4" />;
};

const typeConfig = {
    flight: { gradient: 'from-primary to-champagne-500', text: 'text-primary', bg: 'bg-primary/10' },
    hotel: { gradient: 'from-champagne-400 to-champagne-500', text: 'text-champagne-400', bg: 'bg-champagne-400/10' },
    experience: { gradient: 'from-success to-emerald-500', text: 'text-success', bg: 'bg-success/10' },
    transfer: { gradient: 'from-champagne-300 to-champagne-400', text: 'text-champagne-300', bg: 'bg-champagne-300/10' }
};

export const AIAssistPanel: React.FC<AIAssistPanelProps> = ({
    isListening,
    suggestions,
    onAddSuggestion,
    addedIds
}) => {
    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${isListening
                            ? 'bg-gradient-to-br from-primary to-champagne-500 animate-pulse shadow-primary/30'
                            : 'bg-surface-alt/50 dark:bg-white/5'
                        }`}>
                        <Brain className={`w-5 h-5 ${isListening ? 'text-surface' : 'text-primary'}`} />
                    </div>
                    <div>
                        <h3 className="text-text-primary dark:text-white font-serif text-lg">AI Assist</h3>
                        <p className="text-text-muted dark:text-white/40 text-[10px] uppercase tracking-wider">
                            {isListening ? 'Analyzing conversation...' : 'Ready to assist'}
                        </p>
                    </div>
                </div>

                {isListening && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                        <Zap className="w-3 h-3 text-primary" />
                        <span className="text-primary text-[10px] font-semibold uppercase tracking-wider">Live</span>
                    </div>
                )}
            </div>

            {/* Listening Indicator */}
            <AnimatePresence>
                {isListening && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4"
                    >
                        <div className="p-4 glass-card rounded-2xl border border-primary/20">
                            <div className="flex items-center gap-4">
                                <div className="flex gap-1 h-8 items-end">
                                    {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ height: [8, 24, 8] }}
                                            transition={{ repeat: Infinity, duration: 0.7, delay: i * 0.08 }}
                                            className="w-1 bg-gradient-to-t from-primary to-champagne-400 rounded-full"
                                        />
                                    ))}
                                </div>
                                <div>
                                    <p className="text-text-primary dark:text-white text-sm font-medium">Processing conversation...</p>
                                    <p className="text-text-muted dark:text-white/40 text-xs">Matching client preferences with inventory</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Suggestions */}
            <div className="flex-1 overflow-y-auto space-y-3 scrollbar-hide">
                <AnimatePresence>
                    {suggestions.map((suggestion, index) => {
                        const isAdded = addedIds.includes(suggestion.id);
                        const config = typeConfig[suggestion.type];

                        return (
                            <motion.div
                                key={suggestion.id}
                                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative overflow-hidden glass-card rounded-2xl transition-all duration-300 ${isAdded ? 'border-success/30' : 'border-primary/20 hover:border-primary/40'
                                    }`}
                            >
                                <div className="p-4">
                                    {/* Header Row */}
                                    <div className="flex items-center justify-between mb-3">
                                        <div className={`flex items-center gap-2 px-2.5 py-1 rounded-lg bg-gradient-to-r ${config.gradient} text-surface`}>
                                            <TypeIcon type={suggestion.type} />
                                            <span className="text-[10px] font-semibold uppercase tracking-wider">
                                                {suggestion.type}
                                            </span>
                                        </div>

                                        {/* Match Score */}
                                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${suggestion.matchScore >= 95
                                                ? 'bg-success/10 border border-success/20'
                                                : 'bg-primary/10 border border-primary/20'
                                            }`}>
                                            <Sparkles className={`w-3 h-3 ${suggestion.matchScore >= 95 ? 'text-success' : 'text-primary'}`} />
                                            <span className={`text-xs font-bold ${suggestion.matchScore >= 95 ? 'text-success' : 'text-primary'}`}>
                                                {suggestion.matchScore}%
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h4 className="text-text-primary dark:text-white font-serif text-base mb-1">{suggestion.title}</h4>
                                    <p className="text-text-muted dark:text-white/40 text-xs mb-2">{suggestion.subtitle}</p>

                                    {/* AI Reason */}
                                    <div className="flex items-start gap-2 mb-3 p-2 rounded-lg bg-surface-alt/30 dark:bg-white/5">
                                        <Brain className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                                        <p className="text-text-secondary dark:text-white/60 text-[11px] italic leading-relaxed">
                                            {suggestion.reason}
                                        </p>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-text-primary dark:text-white font-serif font-semibold text-lg">{suggestion.price}</span>

                                        {isAdded ? (
                                            <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-success/10 border border-success/20">
                                                <Check className="w-4 h-4 text-success" />
                                                <span className="text-success text-xs font-semibold uppercase tracking-wider">Added</span>
                                            </div>
                                        ) : (
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => onAddSuggestion(suggestion)}
                                                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-surface text-xs font-semibold uppercase tracking-wider hover:bg-champagne-500 transition-colors shadow-lg shadow-primary/20"
                                            >
                                                <Plus className="w-4 h-4" />
                                                Add to Itinerary
                                            </motion.button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {suggestions.length === 0 && !isListening && (
                    <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-surface-alt/30 dark:bg-white/5 flex items-center justify-center">
                                <Sparkles className="w-8 h-8 text-text-muted dark:text-white/20" />
                            </div>
                            <p className="text-text-muted dark:text-white/40 text-sm font-light">AI suggestions will appear here</p>
                            <p className="text-text-muted/50 dark:text-white/20 text-xs mt-1">as the conversation progresses</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
