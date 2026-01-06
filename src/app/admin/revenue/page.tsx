"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, CreditCard, Download, ArrowUpRight } from 'lucide-react';

const KPICard = ({ title, value, change, trend, delay }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="glass-card p-6 rounded-2xl border border-border-subtle"
    >
        <p className="text-xs uppercase tracking-widest text-text-muted mb-2">{title}</p>
        <div className="flex items-end justify-between">
            <h3 className="text-3xl font-light text-text-primary">{value}</h3>
            <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg ${trend === 'up' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span>{change}</span>
            </div>
        </div>
    </motion.div>
);

const TransactionRow = ({ id, user, type, amount, status, date }: any) => (
    <div className="flex items-center justify-between p-4 hover:bg-surface-50 transition-colors border-b border-border-subtle last:border-0 group">
        <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${status === 'Success' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                <CreditCard className="w-4 h-4" />
            </div>
            <div>
                <p className="text-sm font-medium text-text-primary">{user}</p>
                <p className="text-xs text-text-muted">{type} • {date}</p>
            </div>
        </div>
        <div className="text-right">
            <p className="text-sm font-mono text-text-primary">{amount}</p>
            <p className={`text-[10px] uppercase tracking-wide ${status === 'Success' ? 'text-green-500' : 'text-yellow-500'}`}>{status}</p>
        </div>
    </div>
);

export default function RevenuePage() {
    return (
        <div className="h-full flex flex-col gap-8">
            <header className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-light text-text-primary">Financial Overview</h2>
                    <p className="text-text-muted text-sm mt-1">Revenue streams, MRR, and transaction history.</p>
                </div>
                <button className="px-4 py-2 bg-surface-100 border border-border-subtle text-text-primary rounded-xl text-sm hover:bg-surface-200 transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" /> Export Report
                </button>
            </header>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard title="Total Revenue" value="$2.4M" change="+12.5%" trend="up" delay={0} />
                <KPICard title="Monthly Recurring" value="$482k" change="+8.2%" trend="up" delay={0.1} />
                <KPICard title="Avg. Revenue / User" value="$1,240" change="-2.1%" trend="down" delay={0.2} />
                <KPICard title="Pending Invoices" value="$42.5k" change="12 inv" trend="up" delay={0.3} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-0">
                {/* Main Chart Placeholder */}
                <div className="lg:col-span-2 glass-panel rounded-3xl border border-border-subtle p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-light text-text-primary">Revenue Growth</h3>
                        <div className="flex gap-2">
                            {['1M', '3M', '6M', 'YTD'].map(period => (
                                <button key={period} className="px-3 py-1 rounded-lg text-xs hover:bg-surface-100 text-text-muted hover:text-text-primary transition-colors">
                                    {period}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* CSS Bar Chart */}
                    <div className="flex-1 flex items-end justify-between gap-2 px-4 pb-4 border-b border-border-subtle relative">
                        {/* Grid Lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                            {[1, 2, 3, 4].map(i => <div key={i} className="w-full h-px bg-text-primary" />)}
                        </div>

                        {Array.from({ length: 12 }).map((_, i) => {
                            const height = 40 + Math.random() * 60;
                            return (
                                <div key={i} className="w-full bg-primary/20 hover:bg-primary transition-colors rounded-t-sm relative group" style={{ height: `${height}%` }}>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface border border-border-subtle text-text-primary text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-lg">
                                        ${(height * 2.4).toFixed(1)}k
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] text-text-muted uppercase tracking-widest px-2">
                        <span>Jan</span><span>Dec</span>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="glass-panel rounded-3xl border border-border-subtle flex flex-col overflow-hidden">
                    <div className="p-6 border-b border-border-subtle">
                        <h3 className="text-lg font-light text-text-primary">Recent Payouts</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <TransactionRow user="Alexander V." type="Membership - Noir" amount="+$20,000" status="Success" date="2m ago" />
                        <TransactionRow user="Sarah J." type="Flight Booking" amount="+$12,450" status="Success" date="15m ago" />
                        <TransactionRow user="Emma W." type="Fine Dining" amount="+$850" status="Pending" date="42m ago" />
                        <TransactionRow user="Michael R." type="Membership - Gold" amount="+$5,000" status="Success" date="1h ago" />
                        <TransactionRow user="David L." type="Transport" amount="+$250" status="Failed" date="3h ago" />
                        <TransactionRow user="James B." type="Experience" amount="+$1,200" status="Success" date="5h ago" />
                    </div>
                </div>
            </div>
        </div>
    );
}
