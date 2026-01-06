"use client";

import React, { useRef } from 'react';
import { CreditCard, ArrowUpRight, Plus, Download } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';

export default function WalletPage() {
    // 3D Tilt Logic
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 }); // Smooth mouse movement
    const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]); // Tilt X (up/down)
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]); // Tilt Y (left/right)
    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]); // Glare movement X
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]); // Glare movement Y

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div className="space-y-12 pb-20">
            <h1 className="text-4xl font-serif text-text-primary dark:text-white">Digital Wallet</h1>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

                {/* Visual Card Section */}
                <div className="lg:col-span-2 space-y-8">

                    {/* The 3D Metal Card - Keeping Noir Aesthetic */}
                    <motion.div
                        ref={ref}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            rotateX,
                            rotateY,
                            transformStyle: "preserve-3d",
                        }}
                        className="relative aspect-[1.586] rounded-3xl cursor-pointer perspective-1000"
                    >
                        {/* Card Container - moves with tilt - ALWAYS DARK (Noir) */}
                        <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl bg-[#0a0a0a] border border-white/10">

                            {/* Texture Layers */}
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-black/80 to-black" />

                            {/* Holographic Reflection (Dynamic Gradient) */}
                            <motion.div
                                style={{
                                    background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 60%)",
                                    left: useTransform(mouseXSpring, [-0.5, 0.5], ["-50%", "50%"]),
                                    top: useTransform(mouseYSpring, [-0.5, 0.5], ["-50%", "50%"]),
                                }}
                                className="absolute w-[200%] h-[200%] pointer-events-none mix-blend-overlay"
                            />

                            {/* Edge Highlight (Simulated Rim Light) */}
                            <div className="absolute inset-0 rounded-3xl border border-white/10 bg-gradient-to-br from-white/20 to-transparent pointer-events-none opacity-50" />

                            {/* Content Layer (Floating slightly above) */}
                            <div
                                style={{ transform: "translateZ(30px)" }}
                                className="absolute inset-0 p-8 flex flex-col justify-between z-10"
                            >
                                <div className="flex justify-between items-start">
                                    <Logo className="text-2xl text-white/90 tracking-widest drop-shadow-lg" />
                                    <span className="px-3 py-1 rounded border border-white/20 text-[10px] text-white/60 uppercase tracking-widest backdrop-blur-md">Noir Edition</span>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-8 rounded bg-gradient-to-r from-[#e3b574] to-[#f0c888] shadow-lg shadow-[#e3b574]/20 opacity-90 flex items-center justify-center relative overflow-hidden">
                                            <div className="absolute inset-0 bg-white/20 skew-x-12 translate-x-3" />
                                            <div className="w-6 h-6 border-2 border-black/10 rounded-full ml-[-8px] z-10" />
                                            <div className="w-6 h-6 border-2 border-black/10 rounded-full ml-[-12px] z-10" />
                                        </div>
                                        <div className="w-6 h-6 rounded border border-white/20 flex items-center justify-center backdrop-blur-sm">
                                            <span className="text-[10px] text-white">)))</span>
                                        </div>
                                    </div>
                                    <h3 className="font-mono text-2xl text-white tracking-widest shadow-black drop-shadow-md">
                                        •••• •••• •••• 8842
                                    </h3>
                                </div>

                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[8px] uppercase tracking-[0.2em] text-white/40 mb-1">Cardholder</p>
                                        <p className="text-sm text-white font-medium tracking-wider shadow-black drop-shadow-sm">AL MAMUN SIKDER</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[8px] uppercase tracking-[0.2em] text-white/40 mb-1">Expires</p>
                                        <p className="text-sm text-white font-medium shadow-black drop-shadow-sm">12/28</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Stats Grid - Adapted for Light Mode */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 rounded-3xl bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/5 hover:border-border dark:hover:border-white/10 transition-colors">
                            <p className="text-text-muted dark:text-white/40 text-xs uppercase tracking-widest mb-2">Month Spend</p>
                            <p className="text-2xl text-text-primary dark:text-white font-serif">$12,450</p>
                        </div>
                        <div className="p-6 rounded-3xl bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/5 hover:border-border dark:hover:border-white/10 transition-colors">
                            <p className="text-text-muted dark:text-white/40 text-xs uppercase tracking-widest mb-2">Points Earned</p>
                            <p className="text-2xl text-primary font-serif">45,200</p>
                        </div>
                    </div>
                </div>

                {/* Transactions Table Section - Adapted for Light Mode */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="flex items-center justify-between border-b border-border-subtle dark:border-white/10 pb-6">
                        <h2 className="text-xl text-text-primary dark:text-white font-serif">Transaction History</h2>
                        <div className="flex gap-2">
                            <button className="p-2 rounded-full border border-border-subtle dark:border-white/10 hover:bg-surface-alt dark:hover:bg-white text-text-muted dark:text-white hover:text-text-primary dark:hover:text-black transition-colors">
                                <Plus className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-full border border-border-subtle dark:border-white/10 hover:bg-surface-alt dark:hover:bg-white text-text-muted dark:text-white hover:text-text-primary dark:hover:text-black transition-colors">
                                <Download className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {[
                            { name: 'The Setai Hotel', date: 'June 9', cat: 'Travel', amount: '-$2,450.00', icon: 'H' },
                            { name: 'Komodo Miami', date: 'June 7', cat: 'Dining', amount: '-$385.40', icon: 'D' },
                            { name: 'Refund: Deposit', date: 'June 6', cat: 'Credit', amount: '+$500.00', text: 'text-emerald-500', icon: 'R' },
                            { name: 'Uber Black', date: 'June 6', cat: 'Transport', amount: '-$85.00', icon: 'T' },
                            { name: 'American Airlines', date: 'June 1', cat: 'Travel', amount: '-$1,240.00', icon: 'A' },
                        ].map((tx, i) => (
                            <div key={i} className="group p-4 rounded-2xl hover:bg-surface-alt dark:hover:bg-white/5 transition-colors flex items-center justify-between cursor-pointer border border-transparent hover:border-border-subtle dark:hover:border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-surface-alt dark:bg-white/5 flex items-center justify-center text-text-muted dark:text-white/40 font-serif text-lg group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                                        {tx.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-text-primary dark:text-white font-medium group-hover:text-primary transition-colors">{tx.name}</h3>
                                        <p className="text-text-muted dark:text-white/30 text-xs mt-0.5">{tx.date} • {tx.cat}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-mono text-sm ${tx.text || 'text-text-primary dark:text-white'}`}>{tx.amount}</p>
                                    <div className="opacity-0 group-hover:opacity-100 text-[10px] text-text-muted dark:text-white/40 uppercase tracking-wider flex items-center justify-end gap-1 mt-1 transition-opacity">
                                        Details <ArrowUpRight className="w-3 h-3" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
