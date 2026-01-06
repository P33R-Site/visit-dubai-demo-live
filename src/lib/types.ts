/**
 * TypeScript types matching backend Pydantic schemas
 */

// Authentication Types
export interface Token {
    access_token: string;
    refresh_token: string;
    token_type: string;
}

export interface UserResponse {
    id: string;
    name: string | null;
    email: string | null;
    is_active: boolean;
    is_verified: boolean;
    created_at: string;
}

export interface UserSignup {
    name?: string;
    email: string;
    password: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

// Chat Types
export interface ChatRequest {
    session_id: string;
    message: string;
}

export interface Suggestion {
    type: string; // 'event' or 'attraction'
    item: Record<string, unknown>;
    question: string;
}

export interface ChatResponse {
    response: string;
    trip_plan: TripPlan | null;
    questions: string[] | null;
    suggestion: Suggestion | null;
    plan_items: TripPlanItem[];  // Incremental plan items as they become available
    state: string; // 'initial' | 'collecting_info' | 'building_plan' | 'plan_ready' | 'suggesting_additions' | 'summary_ready'
}

// Trip Planning Types
export interface Flight {
    airline: string;
    flight_number: string;
    origin: string;
    destination: string;
    departure_time: string;
    arrival_time: string;
    class_type: string;
    price: number;
    currency: string;
}

export interface Hotel {
    name: string;
    location: string;
    check_in: string;
    check_out: string;
    room_type: string;
    price_per_night: number;
    total_price: number;
    currency: string;
    rating: number | null;
    amenities: string[] | null;
}

export interface Experience {
    name: string;
    type: string;
    location: string;
    date: string;
    time: string | null;
    price: number;
    currency: string;
    description: string | null;
}

export interface Event {
    name: string;
    type: string;
    location: string;
    date: string;
    time: string | null;
    price: number;
    currency: string;
    rsvp_required: boolean;
    description: string | null;
    vip_available: boolean;
}

export interface Attraction {
    name: string;
    type: string;
    location: string;
    opening_hours: string | null;
    price: number;
    currency: string;
    special_exhibition: string | null;
    description: string | null;
}

export interface TripPlan {
    id: string | null;
    destination: string;
    start_date: string;
    end_date: string;
    duration_days: number;
    total_price: number;
    currency: string;
    flights: Flight[];
    hotel: Hotel;
    experiences: Experience[];
    events: Event[];
    attractions: Attraction[];
    recommended_card: string | null;
    policies: Record<string, unknown> | null;
    explanation: string | null;
    status: string; // 'pending' | 'booked'
    suggestions_pending: boolean;
    trip_type: string | null; // 'work' | 'leisure'
}

export interface TripPlanItem {
    type: string;  // Dynamic type identifier (e.g., "weather", "hotel", "flight", etc.)
    data: Record<string, unknown>;  // Flexible data container
    timestamp?: string;
    title?: string;
    icon?: string;
    priority?: number;
}

// Session Types
export interface SessionState {
    conversation_history: Array<{ role: string; content: string }>;
    user_profile: Profile | null;
    active_trip_plan: TripPlan | null;
    question_flow_state: string;
    questions_asked: number;
    questions_answered: number;
    pending_suggestions: unknown[];
    suggested_items: unknown[];
    consecutive_rejections: number;  // Track consecutive "no" responses
    user_context: Record<string, unknown> | null;  // Loaded user context (profile, trip history, preferences)
}

export interface SessionResponse {
    session_id: string;
    state: SessionState;
    created_at: string;
    updated_at: string | null;
}

export interface Profile {
    taste_preferences: TastePreferences | null;
    wallet_info: WalletInfo | null;
}

export interface TastePreferences {
    travel_style: string | null;
    accommodation_preference: string | null;
    dining_preference: string | null;
    activity_preference: string[] | null;
    special_requests: string | null;
}

export interface WalletInfo {
    budget_range: string | null;
    preferred_cards: string[] | null;
    payment_preferences: string[] | null;
    currency_preference: string | null;
}

// Trip Approval Types
export interface TripApprovalRequest {
    trip_id: string;
    session_id: string;
    payment_method?: string;
}

export interface TripApprovalResponse {
    trip_id: string;
    status: string;
    confirmation_codes: Record<string, string>;
    itinerary_summary: string | null;
}

// WebSocket Message Types
export type WebSocketMessageType =
    | 'init'
    | 'connected'
    | 'message'
    | 'typing'
    | 'chunk'
    | 'response'
    | 'trip_plan'
    | 'plan_item'
    | 'trip_plan_ready'
    | 'suggestion'
    | 'ping'
    | 'pong'
    | 'error';

export interface WebSocketMessage {
    type: WebSocketMessageType;
    session_id?: string;
    token?: string;
    message?: string;
    status?: boolean | string;
    content?: string;
    response?: string;
    state?: string;
    questions?: string[];
    trip_plan?: TripPlan;
    suggestion?: Suggestion;
    plan_item?: TripPlanItem;  // Incremental plan item
    trip_plan_id?: string;     // For trip_plan_ready
    destination?: string;      // For trip_plan_ready
    total_price?: number;      // For trip_plan_ready
}

// Audio WebSocket Types
export type AudioWebSocketMessageType =
    | 'init'
    | 'connected'
    | 'audio_start'
    | 'audio_ready'
    | 'audio_end'
    | 'transcription'
    | 'response_text'
    | 'audio_chunk'
    | 'audio_complete'
    | 'trip_plan'
    | 'plan_item'
    | 'trip_plan_ready'
    | 'ping'
    | 'pong'
    | 'error';

export interface AudioWebSocketMessage {
    type: AudioWebSocketMessageType;
    session_id?: string;
    token?: string;
    audio_data?: string; // base64
    text?: string;
    chunk?: string; // base64 audio chunk
    index?: number;
    chunks?: number;
    status?: string;
    trip_plan?: TripPlan;
    message?: string;
    plan_item?: TripPlanItem;  // Incremental plan item
    trip_plan_id?: string;     // For trip_plan_ready
    destination?: string;      // For trip_plan_ready
    total_price?: number;      // For trip_plan_ready
    state?: string;            // Response state
}
