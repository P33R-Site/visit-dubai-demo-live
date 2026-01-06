"use client";

import React from 'react';

interface LogoProps {
    className?: string;
    variant?: 'full' | 'icon';
}

export const Logo: React.FC<LogoProps> = ({ className = "text-2xl", variant = 'full' }) => {
    return (
        <span className={`font-serif text-primary tracking-widest ${className}`}>
            {variant === 'full' ? 'LUMINA' : 'L'}
        </span>
    );
};
