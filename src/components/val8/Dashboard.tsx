"use client";

import React from 'react';
import { LogOut, MessageSquare, ArrowLeft } from 'lucide-react';
import { useVal8 } from './Val8Context';
import { BentoGrid, BentoItem } from '@/components/dashboard/BentoGrid';
import { WeatherWidget } from '@/components/dashboard/WeatherWidget';
import { FlightWidget } from '@/components/dashboard/FlightWidget';
import { StayWidget } from '@/components/dashboard/StayWidget';
import { CalendarWidget } from '@/components/dashboard/CalendarWidget';
import { ActivityWidget } from '@/components/dashboard/ActivityWidget';
import { RideWidget } from '@/components/dashboard/RideWidget';
import { SchedulingWidget } from '@/components/dashboard/SchedulingWidget';
import { TimezoneWidget } from '@/components/dashboard/TimezoneWidget';

import { WidgetDetailView } from './WidgetDetailView';

export interface DashboardState {
    flight: {
        origin: string;
        destination: string;
        carrier: string;
        class: string;
        date: string;
        flightNumber: string;
        price: string;
    };
    stay: {
        hotelName: string;
        roomType: string;
        guests: number;
        checkIn: string;
        checkOut: string;
        price: string;
    };
    ride: {
        pickup: string;
        serviceLevel: string;
        dropoff: string;
        price: string;
    };
    weather: {
        unit: 'C' | 'F';
        alerts: boolean;
    };
    location: {
        current: string;
    };
    timezone: {
        primary: string;
        secondary: string;
    };
}

const INITIAL_STATE: DashboardState = {
    flight: {
        origin: "SFO",
        destination: "MIA",
        carrier: "Emirates",
        class: "First Class",
        date: "June 5 - June 9",
        flightNumber: "AI 270C",
        price: "$6,200"
    },
    stay: {
        hotelName: "One&Only Royal Mirage",
        roomType: "Penthouse Suite",
        guests: 2,
        checkIn: "June 6",
        checkOut: "June 9",
        price: "$5,800"
    },
    ride: {
        pickup: "San Francisco Int'l",
        serviceLevel: "Luxury",
        dropoff: "Home",
        price: "Included"
    },
    weather: {
        unit: 'F',
        alerts: true
    },
    location: {
        current: "Miami, Florida"
    },
    timezone: {
        primary: "Eastern Time",
        secondary: "Tokyo"
    }
};

export const Dashboard: React.FC = () => {
    const { user, logout, setView, handleWidgetAction } = useVal8();
    const [selectedWidget, setSelectedWidget] = React.useState<'flight' | 'stay' | 'ride' | 'calendar' | 'dining' | 'shopping' | 'experience' | 'checkout' | 'weather' | 'location' | 'timezone' | 'scheduling' | null>(null);
    const [data, setData] = React.useState<DashboardState>(INITIAL_STATE);

    const handleSave = (partialData: Partial<DashboardState>) => {
        setData(prev => ({ ...prev, ...partialData }));
    };

    if (!user) return null;

    return (
        <div className="h-full flex flex-col bg-bg relative">
            <WidgetDetailView
                type={selectedWidget}
                data={data}
                onSave={handleSave}
                onClose={() => setSelectedWidget(null)}
            />

            {/* Content - Bento Grid */}
            <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
                {/* Using a 12-column grid for precise layout matching the reference */}
                {/* Optimized Grid: 2 columns on mobile, 12 on desktop */}
                <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-4 auto-rows-[160px] md:auto-rows-[180px]">

                    {/* --- ROW 1 --- */}

                    {/* Calendar (Mobile: 1 col, Desktop: 2 cols) */}
                    <div className="col-span-1 md:col-span-2 glass-card rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer hover:border-primary/30 transition-colors" onClick={() => setSelectedWidget('calendar')}>
                        <CalendarWidget />
                    </div>

                    {/* Location (Mobile: 1 col, Desktop: 2 cols) */}
                    <div className="col-span-1 md:col-span-2 glass-card rounded-2xl md:rounded-3xl overflow-hidden p-4 md:p-5 flex flex-col justify-between cursor-pointer hover:border-primary/30 transition-colors" onClick={() => setSelectedWidget('location')}>
                        <div className="flex justify-between items-start">
                            <div className="overflow-hidden">
                                <h3 className="text-text-primary dark:text-white font-serif text-lg md:text-xl truncate">{data.location.current.split(',')[0]}</h3>
                                <p className="text-text-secondary dark:text-white/60 text-[9px] md:text-[10px] uppercase tracking-wider truncate">{data.location.current.split(',')[1] || 'USA'}</p>
                            </div>
                            <div className="shrink-0 px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[8px] md:text-[9px] font-bold uppercase tracking-widest border border-emerald-500/20">
                                Done
                            </div>
                        </div>
                        <p className="text-text-muted dark:text-white/40 text-xs truncate">{data.stay.checkIn}-{data.stay.checkOut}</p>
                    </div>

                    {/* Weather (Mobile: 1 col, Desktop: 2 cols) */}
                    <div className="col-span-1 md:col-span-2 glass-card rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer hover:border-primary/30 transition-colors" onClick={() => setSelectedWidget('weather')}>
                        <WeatherWidget />
                    </div>

                    {/* Timezones (Mobile: 1 col, Desktop: 2 cols) */}
                    <div className="col-span-1 md:col-span-2 flex flex-col gap-2 md:gap-4">
                        <div className="flex-1 rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer" onClick={() => setSelectedWidget('timezone')}>
                            <TimezoneWidget city="Primary" time="14:20" offset={data.timezone.primary} />
                        </div>
                        <div className="flex-1 rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer" onClick={() => setSelectedWidget('timezone')}>
                            <TimezoneWidget city="Secondary" time="11:20" offset={data.timezone.secondary} />
                        </div>
                    </div>

                    {/* Hotel (Mobile: Full Width, Desktop: 4 cols) */}
                    <div className="col-span-2 md:col-span-4 glass-card rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer hover:border-primary/30 transition-colors" onClick={() => setSelectedWidget('stay')}>
                        <StayWidget data={data.stay} />
                    </div>

                    {/* --- ROW 2 --- */}

                    {/* Flight (Mobile: Full Width, Desktop: 6 cols) */}
                    <div className="col-span-2 md:col-span-6 glass-card rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer hover:border-primary/30 transition-colors" onClick={() => setSelectedWidget('flight')}>
                        <FlightWidget data={data.flight} />
                    </div>

                    {/* Ride (Mobile: 1 col, Desktop: 3 cols) */}
                    <div className="col-span-1 md:col-span-3 glass-card rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer hover:border-primary/30 transition-colors" onClick={() => setSelectedWidget('ride')}>
                        <RideWidget data={data.ride} />
                    </div>

                    {/* Scheduling (Mobile: 1 col, Desktop: 3 cols) */}
                    <div className="col-span-1 md:col-span-3 glass-card rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer hover:border-primary/30 transition-colors" onClick={() => setSelectedWidget('scheduling')}>
                        <SchedulingWidget />
                    </div>

                    {/* --- ROW 3 --- */}

                    {/* Dining (Mobile: 1 col, Desktop: 3 cols) */}
                    <div className="col-span-1 md:col-span-3 glass-card rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer hover:border-primary/30 transition-colors" onClick={() => setSelectedWidget('dining')}>
                        <ActivityWidget
                            title="Waterfront Kitchen"
                            subtitle="$30-50 | American"
                            image="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop"
                            category="Dining"
                        />
                    </div>

                    {/* Shopping (Mobile: 1 col, Desktop: 3 cols) */}
                    <div className="col-span-1 md:col-span-3 glass-card rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer hover:border-primary/30 transition-colors" onClick={() => setSelectedWidget('shopping')}>
                        <ActivityWidget
                            title="SPF 50 Sunscreen"
                            subtitle="124k"
                            price="$8.97"
                            image="/images/demo/shopping-sunscreen.png"
                            category="Shopping"
                        />
                    </div>

                    {/* Local Interest (Mobile: Full Width, Desktop: 6 cols) */}
                    <div className="col-span-2 md:col-span-6 glass-card rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer hover:border-primary/30 transition-colors" onClick={() => setSelectedWidget('experience')}>
                        <ActivityWidget
                            title="Miami's Best Beaches"
                            subtitle="Curated list of seaside sanctuaries"
                            image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop"
                            category="Local Interest"
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};
