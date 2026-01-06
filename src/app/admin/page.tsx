"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    CreditCard,
    Activity,
    TrendingUp,
    ArrowUpRight,
    Globe,
    Server,
    Shield
} from 'lucide-react';
import { UserTable } from '@/components/admin/widgets/UserTable';
import { RecentRequests } from '@/components/admin/widgets/RecentRequests';
import { RevenueChart } from '@/components/admin/widgets/RevenueChart';

const StatCard = ({ title, value, change, icon: Icon, delay }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="glass-card p-6 rounded-2xl border border-border-subtle relative overflow-hidden group"
    >
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Icon className="w-16 h-16 text-text-primary" />
        </div>
        <div className="relative z-10">
            <p className="text-xs uppercase tracking-widest text-text-muted mb-2">{title}</p>
            <h3 className="text-3xl font-light text-text-primary mb-1">{value}</h3>
            <div className="flex items-center gap-1 text-xs text-success">
                <TrendingUp className="w-3 h-3" />
                <span>{change}</span>
            </div>
        </div>
    </motion.div>
);

export default function AdminPage() {
    return (
        <div className="space-y-8">
            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Members"
                    value="2,845"
                    change="+12% this month"
                    icon={Users}
                    delay={0}
                />
                <StatCard
                    title="Active Concierge"
                    value="142"
                    change="+8% vs last week"
                    icon={Activity}
                    delay={0.1}
                />
                <StatCard
                    title="Monthly Revenue"
                    value="$482k"
                    change="+24% YoY"
                    icon={CreditCard}
                    delay={0.2}
                />
                <StatCard
                    title="System Health"
                    value="99.9%"
                    change="All systems operational"
                    icon={Server}
                    delay={0.3}
                />
            </div>

            {/* Main Bento Grid Layout */}
            <div className="grid grid-cols-12 gap-8 h-[700px]">

                {/* Left Column: Member Activity (Wide) */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="col-span-12 lg:col-span-8 flex flex-col gap-8"
                >
                    {/* Revenue/Growth Panel */}
                    <div className="h-[300px] glass-panel rounded-3xl border border-border-subtle overflow-hidden p-6 flex gap-8">
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-light text-text-primary">Revenue Intelligence</h3>
                                <button className="text-xs text-primary hover:text-text-primary transition-colors flex items-center gap-1">
                                    View Report <ArrowUpRight className="w-3 h-3" />
                                </button>
                            </div>
                            <RevenueChart />
                        </div>

                        <div className="w-64 border-l border-border-subtle pl-8 flex flex-col justify-center space-y-6">
                            <div>
                                <p className="text-xs uppercase tracking-widest text-text-muted mb-1">New Signups</p>
                                <p className="text-2xl text-text-primary font-light">+128</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-text-muted mb-1">Churn Rate</p>
                                <p className="text-2xl text-text-primary font-light">1.2%</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-text-muted mb-1">Avg. LTV</p>
                                <p className="text-2xl text-text-primary font-light">$12.4k</p>
                            </div>
                        </div>
                    </div>

                    {/* Recent Members Table */}
                    <div className="flex-1 glass-card rounded-3xl border border-border-subtle overflow-hidden flex flex-col">
                        <div className="px-6 py-4 border-b border-border-subtle flex justify-between items-center">
                            <h3 className="text-sm font-medium text-text-primary">Latest Registrations</h3>
                            <button className="text-xs text-text-muted hover:text-text-primary transition-colors">View All</button>
                        </div>
                        <UserTable />
                    </div>
                </motion.div>

                {/* Right Column: Key Stats & Feed */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 h-full">

                    {/* Global Map / System Status Placeholder */}
                    <div className="h-[200px] glass-card rounded-3xl border border-border-subtle relative overflow-hidden p-6 flex flex-col justify-between group">
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <p className="text-xs uppercase tracking-widest text-text-muted">Live Operations</p>
                                <h4 className="text-lg text-text-primary mt-1">Global Network</h4>
                            </div>
                            <Globe className="w-5 h-5 text-primary" />
                        </div>

                        <div className="flex items-center gap-2 relative z-10">
                            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                            <span className="text-xs text-success">System Online (14ms latency)</span>
                        </div>
                    </div>

                    {/* Concierge Feed */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex-1 glass-panel rounded-3xl border border-border-subtle overflow-hidden flex flex-col"
                    >
                        <div className="px-6 py-4 border-b border-border-subtle">
                            <h3 className="text-sm font-medium text-text-primary">Live Requests</h3>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <RecentRequests />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
