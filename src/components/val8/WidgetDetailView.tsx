import React, { useState } from 'react';
import { X, Save, Sliders, Calendar, MapPin, Users, Plane, Car, CreditCard, Cloud, Clock, CheckSquare, Images } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

import { DashboardState } from './Dashboard';
import { ImageSlideshow } from './ImageSlideshow';
import { SLIDESHOW_IMAGES } from '@/data/slideshowImages';

interface WidgetDetailViewProps {
    type: 'flight' | 'stay' | 'ride' | 'calendar' | 'dining' | 'shopping' | 'experience' | 'checkout' | 'weather' | 'location' | 'timezone' | 'scheduling' | null;
    data: DashboardState;
    onSave: (data: Partial<DashboardState>) => void;
    onClose: () => void;
}

export const WidgetDetailView: React.FC<WidgetDetailViewProps> = ({ type, data, onSave, onClose }) => {
    const [localData, setLocalData] = useState<Partial<DashboardState>>({});
    const [slideshowImages, setSlideshowImages] = useState<string[] | null>(null);
    const [slideshowTitle, setSlideshowTitle] = useState<string>('');

    const openSlideshow = (images: string[], title: string) => {
        setSlideshowImages(images);
        setSlideshowTitle(title);
    };

    const closeSlideshow = () => {
        setSlideshowImages(null);
    };

    if (!type) return null;

    const handleLocalChange = (section: keyof DashboardState, field: string, value: any) => {
        setLocalData(prev => ({
            ...prev,
            [section]: {
                ...data[section],
                ...(prev[section] as any),
                [field]: value
            }
        }));
    };

    const handleSaveClick = () => {
        onSave(localData);
        onClose();
    };

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            {/* Slideshow Overlay */}
            <AnimatePresence>
                {slideshowImages && (
                    <ImageSlideshow
                        images={slideshowImages}
                        title={slideshowTitle}
                        onClose={closeSlideshow}
                    />
                )}
            </AnimatePresence>

            <div className="w-full max-w-md bg-surface dark:bg-[#121212] border border-border-subtle dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-5 border-b border-border-subtle dark:border-white/5 flex justify-between items-center bg-surface-alt/50 dark:bg-white/5">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                            {type === 'flight' && <Plane className="w-4 h-4" />}
                            {type === 'stay' && <MapPin className="w-4 h-4" />}
                            {type === 'ride' && <Car className="w-4 h-4" />}
                            {type === 'calendar' && <Calendar className="w-4 h-4" />}
                            {(type === 'dining' || type === 'shopping' || type === 'experience') && <Sliders className="w-4 h-4" />}
                            {type === 'checkout' && <CreditCard className="w-4 h-4" />}
                            {type === 'weather' && <Cloud className="w-4 h-4" />}
                            {type === 'location' && <MapPin className="w-4 h-4" />}
                            {type === 'timezone' && <Clock className="w-4 h-4" />}
                            {type === 'scheduling' && <CheckSquare className="w-4 h-4" />}
                        </div>
                        <h2 className="text-lg font-serif text-text-primary dark:text-white capitalize">{type} Configuration</h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-surface-alt dark:hover:bg-white/10 rounded-full transition-colors text-text-muted dark:text-white/60 hover:text-text-primary dark:hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto space-y-6">
                    {type === 'flight' && <FlightConfig data={{ ...data.flight, ...(localData.flight || {}) }} onChange={(f, v) => handleLocalChange('flight', f, v)} onViewMore={() => openSlideshow(SLIDESHOW_IMAGES.flights, 'Flight Gallery')} />}
                    {type === 'stay' && <StayConfig data={{ ...data.stay, ...(localData.stay || {}) }} onChange={(f, v) => handleLocalChange('stay', f, v)} onViewMore={() => openSlideshow(SLIDESHOW_IMAGES.lodging, 'Lodging Gallery')} />}
                    {type === 'ride' && <RideConfig data={{ ...data.ride, ...(localData.ride || {}) }} onChange={(f, v) => handleLocalChange('ride', f, v)} onViewMore={() => openSlideshow(SLIDESHOW_IMAGES.rides, 'Ride Gallery')} />}
                    {type === 'calendar' && <CalendarConfig />}
                    {type === 'checkout' && <CheckoutConfig />}
                    {type === 'weather' && <WeatherConfig />}
                    {type === 'location' && <LocationConfig onViewMore={() => openSlideshow(SLIDESHOW_IMAGES.destinations, 'Destination Gallery')} />}
                    {type === 'timezone' && <TimezoneConfig />}
                    {type === 'scheduling' && <SchedulingConfig />}
                    {type === 'dining' && <ActivityConfig title="Ossiano" category="Dining" onViewMore={() => openSlideshow(SLIDESHOW_IMAGES.dining, 'Dining Gallery')} />}
                    {type === 'shopping' && <ActivityConfig title="SunSport SPF 50" category="Shopping" onViewMore={() => openSlideshow(SLIDESHOW_IMAGES.shopping, 'Shopping Gallery')} />}
                    {type === 'experience' && <ActivityConfig title="Private Desert Safari" category="Experiences" onViewMore={() => openSlideshow(SLIDESHOW_IMAGES.experiences, 'Experience Gallery')} />}
                </div>

                {/* Footer */}
                <div className="p-5 border-t border-border-subtle dark:border-white/5 bg-surface-alt/50 dark:bg-white/5 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 rounded-xl text-sm font-medium text-text-secondary dark:text-white/60 hover:bg-surface-alt dark:hover:bg-white/10 transition-colors">
                        Cancel
                    </button>
                    <button onClick={handleSaveClick} className="px-4 py-2 rounded-xl text-sm font-medium bg-primary text-surface dark:text-black hover:brightness-110 transition-colors flex items-center gap-2 shadow-lg shadow-primary/20">
                        <Save className="w-4 h-4" />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

// Sub-components for specific configs
const FlightConfig = ({ data, onChange, onViewMore }: { data: DashboardState['flight'], onChange: (field: string, value: any) => void, onViewMore?: () => void }) => (
    <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-text-muted dark:text-white/40 font-bold">Origin</label>
                <input type="text" value={data.origin} onChange={(e) => onChange('origin', e.target.value)} className="w-full bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/10 rounded-xl px-4 py-3 text-text-primary dark:text-white focus:ring-1 focus:ring-primary focus:outline-none" />
            </div>
            <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-text-muted dark:text-white/40 font-bold">Destination</label>
                <input type="text" value={data.destination} onChange={(e) => onChange('destination', e.target.value)} className="w-full bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/10 rounded-xl px-4 py-3 text-text-primary dark:text-white focus:ring-1 focus:ring-primary focus:outline-none" />
            </div>
        </div>
        <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-text-muted dark:text-white/40 font-bold">Carrier</label>
            <input type="text" value={data.carrier} onChange={(e) => onChange('carrier', e.target.value)} className="w-full bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/10 rounded-xl px-4 py-3 text-text-primary dark:text-white focus:ring-1 focus:ring-primary focus:outline-none" />
        </div>
        <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-text-muted dark:text-white/40 font-bold">Class</label>
            <select value={data.class} onChange={(e) => onChange('class', e.target.value)} className="w-full bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/10 rounded-xl px-4 py-3 text-text-primary dark:text-white focus:ring-1 focus:ring-primary focus:outline-none appearance-none">
                <option>Economy</option>
                <option>Business</option>
                <option>First Class</option>
            </select>
        </div>
        {onViewMore && (
            <button onClick={onViewMore} className="w-full py-2.5 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors flex items-center justify-center gap-2">
                <Images className="w-4 h-4" /> View More Photos
            </button>
        )}
    </div>
);

const StayConfig = ({ data, onChange, onViewMore }: { data: DashboardState['stay'], onChange: (field: string, value: any) => void, onViewMore?: () => void }) => (
    <div className="space-y-4">
        <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-text-muted dark:text-white/40 font-bold">Hotel Name</label>
            <input type="text" value={data.hotelName} onChange={(e) => onChange('hotelName', e.target.value)} className="w-full bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/10 rounded-xl px-4 py-3 text-text-primary dark:text-white focus:ring-1 focus:ring-primary focus:outline-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-text-muted dark:text-white/40 font-bold">Guests</label>
                <div className="flex items-center gap-3 bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/10 rounded-xl px-4 py-3">
                    <Users className="w-4 h-4 text-text-muted dark:text-white/40" />
                    <input type="number" value={data.guests} onChange={(e) => onChange('guests', parseInt(e.target.value))} className="bg-transparent w-full text-text-primary dark:text-white focus:outline-none" />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-text-muted dark:text-white/40 font-bold">Room Type</label>
                <select value={data.roomType} onChange={(e) => onChange('roomType', e.target.value)} className="w-full bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/10 rounded-xl px-4 py-3 text-text-primary dark:text-white focus:ring-1 focus:ring-primary focus:outline-none appearance-none">
                    <option>Standard</option>
                    <option>Suite</option>
                    <option>Penthouse Suite</option>
                    <option>King Suite Beach View</option>
                    <option>Queen Double City View</option>
                </select>
            </div>
        </div>
        <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-text-muted dark:text-white/40 font-bold">Special Requests</label>
            <textarea className="w-full bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/10 rounded-xl px-4 py-3 text-text-primary dark:text-white focus:ring-1 focus:ring-primary focus:outline-none h-24 resize-none" placeholder="Early check-in, dietary restrictions..." defaultValue="2pm late checkout"></textarea>
        </div>
        {onViewMore && (
            <button onClick={onViewMore} className="w-full py-2.5 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors flex items-center justify-center gap-2">
                <Images className="w-4 h-4" /> View More Photos
            </button>
        )}
    </div>
);

const RideConfig = ({ data, onChange, onViewMore }: { data: DashboardState['ride'], onChange: (field: string, value: any) => void, onViewMore?: () => void }) => (
    <div className="space-y-4">
        <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-text-muted dark:text-white/40 font-bold">Pickup Location</label>
            <div className="flex items-center gap-3 bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/10 rounded-xl px-4 py-3">
                <MapPin className="w-4 h-4 text-text-muted dark:text-white/40" />
                <input type="text" value={data.pickup} onChange={(e) => onChange('pickup', e.target.value)} className="bg-transparent w-full text-text-primary dark:text-white focus:outline-none" />
            </div>
        </div>
        <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-text-muted dark:text-white/40 font-bold">Service Level</label>
            <div className="grid grid-cols-3 gap-2">
                {['Ride', 'Premium', 'Luxury'].map(level => (
                    <div key={level} onClick={() => onChange('serviceLevel', level)} className={`text-center py-2 rounded-lg border text-sm cursor-pointer ${data.serviceLevel === level ? 'bg-primary/20 border-primary text-primary' : 'bg-surface-alt dark:bg-white/5 border-border-subtle dark:border-white/5 text-text-muted dark:text-white/60 hover:bg-surface-alt/80 dark:hover:bg-white/10'}`}>
                        {level}
                    </div>
                ))}
            </div>
        </div>
        {onViewMore && (
            <button onClick={onViewMore} className="w-full py-2.5 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors flex items-center justify-center gap-2">
                <Images className="w-4 h-4" /> View More Photos
            </button>
        )}
    </div>
);

const CalendarConfig = () => (
    <div className="space-y-4">
        <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-text-muted dark:text-white/40 font-bold">Trip Dates</label>
            <div className="grid grid-cols-2 gap-4">
                <input type="date" className="bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/10 rounded-xl px-4 py-3 text-text-primary dark:text-white focus:ring-1 focus:ring-primary focus:outline-none" />
                <input type="date" className="bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/10 rounded-xl px-4 py-3 text-text-primary dark:text-white focus:ring-1 focus:ring-primary focus:outline-none" />
            </div>
        </div>
        <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-text-muted dark:text-white/40 font-bold">Sync Calendars</label>
            <div className="flex gap-2">
                {['Google', 'Outlook', 'Apple'].map(cal => (
                    <div key={cal} className="px-3 py-1.5 rounded-full bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/10 text-xs text-text-secondary dark:text-white/60 hover:text-text-primary dark:hover:text-white cursor-pointer hover:bg-surface-alt/80 dark:hover:bg-white/10 transition-colors">
                        {cal}
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const CheckoutConfig = () => (
    <div className="space-y-4">
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CreditCard className="w-5 h-5" />
            </div>
            <div>
                <p className="text-text-primary dark:text-white font-medium">Visa ending in 4242</p>
                <p className="text-text-muted dark:text-white/40 text-xs">Primary payment method</p>
            </div>
        </div>
        <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-text-muted dark:text-white/40 font-bold">Items</label>
            <div className="space-y-2">
                {['Flight', 'Hotel', 'Dining'].map(item => (
                    <div key={item} className="flex items-center justify-between p-3 rounded-lg bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/5">
                        <span className="text-text-secondary dark:text-white/80">{item}</span>
                        <input type="checkbox" defaultChecked className="accent-primary w-4 h-4" />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const WeatherConfig = () => (
    <div className="space-y-4">
        <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-text-muted dark:text-white/40 font-bold">Units</label>
            <div className="flex gap-2 p-1 bg-surface-alt dark:bg-white/5 rounded-xl border border-border-subtle dark:border-white/10 w-fit">
                <div className="px-4 py-1.5 rounded-lg bg-surface dark:bg-white/10 shadow-sm text-text-primary dark:text-white text-sm font-medium">Fahrenheit</div>
                <div className="px-4 py-1.5 rounded-lg text-text-muted dark:text-white/40 text-sm font-medium cursor-pointer hover:text-text-primary dark:hover:text-white">Celsius</div>
            </div>
        </div>
        <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-text-muted dark:text-white/40 font-bold">Alerts</label>
            <div className="flex items-center justify-between p-3 rounded-lg bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/5">
                <span className="text-text-secondary dark:text-white/80">Severe Weather Notifications</span>
                <input type="checkbox" defaultChecked className="accent-primary w-4 h-4" />
            </div>
        </div>
    </div>
);

const LocationConfig = ({ onViewMore }: { onViewMore?: () => void }) => (
    <div className="space-y-4">
        <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-text-muted dark:text-white/40 font-bold">Current Location</label>
            <div className="flex items-center gap-2">
                <input type="text" defaultValue="Miami, Florida" className="w-full bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/10 rounded-xl px-4 py-3 text-text-primary dark:text-white focus:ring-1 focus:ring-primary focus:outline-none" />
            </div>
        </div>
        <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-text-muted dark:text-white/40 font-bold">Preferences</label>
            <div className="grid grid-cols-2 gap-2">
                {['Museums', 'Beaches', 'Nightlife', 'Dining'].map(pref => (
                    <div key={pref} className="flex items-center gap-2 p-2 rounded-lg bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/5">
                        <input type="checkbox" defaultChecked className="accent-primary w-3 h-3" />
                        <span className="text-sm text-text-secondary dark:text-white/80">{pref}</span>
                    </div>
                ))}
            </div>
        </div>
        {onViewMore && (
            <button onClick={onViewMore} className="w-full py-2.5 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors flex items-center justify-center gap-2">
                <Images className="w-4 h-4" /> View Destination Gallery
            </button>
        )}
    </div>
);

const TimezoneConfig = () => (
    <div className="space-y-4">
        <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-text-muted dark:text-white/40 font-bold">Primary Timezone</label>
            <select className="w-full bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/10 rounded-xl px-4 py-3 text-text-primary dark:text-white focus:ring-1 focus:ring-primary focus:outline-none appearance-none">
                <option>Eastern Time (US & Canada)</option>
                <option>Pacific Time (US & Canada)</option>
                <option>Greenwich Mean Time</option>
            </select>
        </div>
        <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-text-muted dark:text-white/40 font-bold">Secondary Timezone</label>
            <select defaultValue="Tokyo" className="w-full bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/10 rounded-xl px-4 py-3 text-text-primary dark:text-white focus:ring-1 focus:ring-primary focus:outline-none appearance-none">
                <option>London</option>
                <option>Dubai</option>
                <option>Tokyo</option>
            </select>
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/5 mt-4">
            <span className="text-text-secondary dark:text-white/80">24-Hour Format</span>
            <input type="checkbox" className="accent-primary w-4 h-4" />
        </div>
    </div>
);

const SchedulingConfig = () => (
    <div className="space-y-4">
        <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-text-muted dark:text-white/40 font-bold">Integrations</label>
            <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-lg bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/5">
                    <span className="text-text-secondary dark:text-white/80">Google Calendar</span>
                    <span className="text-emerald-500 text-xs font-bold uppercase">Connected</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/5">
                    <span className="text-text-secondary dark:text-white/80">Outlook Calendar</span>
                    <button className="text-xs text-primary hover:underline">Connect</button>
                </div>
            </div>
        </div>
        <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-text-muted dark:text-white/40 font-bold">Working Hours</label>
            <div className="grid grid-cols-2 gap-4">
                <input type="time" defaultValue="09:00" className="bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/10 rounded-xl px-4 py-3 text-text-primary dark:text-white focus:ring-1 focus:ring-primary focus:outline-none" />
                <input type="time" defaultValue="17:00" className="bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/10 rounded-xl px-4 py-3 text-text-primary dark:text-white focus:ring-1 focus:ring-primary focus:outline-none" />
            </div>
        </div>
    </div>
);

const ActivityConfig = ({ title, category, onViewMore }: { title: string, category: string, onViewMore?: () => void }) => (
    <div className="space-y-4">
        <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-text-muted dark:text-white/40 font-bold">{category} Name</label>
            <input type="text" defaultValue={title} className="w-full bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/10 rounded-xl px-4 py-3 text-text-primary dark:text-white focus:ring-1 focus:ring-primary focus:outline-none" />
        </div>
        <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-text-muted dark:text-white/40 font-bold">Date & Time</label>
            <div className="grid grid-cols-2 gap-4">
                <input type="date" className="bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/10 rounded-xl px-4 py-3 text-text-primary dark:text-white focus:ring-1 focus:ring-primary focus:outline-none" />
                <input type="time" defaultValue="19:30" className="bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/10 rounded-xl px-4 py-3 text-text-primary dark:text-white focus:ring-1 focus:ring-primary focus:outline-none" />
            </div>
        </div>
        <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-text-muted dark:text-white/40 font-bold">Notes</label>
            <textarea className="w-full bg-surface-alt dark:bg-white/5 border border-border-subtle dark:border-white/10 rounded-xl px-4 py-3 text-text-primary dark:text-white focus:ring-1 focus:ring-primary focus:outline-none h-24 resize-none" placeholder="Add optional notes..."></textarea>
        </div>
        {onViewMore && (
            <button onClick={onViewMore} className="w-full py-2.5 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors flex items-center justify-center gap-2">
                <Images className="w-4 h-4" /> View {category} Gallery
            </button>
        )}
    </div>
);
