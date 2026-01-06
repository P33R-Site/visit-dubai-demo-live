/**
 * WebSocket hook for audio chat with STT and TTS
 * Features: Voice activity indicator, silence detection, auto-stop
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { getWsUrl, getAccessToken } from '@/lib/api';
import { getSessionId, generateTempSessionId, setSessionId } from '@/lib/session';
import { AudioWebSocketMessage, TripPlan, TripPlanItem } from '@/lib/types';

interface UseAudioChatOptions {
    onTranscription?: (text: string) => void;
    onResponseText?: (text: string) => void;
    onAudioChunk?: (chunk: ArrayBuffer) => void;
    onAudioComplete?: () => void;
    onTripPlan?: (tripPlan: TripPlan) => void;
    onPlanItem?: (planItem: TripPlanItem) => void;
    onTripPlanReady?: (data: { trip_plan_id: string; status: string; destination: string; total_price: number }) => void;
    onError?: (error: string) => void;
    onConnectionChange?: (connected: boolean) => void;
    onRecordingChange?: (isRecording: boolean) => void;
    onVoiceActivity?: (isSpeaking: boolean) => void;
    silenceTimeout?: number; // ms before auto-stop (default: 2000)
    silenceThreshold?: number; // volume threshold (default: 0.01)
    autoListen?: boolean; // Auto-start recording after AI finishes speaking
}

interface UseAudioChatReturn {
    isConnected: boolean;
    isRecording: boolean;
    isProcessing: boolean;
    isPlaying: boolean;
    isSpeaking: boolean; // Voice activity indicator
    audioLevel: number; // 0-1 volume level for visualization
    autoListen: boolean; // Auto-listen mode enabled
    setAutoListen: (enabled: boolean) => void;
    startRecording: () => Promise<void>;
    stopRecording: () => void;
    connect: () => void;
    disconnect: () => void;
    sessionId: string | null;
}

export function useAudioChat(options: UseAudioChatOptions = {}): UseAudioChatReturn {
    const [isConnected, setIsConnected] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [audioLevel, setAudioLevel] = useState(0);
    const [sessionId, setSessionIdState] = useState<string | null>(null);
    const [autoListen, setAutoListen] = useState(options.autoListen ?? false);

    const wsRef = useRef<WebSocket | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const audioElementRef = useRef<HTMLAudioElement | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    // VAD state refs - matching backend implementation
    const animationFrameRef = useRef<number | null>(null);
    const isRecordingRef = useRef<boolean>(false);
    const vadStateRef = useRef({
        isCalibrating: true,
        calibrationStartTime: 0,
        backgroundEnergy: 0,
        adaptiveThreshold: 0.01,
        smoothedEnergy: 0,
        speechDetected: false,
        lastSpeechTime: 0,
        currentSilenceStart: 0,
        speechDuration: 0, // Total time speaking
        maxRecordingTimeout: null as NodeJS.Timeout | null,
    });

    // Accumulate audio chunks for complete MP3 playback
    const accumulatedAudioChunksRef = useRef<Uint8Array[]>([]);

    // VAD Config - matching backend
    const VAD_CONFIG = {
        CALIBRATION_DURATION: 500, // Reduced for faster start
        INITIAL_ENERGY_THRESHOLD: 0.015,
        ENERGY_MULTIPLIER: 2.0,
        MIN_SILENCE_DURATION: 1500, // 1.5s silence before stopping
        MIN_SPEECH_DURATION: 300, // Must have 300ms of speech
        ENERGY_SMOOTHING: 0.7,
        MAX_RECORDING: 30000, // 30s max
    };

    const {
        onTranscription,
        onResponseText,
        onAudioChunk,
        onAudioComplete,
        onTripPlan,
        onPlanItem,
        onTripPlanReady,
        onError,
        onConnectionChange,
        onRecordingChange,
        onVoiceActivity,
    } = options;

    // Monitor audio levels with proper VAD - matching backend implementation
    const monitorAudioLevels = useCallback(() => {
        if (!analyserRef.current || !isRecordingRef.current) {
            setAudioLevel(0);
            setIsSpeaking(false);
            return;
        }

        const analyser = analyserRef.current;
        const timeDomainData = new Uint8Array(analyser.fftSize);
        const vad = vadStateRef.current;

        // Initialize calibration start time
        if (vad.calibrationStartTime === 0) {
            vad.calibrationStartTime = Date.now();
            vad.isCalibrating = true;
            vad.speechDuration = 0;
            vad.lastSpeechTime = 0;
            vad.currentSilenceStart = 0;
            vad.speechDetected = false;

            // Safety timeout - max 30 seconds recording
            if (vad.maxRecordingTimeout) {
                clearTimeout(vad.maxRecordingTimeout);
            }
            vad.maxRecordingTimeout = setTimeout(() => {
                if (isRecordingRef.current && mediaRecorderRef.current?.state === 'recording') {
                    console.log('VAD: Max recording timeout (30s), stopping');
                    mediaRecorderRef.current.stop();
                    isRecordingRef.current = false;
                    setIsRecording(false);
                    onRecordingChange?.(false);
                }
            }, VAD_CONFIG.MAX_RECORDING);
        }

        const checkLevel = () => {
            if (!isRecordingRef.current || !analyserRef.current) {
                setAudioLevel(0);
                setIsSpeaking(false);
                return;
            }

            // Get time domain data for RMS energy calculation (more accurate)
            analyser.getByteTimeDomainData(timeDomainData);

            // Calculate RMS energy
            let sumSquares = 0;
            for (let i = 0; i < timeDomainData.length; i++) {
                const normalized = (timeDomainData[i] - 128) / 128;
                sumSquares += normalized * normalized;
            }
            const rmsEnergy = Math.sqrt(sumSquares / timeDomainData.length);

            // Smooth energy to reduce false positives
            vad.smoothedEnergy = (VAD_CONFIG.ENERGY_SMOOTHING * vad.smoothedEnergy) +
                ((1 - VAD_CONFIG.ENERGY_SMOOTHING) * rmsEnergy);

            setAudioLevel(vad.smoothedEnergy * 5); // Scale for visualization

            const currentTime = Date.now();
            const recordingDuration = currentTime - vad.calibrationStartTime;

            // Calibration phase - learn background noise
            if (vad.isCalibrating && recordingDuration < VAD_CONFIG.CALIBRATION_DURATION) {
                vad.backgroundEnergy = (vad.backgroundEnergy + vad.smoothedEnergy) / 2;
                vad.adaptiveThreshold = Math.max(
                    VAD_CONFIG.INITIAL_ENERGY_THRESHOLD,
                    vad.backgroundEnergy * VAD_CONFIG.ENERGY_MULTIPLIER
                );
            } else if (vad.isCalibrating) {
                vad.isCalibrating = false;
                console.log('VAD Calibrated - Threshold:', vad.adaptiveThreshold.toFixed(4));
            }

            // Speech detection
            const isSpeech = vad.smoothedEnergy > vad.adaptiveThreshold;
            setIsSpeaking(isSpeech);
            onVoiceActivity?.(isSpeech);

            if (isSpeech) {
                // Speech detected
                if (!vad.speechDetected) {
                    vad.speechDetected = true;
                }
                vad.lastSpeechTime = currentTime;
                vad.currentSilenceStart = 0;
                vad.speechDuration += 50; // Approximate frame time
            } else if (vad.speechDetected) {
                // Silence after speech
                if (!vad.currentSilenceStart) {
                    vad.currentSilenceStart = currentTime;
                }
                vad.speechDetected = false;
            }

            // Check for silence after speech
            if (vad.lastSpeechTime > 0 && vad.currentSilenceStart > 0) {
                const silenceDuration = currentTime - vad.currentSilenceStart;

                // Stop if: enough silence AND had real speech
                if (silenceDuration >= VAD_CONFIG.MIN_SILENCE_DURATION &&
                    vad.speechDuration >= VAD_CONFIG.MIN_SPEECH_DURATION) {
                    console.log('VAD: Stopping after silence', {
                        silenceDuration,
                        speechDuration: vad.speechDuration
                    });
                    if (mediaRecorderRef.current?.state === 'recording') {
                        mediaRecorderRef.current.stop();
                        isRecordingRef.current = false;
                        setIsRecording(false);
                        onRecordingChange?.(false);
                    }
                    return; // Stop the loop
                }
            }

            // Safety: stop after 10s of no speech at all
            if (recordingDuration > 10000 && vad.speechDuration < 100) {
                console.log('VAD: No speech detected for 10s, stopping');
                if (mediaRecorderRef.current?.state === 'recording') {
                    mediaRecorderRef.current.stop();
                    isRecordingRef.current = false;
                    setIsRecording(false);
                    onRecordingChange?.(false);
                }
                return;
            }

            animationFrameRef.current = requestAnimationFrame(checkLevel);
        };

        checkLevel();
    }, [onVoiceActivity, onRecordingChange]);

    // Play accumulated audio as MP3
    const playAccumulatedAudio = useCallback(() => {
        if (accumulatedAudioChunksRef.current.length === 0) {
            setIsPlaying(false);
            return;
        }

        // Combine all chunks into a single Uint8Array
        const totalLength = accumulatedAudioChunksRef.current.reduce((acc, chunk) => acc + chunk.length, 0);
        const combinedAudio = new Uint8Array(totalLength);
        let offset = 0;
        for (const chunk of accumulatedAudioChunksRef.current) {
            combinedAudio.set(chunk, offset);
            offset += chunk.length;
        }

        // Create Blob and URL for audio playback
        const audioBlob = new Blob([combinedAudio], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);

        // Create or reuse audio element
        if (!audioElementRef.current) {
            audioElementRef.current = new Audio();
        }

        const audio = audioElementRef.current;
        audio.src = audioUrl;
        audio.onended = () => {
            setIsPlaying(false);
            URL.revokeObjectURL(audioUrl);
            onAudioComplete?.();

            // Auto-listen: Start recording again after AI finishes speaking
            if (autoListen && !isRecording && !isProcessing) {
                setTimeout(() => {
                    startRecording().catch(err => {
                        console.error('Auto-listen failed to start recording:', err);
                    });
                }, 300); // Small delay before re-starting
            }
        };
        audio.onerror = () => {
            console.error('Error playing audio');
            setIsPlaying(false);
            URL.revokeObjectURL(audioUrl);
        };

        setIsPlaying(true);
        audio.play().catch((e) => {
            console.error('Audio playback failed:', e);
            setIsPlaying(false);
        });

        // Clear accumulated chunks
        accumulatedAudioChunksRef.current = [];
    }, [onAudioComplete, autoListen, isRecording, isProcessing]);

    const connect = useCallback(() => {
        if (wsRef.current?.readyState === WebSocket.OPEN) return;

        try {
            const wsUrl = getWsUrl('/chat/audio');
            const ws = new WebSocket(wsUrl);
            wsRef.current = ws;

            ws.onopen = () => {
                // Get or generate session ID
                let currentSessionId = getSessionId();
                if (!currentSessionId) {
                    currentSessionId = generateTempSessionId();
                    setSessionId(currentSessionId);
                }
                setSessionIdState(currentSessionId);

                // Send init message
                const initMessage: AudioWebSocketMessage = {
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
                    const data: AudioWebSocketMessage = JSON.parse(event.data);

                    switch (data.type) {
                        case 'connected':
                            setIsConnected(true);
                            onConnectionChange?.(true);
                            if (data.session_id) {
                                setSessionId(data.session_id);
                                setSessionIdState(data.session_id);
                            }
                            break;

                        case 'audio_ready':
                            break;

                        case 'transcription':
                            setIsProcessing(false);
                            if (data.text) {
                                onTranscription?.(data.text);
                            }
                            break;

                        case 'response_text':
                            if (data.text) {
                                onResponseText?.(data.text);
                            }
                            break;

                        case 'audio_start':
                            accumulatedAudioChunksRef.current = [];
                            break;

                        case 'audio_chunk':
                            if (data.chunk) {
                                const binaryString = atob(data.chunk);
                                const bytes = new Uint8Array(binaryString.length);
                                for (let i = 0; i < binaryString.length; i++) {
                                    bytes[i] = binaryString.charCodeAt(i);
                                }

                                accumulatedAudioChunksRef.current.push(bytes);
                                onAudioChunk?.(bytes.buffer);
                            }
                            break;

                        case 'audio_complete':
                            playAccumulatedAudio();
                            break;

                        case 'trip_plan':
                            if (data.trip_plan) {
                                onTripPlan?.(data.trip_plan);
                            }
                            break;

                        case 'plan_item':
                            if (data.plan_item) {
                                onPlanItem?.(data.plan_item);
                            }
                            break;

                        case 'trip_plan_ready':
                            if (data.trip_plan_id) {
                                onTripPlanReady?.({
                                    trip_plan_id: data.trip_plan_id,
                                    status: data.status || 'pending',
                                    destination: data.destination || '',
                                    total_price: data.total_price || 0,
                                });
                            }
                            break;

                        case 'error':
                            setIsProcessing(false);
                            isRecordingRef.current = false;
                            setIsRecording(false);
                            onError?.(data.message || 'Unknown error');
                            break;

                        case 'pong':
                            break;

                        default:
                            console.log('Unknown audio message type:', data.type);
                    }
                } catch (e) {
                    console.error('Error parsing audio WebSocket message:', e);
                }
            };

            ws.onerror = () => {
                onError?.('Audio WebSocket connection error');
            };

            ws.onclose = () => {
                setIsConnected(false);
                onConnectionChange?.(false);
                wsRef.current = null;
            };
        } catch (e) {
            console.error('Error creating audio WebSocket:', e);
        }
    }, [onConnectionChange, onError, onTranscription, onResponseText, onAudioChunk, onTripPlan, onPlanItem, onTripPlanReady, playAccumulatedAudio]);

    const disconnect = useCallback(() => {
        if (wsRef.current) {
            wsRef.current.close();
            wsRef.current = null;
        }
        setIsConnected(false);
        onConnectionChange?.(false);
    }, [onConnectionChange]);

    const startRecording = useCallback(async () => {
        // Auto-connect if not connected
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
            connect(); // Initiate connection

            // Wait for connection (with timeout)
            const maxWait = 5000; // 5 seconds
            const startTime = Date.now();

            while ((!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) &&
                (Date.now() - startTime < maxWait)) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }

            // Check if connected after waiting
            if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
                onError?.('Failed to connect to server');
                return;
            }
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            // Set up audio analysis for voice activity detection
            audioContextRef.current = new AudioContext();
            analyserRef.current = audioContextRef.current.createAnalyser();
            analyserRef.current.fftSize = 256;

            const source = audioContextRef.current.createMediaStreamSource(stream);
            source.connect(analyserRef.current);

            // Check for supported mime types
            let mimeType = 'audio/webm;codecs=opus';
            if (!MediaRecorder.isTypeSupported(mimeType)) {
                mimeType = 'audio/webm';
                if (!MediaRecorder.isTypeSupported(mimeType)) {
                    mimeType = 'audio/mp4';
                    if (!MediaRecorder.isTypeSupported(mimeType)) {
                        mimeType = '';
                    }
                }
            }

            const mediaRecorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);

            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];
            // Reset VAD state for new recording
            vadStateRef.current.calibrationStartTime = 0;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = async () => {
                // Stop audio level monitoring
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                    animationFrameRef.current = null;
                }
                // Clear VAD max recording timeout
                if (vadStateRef.current.maxRecordingTimeout) {
                    clearTimeout(vadStateRef.current.maxRecordingTimeout);
                    vadStateRef.current.maxRecordingTimeout = null;
                }

                setAudioLevel(0);
                setIsSpeaking(false);

                const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType || 'audio/webm' });

                // Convert to base64 and send
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64data = (reader.result as string).split(',')[1];

                    if (wsRef.current?.readyState === WebSocket.OPEN) {
                        setIsProcessing(true);
                        wsRef.current.send(JSON.stringify({
                            type: 'audio_end',
                            audio_data: base64data,
                        }));
                    }
                };
                reader.readAsDataURL(audioBlob);

                // Stop all tracks
                stream.getTracks().forEach(track => track.stop());

                // Close audio context
                if (audioContextRef.current) {
                    audioContextRef.current.close();
                    audioContextRef.current = null;
                }
            };

            // Notify server we're starting
            wsRef.current.send(JSON.stringify({ type: 'audio_start' }));

            mediaRecorder.start();
            isRecordingRef.current = true;
            setIsRecording(true);
            onRecordingChange?.(true);

            // Start monitoring audio levels
            monitorAudioLevels();
        } catch (e) {
            console.error('Error starting recording:', e);
            onError?.('Failed to start recording. Please check microphone permissions.');
        }
    }, [connect, onError, onRecordingChange, monitorAudioLevels]);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current?.state === 'recording') {
            mediaRecorderRef.current.stop();
            isRecordingRef.current = false;
            setIsRecording(false);
            onRecordingChange?.(false);
        }
    }, [onRecordingChange]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (vadStateRef.current.maxRecordingTimeout) {
                clearTimeout(vadStateRef.current.maxRecordingTimeout);
            }
            if (mediaRecorderRef.current?.state === 'recording') {
                mediaRecorderRef.current.stop();
            }
            if (wsRef.current) {
                wsRef.current.close();
            }
            if (audioElementRef.current) {
                audioElementRef.current.pause();
                audioElementRef.current = null;
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    return {
        isConnected,
        isRecording,
        isProcessing,
        isPlaying,
        isSpeaking,
        audioLevel,
        autoListen,
        setAutoListen,
        startRecording,
        stopRecording,
        connect,
        disconnect,
        sessionId,
    };
}
