import React from 'react';
import Image from 'next/image';
import { Calendar } from 'lucide-react';

export const SchedulingWidget: React.FC = () => {
    return (
        <div className="h-full relative group cursor-pointer overflow-hidden">
            <Image
                src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop"
                alt="Beach"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 300px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent" />

            <div className="absolute top-4 left-4 flex items-center gap-2">
                <Calendar className="w-3 h-3 text-white" />
                <span className="text-[10px] font-medium text-white">Scheduling Agent</span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-serif text-lg leading-tight mb-1">Sunny Days <br />& Vibrant Nights</h3>
                <p className="text-white/60 text-[10px] uppercase tracking-wider">South Beach</p>

                <div className="flex items-center gap-2 mt-3">
                    {['Day 1', 'Day 2', 'Day 3'].map((d, i) => (
                        <span key={i} className="text-[9px] text-white/80 bg-white/10 px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/10">
                            {d}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};
