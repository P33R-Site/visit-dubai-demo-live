"use client";

import React, { useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { HotelCard } from './Val8Context';
import { ChatRecommendationCard } from './ChatRecommendationCard';

interface ChatCarouselProps {
    cards: HotelCard[];
    type: 'attraction' | 'event';
    onSelect?: (card: HotelCard) => void;
}

export const ChatCarousel: React.FC<ChatCarouselProps> = ({ cards, type, onSelect }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative w-full mt-2 mb-4 group">
            {/* Scroll Container */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto pb-4 pt-1 px-4 -mx-4 no-scrollbar snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {cards.map((card, index) => (
                    <div key={card.id || index} className="snap-start">
                        <ChatRecommendationCard
                            card={card}
                            type={type}
                            onClick={() => onSelect?.(card)}
                        />
                    </div>
                ))}

                {/* View All / More Card spacer or button at end could go here */}
                <div className="w-4 flex-shrink-0" />
            </div>

            {/* Scroll Indicator / Arrow (Desktop mostly, mobile has touch) */}
            <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/50 backdrop-blur-sm p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                disabled={cards.length <= 1}
            >
                <ChevronRight className="w-4 h-4 text-primary" />
            </button>
        </div>
    );
};
