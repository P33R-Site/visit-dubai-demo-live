import React from 'react';
import { MapPin, Star } from 'lucide-react';
import Image from 'next/image';

import { DashboardState } from '../val8/Dashboard';

export const StayWidget: React.FC<{ data: DashboardState['stay'] }> = ({ data }) => {
    return (
        <div className="h-full relative group cursor-pointer">
            <Image
                src="/images/demo/hotel-exterior.png"
                alt="Hotel"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent dark:from-[#0a0a0a] dark:via-[#0a0a0a]/20 opacity-90" />

            <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20 backdrop-blur-md">
                Completed
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-surface-alt/50 dark:bg-white/10 backdrop-blur-md flex items-center justify-center">
                        <span className="text-[10px] text-text-primary dark:text-white">H</span>
                    </div>
                    <span className="bg-transparent border-none p-0 text-xs text-text-muted dark:text-white/80 font-medium focus:ring-0 focus:outline-none">
                        Hotel Agent
                    </span>
                </div>
                <div className="mb-1 cursor-pointer hover:bg-white/5 rounded px-1 -ml-1 transition-colors w-fit">
                    <span className="text-text-primary dark:text-white font-serif text-xl">{data.roomType}</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary dark:text-white/60 text-xs">
                    <div className="flex items-center gap-1 cursor-pointer hover:bg-white/10 rounded px-1 -ml-1 transition-colors">
                        <span className="text-text-secondary dark:text-white/60 text-xs">{data.guests} Adults</span>
                    </div>
                    <span>•</span>
                    <span className="w-28 bg-transparent border-none p-0 text-text-secondary dark:text-white/60 text-xs focus:ring-0 focus:outline-none">
                        {data.checkIn} - {data.checkOut}
                    </span>
                </div>
                <p className="w-full bg-transparent border-none p-0 text-[10px] text-text-muted/80 dark:text-white/40 mt-1 italic focus:ring-0 focus:outline-none">
                    Cancellation is only available within 24 hours.
                </p>
            </div>
        </div>
    );
};
