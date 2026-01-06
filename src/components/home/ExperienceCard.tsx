"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { ExperienceCard as IExperienceCard } from '@/types';

interface ExperienceCardProps {
  data: IExperienceCard;
  index: number;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ data }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative h-[500px] w-full cursor-pointer flex flex-col justify-end p-8 glass-card rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      style={{ WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          opacity,
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.08), transparent 40%)`
        }}
      />

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 opacity-80 group-hover:opacity-60"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradient Overlay for Text Readability - Lighter to show glass effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500" />
      </div>

      {/* Floating Category Tag (Subtitle) */}
      <div className="absolute top-6 right-6 z-20">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-sm">
          {data.subtitle}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-4 transform transition-all duration-500 translate-y-2 group-hover:translate-y-0">

        <div>
          <h3 className="font-serif text-3xl text-white mb-2 group-hover:text-primary transition-colors duration-300 leading-tight">
            {data.title}
          </h3>
          <p className="text-white/60 text-sm font-light leading-relaxed line-clamp-2 md:line-clamp-3 group-hover:text-white/80 transition-colors duration-300">
            {data.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <div className="flex gap-2">
            {data.tags.slice(0, 2).map((tag, i) => (
              <span key={i} className="text-[10px] uppercase tracking-wider text-white/50 border border-white/10 px-2 py-0.5 rounded-full">
                {tag.label}
              </span>
            ))}
          </div>
          <span className="flex items-center gap-2 text-xs font-medium text-white group-hover:text-primary transition-colors">
            {data.ctaText} <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  );
};