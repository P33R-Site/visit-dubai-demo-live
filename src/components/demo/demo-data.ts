export type ScriptStep = {
    id: string;
    text: string;
    triggerWidget?: 'none' | 'flights' | 'hotel' | 'ride' | 'dining' | 'shopping' | 'experiences' | 'itinerary' | 'summary';
    options?: { label: string; nextStepId: string }[];
    autoAdvance?: boolean; // If true, moves to next step after speech ends (for scene setting)
    nextStepId?: string; // Used if autoAdvance is true
};

export const DEMO_SCRIPT: Record<string, ScriptStep> = {
    'start': {
        id: 'start',
        text: "Welcome back. Planning a trip soon, or just browsing ideas?",
        options: [
            { label: "Planning Miami in June", nextStepId: 'miami_confirmation' }
        ]
    },
    'miami_confirmation': {
        id: 'miami_confirmation',
        text: "Great choice. Weather is sunny, 84°. I'll handle everything for June 6th to 9th. Want flights, hotel, or activities first?",
        triggerWidget: 'none',
        options: [
            { label: "Flights", nextStepId: 'flights_offer' }
        ]
    },
    'flights_offer': {
        id: 'flights_offer',
        text: "I've got you nonstop from San Francisco to Miami, American Airlines, business class. Want me to hold seats?",
        triggerWidget: 'flights',
        options: [
            { label: "Yes", nextStepId: 'hotel_ask' }
        ]
    },
    'hotel_ask': {
        id: 'hotel_ask',
        text: "Done. Where would you like to stay?",
        triggerWidget: 'flights', // Keep flight visible? Or clear? Let's keep flight until replaced.
        options: [
            { label: "Something beachfront", nextStepId: 'hotel_offer' }
        ]
    },
    'hotel_offer': {
        id: 'hotel_offer',
        text: "I'd recommend the King Suite Beach View at a quiet modern property with ocean views. Want me to secure it?",
        triggerWidget: 'hotel',
        options: [
            { label: "Yes", nextStepId: 'ride_ask' }
        ]
    },
    'ride_ask': {
        id: 'ride_ask',
        text: "Locked in. Need an airport transfer?",
        triggerWidget: 'hotel', // Keep hotel visible
        options: [
            { label: "Sure", nextStepId: 'ride_confirm' }
        ]
    },
    'ride_confirm': {
        id: 'ride_confirm',
        text: "Black SUV, 2 passengers, arrival scheduled. Want restaurant recommendations?",
        triggerWidget: 'ride',
        options: [
            { label: "Yes", nextStepId: 'dining_offer' }
        ]
    },
    'dining_offer': {
        id: 'dining_offer',
        text: "Top pick: Waterfront Kitchen — local seafood, great vibe, 30 to 50 dollars per person. Reserve Friday at 8?",
        triggerWidget: 'dining',
        options: [
            { label: "Do it", nextStepId: 'shopping_offer' }
        ]
    },
    'shopping_offer': {
        id: 'shopping_offer',
        text: "Done. One more thing — sunscreen with SPF 50, highly rated, 9 dollars. Want it delivered to your hotel?",
        triggerWidget: 'shopping',
        options: [
            { label: "Yes", nextStepId: 'experiences_ask' }
        ]
    },
    'experiences_ask': {
        id: 'experiences_ask',
        text: "Added. How about some activities? Sunrise paddle boarding is amazing.",
        triggerWidget: 'experiences',
        options: [
            { label: "Yes", nextStepId: 'summary_ask' }
        ]
    },
    'summary_ask': {
        id: 'summary_ask',
        text: "Added. Anything else tonight — or should I send a summary?",
        triggerWidget: 'itinerary',
        options: [
            { label: "Send it", nextStepId: 'finish' }
        ]
    },
    'finish': {
        id: 'finish',
        text: "Sent. Your Miami trip is fully organized. I'll notify you if prices change.",
        triggerWidget: 'summary',
        options: [
            { label: "Restart Demo", nextStepId: 'start' }
        ]
    }
};
