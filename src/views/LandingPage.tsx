import React from 'react';
import { Header } from '@/components/ui/Header';
import { Val8Widget } from '@/components/val8/Val8Widget';
import { Footer } from '@/components/ui/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { ThingsToDoSection } from '@/components/home/ThingsToDoSection';
import { WhatsHappeningSection } from '@/components/home/WhatsHappeningSection';
import { VideoSection } from '@/components/home/VideoSection';
import { FindThingsToDoSection } from '@/components/home/FindThingsToDoSection';
import { UpcomingEventsSection } from '@/components/home/UpcomingEventsSection';
import { MapSection } from '@/components/home/MapSection';
import { MoreAboutSection } from '@/components/home/MoreAboutSection';


export const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-bg text-text-primary font-sans selection:bg-primary/30">

            {/* Background Ambience */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-[20%] right-0 w-[70vw] h-[70vw] bg-primary/[0.04] rounded-full blur-[120px]" />
                <div className="absolute top-[40%] -left-[10%] w-[50vw] h-[50vw] bg-white/[0.01] rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-noise opacity-[0.03]" />
            </div>

            <Header />

            <main className="relative z-10">
                <HeroSection />
                <div id="things-to-do"><ThingsToDoSection /></div>
                <div id="whats-on"><WhatsHappeningSection /></div>
                <VideoSection />
                <div id="plan"><FindThingsToDoSection /></div>
                <div id="events"><UpcomingEventsSection /></div>
                <div id="destinations"><MapSection /></div>
                <div id="more"><MoreAboutSection /></div>
            </main>

            <Footer />
            <Val8Widget />
        </div>
    );
};

