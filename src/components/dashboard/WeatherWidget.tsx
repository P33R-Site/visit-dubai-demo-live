import React from 'react';
import { CloudSun } from 'lucide-react';

export const WeatherWidget: React.FC<{ temperature?: string }> = ({ temperature = "84" }) => {
    return (
        <div className="h-full p-5 flex flex-col justify-between relative overflow-hidden group">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-blue-200/50 dark:from-blue-500/20 dark:to-blue-700/20 opacity-50" />

            <div className="relative z-10 flex justify-between items-start">
                <div className="flex flex-col">
                    <h2 className="text-5xl font-light text-text-primary dark:text-white tracking-tighter">{temperature}°</h2>
                </div>
            </div>

            <div className="relative z-10 flex flex-col items-center mt-2">
                <CloudSun className="w-8 h-8 text-amber-500 dark:text-yellow-300 mb-1" />
                <span className="text-text-primary dark:text-white font-medium text-sm">Sunny</span>
                <p className="text-text-muted dark:text-white/60 text-xs">H: 88 L: 76</p>
            </div>
        </div>
    );
};
