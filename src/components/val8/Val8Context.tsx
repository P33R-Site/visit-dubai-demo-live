"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useWebSocketChat } from '@/hooks/useWebSocketChat';
import { TripPlan, Suggestion, ChatResponse, TripPlanItem } from '@/lib/types';
import { getTrip } from '@/lib/trip';
import { getSessionId } from '@/lib/session';

// Types for the context
export type UserIntent = 'planning' | 'browsing' | 'booking' | null;

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
  streamingText: string; // Live streaming response text
  planItems: TripPlanItem[]; // Incremental plan items
  clearPlanItems: () => void;

  // Legacy demo mode properties (for backward compatibility)
  isDemoMode: boolean;
  setIsDemoMode: (mode: boolean) => void;
  demoStep: number;
  setDemoStep: (step: number) => void;
  demoPhase: 'idle' | 'typing' | 'processing' | 'responding';
  setDemoPhase: (phase: 'idle' | 'typing' | 'processing' | 'responding') => void;
  login: (email: string, name?: string) => void;
  logout: () => void;
}

const Val8Context = createContext<Val8ContextType | undefined>(undefined);

interface Val8ProviderProps {
  children: ReactNode;
  initialExpanded?: boolean;
}

export const Val8Provider: React.FC<Val8ProviderProps> = ({ children, initialExpanded = false }) => {
  const { user: authUser } = useAuth();

  const [currentFrame, setCurrentFrame] = useState(1);
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
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

  // Streaming response accumulator
  const [streamingText, setStreamingText] = useState('');

  // Incremental plan items from WebSocket
  const [planItems, setPlanItems] = useState<TripPlanItem[]>([]);

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

  // Legacy login/logout for demo (no-op, use AuthContext instead)
  const login = useCallback(() => {
    setShowLoginModal(true);
  }, []);
  const logout = useCallback(() => {
    // Handled by AuthContext
  }, []);

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
  }, []);

  const handleTripPlanReady = useCallback(async (data: { trip_plan_id: string; status: string; destination: string; total_price: number }) => {
    console.log('[Val8Context] Trip plan ready:', data);

    // Fetch the full trip plan from the API
    try {
      const sessionId = getSessionId();
      const tripPlan = await getTrip(data.trip_plan_id, sessionId || undefined);
      console.log('[Val8Context] Fetched trip plan:', tripPlan);

      // Set the active trip plan
      setActiveTripPlan(tripPlan);

      // Clear incremental plan items since we now have the full plan
      setPlanItems([]);

      // Note: We don't add a chat message here because handleResponse already
      // adds the AI's text response to chat. This handler only updates the trip plan state.
    } catch (error) {
      console.error('[Val8Context] Error fetching trip plan:', error);
    }
  }, []);

  const handleError = useCallback((error: string) => {
    console.error('WebSocket error:', error);
    setIsLoading(false);

    // Add error message to chat
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

    // Send via WebSocket
    wsSendMessage(message);
    setIsLoading(true);
  }, [wsSendMessage]);

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
        streamingText,
        planItems,
        clearPlanItems: () => setPlanItems([]),
        // Legacy demo mode (backward compatibility)
        isDemoMode,
        setIsDemoMode,
        demoStep,
        setDemoStep,
        demoPhase,
        setDemoPhase,
        login,
        logout,
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
