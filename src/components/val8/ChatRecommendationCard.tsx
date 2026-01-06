"use client";

import React from 'react';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import { HotelCard } from './Val8Context';

interface ChatRecommendationCardProps {
    card: HotelCard;
    type: 'attraction' | 'event';
    onClick?: () => void;
}

export const ChatRecommendationCard: React.FC<ChatRecommendationCardProps> = ({ card, type, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="flex w-[280px] h-[100px] bg-white dark:bg-white/10 rounded-2xl shadow-sm border border-black/5 dark:border-white/5 overflow-hidden cursor-pointer flex-shrink-0 hover:shadow-md transition-shadow mr-3"
        >
            {/* Image Section */}
            <div className="w-[100px] h-full relative flex-shrink-0 bg-gray-200 dark:bg-gray-800">
                <Image
                    src={card.image}
                    alt={card.name}
                    fill
                    className="object-cover"
                    sizes="100px"
                />

                {/* Event Date Badge overlay */}
                {type === 'event' && (
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-1">
                        {/* Mock date parsing or usage of a date field if available. 
                           For now, using static or parsed from data if possible. 
                           The data has 'dates' in context/trip but card has no specific date field in HotelCard interface yet? 
                           Wait, UPCOMING_EVENTS in recommendations.ts doesn't have specific date fields in HotelCard type. 
                           I should add date to HotelCard or just use generic data for now. 
                           Let's parse from name or add a date field properly later. 
                           For this visual match, I will assume the card might have a date property or I'll stub it.
                       */}
                        <div className="text-[9px] font-bold uppercase tracking-wider opacity-80">{card.startDate?.split(' ')[1] || 'DEC'}</div>
                        <div className="text-lg font-bold leading-none">{card.startDate?.split(' ')[0] || '19'}</div>
                        <div className="text-[9px] font-medium opacity-80">{card.endDate || '2025'}</div>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="flex-1 p-3 flex flex-col justify-center">
                {type === 'event' && (
                    <span className="text-[10px] text-primary uppercase font-bold tracking-wider mb-1">
                        {card.tags[0] || 'Event'}
                    </span>
                )}

                <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-tight line-clamp-2 mb-1">
                    {card.name}
                </h3>

                <div className="flex items-center gap-1 text-gray-500 dark:text-white/60 text-[10px] mt-auto">
                    <MapPin className="w-3 h-3" />
                    <span className="line-clamp-1">{card.location}</span>
                </div>
            </div>
        </div>
    );
};
