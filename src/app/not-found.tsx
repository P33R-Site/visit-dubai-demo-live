"use client";

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-bg flex items-center justify-center relative overflow-hidden text-center px-6">

            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute inset-0 bg-noise opacity-[0.03]" />
            </div>

            <div className="relative z-10 max-w-lg">
                <div className="flex items-center justify-center gap-4 mb-8">
                    <span className="h-[1px] w-12 bg-primary/50"></span>
                    <span className="text-xs font-bold tracking-[0.3em] uppercase text-primary drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                        Error 404
                    </span>
                    <span className="h-[1px] w-12 bg-primary/50"></span>
                </div>

                <h1 className="font-serif text-6xl md:text-8xl text-white mb-6 tracking-tight">
                    Lost in the <br />
                    <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary-soft">
                        Void.
                    </span>
                </h1>

                <p className="text-white/60 font-light leading-relaxed mb-12 text-lg">
                    The page you are looking for has ostensibly vanished. <br />
                    Let us guide you back to known coordinates.
                </p>

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/80 hover:text-white transition-all duration-300 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-widest">Return to Sanctuary</span>
                </Link>
            </div>
        </div>
    );
}
