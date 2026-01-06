"use client";

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { DashboardHeader } from './DashboardHeader';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <div className="h-screen bg-bg flex overflow-hidden">
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />

            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 h-full">
                <DashboardHeader />
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-8 relative scrollbar-hide">
                    {/* Ambient Glow for Content Area */}
                    <div className="absolute top-0 left-0 w-full h-[500px] bg-primary/5 dark:bg-primary/[0.03] blur-[120px] pointer-events-none -z-10" />
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 dark:bg-transparent blur-[100px] pointer-events-none -z-10" />
                    {children}
                </main>
            </div>
        </div>
    );
};
