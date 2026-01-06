'use client';

import React from 'react';
import { TripPlan } from '@/lib/types';
import { Plane, Building2, Sparkles, Calendar, CreditCard, MapPin, Clock, Star, Check } from 'lucide-react';

interface TripPlanCardProps {
    tripPlan: TripPlan;
    onApprove?: () => void;
    isApproving?: boolean;
    className?: string;
}

// Format price helper
const formatPrice = (price: number | string | undefined): string => {
    if (price === undefined || price === null) return '0';
    const num = typeof price === 'string' ? parseFloat(price) : price;
    return isNaN(num) ? '0' : num.toLocaleString();
};

export function TripPlanCard({ tripPlan, onApprove, isApproving = false, className = '' }: TripPlanCardProps) {
    return (
        <div className={`trip-plan-card ${className}`}>
            {/* Header with destination */}
            <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-5 border-b border-primary/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <h3 className="text-2xl font-serif font-bold text-text-primary dark:text-white tracking-wide">
                    {tripPlan.destination || 'Your Trip'}
                </h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-text-secondary dark:text-white/60">
                    <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-primary" />
                        {tripPlan.duration_days || 0} days
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-primary" />
                        {tripPlan.start_date} - {tripPlan.end_date}
                    </span>
                </div>
            </div>

            {/* Content sections */}
            <div className="p-4 space-y-3">
                {/* Flight */}
                {tripPlan.flights && tripPlan.flights.length > 0 && tripPlan.flights[0] && (
                    <div className="trip-section">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                <Plane className="w-4 h-4 text-blue-400" />
                            </div>
                            <span className="text-sm font-semibold text-text-primary dark:text-white">Flight</span>
                        </div>
                        <div className="ml-9 space-y-1">
                            <p className="text-sm text-text-secondary dark:text-white/70">
                                <span className="font-medium text-text-primary dark:text-white">{tripPlan.flights[0].airline}</span>
                                {' '}{tripPlan.flights[0].flight_number}
                            </p>
                            <p className="text-xs text-text-muted dark:text-white/50">
                                {tripPlan.flights[0].origin} → {tripPlan.flights[0].destination}
                            </p>
                            <p className="text-xs text-text-muted dark:text-white/50">
                                {tripPlan.flights[0].departure_time} • {tripPlan.flights[0].class_type}
                            </p>
                            <p className="text-sm font-semibold text-primary mt-1">
                                ${formatPrice(tripPlan.flights[0].price)}
                            </p>
                        </div>
                    </div>
                )}

                {/* Hotel */}
                {tripPlan.hotel && (
                    <div className="trip-section">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center">
                                <Building2 className="w-4 h-4 text-amber-400" />
                            </div>
                            <span className="text-sm font-semibold text-text-primary dark:text-white">Hotel</span>
                        </div>
                        <div className="ml-9 space-y-1">
                            <p className="text-sm font-medium text-text-primary dark:text-white">{tripPlan.hotel.name}</p>
                            <p className="text-xs text-text-muted dark:text-white/50 flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {tripPlan.hotel.location}
                            </p>
                            <p className="text-xs text-text-muted dark:text-white/50">
                                {tripPlan.hotel.room_type} • {tripPlan.hotel.check_in} to {tripPlan.hotel.check_out}
                            </p>
                            <p className="text-sm font-semibold text-primary mt-1">
                                ${formatPrice(tripPlan.hotel.total_price)}
                            </p>
                        </div>
                    </div>
                )}

                {/* Experiences */}
                {tripPlan.experiences && tripPlan.experiences.length > 0 && (
                    <div className="trip-section">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-emerald-400" />
                            </div>
                            <span className="text-sm font-semibold text-text-primary dark:text-white">
                                Experiences ({tripPlan.experiences.length})
                            </span>
                        </div>
                        <div className="ml-9 space-y-2">
                            {tripPlan.experiences.slice(0, 3).map((exp, idx) => (
                                <div key={idx} className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm text-text-secondary dark:text-white/70">{exp.name}</p>
                                        <p className="text-xs text-text-muted dark:text-white/40">{exp.date}</p>
                                    </div>
                                    <span className="text-sm font-medium text-primary">${formatPrice(exp.price)}</span>
                                </div>
                            ))}
                            {tripPlan.experiences.length > 3 && (
                                <p className="text-xs text-text-muted dark:text-white/40">
                                    +{tripPlan.experiences.length - 3} more experiences
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Footer with total and action */}
            <div className="p-4 border-t border-border-subtle dark:border-white/10 bg-surface-alt/30 dark:bg-white/5 rounded-b-2xl">
                {/* Payment info */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-text-muted dark:text-white/40" />
                        <span className="text-xs text-text-muted dark:text-white/40">
                            {tripPlan.recommended_card || 'Payment'}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${tripPlan.status === 'booked' || tripPlan.status === 'confirmed'
                                ? 'bg-success/20 text-success'
                                : 'bg-warning/20 text-warning'
                            }`}>
                            {tripPlan.status || 'pending'}
                        </span>
                    </div>
                </div>

                {/* Total price */}
                <div className="flex items-end justify-between">
                    <div>
                        <p className="text-xs text-text-muted dark:text-white/40 uppercase tracking-wider">Total</p>
                        <p className="text-2xl font-bold text-primary">
                            ${formatPrice(tripPlan.total_price)}
                            <span className="text-sm font-normal text-text-muted dark:text-white/40 ml-1">
                                {tripPlan.currency || 'USD'}
                            </span>
                        </p>
                    </div>

                    {/* Approve Button */}
                    {tripPlan.status === 'pending' && onApprove && (
                        <button
                            onClick={onApprove}
                            disabled={isApproving}
                            className="px-4 py-2.5 bg-primary text-text-on-primary rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                        >
                            {isApproving ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-text-on-primary/30 border-t-text-on-primary rounded-full animate-spin" />
                                    Booking...
                                </>
                            ) : (
                                <>
                                    <Check className="w-4 h-4" />
                                    Book Trip
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>

            <style jsx>{`
                .trip-plan-card {
                    background: linear-gradient(180deg, var(--glass-card-start, rgba(20, 20, 20, 0.6)) 0%, var(--glass-card-end, rgba(10, 10, 10, 0.4)) 100%);
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    border: 1px solid var(--color-border-subtle, rgba(255, 255, 255, 0.08));
                    border-radius: 16px;
                    overflow: hidden;
                }
                .trip-section {
                    padding: 12px;
                    background: var(--color-surface-50, rgba(255, 255, 255, 0.02));
                    border-radius: 12px;
                    border: 1px solid var(--color-border-subtle, rgba(255, 255, 255, 0.05));
                }
            `}</style>
        </div>
    );
}

export default TripPlanCard;
