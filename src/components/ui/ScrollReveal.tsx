"use client";

import React, { useRef, useEffect, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  delay?: number; // Delay in ms
  style?: React.CSSProperties;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  threshold = 0.1,
  delay = 0,
  style
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${isVisible
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-16'
        } ${className}`}
      style={{ ...style, transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};