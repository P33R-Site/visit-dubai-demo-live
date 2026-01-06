"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, User, Search, Globe } from 'lucide-react';
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { NAV_ITEMS } from '@/constants';
import Link from 'next/link';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500
          ${isScrolled ? 'bg-bg/80 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'}
        `}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* Logo - Typographic "Visit Dubai" */}
          <Link href="/" className="relative z-50 group">
            <div className="flex flex-col leading-none">
              <span className={`font-sans text-xs md:text-sm font-bold tracking-[0.4em] uppercase ml-1 mb-1 ${isScrolled ? 'text-text-primary' : 'text-white'}`}>The Official Guide</span>
              <span className={`font-serif text-3xl md:text-4xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300 ${isScrolled ? 'text-text-primary' : 'text-white'}`}>
                Visit <span className="italic text-primary">Dubai</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`font-bold text-sm uppercase tracking-widest hover:text-primary transition-colors duration-300 relative group ${isScrolled ? 'text-text-primary' : 'text-white'}`}
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Utility Icons */}
          <div className="hidden md:flex items-center gap-6">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className={`hover:text-primary transition-colors ${isScrolled ? 'text-text-primary' : 'text-white'}`}
            >
              <Search className="w-5 h-5" />
            </button>

            <ThemeToggle className={isScrolled ? 'text-text-primary' : 'text-white'} />
            <button className={`hover:text-primary transition-colors flex items-center gap-2 font-bold text-xs uppercase tracking-wider ${isScrolled ? 'text-text-primary' : 'text-white'}`}>
              <Globe className="w-5 h-5" />
              <span>EN</span>
            </button>
            <Link href="/login" className={`flex items-center gap-2 hover:text-primary transition-colors group ${isScrolled ? 'text-text-primary' : 'text-white'}`}>
              <div className={`w-8 h-8 rounded-full border flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-black transition-all ${isScrolled ? 'border-border-subtle' : 'border-white/30'}`}>
                <User className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs uppercase tracking-wider hidden xl:block">Login</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`lg:hidden hover:text-primary transition-colors z-50 ${isScrolled ? 'text-text-primary' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </header>

      {/* Fullscreen Search Overlay */}
      <div
        className={`
          fixed inset-0 z-[60] bg-black/90 backdrop-blur-2xl
          flex flex-col items-center justify-center
          transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${searchOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
        `}
      >
        <button
          onClick={() => setSearchOpen(false)}
          className={`
            absolute top-8 right-8 p-2 rounded-full border border-white/10
            text-white/60 hover:text-white hover:bg-white/10 hover:border-white/30 
            transition-all duration-300 transform hover:rotate-90
          `}
        >
          <X className="w-8 h-8" />
        </button>

        <div className={`
          w-full max-w-4xl px-6 transition-all duration-700 delay-100 transform
          ${searchOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
        `}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const input = e.currentTarget.querySelector('input') as HTMLInputElement;
              if (input?.value) {
                window.postMessage({ type: 'LUMINE_WIDGET_SEARCH', query: input.value }, '*');
                input.value = '';
                setSearchOpen(false);
              }
            }}
            className="flex flex-col gap-6"
          >
            <label className="text-primary font-bold tracking-widest uppercase text-sm ml-1">
              What are you looking for?
            </label>
            <div className="relative group">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 text-white/40 group-focus-within:text-primary transition-colors duration-300" />
              <input
                type="text"
                placeholder="Type your query..."
                className="w-full bg-transparent border-b-2 border-white/10 py-4 pl-12 text-3xl md:text-5xl font-serif text-white placeholder-white/20 focus:outline-none focus:border-primary transition-all duration-300"
                autoFocus={true}
                ref={(input) => {
                  if (searchOpen && input) setTimeout(() => input.focus(), 100);
                }}
              />
            </div>
            <div className="flex gap-4 text-white/40 text-sm md:text-base">
              <span>Try:</span>
              <button type="button" onClick={() => { window.postMessage({ type: 'LUMINE_WIDGET_SEARCH', query: 'Best sushi in Dubai' }, '*'); setSearchOpen(false); }} className="hover:text-primary transition-colors border-b border-transparent hover:border-primary">Best sushi</button>
              <button type="button" onClick={() => { window.postMessage({ type: 'LUMINE_WIDGET_SEARCH', query: 'Desert Safari' }, '*'); setSearchOpen(false); }} className="hover:text-primary transition-colors border-b border-transparent hover:border-primary">Desert Safari</button>
              <button type="button" onClick={() => { window.postMessage({ type: 'LUMINE_WIDGET_SEARCH', query: 'Luxury hotels' }, '*'); setSearchOpen(false); }} className="hover:text-primary transition-colors border-b border-transparent hover:border-primary">Luxury hotels</button>
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Full Screen Menu */}
      <div
        className={`
          fixed inset-0 z-[60] bg-bg/95 backdrop-blur-xl
          transition-all duration-500 ease-in-out
          ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}
        `}
      >
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-8 right-8 text-text-muted hover:text-primary transition-colors"
        >
          <X className="w-10 h-10" />
        </button>

        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-serif text-4xl md:text-5xl text-text-primary font-bold hover:text-primary italic transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <div className="flex items-center gap-8 mt-12 border-t border-border-subtle pt-12">
            <button
              onClick={() => { setMobileMenuOpen(false); setSearchOpen(true); }}
              className="text-text-primary hover:text-primary transition-colors flex flex-col items-center gap-2"
            >
              <Search className="w-6 h-6" />
              <span className="text-xs font-bold uppercase tracking-widest">Search</span>
            </button>
            <div className={`hover:text-primary transition-colors flex flex-col items-center gap-2 ${isScrolled ? 'text-text-primary' : 'text-white'}`}>
              <ThemeToggle className={isScrolled ? 'text-text-primary' : 'text-white'} />
              <span className="text-xs font-bold uppercase tracking-widest">Theme</span>
            </div>
            <button className="text-text-primary hover:text-primary transition-colors flex flex-col items-center gap-2">
              <Globe className="w-6 h-6" />
              <span className="text-xs font-bold uppercase tracking-widest">Language</span>
            </button>
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-text-primary hover:text-primary transition-colors flex flex-col items-center gap-2">
              <User className="w-6 h-6" />
              <span className="text-xs font-bold uppercase tracking-widest">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};