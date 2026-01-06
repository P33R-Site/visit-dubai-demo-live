"use client";

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const RevenueChart = () => {
    return (
        <div className="p-6 h-full flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
                <p className="text-xs uppercase tracking-widest text-text-muted mb-1">Monthly Recurring</p>
                <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-light text-text-primary">$1.24M</h3>
                    <span className="text-xs text-success flex items-center gap-1">
                        +12.4% <ArrowUpRight className="w-3 h-3" />
                    </span>
                </div>
            </div>

            {/* Mock Chart Visualization */}
            <div className="h-32 flex items-end gap-1 mt-4 opacity-50 relative z-10">
                {[40, 65, 45, 70, 55, 80, 60, 90, 75, 85, 95, 100].map((h, i) => (
                    <div
                        key={i}
                        className="flex-1 bg-text-primary hover:bg-primary transition-colors rounded-t-sm"
                        style={{ height: `${h}%`, opacity: 0.1 + (i * 0.05) }}
                    />
                ))}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
        </div>
    );
};
