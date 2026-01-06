"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Shield,
    Bell,
    Globe,
    Database,
    Save,
    AlertTriangle,
    Mail,
    Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

const SettingSection = ({ title, icon: Icon, children }: any) => (
    <div className="glass-panel p-6 rounded-2xl border border-border-subtle mb-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border-subtle">
            <div className="p-2 rounded-lg bg-surface-100 text-text-muted">
                <Icon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-light text-text-primary">{title}</h3>
        </div>
        <div className="space-y-6">
            {children}
        </div>
    </div>
);

const Toggle = ({ label, description, checked, onChange }: any) => (
    <div className="flex items-center justify-between">
        <div>
            <p className="text-sm font-medium text-text-primary">{label}</p>
            <p className="text-xs text-text-secondary mt-0.5">{description}</p>
        </div>
        <button
            onClick={() => onChange(!checked)}
            className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${checked ? 'bg-primary' : 'bg-surface-200'}`}
        >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${checked ? 'left-[calc(100%-1.25rem)]' : 'left-1'}`} />
        </button>
    </div>
);

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState({
        maintenanceMode: false,
        registrations: true,
        emailNotifs: true,
        pushNotifs: true,
        autoBackup: true,
        twoFactor: true
    });

    const updateSetting = (key: string, value: boolean) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-light text-text-primary">System Configuration</h2>
                    <p className="text-text-muted text-sm mt-1">Global application preferences and security protocols.</p>
                </div>
                <Button className="bg-text-primary text-bg hover:bg-text-primary/90">
                    <Save className="w-4 h-4 mr-2" /> Save Changes
                </Button>
            </header>

            <SettingSection title="General & Availability" icon={Globe}>
                <Toggle
                    label="System Maintenance Mode"
                    description="Temporarily disable access for all non-admin users."
                    checked={settings.maintenanceMode}
                    onChange={(v: boolean) => updateSetting('maintenanceMode', v)}
                />
                <Toggle
                    label="Allow New Registrations"
                    description="Enable public sign-up form."
                    checked={settings.registrations}
                    onChange={(v: boolean) => updateSetting('registrations', v)}
                />
            </SettingSection>

            <SettingSection title="Notifications" icon={Bell}>
                <Toggle
                    label="Email Alerts"
                    description="Send transactional emails via SendGrid."
                    checked={settings.emailNotifs}
                    onChange={(v: boolean) => updateSetting('emailNotifs', v)}
                />
                <Toggle
                    label="Push Notifications"
                    description="Enable real-time browser notifications."
                    checked={settings.pushNotifs}
                    onChange={(v: boolean) => updateSetting('pushNotifs', v)}
                />
            </SettingSection>

            <SettingSection title="Security & Data" icon={Shield}>
                <Toggle
                    label="Enforce 2FA for Admins"
                    description="Require two-factor authentication for control panel access."
                    checked={settings.twoFactor}
                    onChange={(v: boolean) => updateSetting('twoFactor', v)}
                />
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-4">
                    <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-medium text-red-400">Danger Zone</h4>
                        <p className="text-xs text-red-400/60 mt-1 mb-3">Irreversible actions regarding system data.</p>
                        <button className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs rounded-lg border border-red-500/30 transition-colors">
                            Purge Cache & Logs
                        </button>
                    </div>
                </div>
            </SettingSection>

            <SettingSection title="API Configuration" icon={Database}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-text-muted">Stripe Secret Key</label>
                        <div className="flex gap-2">
                            <input
                                type="password"
                                value="••••••••••••••••••••••••"
                                readOnly
                                className="flex-1 bg-surface-100 border border-border-subtle rounded-lg px-4 py-2 text-sm text-text-secondary font-mono"
                            />
                            <button className="px-4 text-xs font-medium text-primary hover:text-text-primary transition-colors">Reveal</button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-text-muted">OpenAI API Key</label>
                        <div className="flex gap-2">
                            <input
                                type="password"
                                value="sk-proj-XXXXXXXXXXXXXXXXXXXX"
                                readOnly
                                className="flex-1 bg-surface-100 border border-border-subtle rounded-lg px-4 py-2 text-sm text-text-secondary font-mono"
                            />
                            <button className="px-4 text-xs font-medium text-primary hover:text-text-primary transition-colors">Edit</button>
                        </div>
                    </div>
                </div>
            </SettingSection>
        </div>
    );
}
