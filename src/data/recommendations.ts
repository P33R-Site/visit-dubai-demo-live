import { HotelCard } from '@/components/val8/Val8Context';

export const TOP_ATTRACTIONS: HotelCard[] = [
    {
        id: 'attr-1',
        name: 'Tanomah: Scenic Horse Riding',
        location: 'Aseer',
        price: 'From $45',
        priceSuffix: '',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1553531889-e6cf4d692b1b?auto=format&fit=crop&q=80&w=800',
        tags: ['Nature', 'Adventure'],
        type: 'attraction'
    },
    {
        id: 'attr-2',
        name: 'Museum of the Future',
        location: 'Sheikh Zayed Road',
        price: 'From $38',
        priceSuffix: '/ person',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&q=80&w=800',
        tags: ['Museum', 'Technology', 'Architecture'],
        type: 'attraction'
    },
    {
        id: 'attr-3',
        name: 'Dubai Frame',
        location: 'Zabeel Park',
        price: 'From $15',
        priceSuffix: '/ person',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800',
        tags: ['Views', 'Architecture', 'History'],
        type: 'attraction'
    }
];

export const UPCOMING_EVENTS: HotelCard[] = [
    {
        id: 'evt-1',
        name: 'Dubai Shopping Festival',
        location: 'Citywide',
        price: 'Free',
        priceSuffix: '',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=800',
        tags: ['Shopping', 'Festival', 'Fireworks'],
        type: 'event',
        startDate: '10 JAN',
        endDate: '2026'
    },
    {
        id: 'evt-2',
        name: 'AlManshiyah Carnival',
        location: 'Alula',
        price: 'From $25',
        priceSuffix: '/ entry',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800',
        tags: ['Entertainment', 'Carnival'],
        type: 'event',
        startDate: '19 DEC',
        endDate: '2025'
    },
    {
        id: 'evt-3',
        name: 'Desert Safari Experience',
        location: 'Dubai Desert',
        price: '$50',
        priceSuffix: '',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?auto=format&fit=crop&q=80&w=800',
        tags: ['Adventure', 'Nature'],
        type: 'event',
        startDate: '26 DEC',
        endDate: '2025'
    }
];
// Note: I modified evt-3 to match "Tanomah" from the image but type attraction, mixing data for demo purposes.
// Actually I should update TOP_ATTRACTIONS to match the image "Tanomah".
// Let's just update UPCOMING_EVENTS properly first.
