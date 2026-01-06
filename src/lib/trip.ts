/**
 * Trip service for trip approval and retrieval
 */

import { post, get } from './api';
import { TripPlan, TripApprovalRequest, TripApprovalResponse } from './types';

/**
 * Approve and book a trip
 */
export async function approveTrip(tripId: string, sessionId: string, paymentMethod?: string): Promise<TripApprovalResponse> {
    const request: TripApprovalRequest = {
        trip_id: tripId,
        session_id: sessionId,
        payment_method: paymentMethod,
    };
    return post<TripApprovalResponse>('/trip/approve', request);
}

/**
 * Get trip details by ID
 */
export async function getTrip(tripId: string, sessionId?: string): Promise<TripPlan> {
    const url = sessionId ? `/trip/${tripId}?session_id=${sessionId}` : `/trip/${tripId}`;
    return get<TripPlan>(url);
}
