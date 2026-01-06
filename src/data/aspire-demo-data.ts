// Demo data for Aspire Lifestyles Concierge Agent Dashboard

export interface Client {
    id: string;
    name: string;
    tier: 'Platinum' | 'Diamond' | 'Elite';
    avatar: string;
    phone: string;
    email: string;
    memberSince: string;
    // Enhanced client data
    spouse?: string;
    anniversary?: string;
    birthday?: string;
    communicationStyle: 'Formal' | 'Friendly' | 'Efficient';
    preferredContact: 'Phone' | 'Email' | 'SMS';
    language: string;
    satisfactionScore: number;
    totalBookings: number;
    preferences: {
        airlines: string[];
        hotels: string[];
        dietary: string[];
        seating: string;
        roomType: string;
        specialRequests?: string[];
    };
    recentTrips: {
        destination: string;
        date: string;
        spend: string;
    }[];
    vipNotes: string;
    // Personal touches
    personalTouches?: string[];
}

export interface BookingItem {
    id: string;
    type: 'flight' | 'hotel' | 'experience' | 'transfer';
    title: string;
    subtitle: string;
    date: string;
    time?: string;
    price: string;
    status: 'suggested' | 'confirmed' | 'pending';
    details?: Record<string, string>;
}

export interface AISuggestion {
    id: string;
    type: 'flight' | 'hotel' | 'experience' | 'transfer';
    title: string;
    subtitle: string;
    price: string;
    matchScore: number;
    reason: string;
    image?: string;
}

export interface DemoStep {
    id: string;
    narration: string;
    action: 'incoming_call' | 'show_client' | 'ai_listening' | 'ai_suggest' | 'add_to_booking' | 'show_savings' | 'complete';
    delay: number;
    data?: {
        suggestion?: AISuggestion;
        bookingItem?: BookingItem;
    };
}

// Sample HNWI Client with enhanced data
export const DEMO_CLIENT: Client = {
    id: 'c001',
    name: 'Mr. Richard Chen',
    tier: 'Diamond',
    avatar: '/images/demo/client-avatar.png',
    phone: '+1 (415) 555-0189',
    email: 'r.chen@chenventures.com',
    memberSince: '2019',
    // Enhanced fields
    spouse: 'Mrs. Emily Chen',
    anniversary: 'March 15',
    birthday: 'September 22',
    communicationStyle: 'Efficient',
    preferredContact: 'Phone',
    language: 'English',
    satisfactionScore: 98,
    totalBookings: 47,
    preferences: {
        airlines: ['Emirates', 'Singapore Airlines', 'British Airways'],
        hotels: ['Four Seasons', 'Aman', 'Mandarin Oriental'],
        dietary: ['Gluten-free', 'No shellfish'],
        seating: 'Window, First Class',
        roomType: 'Suite with city view',
        specialRequests: ['Late checkout', 'High floor', 'Quiet room']
    },
    recentTrips: [
        { destination: 'Tokyo, Japan', date: 'Nov 2024', spend: '$42,500' },
        { destination: 'Maldives', date: 'Aug 2024', spend: '$68,200' },
        { destination: 'London, UK', date: 'May 2024', spend: '$31,800' }
    ],
    vipNotes: 'Prefers morning departures. Wife has sesame allergy. Anniversary in March - always suggest romantic options.',
    personalTouches: [
        'Favorite champagne: Krug Grande Cuvée',
        'Enjoys golf - has handicap of 8',
        'Collects vintage watches'
    ]
};

// AI Suggestions that will appear during demo
export const AI_SUGGESTIONS: AISuggestion[] = [
    {
        id: 's1',
        type: 'flight',
        title: 'Emirates First Class',
        subtitle: 'SFO → LHR • Direct • 10h 45m',
        price: '$12,400',
        matchScore: 98,
        reason: 'Matches preferred airline & seating',
        image: '/images/demo/emirates-first.jpg'
    },
    {
        id: 's2',
        type: 'hotel',
        title: "Claridge's - Davies Suite",
        subtitle: 'Mayfair, London • 4 nights',
        price: '$18,600',
        matchScore: 95,
        reason: 'Preferred hotel chain, suite with city view',
        image: '/images/demo/claridges.jpg'
    },
    {
        id: 's3',
        type: 'experience',
        title: 'Private Wimbledon Box',
        subtitle: 'Centre Court • All-day hospitality',
        price: '$8,500',
        matchScore: 92,
        reason: 'Client mentioned tennis interest last visit',
        image: '/images/demo/wimbledon.jpg'
    },
    {
        id: 's4',
        type: 'transfer',
        title: 'Rolls-Royce Airport Transfer',
        subtitle: 'Heathrow → Mayfair • Meet & Greet',
        price: '$850',
        matchScore: 100,
        reason: 'Standard for Diamond tier',
        image: '/images/demo/rolls-royce.jpg'
    }
];

// Demo script with timing
export const DEMO_SCRIPT: DemoStep[] = [
    {
        id: 'step1',
        narration: "Incoming call from Mr. Richard Chen, one of our Diamond tier members. His profile loads instantly with all preferences and history.",
        action: 'incoming_call',
        delay: 0
    },
    {
        id: 'step2',
        narration: "The agent accepts the call. Mr. Chen mentions he'd like to plan a trip to London for Wimbledon next summer with his wife.",
        action: 'show_client',
        delay: 5000
    },
    {
        id: 'step3',
        narration: "Our AI begins analyzing the request in real-time, cross-referencing with Mr. Chen's preferences and past bookings.",
        action: 'ai_listening',
        delay: 4500
    },
    {
        id: 'step4',
        narration: "Based on his airline preferences and seating requirements, the AI suggests Emirates First Class with a 98% match score.",
        action: 'ai_suggest',
        delay: 3500,
        data: { suggestion: AI_SUGGESTIONS[0] }
    },
    {
        id: 'step5',
        narration: "With one click, the agent adds the flight to the itinerary.",
        action: 'add_to_booking',
        delay: 2500,
        data: {
            bookingItem: {
                id: 'b1',
                type: 'flight',
                title: 'Emirates First Class',
                subtitle: 'SFO → LHR • Direct',
                date: 'June 28-July 2, 2025',
                time: '10:30 AM',
                price: '$12,400',
                status: 'confirmed'
            }
        }
    },
    {
        id: 'step6',
        narration: "The AI knows Mr. Chen prefers Four Seasons and suites. Claridge's Davies Suite appears as a 95% match.",
        action: 'ai_suggest',
        delay: 3500,
        data: { suggestion: AI_SUGGESTIONS[1] }
    },
    {
        id: 'step7',
        narration: "Added to itinerary. Now the AI suggests a curated experience.",
        action: 'add_to_booking',
        delay: 2500,
        data: {
            bookingItem: {
                id: 'b2',
                type: 'hotel',
                title: "Claridge's - Davies Suite",
                subtitle: 'Mayfair, London • 4 nights',
                date: 'June 28, 2025',
                price: '$18,600',
                status: 'confirmed'
            }
        }
    },
    {
        id: 'step8',
        narration: "The AI noticed Mr. Chen mentioned tennis on his last call - it suggests a private Wimbledon box.",
        action: 'ai_suggest',
        delay: 3000,
        data: { suggestion: AI_SUGGESTIONS[2] }
    },
    {
        id: 'step8b',
        narration: "Added to itinerary.",
        action: 'add_to_booking',
        delay: 2000,
        data: {
            bookingItem: {
                id: 'b3',
                type: 'experience',
                title: 'Private Wimbledon Box',
                subtitle: 'Centre Court • All-day hospitality',
                date: 'June 30, 2025',
                price: '$8,500',
                status: 'confirmed'
            }
        }
    },
    {
        id: 'step9',
        narration: "As standard for Diamond members, a Rolls-Royce transfer is automatically suggested.",
        action: 'ai_suggest',
        delay: 2500,
        data: { suggestion: AI_SUGGESTIONS[3] }
    },
    {
        id: 'step9b',
        narration: "Transfer added. The complete itinerary is now ready.",
        action: 'add_to_booking',
        delay: 2000,
        data: {
            bookingItem: {
                id: 'b4',
                type: 'transfer',
                title: 'Rolls-Royce Airport Transfer',
                subtitle: 'Heathrow → Mayfair • Meet & Greet',
                date: 'June 28, 2025',
                price: '$850',
                status: 'confirmed'
            }
        }
    },
    {
        id: 'step10',
        narration: "The complete itinerary is ready. Total value: $40,350 with an 18% margin.",
        action: 'show_savings',
        delay: 4000
    },
    {
        id: 'step11',
        narration: "The agent can now send a beautifully formatted quote directly to Mr. Chen's email with one click. That's the power of AI-assisted concierge services.",
        action: 'complete',
        delay: 5000
    }
];

// Active calls in queue (for visual effect)
export const QUEUED_CALLS = [
    { id: 'q1', name: 'Mrs. Sofia Martinez', tier: 'Elite' as const, waitTime: '0:45' },
    { id: 'q2', name: 'Dr. James Wong', tier: 'Platinum' as const, waitTime: '1:23' }
];
