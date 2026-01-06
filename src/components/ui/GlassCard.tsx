import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hoverEffect = false
}) => {
  return (
    <div
      className={`
        relative overflow-hidden rounded-xl
        bg-surface/40 backdrop-blur-2xl
        border border-white/[0.06]
        transition-all duration-700 ease-out
        group
        ${hoverEffect ? 'hover:border-primary/30 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]' : ''}
        ${className}
      `}
    >
      {/* Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />

      {/* Subtle sheen on hover */}
      <div className={`
        absolute inset-0 bg-gradient-to-tr from-white/[0.03] to-transparent
        opacity-0 transition-opacity duration-700
        ${hoverEffect ? 'group-hover:opacity-100' : ''}
      `} />

      {children}
    </div>
  );
};