"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Sparkles, Mic, MicOff, Loader2, Wifi, WifiOff, Plane } from 'lucide-react';
import { useVal8 } from './Val8Context';
import { useAudioChat } from '@/hooks/useAudioChat';
import { TripPlan } from '@/lib/types';

// Shimmer loading card component
function ShimmerCard() {
  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 animate-pulse">
      <div className="h-32 bg-white/10" />
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="h-4 bg-white/10 rounded w-32" />
          <div className="h-4 bg-white/10 rounded w-10" />
        </div>
        <div className="flex gap-1">
          <div className="h-5 bg-white/10 rounded-full w-14" />
          <div className="h-5 bg-white/10 rounded-full w-16" />
          <div className="h-5 bg-white/10 rounded-full w-10" />
        </div>
        <div className="h-3 bg-white/10 rounded w-full" />
        <div className="h-9 bg-white/10 rounded-lg w-full mt-2" />
      </div>
    </div>
  );
}

// Question Card Component - Premium styled question options
function QuestionCard({ question, options, onSelect }: { question?: string; options: string[]; onSelect: (text: string) => void }) {
  return (
    <div className="question-card mt-3">
      {/* Card with glassmorphism */}
      <div className="relative overflow-hidden rounded-xl p-4" style={{
        background: 'linear-gradient(135deg, rgba(227, 181, 116, 0.15) 0%, rgba(227, 181, 116, 0.05) 100%)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(227, 181, 116, 0.2)',
      }}>
        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

        {/* Question icon and label */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">💭</span>
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">Quick Response</span>
        </div>

        {/* Options as buttons */}
        <div className="flex flex-wrap gap-2">
          {options.map((option, i) => (
            <button
              key={i}
              onClick={() => onSelect(option)}
              className="group relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 hover:scale-105 active:scale-100"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(227, 181, 116, 0.3)',
                color: 'var(--color-text-primary, #F5F5FA)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(227, 181, 116, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(227, 181, 116, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(227, 181, 116, 0.3)';
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Alias for backward compatibility
const QuickReplyChips = QuestionCard;


// Trip Plan Card Component
const TripPlanCard: React.FC<{ tripPlan: TripPlan }> = ({ tripPlan }) => {
  return (
    <div className="w-full bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-4 space-y-4 shadow-lg mt-3">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-text-primary dark:text-white font-semibold text-lg">{tripPlan.destination}</h3>
          <p className="text-text-secondary dark:text-white/60 text-sm">
            {tripPlan.start_date} - {tripPlan.end_date} ({tripPlan.duration_days} days)
          </p>
        </div>
        <div className="text-right">
          <p className="text-primary font-bold text-xl">${tripPlan.total_price.toLocaleString()}</p>
          <p className="text-text-muted dark:text-white/40 text-xs">{tripPlan.currency}</p>
        </div>
      </div>

      {/* Flights */}
      {tripPlan.flights.length > 0 && (
        <div className="space-y-2 bg-surface/50 dark:bg-white/5 rounded-lg p-3">
          <h4 className="text-xs text-primary uppercase tracking-wider font-semibold flex items-center gap-2">
            <Plane className="w-3 h-3" /> Flights
          </h4>
          {tripPlan.flights.map((flight, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-text-primary dark:text-white">{flight.airline} {flight.flight_number}</span>
              <span className="text-text-secondary dark:text-white/60">{flight.origin} → {flight.destination}</span>
            </div>
          ))}
        </div>
      )}

      {/* Hotel */}
      {tripPlan.hotel && (
        <div className="space-y-2 bg-surface/50 dark:bg-white/5 rounded-lg p-3">
          <h4 className="text-xs text-primary uppercase tracking-wider font-semibold">🏨 Hotel</h4>
          <div className="flex justify-between text-sm">
            <span className="text-text-primary dark:text-white">{tripPlan.hotel.name}</span>
            <span className="text-text-secondary dark:text-white/60">{tripPlan.hotel.room_type}</span>
          </div>
        </div>
      )}

      {/* Experiences */}
      {tripPlan.experiences.length > 0 && (
        <div className="space-y-2 bg-surface/50 dark:bg-white/5 rounded-lg p-3">
          <h4 className="text-xs text-primary uppercase tracking-wider font-semibold">✨ Experiences</h4>
          {tripPlan.experiences.map((exp, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-text-primary dark:text-white">{exp.name}</span>
              <span className="text-primary font-medium">${exp.price}</span>
            </div>
          ))}
        </div>
      )}

      {/* Status */}
      <div className="pt-2 border-t border-primary/20 flex justify-between items-center">
        <span className={`text-xs px-3 py-1 rounded-full font-medium ${tripPlan.status === 'booked'
          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
          }`}>
          {tripPlan.status === 'booked' ? '✓ Booked' : '⏳ Pending'}
        </span>
        {tripPlan.recommended_card && (
          <span className="text-xs text-text-muted dark:text-white/40">
            💳 {tripPlan.recommended_card}
          </span>
        )}
      </div>
    </div>
  );
};

export const ChatInterface: React.FC = () => {
  const {
    chatHistory,
    sendMessage,
    addMessage,
    isLoading,
    isConnected,
    isTyping,
    connectChat,
    streamingText,
  } = useVal8();

  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Audio chat hook with silence detection and auto-listen
  const {
    isConnected: isAudioConnected,
    isRecording,
    isProcessing,
    isPlaying: isAudioPlaying,
    isSpeaking,
    audioLevel,
    autoListen,
    setAutoListen,
    startRecording,
    stopRecording,
    connect: connectAudio,
  } = useAudioChat({
    silenceTimeout: 2000,
    autoListen: false,
    onTranscription: (text) => {
      addMessage({
        sender: 'user',
        text,
        type: 'text',
      });
    },
    onResponseText: (text) => {
      addMessage({
        sender: 'val8',
        text,
        type: 'text',
      });
    },
    onError: (error) => {
      console.error('Audio error:', error);
    },
  });

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping, streamingText]);

  // Auto-connect on mount
  useEffect(() => {
    if (!isConnected) {
      connectChat();
    }
  }, [isConnected, connectChat]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && isConnected) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleMicClick = useCallback(async () => {
    if (isRecording) {
      stopRecording();
    } else {
      if (!isAudioConnected) {
        connectAudio();
        setTimeout(async () => {
          try {
            await startRecording();
          } catch (err) {
            console.error('Failed to start recording:', err);
          }
        }, 500);
      } else {
        try {
          await startRecording();
        } catch (err) {
          console.error('Failed to start recording:', err);
        }
      }
    }
  }, [isRecording, isAudioConnected, startRecording, stopRecording, connectAudio]);

  const handleQuickReply = (text: string) => {
    if (isConnected) {
      sendMessage(text);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatHistory.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-serif text-text-primary dark:text-white mb-2">
              Hello! I&apos;m Val8
            </h2>
            <p className="text-text-secondary dark:text-white/60 max-w-sm">
              Your AI concierge for luxury travel. Where would you like to go?
            </p>
          </div>
        )}

        {chatHistory.map((message, index) => (
          <div
            key={message.id || index}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] ${message.sender === 'user' ? 'order-1' : 'order-2'}`}>
              {message.sender === 'val8' && (
                <div className="flex items-start gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-surface dark:bg-white/10 border border-border-subtle dark:border-white/10 rounded-2xl rounded-tl-md px-4 py-3 text-text-primary dark:text-white text-sm leading-relaxed whitespace-pre-line">
                      {message.text}
                    </div>

                    {/* Trip Plan */}
                    {message.tripPlan && (
                      <TripPlanCard tripPlan={message.tripPlan} />
                    )}

                    {/* Quick replies / Options - only show if options are short answer choices, not full questions */}
                    {message.type === 'options' && message.options && message.options.length > 0 && (
                      // Only show if options are short (likely answer choices, not repeated questions)
                      message.options.some(opt => opt.length < 50 && !opt.endsWith('?')) && (
                        <QuickReplyChips options={message.options.filter(opt => opt.length < 50)} onSelect={handleQuickReply} />
                      )
                    )}
                  </div>
                </div>
              )}

              {message.sender === 'user' && (
                <div className="bg-primary rounded-2xl rounded-tr-md px-4 py-3 text-black text-sm font-medium">
                  {message.text}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Live recording indicator - shows when user is speaking */}
        {isRecording && (
          <div className="flex justify-end">
            <div className="bg-primary/90 rounded-2xl rounded-tr-md px-4 py-3 text-white text-sm flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-1 bg-white rounded-full transition-all duration-75"
                    style={{
                      height: `${Math.max(4, Math.min(16, (isSpeaking ? audioLevel * 80 : 3) + Math.random() * 4 * (i + 1)))}px`,
                      opacity: isSpeaking ? 1 : 0.4,
                    }}
                  />
                ))}
              </div>
              {isSpeaking && <span>Listening...</span>}
            </div>
          </div>
        )}

        {/* Streaming response - shows live text as it arrives */}
        {streamingText && (
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <div className="flex-1">
              <div className="bg-surface dark:bg-white/10 border border-border-subtle dark:border-white/10 rounded-2xl rounded-tl-md px-4 py-3 text-text-primary dark:text-white text-sm leading-relaxed whitespace-pre-line">
                {streamingText}
                <span className="inline-block w-1.5 h-4 bg-primary ml-0.5 animate-pulse" />
              </div>
            </div>
          </div>
        )}

        {/* Facebook Messenger-style typing indicator - shows when waiting and no streaming yet */}
        {(isTyping || isLoading || isProcessing) && !streamingText && (
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <div className="flex-1">
              <div className="bg-surface dark:bg-white/10 border border-border-subtle dark:border-white/10 rounded-2xl rounded-tl-md px-4 py-3 inline-flex items-center gap-1">
                <span className="w-2 h-2 bg-text-muted dark:bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '0.6s' }} />
                <span className="w-2 h-2 bg-text-muted dark:bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms', animationDuration: '0.6s' }} />
                <span className="w-2 h-2 bg-text-muted dark:bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms', animationDuration: '0.6s' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-border-subtle dark:border-white/10">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message or use voice..."
            disabled={!isConnected}
            className="w-full px-4 py-3 pr-24 rounded-xl bg-surface dark:bg-white/5 border border-border-subtle dark:border-white/10 text-text-primary dark:text-white placeholder-text-muted dark:placeholder-white/40 text-sm focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
          />

          {/* Mic Button */}
          <button
            type="button"
            onClick={handleMicClick}
            disabled={!isConnected}
            className={`absolute right-12 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isRecording
              ? 'bg-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.5)]'
              : isProcessing
                ? 'bg-amber-500/20 text-amber-400'
                : 'bg-surface-alt dark:bg-white/10 border border-border-subtle dark:border-white/10 text-text-muted dark:text-white/50 hover:text-primary hover:border-primary/50'
              } disabled:opacity-50`}
            title={isRecording ? 'Stop (auto-stops after 2s silence)' : 'Voice input'}
          >
            {isRecording ? (
              <MicOff className="w-4 h-4" />
            ) : isProcessing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Mic className="w-4 h-4" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full animate-pulse" />
              </>
            )}
          </button>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputValue.trim() || !isConnected}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div >
  );
};
