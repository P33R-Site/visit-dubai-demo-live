import React from 'react';
import { CreditCard, ShieldCheck, Plane, Hotel, Car, Utensils, ShoppingBag, Map } from 'lucide-react';

import { DashboardState } from '../val8/Dashboard';

export const CheckoutWidget: React.FC<{ onCheckout?: () => void, data?: DashboardState }> = ({ onCheckout, data }) => {
    const [status, setStatus] = React.useState<'Reserving' | 'Confirmed'>('Reserving');

    if (!data) return null;

    return (
        <div className="h-full p-4 flex flex-col relative overflow-hidden text-text-primary dark:text-white">
            {/* Header */}
            <div className="flex justify-between items-start mb-2 border-b border-border-subtle dark:border-white/10 pb-2">
                <div>
                    <h3 className="text-lg font-serif mb-0.5 text-text-primary dark:text-white">Trip Manifest</h3>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-text-muted dark:text-white/60">
                        <span>{data.flight.date}</span>
                        <span className="w-1 h-1 rounded-full bg-text-muted/20 dark:bg-white/20" />
                        <span>{data.stay.guests} Travelers</span>
                    </div>
                </div>
                <div
                    className={`px-3 py-1 rounded-full border cursor-pointer select-none transition-all ${status === 'Reserving'
                        ? 'bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                        : 'bg-blue-500/10 dark:bg-blue-500/20 border-blue-500/20 text-blue-600 dark:text-blue-400'
                        }`}
                    onClick={(e) => {
                        e.stopPropagation();
                        setStatus(status === 'Reserving' ? 'Confirmed' : 'Reserving');
                    }}
                >
                    <span className="text-[10px] uppercase tracking-widest font-bold">{status}</span>
                </div>
            </div>

            {/* Line Items */}
            <div className="flex-1 space-y-2 pr-2">
                {/* Flight */}
                {/* Flight */}
                <div className="flex justify-between items-start">
                    <div className="flex gap-3 w-full">
                        <div className="mt-1 p-1.5 bg-surface-alt dark:bg-white/5 rounded-lg border border-border-subtle dark:border-white/5 shrink-0">
                            <Plane className="w-3 h-3 text-text-muted dark:text-white/60" />
                        </div>
                        <div className="w-full">
                            <p className="w-full bg-transparent border-none p-0 text-sm font-medium text-text-primary dark:text-white focus:ring-0 focus:outline-none">
                                {data.flight.carrier} {data.flight.class}
                            </p>
                            <p className="w-full bg-transparent border-none p-0 text-[10px] text-text-muted dark:text-white/40 uppercase tracking-wider focus:ring-0 focus:outline-none">
                                Round Trip • {data.flight.origin} - {data.flight.destination}
                            </p>
                        </div>
                    </div>
                    <p className="w-16 text-right bg-transparent border-none p-0 text-sm font-light text-text-secondary dark:text-white/80 focus:ring-0 focus:outline-none">
                        {data.flight.price}
                    </p>
                </div>

                {/* Hotel */}
                <div className="flex justify-between items-start">
                    <div className="flex gap-3 w-full">
                        <div className="mt-1 p-1.5 bg-surface-alt dark:bg-white/5 rounded-lg border border-border-subtle dark:border-white/5 shrink-0">
                            <Hotel className="w-3 h-3 text-text-muted dark:text-white/60" />
                        </div>
                        <div className="w-full">
                            <p className="w-full bg-transparent border-none p-0 text-sm font-medium text-text-primary dark:text-white focus:ring-0 focus:outline-none">
                                {data.stay.hotelName}
                            </p>
                            <p className="w-full bg-transparent border-none p-0 text-[10px] text-text-muted dark:text-white/40 uppercase tracking-wider focus:ring-0 focus:outline-none">
                                4 Nights • {data.stay.roomType}
                            </p>
                        </div>
                    </div>
                    <p className="w-16 text-right bg-transparent border-none p-0 text-sm font-light text-text-secondary dark:text-white/80 focus:ring-0 focus:outline-none">
                        {data.stay.price}
                    </p>
                </div>

                {/* Dining */}
                <div className="flex justify-between items-start">
                    <div className="flex gap-3 w-full">
                        <div className="mt-1 p-1.5 bg-surface-alt dark:bg-white/5 rounded-lg border border-border-subtle dark:border-white/5 shrink-0">
                            <Utensils className="w-3 h-3 text-text-muted dark:text-white/60" />
                        </div>
                        <div className="w-full">
                            <p className="w-full bg-transparent border-none p-0 text-sm font-medium text-text-primary dark:text-white focus:ring-0 focus:outline-none">
                                Ossiano Experience
                            </p>
                            <p className="w-full bg-transparent border-none p-0 text-[10px] text-text-muted dark:text-white/40 uppercase tracking-wider focus:ring-0 focus:outline-none">
                                Underwater Dining • Friday
                            </p>
                        </div>
                    </div>
                    <p className="w-16 text-right bg-transparent border-none p-0 text-sm font-light text-text-secondary dark:text-white/80 focus:ring-0 focus:outline-none">
                        $450
                    </p>
                </div>

                {/* Included */}
                <div className="flex justify-between items-start opacity-60">
                    <div className="flex gap-3">
                        <div className="mt-1 p-1.5 bg-surface-alt dark:bg-white/5 rounded-lg border border-border-subtle dark:border-white/5">
                            <Car className="w-3 h-3 text-text-muted dark:text-white/60" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-text-primary dark:text-white">Chauffeur Service • {data.ride.serviceLevel}</p>
                            <p className="text-[10px] text-text-muted dark:text-white/40 uppercase tracking-wider">Complimentary</p>
                        </div>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mt-1">Included</span>
                </div>
            </div>

            {/* Total & Action */}
            <div className="mt-2 pt-2 border-t border-border-subtle dark:border-white/10">
                <div className="flex justify-between items-end mb-2">
                    <div className="flex flex-col">
                        <span className="text-text-muted dark:text-white/40 text-[10px] uppercase tracking-widest mb-0.5">Total Due</span>
                        <p className="bg-transparent border-none p-0 text-xl font-serif text-text-primary dark:text-white -ml-0.5 focus:ring-0 focus:outline-none">
                            $12,450
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="text-[10px] text-text-muted dark:text-white/40 uppercase tracking-widest block mb-0.5">Taxes Included</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 mb-3 bg-surface-alt/50 dark:bg-white/5 p-2 rounded-lg border border-border-subtle dark:border-white/5" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" id="visa-add" className="w-3 h-3 accent-primary rounded border-border-subtle dark:border-white/20" />
                    <label htmlFor="visa-add" className="text-[10px] text-text-secondary dark:text-white/80 cursor-pointer select-none">
                        Add this to your Visa card?
                    </label>
                </div>

                <button
                    onClick={onCheckout}
                    className="w-full group relative overflow-hidden rounded-xl bg-primary text-surface font-bold py-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
                    <div className="flex items-center justify-center gap-2">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="tracking-wide">Confirm Reservation</span>
                    </div>
                </button>
            </div>
        </div>
    );
};
