import { Suspense } from 'react';
import { AuthPage } from "@/views/AuthPage";

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-bg flex items-center justify-center text-text-primary">Loading...</div>}>
            <AuthPage type="login" />
        </Suspense>
    );
}
