"use client";

import React, { useEffect, useState } from 'react';
import { Settings, Droplets, Leaf, Shield } from 'lucide-react';

type Theme = 'default' | 'oceanic' | 'nature' | 'crimson' | 'royal' | 'sunset' | 'aqua' | 'neon' | 'midnight' | 'flamingo' | 'solar';

export const ThemeDebugger: React.FC = () => {
    const [activeTheme, setActiveTheme] = useState<Theme>('default');
    const [isOpen, setIsOpen] = useState(false);

    const setTheme = (theme: Theme) => {
        // Remove all theme classes first
        document.documentElement.classList.remove(
            'theme-oceanic', 'theme-nature', 'theme-crimson', 'theme-royal',
            'theme-sunset', 'theme-aqua', 'theme-neon',
            'theme-midnight', 'theme-flamingo', 'theme-solar'
        );

        // Add selected theme class if not default
        if (theme !== 'default') {
            document.documentElement.classList.add(`theme-${theme}`);
        }

        setActiveTheme(theme);
    };

    return (
        <div className="fixed bottom-6 left-6 z-[9999] font-sans">
            <div
                className={`
          flex items-center gap-2 p-2 bg-surface border border-white/10 rounded-full shadow-2xl backdrop-blur-md transition-all duration-300
          ${isOpen ? 'w-auto opacity-100' : 'w-12 h-12 overflow-hidden bg-white/5 hover:bg-surface'}
        `}
            >
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors"
                >
                    <Settings className={`w-4 h-4 ${isOpen ? 'animate-spin-slow' : ''}`} />
                </button>

                {isOpen && (
                    <div className="flex items-center gap-2 pr-2 animate-in fade-in slide-in-from-left-4 duration-300 max-w-[calc(100vw-6rem)] overflow-x-auto no-scrollbar mask-fade-right">
                        <div className="w-[1px] h-4 bg-white/10 mx-1" />

                        <ThemeButton
                            active={activeTheme === 'default'}
                            onClick={() => setTheme('default')}
                            icon={<Shield className="w-3 h-3" />}
                            label="Standard"
                            color="bg-[#E3B574]"
                        />

                        <div className="w-[1px] h-4 bg-white/10 mx-1" />

                        <ThemeButton
                            active={activeTheme === 'oceanic'}
                            onClick={() => setTheme('oceanic')}
                            icon={<Droplets className="w-3 h-3" />}
                            label="Oceanic"
                            color="bg-[#0EA5E9]"
                        />

                        <ThemeButton
                            active={activeTheme === 'aqua'}
                            onClick={() => setTheme('aqua')}
                            icon={<div className="w-3 h-3 rounded-full bg-current" />}
                            label="Aqua"
                            color="bg-[#06B6D4]"
                        />

                        <ThemeButton
                            active={activeTheme === 'midnight'}
                            onClick={() => setTheme('midnight')}
                            icon={<div className="w-3 h-3 rounded-full bg-current" />}
                            label="Midnight"
                            color="bg-[#6366F1]"
                        />

                        <div className="w-[1px] h-4 bg-white/10 mx-1" />

                        <ThemeButton
                            active={activeTheme === 'nature'}
                            onClick={() => setTheme('nature')}
                            icon={<Leaf className="w-3 h-3" />}
                            label="Nature"
                            color="bg-[#10B981]"
                        />

                        <ThemeButton
                            active={activeTheme === 'neon'}
                            onClick={() => setTheme('neon')}
                            icon={<div className="w-3 h-3 rounded-full bg-current" />}
                            label="Neon"
                            color="bg-[#84CC16]"
                        />

                        <ThemeButton
                            active={activeTheme === 'solar'}
                            onClick={() => setTheme('solar')}
                            icon={<div className="w-3 h-3 rounded-full bg-current" />}
                            label="Solar"
                            color="bg-[#EAB308]"
                        />

                        <div className="w-[1px] h-4 bg-white/10 mx-1" />

                        <ThemeButton
                            active={activeTheme === 'sunset'}
                            onClick={() => setTheme('sunset')}
                            icon={<div className="w-3 h-3 rounded-full bg-current" />}
                            label="Sunset"
                            color="bg-[#F97316]"
                        />

                        <ThemeButton
                            active={activeTheme === 'crimson'}
                            onClick={() => setTheme('crimson')}
                            icon={<div className="w-3 h-3 rounded-full bg-current" />}
                            label="Crimson"
                            color="bg-[#F43F5E]"
                        />

                        <ThemeButton
                            active={activeTheme === 'flamingo'}
                            onClick={() => setTheme('flamingo')}
                            icon={<div className="w-3 h-3 rounded-full bg-current" />}
                            label="Flamingo"
                            color="bg-[#EC4899]"
                        />

                        <ThemeButton
                            active={activeTheme === 'royal'}
                            onClick={() => setTheme('royal')}
                            icon={<div className="w-3 h-3 rounded-full bg-current" />}
                            label="Royal"
                            color="bg-[#8B5CF6]"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

const ThemeButton: React.FC<{
    active: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
    color: string;
}> = ({ active, onClick, icon, label, color }) => (
    <button
        onClick={onClick}
        className={`
      flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all
      ${active
                ? 'bg-white/10 text-white shadow-sm ring-1 ring-white/20'
                : 'hover:bg-white/5 text-white/50 hover:text-white'}
    `}
    >
        <div className={`w-2 h-2 rounded-full ${color}`} />
        {label}
    </button>
);
