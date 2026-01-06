"use client";

import React from 'react';
import Link from 'next/link';
import { Instagram, Twitter, Linkedin, Send, Facebook, Youtube } from 'lucide-react';
import { NAV_ITEMS } from '@/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-bg pt-32 pb-12 overflow-hidden border-t border-border-subtle">

      {/* Background Watermark */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.03]">
        <span className="font-serif font-bold text-[20vw] leading-none text-text-primary absolute -top-20 -left-10 whitespace-nowrap">
          Visit Dubai
        </span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">

          {/* Brand Column */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block mb-8 group">
              <div className="flex flex-col leading-none">
                <span className="font-sans text-xs font-bold tracking-[0.4em] text-text-muted uppercase ml-1 mb-2">The Official Guide</span>
                <span className="font-serif text-5xl font-bold tracking-tight text-text-primary group-hover:text-primary transition-colors duration-300">
                  Visit <span className="italic text-primary">Dubai</span>
                </span>
              </div>
            </Link>
            <p className="text-text-secondary font-light leading-relaxed max-w-sm mb-8">
              Experience the world's most dynamic city. From architectural marvels to ancient traditions, discover the magic of Dubai.
            </p>

            {/* Newsletter */}
            <div className="max-w-md">
              <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Subscribe to our newsletter</h4>
              <div className="flex border-b border-border-subtle pb-2 focus-within:border-primary transition-colors group">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="bg-transparent w-full text-text-primary placeholder-text-muted focus:outline-none py-2 font-light"
                />
                <button className="text-text-muted hover:text-primary transition-colors">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Explore */}
            <div className="flex flex-col gap-6">
              <h4 className="text-text-primary font-serif text-xl italic">Explore</h4>
              <ul className="space-y-4">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-text-secondary hover:text-primary transition-colors text-sm font-medium">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div className="flex flex-col gap-6">
              <h4 className="text-text-primary font-serif text-xl italic">Connect</h4>
              <ul className="space-y-4">
                <li><a href="#" className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors text-sm"><Facebook className="w-4 h-4" /> Facebook</a></li>
                <li><a href="#" className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors text-sm"><Instagram className="w-4 h-4" /> Instagram</a></li>
                <li><a href="#" className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors text-sm"><Twitter className="w-4 h-4" /> Twitter</a></li>
                <li><a href="#" className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors text-sm"><Youtube className="w-4 h-4" /> YouTube</a></li>
              </ul>
            </div>

            {/* Useful Links */}
            <div className="flex flex-col gap-6">
              <h4 className="text-text-primary font-serif text-xl italic">Useful Links</h4>
              <ul className="space-y-4">
                <li><Link href="#" className="text-text-secondary hover:text-primary transition-colors text-sm">Contact Us</Link></li>
                <li><Link href="#" className="text-text-secondary hover:text-primary transition-colors text-sm">Privacy Policy</Link></li>
                <li><Link href="#" className="text-text-secondary hover:text-primary transition-colors text-sm">Terms of Use</Link></li>
                <li><Link href="#" className="text-text-secondary hover:text-primary transition-colors text-sm">Accessibility</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center py-8 border-t border-border-subtle gap-4">
          <p className="text-text-muted text-xs font-medium">
            © 2025 Department of Economy and Tourism. All rights reserved.
          </p>
          <div className="flex gap-6">
            <img src="/google-play-badge.svg" alt="Get it on Google Play" className="h-8 opacity-50 hover:opacity-100 transition-opacity cursor-pointer" />
            <img src="/app-store-badge.svg" alt="Download on the App Store" className="h-8 opacity-50 hover:opacity-100 transition-opacity cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};