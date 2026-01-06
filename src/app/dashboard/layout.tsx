"use client";

import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Val8Provider } from '@/components/val8/Val8Context';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Wrapper to handle auth check at layout level
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-bg flex items-center justify-center text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs uppercase tracking-widest text-white/50">Details...</p>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return <>{children}</>;
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Val8Provider>
            <AuthGuard>
                <DashboardLayout>
                    {children}
                </DashboardLayout>
            </AuthGuard>
        </Val8Provider>
    );
}
