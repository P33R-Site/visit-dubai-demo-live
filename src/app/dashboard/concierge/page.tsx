"use client";

import React, { useState, useEffect } from 'react';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { ConciergeChat, Message } from '@/components/dashboard/concierge/ConciergeChat';
import { ConciergeVisuals } from '@/components/dashboard/concierge/ConciergeVisuals';

// --- DEMO DATA (Imported locally to keep page self-contained) ---
const DEMO_SCRIPT = [
    {
        userText: "I'm planning a trip to Dubai.",
        aiResponse: "Excellent. Weather is 95° and sunny. I'll handle everything for next month. Want flights, hotel, or activities first?",
        nextStep: 1
    },
    {
        userText: "Flights.",
        aiResponse: "I've got you nonstop from SFO to Dubai on Emirates, Business Class. Want me to hold seats?",
        nextStep: 2
    },
    {
        userText: "Yes.",
        aiResponse: "Done. I'd recommend the One&Only Royal Mirage for your stay. Arabian Court Suite with Sea View. Secure it?",
        nextStep: 3
    },
    {
        userText: "Secure it.",
        aiResponse: "Locked in. Complimentary Chauffeur-drive service is included with your flight. Shall I schedule the pickup?",
        nextStep: 4
    },
    {
        userText: "Yes, schedule it.",
        aiResponse: "Confirmed. For dining, I've found a table at Ossiano — underwater fine dining. Friday at 8pm?",
        nextStep: 5
    },
    {
        userText: "That sounds amazing. Book it.",
        aiResponse: "Reserved. Also — high SPF sunscreen is recommended for the desert sun. Shall I have SunSport SPF 50 waiting in your suite?",
        nextStep: 6
    },
    {
        userText: "Yes please.",
        aiResponse: "Added. Finally, a private desert safari with vintage Land Rovers is highly rated. Shall I add this experience?",
        nextStep: 7
    },
    {
        userText: "Yes, add it.",
        aiResponse: "Done. Your Dubai itinerary is fully organized. I'll notify you of any updates."
    }
];

export default function ConciergePage() {
    const { speak, stop, isSpeaking } = useTextToSpeech();

    // State
    const [mode, setMode] = useState<'normal' | 'demo'>('normal');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'init',
            sender: 'AI',
            content: 'Welcome to Dubai AI. I can arrange your entire journey. How can I help you today?'
        }
    ]);
    const [input, setInput] = useState('');
    const [demoStep, setDemoStep] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);

    // Cleanup audio on unmount
    useEffect(() => {
        return () => stop();
    }, [stop]);

    // --- NORMAL CHAT LOGIC ---
    const handleNormalMessage = async () => {
        if (!input.trim()) return;

        const userMsg = input;
        setInput('');

        // Add User Message
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            sender: 'User',
            content: userMsg
        }]);

        // Simulate AI Delay & Response
        setTimeout(() => {
            const aiOneLiners = [
                "I can certainly help with that. Let me check the best options for you.",
                "Excellent choice. I'm pulling up the details now.",
                "I've noted that preference. Is there anything else specific you need?",
                "Processing your request. Please stand by.",
                "That sounds wonderful. I'll make the necessary arrangements."
            ];
            const randomResponse = aiOneLiners[Math.floor(Math.random() * aiOneLiners.length)];

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                sender: 'AI',
                content: randomResponse
            }]);
        }, 1000);
    };


    // --- DEMO LOGIC ---
    const startDemo = () => {
        setMode('demo');
        setIsAutoPlaying(true);
        setDemoStep(0);
        setMessages([{
            id: 'demo-init',
            sender: 'AI',
            content: 'Demo Mode Activated. Starting Visit Dubai sequence...'
        }]);
    };

    const stopDemo = () => {
        setIsAutoPlaying(false);
        stop();
        setMode('normal');
        setMessages([{
            id: 'demo-end',
            sender: 'AI',
            content: 'Demo ended. Switching back to manual mode. How can I assist you?'
        }]);
    };

    const runDemoStep = async () => {
        if (demoStep >= DEMO_SCRIPT.length) return;

        const step = DEMO_SCRIPT[demoStep];

        // 1. Simulate User Typing
        let currentText = "";
        for (let i = 0; i < step.userText.length; i++) {
            await new Promise(r => setTimeout(r, 40));
            currentText += step.userText[i];
            setInput(currentText);
        }

        await new Promise(r => setTimeout(r, 400));

        // 2. Send User Message
        setInput('');
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            sender: 'User',
            content: step.userText
        }]);

        // 3. AI Processing Delay
        setTimeout(() => {
            const aiMsgId = (Date.now() + 1).toString();
            setMessages(prev => [...prev, {
                id: aiMsgId,
                sender: 'AI',
                content: step.aiResponse
            }]);

            // 4. Speak & Advance
            speak(step.aiResponse, () => {
                // Wait a bit after speaking before next step
                setTimeout(() => {
                    if (step.nextStep !== undefined && isAutoPlaying) {
                        setDemoStep(step.nextStep);
                    }
                }, 800);
            });

        }, 1200);
    };

    // Auto-play Loop
    useEffect(() => {
        if (isAutoPlaying && mode === 'demo' && demoStep < DEMO_SCRIPT.length) {
            const timer = setTimeout(() => {
                runDemoStep();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isAutoPlaying, demoStep, mode]);


    return (
        <div className="h-[calc(100vh-140px)] flex flex-col md:flex-row gap-6">
            {/* The height calculation ensures it fits within the DashboardLayout's scrollable area without double scrolling */}

            {/* LEFT: Chat Interface */}
            <div className="flex-1 min-w-0">
                <ConciergeChat
                    messages={messages}
                    input={input}
                    isSpeaking={isSpeaking}
                    isAutoPlaying={isAutoPlaying}
                    onStartDemo={startDemo}
                    onStopDemo={stopDemo}
                    onInputChange={setInput}
                    onSendMessage={mode === 'normal' ? handleNormalMessage : undefined}
                    placeholder={mode === 'demo' ? "Demo running..." : "Ask me anything..."}
                />
            </div>

            {/* RIGHT: Visuals Panel */}
            <div className="hidden md:block w-[400px]">
                <ConciergeVisuals mode={mode} demoStep={demoStep} />
            </div>
        </div>
    );
}
