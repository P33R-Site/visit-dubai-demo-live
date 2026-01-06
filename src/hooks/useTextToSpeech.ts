"use client";

import { useState, useEffect, useCallback } from 'react';

export const useTextToSpeech = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
        };

        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;

        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    const speak = useCallback((text: string, onEnd?: () => void) => {
        window.speechSynthesis.cancel(); // Cancel any ongoing speech

        const utterance = new SpeechSynthesisUtterance(text);

        // Attempt to select a "premium" sounding voice
        // Prioritize "Natural" (Edge), "Google US English" (Chrome), or "Samantha" (Safari)
        const preferredVoice = voices.find(v =>
            v.name.includes("Natural") && v.lang.startsWith("en-US")
        ) || voices.find(v =>
            v.name.includes("Google US English")
        ) || voices.find(v =>
            v.name.includes("Samantha")
        ) || voices.find(v =>
            v.lang.startsWith("en-US")
        );

        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => {
            setIsSpeaking(false);
            if (onEnd) onEnd();
        };
        utterance.onerror = (e) => {
            // Ignore common interrupted/canceled errors
            if (e.error === 'canceled' || e.error === 'interrupted') {
                setIsSpeaking(false);
                return;
            }
            console.warn("TTS Error (ignoring):", e);
            setIsSpeaking(false);
        };

        window.speechSynthesis.speak(utterance);
    }, [voices]);

    const stop = useCallback(() => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    }, []);

    return { speak, stop, isSpeaking };
};
