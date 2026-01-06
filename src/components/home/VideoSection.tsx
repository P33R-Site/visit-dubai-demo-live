import React from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Play } from 'lucide-react';

import { experiences } from '@/data/experiences';
import Link from 'next/link';

// Map specific IDs or filter by category/tag to recreate the list
const videoIds = ['skydive-dubai', 'dubai-fountain', 'aura-skypool', 'desert-safari']; // desert-safari ID reuse
const videosData = videoIds.map(id => experiences.find(e => e.id === id)).filter(Boolean);

const videos = videosData.map(v => ({
    title: v!.title,
    subtitle: v!.subtitle,
    image: v!.image,
    duration: v!.duration || "2:00",
    featured: v!.id === 'skydive-dubai', // logic to keep original featured item
    slug: v!.slug,
    id: v!.id
})).slice(0, 4);

export const VideoSection: React.FC = () => {
    return (
        <section className="py-24 bg-bg relative overflow-hidden">
            {/* Ambient Background - Fixed Gradient */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-primary/10 via-bg to-bg opacity-50" />

            <div className="container mx-auto px-6 relative z-10">
                <ScrollReveal>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
                        <div>
                            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">
                                Cinematic Experiences
                            </span>
                            <h2 className="text-4xl md:text-6xl font-serif text-text-primary leading-tight">
                                Watch <span className="italic text-primary">Dubai</span>
                            </h2>
                        </div>
                        <div className="hidden md:block">
                            <span className="text-text-muted text-sm">Scroll to explore the reel</span>
                        </div>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Featured Video (Large) */}
                    <div className="lg:col-span-1">
                        {videos.filter(v => v.featured).map((video, index) => (
                            <ScrollReveal key={index} className="relative h-[400px] md:h-[600px] rounded-[2.5rem] overflow-hidden group shadow-2xl" style={{ WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}>
                                <Link href={`/experience/${video.slug}`} className="block h-full w-full">
                                    <img
                                        src={video.image}
                                        alt={video.title}
                                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

                                    {/* Center Play Button */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full glass border border-white/20 flex items-center justify-center backdrop-blur-md cursor-pointer group-hover:scale-110 transition-all duration-500 shadow-[0_0_50px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_80px_rgba(212,175,55,0.4)]">
                                            <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-white ml-2" />
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full bg-gradient-to-t from-black/90 to-transparent">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <span className="text-primary font-bold uppercase tracking-widest text-xs mb-2 block animate-pulse">
                                                    Now Playing
                                                </span>
                                                <h3 className="text-3xl md:text-4xl font-serif text-white mb-2">
                                                    {video.title}
                                                </h3>
                                                <p className="text-white/70 text-sm font-medium">
                                                    {video.subtitle}
                                                </p>
                                            </div>
                                            <div className="glass px-3 py-1 rounded-full border border-white/10">
                                                <span className="text-xs font-bold text-white">{video.duration}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* Side Reel (Vertical Stack) */}
                    <div className="lg:col-span-1 flex flex-col gap-6">
                        {videos.filter(v => !v.featured).map((video, index) => (
                            <ScrollReveal key={index} delay={index * 150} className="relative h-[160px] md:h-[180px] rounded-[2rem] overflow-hidden group cursor-pointer bg-surface-alt shadow-xl" style={{ WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}>
                                <Link href={`/experience/${video.slug}`} className="block h-full w-full">
                                    <div className="absolute inset-0 flex w-full h-full">
                                        {/* Thumbnail Part */}
                                        <div className="w-1/3 relative overflow-hidden h-full">
                                            <img
                                                src={video.image}
                                                alt={video.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-transparent transition-colors">
                                                <div className="w-10 h-10 rounded-full glass border border-white/20 flex items-center justify-center">
                                                    <Play className="w-4 h-4 text-white fill-white ml-1" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Part */}
                                        <div className="w-2/3 p-6 flex flex-col justify-center relative h-full">
                                            {/* Decorative number */}
                                            <span className="absolute right-6 top-6 text-4xl font-serif text-text-muted/10 font-bold">
                                                0{index + 2}
                                            </span>

                                            <h3 className="text-xl md:text-2xl font-serif text-text-primary mb-1 group-hover:text-primary transition-colors line-clamp-1">
                                                {video.title}
                                            </h3>
                                            <p className="text-text-muted text-xs uppercase tracking-widest mb-4">
                                                {video.subtitle}
                                            </p>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs font-bold text-text-secondary">{video.duration}</span>
                                                <div className="h-[1px] w-8 bg-border-subtle" />
                                                <span className="text-xs font-bold text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                                    Play Video
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
