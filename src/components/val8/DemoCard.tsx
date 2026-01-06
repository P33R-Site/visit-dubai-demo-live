import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVal8 } from './Val8Context';
import { FlightWidget } from '@/components/dashboard/FlightWidget';
import { StayWidget } from '@/components/dashboard/StayWidget';
import { RideWidget } from '@/components/dashboard/RideWidget';
import { ActivityWidget } from '@/components/dashboard/ActivityWidget';
import { CheckoutWidget } from '@/components/dashboard/CheckoutWidget';
import { CalendarWidget } from '@/components/dashboard/CalendarWidget';
import { WeatherWidget } from '@/components/dashboard/WeatherWidget';
import { TimezoneWidget } from '@/components/dashboard/TimezoneWidget';
import { DashboardState } from './Dashboard';
import { WidgetDetailView } from './WidgetDetailView';

// Wrapper for animation - simple opacity fade, no layout animation to prevent jumps
const WidgetContainer = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
);

const DEMO_DATA: DashboardState = {
    flight: {
        origin: "SFO",
        destination: "DXB",
        carrier: "Emirates",
        class: "Business Class",
        date: "June 5 - June 9",
        flightNumber: "EK 226",
        price: "$6,200"
    },
    stay: {
        hotelName: "One&Only Royal Mirage",
        roomType: "Arabian Court Suite",
        guests: 2,
        checkIn: "June 6",
        checkOut: "June 9",
        price: "$5,800"
    },
    ride: {
        pickup: "Dubai Int'l (DXB)",
        serviceLevel: "Luxury",
        dropoff: "Burj Al Arab",
        price: "Included"
    },
    weather: {
        unit: 'F',
        alerts: false
    },
    location: {
        current: "Dubai, UAE"
    },
    timezone: {
        primary: "Gulf Standard Time",
        secondary: "Pacific Standard Time"
    }
};

export const DemoCard: React.FC = () => {
    const { demoStep, demoPhase } = useVal8();
    const [data, setData] = useState<DashboardState>(DEMO_DATA);
    const [selectedWidget, setSelectedWidget] = useState<'flight' | 'stay' | 'ride' | 'calendar' | 'dining' | 'shopping' | 'experience' | 'checkout' | 'weather' | 'location' | 'timezone' | 'scheduling' | null>(null);

    const handleSave = (partialData: Partial<DashboardState>) => {
        setData(prev => ({ ...prev, ...partialData }));
    };

    // Mapping steps to widgets with cumulative logic
    // Step 0: Context (Weather, Location, Timezone, Calendar)
    // Step 1: Flight
    // Step 2: Hotel
    // Step 3: Ride
    // Step 4: Dining
    // Step 5: Essentials
    // Step 6: Experiences/Summary

    const [isCheckoutComplete, setIsCheckoutComplete] = React.useState(false);

    const handleCheckout = () => {
        setIsCheckoutComplete(true);
    };

    return (
        <div className="h-full w-full p-6 overflow-y-auto custom-scrollbar relative">

            <WidgetDetailView
                type={selectedWidget}
                data={data}
                onSave={handleSave}
                onClose={() => setSelectedWidget(null)}
            />

            {/* Success Modal Overlay */}
            <AnimatePresence>
                {isCheckoutComplete && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="glass-card rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center relative overflow-hidden"
                        >
                            {/* Background decoration */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-primary to-emerald-500" />
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />

                            <div className="mb-6 flex justify-center">
                                <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                    <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>

                            <h3 className="text-2xl font-serif text-text-primary dark:text-white mb-2">Reservation Confirmed</h3>
                            <p className="text-text-secondary dark:text-white/60 text-sm mb-8 leading-relaxed">
                                Your Dubai itinerary has been successfully booked. A detailed confirmation has been sent to your email.
                            </p>

                            <button
                                onClick={() => setIsCheckoutComplete(false)}
                                className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-soft transition-colors"
                            >
                                Done
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Dynamic Grid Container - Mobile Optimized */}
            <div className={`grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-6 auto-rows-max grid-flow-row-dense pb-20 transition-all duration-500 ${isCheckoutComplete ? 'blur-sm grayscale-[0.5]' : ''}`}>
                <AnimatePresence>

                    {/* STEP 1: CONTEXT OVERVIEW + FLIGHT - All appear together when AI responds */}
                    {((demoStep > 1) || (demoStep === 1 && demoPhase === 'responding')) && (
                        <React.Fragment key="overview-fragment">
                            {/* Calendar (Mobile: 1 col, Desktop: 3 cols) */}
                            <WidgetContainer key="calendar" className="col-span-1 md:col-span-12 lg:col-span-3 min-h-[180px] md:min-h-[240px]">
                                <div className="glass-card rounded-3xl overflow-hidden h-full cursor-pointer hover:border-primary/50 transition-all" onClick={() => setSelectedWidget('calendar')}>
                                    <CalendarWidget />
                                </div>
                            </WidgetContainer>

                            {/* Weather (Mobile: 1 col, Desktop: 3 cols) */}
                            <WidgetContainer key="weather" className="col-span-1 md:col-span-12 lg:col-span-3 min-h-[180px] md:min-h-[240px]">
                                <div className="glass-card rounded-3xl overflow-hidden h-full cursor-pointer hover:border-primary/50 transition-all" onClick={() => setSelectedWidget('weather')}>
                                    <WeatherWidget temperature="95" />
                                </div>
                            </WidgetContainer>

                            {/* Flight - Pending until user confirms with "Yes." (step 2), then completed */}
                            <WidgetContainer key="flight" className="col-span-2 md:col-span-12 lg:col-span-6 min-h-[240px]">
                                <div className="glass-card rounded-3xl overflow-hidden h-full cursor-pointer hover:border-primary/50 transition-all" onClick={() => setSelectedWidget('flight')}>
                                    <FlightWidget status={demoStep >= 2 ? 'completed' : 'pending'} data={data.flight} />
                                </div>
                            </WidgetContainer>
                        </React.Fragment>
                    )}

                    {/* STEP 3: HOTEL - Appear after Hotel Response (Step 3) */}
                    {((demoStep > 3) || (demoStep === 3 && (demoPhase === 'processing' || demoPhase === 'responding'))) && (
                        <WidgetContainer key="hotel" className="col-span-2 md:col-span-12 lg:col-span-4 min-h-[240px]">
                            <div className="glass-card rounded-3xl overflow-hidden h-full cursor-pointer hover:border-primary/50 transition-all" onClick={() => setSelectedWidget('stay')}>
                                <StayWidget data={data.stay} />
                            </div>
                        </WidgetContainer>
                    )}

                    {/* STEP 4: RIDE - Appear after Ride Response (Step 4) */}
                    {((demoStep > 4) || (demoStep === 4 && (demoPhase === 'processing' || demoPhase === 'responding'))) && (
                        <WidgetContainer key="ride" className="col-span-1 md:col-span-12 lg:col-span-4 min-h-[180px] md:min-h-[240px]">
                            <div className="glass-card rounded-3xl overflow-hidden h-full cursor-pointer hover:border-primary/50 transition-all" onClick={() => setSelectedWidget('ride')}>
                                <RideWidget data={data.ride} />
                            </div>
                        </WidgetContainer>
                    )}

                    {/* STEP 5: DINING - Appear after Dining Response (Step 5) */}
                    {((demoStep > 5) || (demoStep === 5 && (demoPhase === 'processing' || demoPhase === 'responding'))) && (
                        <WidgetContainer key="dining" className="col-span-1 md:col-span-12 lg:col-span-4 min-h-[180px] md:min-h-[240px]">
                            <div className="glass-card rounded-3xl overflow-hidden h-full cursor-pointer hover:border-primary/50 transition-all" onClick={() => setSelectedWidget('dining')}>
                                <ActivityWidget
                                    title="Ossiano"
                                    subtitle="Underwater Fine Dining"
                                    image="/images/demo/dining-ossiano.png"
                                    category="Dining"
                                />
                            </div>
                        </WidgetContainer>
                    )}

                    {/* STEP 6: SHOPPING - Appear after Shopping Response (Step 6) */}
                    {((demoStep > 6) || (demoStep === 6 && (demoPhase === 'processing' || demoPhase === 'responding'))) && (
                        <WidgetContainer key="shopping" className="col-span-1 md:col-span-12 lg:col-span-4 min-h-[180px] md:min-h-[240px]">
                            <div className="glass-card rounded-3xl overflow-hidden h-full cursor-pointer hover:border-primary/50 transition-all" onClick={() => setSelectedWidget('shopping')}>
                                <ActivityWidget
                                    title="SunSport SPF 50"
                                    subtitle="High SPF Protection"
                                    price="$8.97"
                                    image="/images/demo/shopping-sunscreen.png"
                                    category="Shopping"
                                />
                            </div>
                        </WidgetContainer>
                    )}

                    {/* STEP 7: EXPERIENCES - Appear after Experience Response (Step 7) */}
                    {((demoStep > 7) || (demoStep === 7 && (demoPhase === 'processing' || demoPhase === 'responding'))) && (
                        <WidgetContainer key="experiences" className="col-span-2 md:col-span-12 lg:col-span-8 min-h-[240px]">
                            <div className="glass-card rounded-3xl overflow-hidden h-full cursor-pointer hover:border-primary/50 transition-all" onClick={() => setSelectedWidget('experience')}>
                                <ActivityWidget
                                    title="Private Desert Safari"
                                    subtitle="Vintage Land Rovers"
                                    image="/images/demo/experience-safari.png"
                                    category="Experiences"
                                />
                            </div>
                        </WidgetContainer>
                    )}

                    {/* STEP 8: CHECKOUT - Appear after Final Summary (Step 8) */}
                    {demoStep >= 8 && (
                        <WidgetContainer key="checkout" className="col-span-2 md:col-span-12 h-full min-h-[400px]">
                            <div className="glass-card rounded-3xl overflow-hidden h-full cursor-pointer hover:border-primary/50 transition-all" onClick={() => setSelectedWidget('checkout')}>
                                <CheckoutWidget onCheckout={handleCheckout} data={data} />
                            </div>
                        </WidgetContainer>
                    )}



                </AnimatePresence>
            </div>
        </div>
    );
};
