'use client';

import React, { useState } from 'react';
import { ChatInterface } from './ChatInterface';
import { TripPlanCard } from './TripPlanCard';
import { PlanItemCard } from './PlanItemCard';
import { useVal8 } from './Val8Context';
import { TripPlanItem, TripPlan } from '@/lib/types';
import { approveTrip } from '@/lib/trip';
import { getSessionId } from '@/lib/session';
import { Sparkles, Map } from 'lucide-react';

interface ChatWithTripPanelProps {
    className?: string;
}

/**
 * Side-by-side layout with Chat on the left and Trip Plan on the right
 * Matches the layout from test.html
 */
export function ChatWithTripPanel({ className = '' }: ChatWithTripPanelProps) {
    const { activeTripPlan, sendMessage } = useVal8();
    const [planItems, setPlanItems] = useState<TripPlanItem[]>([]);
    const [isApproving, setIsApproving] = useState(false);
    const [localTripPlan, setLocalTripPlan] = useState<TripPlan | null>(null);

    // Use activated trip plan from context or local state
    const tripPlan = localTripPlan || activeTripPlan;

    // Handle plan item from WebSocket
    const handlePlanItem = (item: TripPlanItem) => {
        setPlanItems(prev => {
            // Check for duplicate
            const exists = prev.some(
                p => p.type === item.type && JSON.stringify(p.data) === JSON.stringify(item.data)
            );
            if (exists) return prev;
            return [...prev, item];
        });
    };

    // Handle trip plan ready
    const handleTripPlanReady = (data: { trip_plan_id: string; destination: string; total_price: number }) => {
        console.log('Trip plan ready:', data);
    };

    // Handle approve trip
    const handleApproveTrip = async () => {
        if (!tripPlan?.id) return;

        const sessionId = getSessionId();
        if (!sessionId) {
            console.error('No session ID available');
            return;
        }

        setIsApproving(true);
        try {
            const result = await approveTrip(tripPlan.id, sessionId);
            if (result.status === 'booked' || result.status === 'confirmed') {
                // Update local trip plan status
                setLocalTripPlan(prev => prev ? { ...prev, status: 'booked' } : null);
                // Send confirmation message
                sendMessage('Trip approved and booked successfully!');
            }
        } catch (error) {
            console.error('Failed to approve trip:', error);
        } finally {
            setIsApproving(false);
        }
    };

    // Clear plan items when new trip plan arrives
    React.useEffect(() => {
        if (activeTripPlan && activeTripPlan.id !== localTripPlan?.id) {
            setLocalTripPlan(activeTripPlan);
            setPlanItems([]);
        }
    }, [activeTripPlan, localTripPlan?.id]);

    return (
        <div className={`chat-with-trip-panel grid grid-cols-1 lg:grid-cols-2 gap-4 h-full ${className}`}>
            {/* Left Panel - Chat */}
            <div className="panel bg-surface rounded-xl border border-border-subtle overflow-hidden flex flex-col h-full min-h-[500px]">
                <div className="panel-header bg-primary/5 border-b border-border-subtle px-4 py-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold text-text-primary">Chat</h2>
                </div>
                <div className="flex-1 overflow-hidden">
                    <ChatInterface />
                </div>
            </div>

            {/* Right Panel - Trip Plan */}
            <div className="panel bg-surface rounded-xl border border-border-subtle overflow-hidden flex flex-col h-full min-h-[500px]">
                <div className="panel-header bg-primary/5 border-b border-border-subtle px-4 py-3 flex items-center gap-2">
                    <Map className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold text-text-primary">Trip Plan</h2>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                    {/* Incremental Plan Items */}
                    {planItems.length > 0 && (
                        <div className="plan-items-section mb-6">
                            <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-3">
                                Building Your Plan...
                            </h3>
                            {planItems.map((item, idx) => (
                                <PlanItemCard key={`${item.type}-${idx}`} item={item} />
                            ))}
                        </div>
                    )}

                    {/* Full Trip Plan Card */}
                    {tripPlan ? (
                        <TripPlanCard
                            tripPlan={tripPlan}
                            onApprove={handleApproveTrip}
                            isApproving={isApproving}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center py-12">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4">
                                <Map className="w-8 h-8 text-primary/60" />
                            </div>
                            <h3 className="text-lg font-medium text-text-primary mb-2">
                                No Trip Plan Yet
                            </h3>
                            <p className="text-text-secondary max-w-xs">
                                Start chatting with Val8 to plan your perfect trip. Your itinerary will appear here.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChatWithTripPanel;
