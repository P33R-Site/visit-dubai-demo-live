"use client";

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { AdminLayout } from '@/components/admin/AdminLayout';

const AdminAuthGuard = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const isLoginPage = pathname === '/admin/login';

    useEffect(() => {
        if (!isLoading && !isLoginPage) {
            if (!user || user.role !== 'admin') {
                router.push('/admin/login');
            }
        }
    }, [user, isLoading, router, isLoginPage]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs uppercase tracking-widest text-white/50">Verifying Clearance...</p>
                </div>
            </div>
        );
    }

    // Allow access to login page without auth
    if (isLoginPage) {
        return <>{children}</>;
    }

    if (!user || user.role !== 'admin') return null;

    return <AdminLayout>{children}</AdminLayout>;
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <AdminAuthGuard>{children}</AdminAuthGuard>;
}
