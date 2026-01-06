import React from 'react';

interface BentoGridProps {
    children: React.ReactNode;
    className?: string;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ children, className = '' }) => {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[180px] ${className}`}>
            {children}
        </div>
    );
};

interface BentoItemProps {
    children: React.ReactNode;
    className?: string;
    colSpan?: number;
    rowSpan?: number;
}

export const BentoItem: React.FC<BentoItemProps> = ({
    children,
    className = '',
    colSpan = 1,
    rowSpan = 1
}) => {
    return (
        <div
            className={`
        glass-atlas rounded-3xl overflow-hidden relative group
        hover:border-primary/30 transition-all duration-500
        ${colSpan > 1 ? `md:col-span-${colSpan}` : ''}
        ${rowSpan > 1 ? `row-span-${rowSpan}` : ''}
        ${className}
      `}
        >
            {children}
        </div>
    );
};
