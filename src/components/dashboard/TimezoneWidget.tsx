import React from 'react';
import { Clock } from 'lucide-react';

interface TimezoneWidgetProps {
    city: string;
    time: string;
    offset: string;
}

export const TimezoneWidget: React.FC<TimezoneWidgetProps> = ({ city, time, offset }) => {
    return (
        <div className="h-full p-4 flex flex-col justify-center glass-card rounded-3xl relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
            {/* Liquid Glass Gradient Overlay - Integrated into glass-card but adding extra sheen if needed */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-alt dark:bg-white/5 flex items-center justify-center group-hover:bg-surface dark:group-hover:bg-white/10 transition-colors border border-border-subtle dark:border-white/5">
                    <Clock className="w-4 h-4 text-text-muted dark:text-white/60 group-hover:text-primary dark:group-hover:text-white transition-colors" />
                </div>
                <div>
                    <p className="text-text-primary dark:text-white font-medium text-sm">{city}</p>
                    <div className="flex items-center gap-2">
                        <span className="text-text-secondary dark:text-white/80 text-xs font-light">{time}</span>
                        <span className="text-text-muted dark:text-white/40 text-[10px] uppercase tracking-wider">{offset}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
