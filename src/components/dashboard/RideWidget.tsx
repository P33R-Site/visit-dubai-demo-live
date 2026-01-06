import React from 'react';
import { Car } from 'lucide-react';
import Image from 'next/image';

import { DashboardState } from '../val8/Dashboard';

export const RideWidget: React.FC<{ data: DashboardState['ride'] }> = ({ data }) => {
    return (
        <div className="h-full p-5 flex flex-col items-center justify-center relative overflow-hidden group">
            <Image
                src="/images/demo/ride-luxury-suv.png"
                alt="Ride"
                fill
                className="object-cover opacity-20 group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 300px"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-surface-alt/50 to-transparent dark:from-white/5" />

            <div className="relative z-10 text-center w-full px-4">
                <p className="w-full bg-transparent border-none p-0 text-text-muted dark:text-white/60 text-[10px] font-bold uppercase tracking-widest mb-3 text-center focus:ring-0 focus:outline-none">
                    Ride Agent
                </p>
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Car className="w-5 h-5 text-text-primary dark:text-white flex-shrink-0" />
                    <div className="cursor-pointer hover:bg-white/10 rounded px-2 py-1 transition-colors">
                        <span className="text-xl font-serif text-text-primary dark:text-white text-center">{data.serviceLevel}</span>
                    </div>
                </div>
                <p className="w-full bg-transparent border-none p-0 text-text-primary dark:text-white font-medium text-sm text-center focus:ring-0 focus:outline-none">
                    Advance Reserve
                </p>
                <p className="w-full bg-transparent border-none p-0 text-text-muted dark:text-white/40 text-[10px] mt-1 text-center focus:ring-0 focus:outline-none overflow-hidden whitespace-pre-line">
                    {data.pickup}
                </p>
            </div>
        </div>
    );
};
