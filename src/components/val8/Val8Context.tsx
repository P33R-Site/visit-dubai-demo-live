"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useWebSocketChat } from '@/hooks/useWebSocketChat';
import { TripPlan, Suggestion, ChatResponse, TripPlanItem } from '@/lib/types';
import { getTrip } from '@/lib/trip';
import { getSessionId } from '@/lib/session';

// Types for the context
export type UserIntent = 'planning' | 'browsing' | 'booking' | null;

// Trip UI mode - tracks the current state of trip planning UI
export type TripUIMode = 'idle' | 'planning' | 'building' | 'ready' | 'reviewing' | 'booked';

export interface TripContext {
  destination?: string;
  dates?: string;
  travelers?: number;
  preferences?: string[];
  budget?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'val8';
  text: string;
  type?: 'text' | 'options' | 'card-stack' | 'confirmation' | 'trip-plan';
  options?: string[];
  cards?: HotelCard[];
  tripPlan?: TripPlan;
  timestamp: number;
}

export interface HotelCard {
  id: string;
  name: string;
  location: string;
  price: string;
  rating: number;
  image: string;
  tags: string[];
  priceSuffix?: string;
  type?: 'hotel' | 'attraction' | 'event';
  startDate?: string;
  endDate?: string;
}

// Re-export type compatible with AuthContext or alias it
export interface UserProfile {
  name: string;
  email: string;
  isAuthenticated: boolean;
}

export interface Trip {
  id: string;
  hotel: HotelCard;
  dates: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface Val8ContextType {
  currentFrame: number;
  setCurrentFrame: (frame: number) => void;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  userIntent: UserIntent;
  setUserIntent: (intent: UserIntent) => void;
  // Trip UI mode tracking
  tripUIMode: TripUIMode;
  setTripUIMode: (mode: TripUIMode) => void;
  hasReachedFullContext: boolean;
  tripContext: TripContext;
  updateTripContext: (context: Partial<TripContext>) => void;
  chatHistory: ChatMessage[];
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearChatHistory: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  bookingState: 'idle' | 'summary' | 'checkout' | 'confirmed' | 'post-booking';
  setBookingState: (state: 'idle' | 'summary' | 'checkout' | 'confirmed' | 'post-booking') => void;
  selectedHotel: HotelCard | null;
  setSelectedHotel: (hotel: HotelCard | null) => void;
  showExitModal: boolean;
  setShowExitModal: (show: boolean) => void;

  // Auth & View
  user: UserProfile | null;
  view: 'chat' | 'dashboard';
  setView: (view: 'chat' | 'dashboard') => void;
  trips: Trip[];
  addTrip: (trip: Trip) => void;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  activeAction: string | null;
  handleWidgetAction: (action: string) => void;
  clearActiveAction: () => void;

  // WebSocket chat
  sendMessage: (message: string) => void;
  isConnected: boolean;
  isTyping: boolean;
  connectChat: () => void;
  disconnectChat: () => void;
  activeTripPlan: TripPlan | null;
  currentSuggestion: Suggestion | null;
  clearCurrentSuggestion: () => void;
  streamingText: string; // Live streaming response text
  planItems: TripPlanItem[]; // Incremental plan items
  clearPlanItems: () => void;

  // Pending trip plan from previous session
  pendingTripPlan: TripPlan | null;
  hasPendingTrip: boolean;
  confirmPendingTrip: () => void;
  declinePendingTrip: () => void;

  // AI approval tracking - only show booking flow after AI confirms
  isTripApprovedByAI: boolean;

  // Session lifecycle methods
  startNewTrip: () => void;
  clearCurrentPlan: () => void;

  // Legacy demo mode properties (for backward compatibility)
  isDemoMode: boolean;
  setIsDemoMode: (mode: boolean) => void;
  demoStep: number;
  setDemoStep: (step: number) => void;
  demoPhase: 'idle' | 'typing' | 'processing' | 'responding';
  setDemoPhase: (phase: 'idle' | 'typing' | 'processing' | 'responding') => void;
  login: (email: string, name?: string) => void;
  logout: () => void;

  // Branding customization from embed config
  inputPlaceholder: string;
}

const Val8Context = createContext<Val8ContextType | undefined>(undefined);

interface Val8ProviderProps {
  children: ReactNode;
  initialExpanded?: boolean;
  forceExpanded?: boolean; // Prevent collapse (for iframe embedding)
  inputPlaceholder?: string; // Custom input placeholder from branding
}

export const Val8Provider: React.FC<Val8ProviderProps> = ({
  children,
  initialExpanded = false,
  forceExpanded = false,
  inputPlaceholder = 'Type a message or use voice...'
}) => {
  const { user: authUser } = useAuth();

  const [currentFrame, setCurrentFrame] = useState(1);
  const [isExpanded, setIsExpandedState] = useState(initialExpanded);

  // Wrapper to prevent collapse when forceExpanded is true
  const setIsExpanded = useCallback((value: boolean | ((prev: boolean) => boolean)) => {
    if (!forceExpanded) {
      setIsExpandedState(value);
    }
  }, [forceExpanded]);
  const [userIntent, setUserIntent] = useState<UserIntent>(null);
  const [tripContext, setTripContext] = useState<TripContext>({});
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingState, setBookingState] = useState<'idle' | 'summary' | 'checkout' | 'confirmed' | 'post-booking'>('idle');
  const [selectedHotel, setSelectedHotel] = useState<HotelCard | null>(null);
  const [showExitModal, setShowExitModal] = useState(false);

  // Trip plan and suggestions from backend
  const [activeTripPlan, setActiveTripPlan] = useState<TripPlan | null>(null);
  const [currentSuggestion, setCurrentSuggestion] = useState<Suggestion | null>(null);

  // Pending trip plan from previous session - needs user confirmation to show
  const [pendingTripPlan, setPendingTripPlan] = useState<TripPlan | null>(null);
  const [tripPlanConfirmed, setTripPlanConfirmed] = useState(false);

  // AI approval tracking - true when AI confirms the trip is ready to book
  const [isTripApprovedByAI, setIsTripApprovedByAI] = useState(false);

  // Streaming response accumulator
  const [streamingText, setStreamingText] = useState('');

  // Incremental plan items from WebSocket
  const [planItems, setPlanItems] = useState<TripPlanItem[]>([]);

  // Trip UI mode tracking - prevents state downgrades
  const [tripUIMode, setTripUIModeState] = useState<TripUIMode>('idle');
  const [hasReachedFullContext, setHasReachedFullContext] = useState(false);

  // Track if we were in conversation before login (to preserve UI state)
  const [wasInConversationBeforeLogin, setWasInConversationBeforeLogin] = useState(false);

  // Map AuthContext user to Val8 UserProfile
  const user: UserProfile | null = authUser ? {
    name: authUser.name,
    email: authUser.email,
    isAuthenticated: true
  } : null;

  const [view, setView] = useState<'chat' | 'dashboard'>('chat');
  const [trips, setTrips] = useState<Trip[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeAction, setActiveAction] = useState<string | null>(null);

  // Legacy demo mode state (backward compatibility)
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [demoPhase, setDemoPhase] = useState<'idle' | 'typing' | 'processing' | 'responding'>('idle');

  // WebSocket chat handlers
  const handleTyping = useCallback((typing: boolean) => {
    setIsLoading(typing);
  }, []);

  const handleChunk = useCallback((chunk: string) => {
    setStreamingText(prev => prev + chunk);
  }, []);

  const handleResponse = useCallback((response: ChatResponse) => {
    // Add AI response to chat history
    const aiMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      sender: 'val8',
      text: response.response,
      type: 'text',
      timestamp: Date.now(),
    };

    // If there are questions, add them as options
    if (response.questions && response.questions.length > 0) {
      aiMessage.type = 'options';
      aiMessage.options = response.questions;
    }

    setChatHistory(prev => [...prev, aiMessage]);
    setStreamingText('');
    setIsLoading(false);

    // Check if the AI has approved the trip (summary_ready state means ready for booking)
    if (response.state === 'summary_ready') {
      console.log('[Val8Context] Trip approved by AI - ready for booking');
      setIsTripApprovedByAI(true);
    }
  }, []);

  const handleTripPlan = useCallback((tripPlan: TripPlan) => {
    setActiveTripPlan(tripPlan);

    // Add trip plan message to chat
    const tripMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      sender: 'val8',
      text: 'I\'ve prepared your trip plan:',
      type: 'trip-plan',
      tripPlan,
      timestamp: Date.now(),
    };
    setChatHistory(prev => [...prev, tripMessage]);
  }, []);

  const handleSuggestion = useCallback((suggestion: Suggestion) => {
    // Only update the suggestion state - don't add to chat history
    // because handleResponse already adds the AI's response message
    setCurrentSuggestion(suggestion);
  }, []);

  const handlePlanItem = useCallback((item: TripPlanItem) => {
    console.log('[Val8Context] Received plan item:', item);
    // Add incremental plan item with deduplication
    setPlanItems(prev => {
      const exists = prev.some(
        p => p.type === item.type && JSON.stringify(p.data) === JSON.stringify(item.data)
      );
      if (exists) return prev;
      console.log('[Val8Context] Adding new plan item:', item.type);
      return [...prev, item];
    });

    // Update trip UI mode when building plan items
    setTripUIModeState(prev => {
      if (prev === 'idle' || prev === 'planning') return 'building';
      return prev;
    });

    // Mark that we've reached full context when we have weather + hotel or flight
    if (item.type === 'weather' || item.type === 'experience' || item.type === 'event') {
      setHasReachedFullContext(true);
    }
  }, []);

  const handleTripPlanReady = useCallback(async (data: { trip_plan_id: string; status: string; destination: string; total_price: number }) => {
    console.log('[Val8Context] Trip plan ready:', data);

    // Fetch the full trip plan from the API
    try {
      const sessionId = getSessionId();
      const tripPlan = await getTrip(data.trip_plan_id, sessionId || undefined);
      console.log('[Val8Context] Fetched trip plan:', tripPlan);

      // Check if this is from a previous session (no meaningful conversation yet)
      // We use a ref or check if the trip plan was already confirmed this session
      setChatHistory(prevChatHistory => {
        const userMessages = prevChatHistory.filter(m => m.sender === 'user');
        const hasMeaningfulConversation = userMessages.length >= 2 ||
          (userMessages.length === 1 && userMessages[0].text.toLowerCase() !== 'hi' &&
            userMessages[0].text.toLowerCase() !== 'hello' &&
            userMessages[0].text.length > 10);

        if (hasMeaningfulConversation) {
          // New trip created during active planning - set as active
          console.log('[Val8Context] Setting as active trip plan (active conversation)');
          setActiveTripPlan(tripPlan);
          setTripPlanConfirmed(true);
        } else {
          // Trip from previous session - store as pending for user confirmation
          console.log('[Val8Context] Setting as pending trip plan (no active conversation)');
          setPendingTripPlan(tripPlan);
        }

        return prevChatHistory; // Return unchanged
      });

      // Clear incremental plan items since we now have the full plan
      setPlanItems([]);

      // Note: We don't add a chat message here because handleResponse already
      // adds the AI's text response to chat. This handler only updates the trip plan state.
    } catch (error) {
      // Handle access denied errors gracefully - this can happen when:
      // 1. Session mismatch between frontend and backend
      // 2. Trip belongs to a different user
      // 3. Trip has been deleted or expired
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.includes('Access denied')) {
        console.warn('[Val8Context] Access denied to trip - ignoring stale trip reference');
        // Clear any pending trip plan since we can't access it
        setPendingTripPlan(null);
      } else {
        console.error('[Val8Context] Error fetching trip plan:', error);
      }
    }
  }, []);

  const handleError = useCallback((error: string) => {
    console.error('WebSocket error:', error);
    setIsLoading(false);

    // Don't show "Not connected" errors in chat - these are usually temporary during reconnection
    if (error.includes('Not connected')) {
      console.log('[Val8Context] Ignoring temporary connection error');
      return;
    }

    // Add error message to chat for other errors
    const errorMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      sender: 'val8',
      text: `Sorry, there was an error: ${error}. Please try again.`,
      type: 'text',
      timestamp: Date.now(),
    };
    setChatHistory(prev => [...prev, errorMessage]);
  }, []);

  const handleConnectionChange = useCallback((connected: boolean) => {
    if (!connected) {
      setIsLoading(false);
    }
  }, []);

  // Initialize WebSocket chat
  const {
    sendMessage: wsSendMessage,
    isConnected,
    isTyping,
    connect: connectChat,
    disconnect: disconnectChat,
  } = useWebSocketChat({
    onTyping: handleTyping,
    onChunk: handleChunk,
    onResponse: handleResponse,
    onTripPlan: handleTripPlan,
    onSuggestion: handleSuggestion,
    onPlanItem: handlePlanItem,
    onTripPlanReady: handleTripPlanReady,
    onError: handleError,
    onConnectionChange: handleConnectionChange,
  });

  // Auto-connect when widget expands
  useEffect(() => {
    if (isExpanded && !isConnected) {
      connectChat();
    }
  }, [isExpanded, isConnected, connectChat]);

  // Disconnect when widget closes
  useEffect(() => {
    if (!isExpanded && isConnected) {
      disconnectChat();
    }
  }, [isExpanded, isConnected, disconnectChat]);

  // Track when trip becomes approved by AI (status changes to booked/confirmed)
  useEffect(() => {
    if (activeTripPlan?.status === 'booked' || activeTripPlan?.status === 'confirmed') {
      setIsTripApprovedByAI(true);
    }
  }, [activeTripPlan?.status]);

  const addTrip = (trip: Trip) => {
    setTrips(prev => [trip, ...prev]);
  };

  const updateTripContext = (context: Partial<TripContext>) => {
    setTripContext(prev => ({ ...prev, ...context }));
  };

  const addMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
    };
    setChatHistory(prev => [...prev, newMessage]);
  };

  const clearChatHistory = () => {
    setChatHistory([]);
    setActiveTripPlan(null);
    setCurrentSuggestion(null);
    setStreamingText('');
  };

  // Set trip UI mode with guards to prevent invalid transitions
  const setTripUIMode = useCallback((mode: TripUIMode) => {
    setTripUIModeState(prev => {
      // Prevent downgrade once we've reached full context (unless explicitly resetting to idle)
      if (hasReachedFullContext && mode !== 'idle') {
        const modeOrder: TripUIMode[] = ['idle', 'planning', 'building', 'ready', 'reviewing', 'booked'];
        const currentIndex = modeOrder.indexOf(prev);
        const newIndex = modeOrder.indexOf(mode);
        // Only allow forward progression
        if (newIndex < currentIndex) {
          console.log('[Val8Context] Prevented UI mode downgrade from', prev, 'to', mode);
          return prev;
        }
      }
      return mode;
    });
  }, [hasReachedFullContext]);

  // Session lifecycle: Start a completely new trip
  const startNewTrip = useCallback(() => {
    console.log('[Val8Context] Starting new trip - resetting all state');
    setChatHistory([]);
    setActiveTripPlan(null);
    setPendingTripPlan(null);
    setTripPlanConfirmed(false);
    setIsTripApprovedByAI(false);
    setCurrentSuggestion(null);
    setStreamingText('');
    setPlanItems([]);
    setTripUIModeState('idle');
    setHasReachedFullContext(false);
    setBookingState('idle');
    setSelectedHotel(null);
    setTripContext({});
    setUserIntent(null);
    // Reconnect WebSocket to get fresh session - use longer delay to ensure clean disconnect
    disconnectChat();
    setTimeout(() => connectChat(), 300);
  }, [disconnectChat, connectChat]);

  // Session lifecycle: Clear current plan but keep conversation context
  const clearCurrentPlan = useCallback(() => {
    console.log('[Val8Context] Clearing current plan');
    setActiveTripPlan(null);
    setPendingTripPlan(null);
    setPlanItems([]);
    setTripUIModeState('planning');
    setBookingState('idle');
    setSelectedHotel(null);
    setTripPlanConfirmed(false);
    setIsTripApprovedByAI(false);
    // Keep hasReachedFullContext since we're continuing conversation
  }, []);

  // Confirm pending trip from previous session - move it to active
  const confirmPendingTrip = useCallback(() => {
    console.log('[Val8Context] Confirming pending trip');
    if (pendingTripPlan) {
      setActiveTripPlan(pendingTripPlan);
      setPendingTripPlan(null);
      setTripPlanConfirmed(true);
      setHasReachedFullContext(true);
      // Since user is explicitly confirming this trip, allow booking
      setIsTripApprovedByAI(true);
    }
  }, [pendingTripPlan]);

  // Decline pending trip from previous session - clear it and start fresh
  const declinePendingTrip = useCallback(() => {
    console.log('[Val8Context] Declining pending trip');
    setPendingTripPlan(null);
    setActiveTripPlan(null);
    setTripPlanConfirmed(false);
    setIsTripApprovedByAI(false);
    setPlanItems([]);
    setTripUIModeState('idle');
  }, []);

  const handleWidgetAction = (action: string) => {
    setActiveAction(action);
    setView('chat');
  };

  const clearActiveAction = () => {
    setActiveAction(null);
  };

  // Wrapper for sending messages that also adds to chat history
  const sendMessage = useCallback((message: string) => {
    if (!message.trim()) return;

    // Add user message to chat history
    addMessage({
      sender: 'user',
      text: message,
      type: 'text',
    });

    // Check if connected, if not try to connect first
    if (!isConnected) {
      console.log('[Val8Context] Not connected, attempting to connect before sending...');
      connectChat();
      // Wait a bit for connection then try to send
      setTimeout(() => {
        wsSendMessage(message);
        setIsLoading(true);
      }, 500);
    } else {
      // Send via WebSocket
      wsSendMessage(message);
      setIsLoading(true);
    }
  }, [wsSendMessage, isConnected, connectChat]);

  // Legacy login/logout for demo (backward compatibility)
  const login = useCallback(() => {
    setShowLoginModal(true);
  }, []);

  const logout = useCallback(() => {
    // Full cleanup on logout: disconnect WebSocket and reset all state
    console.log('[Val8Context] Logging out - cleaning up all state');
    disconnectChat();
    startNewTrip();
  }, [disconnectChat, startNewTrip]);

  return (
    <Val8Context.Provider
      value={{
        currentFrame,
        setCurrentFrame,
        isExpanded,
        setIsExpanded,
        userIntent,
        setUserIntent,
        tripContext,
        updateTripContext,
        chatHistory,
        addMessage,
        clearChatHistory,
        isLoading,
        setIsLoading,
        bookingState,
        setBookingState,
        selectedHotel,
        setSelectedHotel,
        showExitModal,
        setShowExitModal,
        user,
        view,
        setView,
        trips,
        addTrip,
        showLoginModal,
        setShowLoginModal,
        activeAction,
        handleWidgetAction,
        clearActiveAction,
        sendMessage,
        isConnected,
        isTyping,
        connectChat,
        disconnectChat,
        activeTripPlan,
        currentSuggestion,
        clearCurrentSuggestion: () => setCurrentSuggestion(null),
        streamingText,
        planItems,
        clearPlanItems: () => setPlanItems([]),
        // Pending trip plan from previous session
        pendingTripPlan,
        hasPendingTrip: pendingTripPlan !== null && !tripPlanConfirmed,
        confirmPendingTrip,
        declinePendingTrip,
        // AI approval tracking
        isTripApprovedByAI,
        // Trip UI mode tracking
        tripUIMode,
        setTripUIMode,
        hasReachedFullContext,
        // Session lifecycle
        startNewTrip,
        clearCurrentPlan,
        // Legacy demo mode (backward compatibility)
        isDemoMode,
        setIsDemoMode,
        demoStep,
        setDemoStep,
        demoPhase,
        setDemoPhase,
        login,
        logout,
        // Branding customization
        inputPlaceholder,
      }}
    >
      {children}
    </Val8Context.Provider>
  );
};

export const useVal8 = () => {
  const context = useContext(Val8Context);
  if (context === undefined) {
    throw new Error('useVal8 must be used within a Val8Provider');
  }
  return context;
};
