import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/styles/tokens.css";
import "./globals.css";
import { Providers } from "@/components/ui/Providers";
import { ThemeDebugger } from "@/components/ui/ThemeDebugger";

const inter = Inter({ subsets: ["latin"], variable: "--font-family-body" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-family-display" });

export const metadata: Metadata = {
    title: "Lumina - Premium Concierge",
    description: "Curated Existence. A symbiotic blend of neural-network precision and human concierge mastery.",
    icons: {
        icon: '/favicon.svg',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} ${playfair.variable} bg-bg text-text-primary font-sans antialiased`} suppressHydrationWarning>
                <Providers>
                    {children}
                    <ThemeDebugger />
                </Providers>
            </body>
        </html>
    );
}
