"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Coffee, Car, Clock, CheckCircle2, MoreHorizontal, MapPin } from 'lucide-react';

const initialRequests = [
    { id: 1, type: 'Flight', title: 'LHR to DXB - First Class', user: 'Alexander V.', status: 'Pending', time: '10m ago', icon: Plane },
    { id: 2, type: 'Dining', title: 'Nobu Downtown (4 Pax)', user: 'Emma W.', status: 'Processing', time: '45m ago', icon: Coffee },
    { id: 3, type: 'Transport', title: 'S-Class Airport Transfer', user: 'Sarah J.', status: 'Completed', time: '2h ago', icon: Car },
    { id: 4, type: 'Hotel', title: 'Burj Al Arab - Royal Suite', user: 'Michael R.', status: 'Pending', time: '5m ago', icon: MapPin },
    { id: 5, type: 'Experience', title: 'Desert Safari Private', user: 'David L.', status: 'Processing', time: '1h ago', icon: MapPin },
];

const KanbanColumn = ({ title, status, items, onMove }: any) => (
    <div className="flex-1 min-w-[300px] flex flex-col gap-4">
        <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-medium text-text-muted uppercase tracking-widest">{title}</h3>
            <span className="text-xs bg-surface-100 text-text-muted px-2 py-0.5 rounded-full">{items.length}</span>
        </div>

        <div className="flex-1 rounded-2xl bg-surface-50 backdrop-blur-sm border border-border-subtle p-3 space-y-3 overflow-y-auto">
            <AnimatePresence>
                {items.map((item: any) => (
                    <motion.div
                        layoutId={item.id}
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="glass-card p-4 rounded-xl border border-border-subtle hover:border-primary/20 transition-colors group cursor-move shadow-sm relative overflow-hidden"
                    >
                        {/* Status Indicator Stripe */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${status === 'Pending' ? 'bg-blue-500' :
                            status === 'Processing' ? 'bg-yellow-500' : 'bg-green-500'
                            }`} />

                        <div className="flex justify-between items-start mb-3 pl-2">
                            <div className="flex items-center gap-2 text-xs text-text-muted">
                                <item.icon className="w-3 h-3" />
                                <span>{item.type}</span>
                            </div>
                            <button className="text-text-muted hover:text-text-primary transition-colors">
                                <MoreHorizontal className="w-4 h-4" />
                            </button>
                        </div>

                        <h4 className="text-sm text-text-primary font-medium mb-1 pl-2">{item.title}</h4>
                        <p className="text-xs text-text-secondary pl-2 mb-4">Req by <span className="text-text-primary/60">{item.user}</span></p>

                        <div className="flex items-center justify-between pl-2">
                            <div className="flex items-center gap-1.5 text-[10px] text-text-muted uppercase tracking-wide">
                                <Clock className="w-3 h-3" />
                                {item.time}
                            </div>

                            {/* Mock Move Actions */}
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                {status !== 'Pending' && (
                                    <button onClick={() => onMove(item.id, 'prev')} className="p-1.5 rounded-md bg-surface-100 hover:bg-surface-200 text-text-secondary">
                                        ←
                                    </button>
                                )}
                                {status !== 'Completed' && (
                                    <button onClick={() => onMove(item.id, 'next')} className="p-1.5 rounded-md bg-surface-100 hover:bg-surface-200 text-text-secondary">
                                        →
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {items.length === 0 && (
                <div className="h-24 flex items-center justify-center border border-dashed border-border-subtle rounded-xl">
                    <p className="text-xs text-text-muted">No requests</p>
                </div>
            )}
        </div>
    </div>
);

export default function ConciergePage() {
    const [requests, setRequests] = useState(initialRequests);

    const moveRequest = (id: number, direction: 'next' | 'prev') => {
        setRequests(prev => prev.map(req => {
            if (req.id !== id) return req;

            if (direction === 'next') {
                return { ...req, status: req.status === 'Pending' ? 'Processing' : 'Completed' };
            } else {
                return { ...req, status: req.status === 'Completed' ? 'Processing' : 'Pending' };
            }
        }));
    };

    return (
        <div className="h-full flex flex-col gap-6">
            <header className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-light text-text-primary">Concierge Board</h2>
                    <p className="text-text-muted text-sm mt-1">Real-time request fulfillment pipeline.</p>
                </div>
                <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border border-bg bg-surface-100 flex items-center justify-center text-[10px] text-text-primary">
                            A{i}
                        </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border border-bg bg-surface-50 flex items-center justify-center text-[10px] text-text-muted">+2</div>
                </div>
            </header>

            <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
                <KanbanColumn
                    title="New Requests"
                    status="Pending"
                    items={requests.filter(r => r.status === 'Pending')}
                    onMove={moveRequest}
                />
                <KanbanColumn
                    title="In Processing"
                    status="Processing"
                    items={requests.filter(r => r.status === 'Processing')}
                    onMove={moveRequest}
                />
                <KanbanColumn
                    title="Fulfilled"
                    status="Completed"
                    items={requests.filter(r => r.status === 'Completed')}
                    onMove={moveRequest}
                />
            </div>
        </div>
    );
}
