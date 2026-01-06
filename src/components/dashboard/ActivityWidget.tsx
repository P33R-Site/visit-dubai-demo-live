import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface ActivityWidgetProps {
    title: string;
    subtitle: string;
    image: string;
    price?: string;
    category?: string;
}

export const ActivityWidget: React.FC<ActivityWidgetProps> = ({ title, subtitle, image, price, category }) => {
    return (
        <div className="h-full relative group cursor-pointer overflow-hidden">
            <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 300px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent dark:from-[#050505] dark:via-[#050505]/40" />

            <div className="absolute top-4 left-4 flex items-center gap-2">
                {category && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-primary dark:text-white/80 bg-surface/80 dark:bg-black/20 backdrop-blur-md px-2 py-1 rounded-full border border-border-subtle dark:border-white/10">
                        {category}
                    </span>
                )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="w-full bg-transparent border-none p-0 text-text-primary dark:text-white font-medium text-lg leading-tight mb-1 focus:ring-0 focus:outline-none">
                    {title}
                </p>
                <div className="flex items-center justify-between">
                    <p className="w-2/3 bg-transparent border-none p-0 text-text-secondary dark:text-white/60 text-xs focus:ring-0 focus:outline-none">
                        {subtitle}
                    </p>
                    {price && (
                        <p className="w-1/3 text-right bg-transparent border-none p-0 text-text-primary dark:text-white font-medium text-sm focus:ring-0 focus:outline-none">
                            {price}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
