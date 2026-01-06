'use client';

import React from 'react';
import { TripPlanItem } from '@/lib/types';
import { Sun, Building2, Plane, Ticket, Sparkles, Utensils, Landmark, Calendar, Car } from 'lucide-react';

interface PlanItemCardProps {
    item: TripPlanItem;
    className?: string;
}

// Icon mapping for different item types
const typeConfig: Record<string, { icon: React.ElementType; color: string; bgColor: string }> = {
    weather: { icon: Sun, color: 'text-amber-400', bgColor: 'bg-amber-500/20' },
    hotel: { icon: Building2, color: 'text-blue-400', bgColor: 'bg-blue-500/20' },
    flight: { icon: Plane, color: 'text-sky-400', bgColor: 'bg-sky-500/20' },
    travel_tickets: { icon: Ticket, color: 'text-purple-400', bgColor: 'bg-purple-500/20' },
    experience: { icon: Sparkles, color: 'text-emerald-400', bgColor: 'bg-emerald-500/20' },
    restaurant: { icon: Utensils, color: 'text-orange-400', bgColor: 'bg-orange-500/20' },
    attraction: { icon: Landmark, color: 'text-rose-400', bgColor: 'bg-rose-500/20' },
    event: { icon: Calendar, color: 'text-indigo-400', bgColor: 'bg-indigo-500/20' },
    transport: { icon: Car, color: 'text-teal-400', bgColor: 'bg-teal-500/20' },
};

const defaultConfig = { icon: Sparkles, color: 'text-primary', bgColor: 'bg-primary/20' };

// Format price helper
const formatPrice = (price: number | string | undefined): string => {
    if (price === undefined || price === null) return '';
    const num = typeof price === 'string' ? parseFloat(price) : price;
    return isNaN(num) ? '' : `$${num.toLocaleString()}`;
};

// Helper to safely convert unknown to string
const toString = (value: unknown): string => {
    if (value === null || value === undefined) return '';
    return String(value);
};

export function PlanItemCard({ item, className = '' }: PlanItemCardProps) {
    const config = typeConfig[item.type] || defaultConfig;
    const IconComponent = config.icon;
    const title = item.title || item.type.charAt(0).toUpperCase() + item.type.slice(1).replace(/_/g, ' ');
    const data = item.data || {};

    // Type-specific content renderer
    const renderContent = () => {
        switch (item.type) {
            case 'weather':
                return (
                    <div className="space-y-1">
                        <p className="text-sm text-text-primary dark:text-white font-medium">
                            {toString(data.temperature)}°{toString(data.temperature_unit) || 'C'}
                        </p>
                        <p className="text-xs text-text-muted dark:text-white/50">{toString(data.conditions)}</p>
                    </div>
                );

            case 'hotel':
                return (
                    <div className="space-y-1">
                        <p className="text-sm text-text-primary dark:text-white font-medium">{toString(data.name)}</p>
                        {data.location ? <p className="text-xs text-text-muted dark:text-white/50">{toString(data.location)}</p> : null}
                        {data.total_price !== undefined ? (
                            <p className="text-sm font-semibold text-primary">{formatPrice(data.total_price as number)}</p>
                        ) : null}
                    </div>
                );

            case 'flight':
                return (
                    <div className="space-y-1">
                        <p className="text-sm text-text-primary dark:text-white font-medium">
                            {toString(data.airline)} {toString(data.flight_number)}
                        </p>
                        {data.origin && data.destination ? (
                            <p className="text-xs text-text-muted dark:text-white/50">
                                {toString(data.origin)} → {toString(data.destination)}
                            </p>
                        ) : null}
                        {data.price !== undefined ? (
                            <p className="text-sm font-semibold text-primary">{formatPrice(data.price as number)}</p>
                        ) : null}
                    </div>
                );

            case 'travel_tickets':
                return (
                    <div className="space-y-1">
                        {data.booking_reference ? (
                            <p className="text-sm text-text-primary dark:text-white font-medium">
                                Ref: {toString(data.booking_reference)}
                            </p>
                        ) : null}
                        {data.status ? (
                            <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-success/20 text-success">
                                {toString(data.status)}
                            </span>
                        ) : null}
                    </div>
                );

            case 'experience':
                return (
                    <div className="space-y-1">
                        {data.name ? <p className="text-sm text-text-primary dark:text-white font-medium">{toString(data.name)}</p> : null}
                        {data.date ? <p className="text-xs text-text-muted dark:text-white/50">{toString(data.date)}</p> : null}
                        {data.price !== undefined ? (
                            <p className="text-sm font-semibold text-primary">{formatPrice(data.price as number)}</p>
                        ) : null}
                    </div>
                );

            default:
                // Generic renderer
                const entries = Object.entries(data).slice(0, 3);
                return (
                    <div className="space-y-1">
                        {entries.map(([key, value]) => {
                            if (value === null || value === undefined) return null;
                            return (
                                <p key={key} className="text-xs text-text-muted dark:text-white/50">
                                    <span className="capitalize">{key.replace(/_/g, ' ')}:</span> {toString(value)}
                                </p>
                            );
                        })}
                    </div>
                );
        }
    };

    return (
        <div className={`plan-item-card ${className}`}>
            <div className="flex items-start gap-3">
                {/* Icon */}
                <div className={`w-8 h-8 rounded-lg ${config.bgColor} flex items-center justify-center shrink-0`}>
                    <IconComponent className={`w-4 h-4 ${config.color}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-text-secondary dark:text-white/60 uppercase tracking-wider mb-1">
                        {title}
                    </p>
                    {renderContent()}
                </div>
            </div>

            <style jsx>{`
                .plan-item-card {
                    padding: 12px;
                    background: var(--color-surface-50, rgba(255, 255, 255, 0.02));
                    border: 1px solid var(--color-border-subtle, rgba(255, 255, 255, 0.05));
                    border-radius: 12px;
                    animation: slideIn 0.3s ease-out;
                }
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-8px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}

export default PlanItemCard;
