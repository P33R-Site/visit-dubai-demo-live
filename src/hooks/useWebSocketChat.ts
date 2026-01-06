/**
 * WebSocket hook for real-time text chat
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { getWsUrl, getAccessToken } from '@/lib/api';
import { getSessionId, generateTempSessionId, setSessionId } from '@/lib/session';
import { WebSocketMessage, TripPlan, Suggestion, ChatResponse, TripPlanItem } from '@/lib/types';

interface UseWebSocketChatOptions {
    onTyping?: (isTyping: boolean) => void;
    onChunk?: (chunk: string) => void;
    onResponse?: (response: ChatResponse) => void;
    onTripPlan?: (tripPlan: TripPlan) => void;
    onPlanItem?: (planItem: TripPlanItem) => void;
    onTripPlanReady?: (data: { trip_plan_id: string; status: string; destination: string; total_price: number }) => void;
    onSuggestion?: (suggestion: Suggestion) => void;
    onError?: (error: string) => void;
    onConnectionChange?: (connected: boolean) => void;
}

interface UseWebSocketChatReturn {
    sendMessage: (message: string) => void;
    isConnected: boolean;
    isTyping: boolean;
    connect: () => void;
    disconnect: () => void;
    sessionId: string | null;
}

export function useWebSocketChat(options: UseWebSocketChatOptions = {}): UseWebSocketChatReturn {
    const [isConnected, setIsConnected] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [sessionId, setSessionIdState] = useState<string | null>(null);

    const wsRef = useRef<WebSocket | null>(null);
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const reconnectAttempts = useRef(0);
    const maxReconnectAttempts = 5;
    const isConnectingRef = useRef(false);

    const {
        onTyping,
        onChunk,
        onResponse,
        onTripPlan,
        onPlanItem,
        onTripPlanReady,
        onSuggestion,
        onError,
        onConnectionChange,
    } = options;

    // Update typing status and callback
    const updateTypingStatus = useCallback((typing: boolean) => {
        setIsTyping(typing);
        onTyping?.(typing);
    }, [onTyping]);

    const connect = useCallback(() => {
        // Prevent multiple simultaneous connection attempts
        if (isConnectingRef.current || wsRef.current?.readyState === WebSocket.OPEN) {
            return;
        }

        isConnectingRef.current = true;

        try {
            const wsUrl = getWsUrl('/chat/ws');
            const ws = new WebSocket(wsUrl);
            wsRef.current = ws;

            ws.onopen = () => {
                isConnectingRef.current = false;
                reconnectAttempts.current = 0;

                // Get or generate session ID
                let currentSessionId = getSessionId();
                if (!currentSessionId) {
                    currentSessionId = generateTempSessionId();
                    setSessionId(currentSessionId);
                }
                setSessionIdState(currentSessionId);

                // Send init message with session_id and optional token
                const initMessage: WebSocketMessage = {
                    type: 'init',
                    session_id: currentSessionId,
                };

                const token = getAccessToken();
                if (token) {
                    initMessage.token = token;
                }

                ws.send(JSON.stringify(initMessage));
            };

            ws.onmessage = (event) => {
                try {
                    const data: WebSocketMessage = JSON.parse(event.data);

                    switch (data.type) {
                        case 'connected':
                            setIsConnected(true);
                            onConnectionChange?.(true);
                            if (data.session_id) {
                                setSessionId(data.session_id);
                                setSessionIdState(data.session_id);
                            }
                            break;

                        case 'typing':
                            updateTypingStatus(!!data.status);
                            break;

                        case 'chunk':
                            if (data.content) {
                                onChunk?.(data.content);
                            }
                            break;

                        case 'response':
                            updateTypingStatus(false);
                            if (data.response) {
                                onResponse?.({
                                    response: data.response,
                                    state: data.state || 'initial',
                                    questions: data.questions || null,
                                    trip_plan: null,
                                    suggestion: null,
                                    plan_items: [],
                                });
                            }
                            break;

                        case 'trip_plan':
                            if (data.trip_plan) {
                                onTripPlan?.(data.trip_plan);
                            }
                            break;

                        case 'suggestion':
                            if (data.suggestion) {
                                onSuggestion?.(data.suggestion);
                            }
                            break;

                        case 'plan_item':
                            console.log('[WS] Received plan_item message:', data.plan_item);
                            if (data.plan_item) {
                                onPlanItem?.(data.plan_item);
                            }
                            break;

                        case 'trip_plan_ready':
                            if (data.trip_plan_id) {
                                onTripPlanReady?.({
                                    trip_plan_id: data.trip_plan_id,
                                    status: String(data.status || 'pending'),
                                    destination: data.destination || '',
                                    total_price: data.total_price || 0,
                                });
                            }
                            break;

                        case 'error':
                            onError?.(data.message || 'Unknown error');
                            break;

                        case 'pong':
                            // Keep-alive response, no action needed
                            break;

                        default:
                            console.log('Unknown message type:', data.type);
                    }
                } catch (e) {
                    console.error('Error parsing WebSocket message:', e);
                }
            };

            ws.onerror = () => {
                isConnectingRef.current = false;
                onError?.('WebSocket connection error');
            };

            ws.onclose = () => {
                isConnectingRef.current = false;
                setIsConnected(false);
                onConnectionChange?.(false);
                wsRef.current = null;

                // Attempt reconnection with exponential backoff
                if (reconnectAttempts.current < maxReconnectAttempts) {
                    const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
                    reconnectAttempts.current++;

                    reconnectTimeoutRef.current = setTimeout(() => {
                        connect();
                    }, delay);
                }
            };
        } catch (e) {
            isConnectingRef.current = false;
            console.error('Error creating WebSocket:', e);
        }
    }, [onConnectionChange, onChunk, onError, onResponse, onSuggestion, onTripPlan, onPlanItem, onTripPlanReady, updateTypingStatus]);

    const disconnect = useCallback(() => {
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
            reconnectTimeoutRef.current = null;
        }

        reconnectAttempts.current = maxReconnectAttempts; // Prevent auto-reconnect

        if (wsRef.current) {
            wsRef.current.close();
            wsRef.current = null;
        }

        setIsConnected(false);
        onConnectionChange?.(false);
    }, [onConnectionChange]);

    const sendMessage = useCallback((message: string) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            const msg: WebSocketMessage = {
                type: 'message',
                message,
            };
            wsRef.current.send(JSON.stringify(msg));
        } else {
            onError?.('Not connected to server');
        }
    }, [onError]);

    // Keep-alive ping
    useEffect(() => {
        const pingInterval = setInterval(() => {
            if (wsRef.current?.readyState === WebSocket.OPEN) {
                wsRef.current.send(JSON.stringify({ type: 'ping' }));
            }
        }, 30000);

        return () => clearInterval(pingInterval);
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, []);

    return {
        sendMessage,
        isConnected,
        isTyping,
        connect,
        disconnect,
        sessionId,
    };
}
