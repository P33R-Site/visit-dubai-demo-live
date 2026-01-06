import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/styles/tokens.css";
import "../globals.css";
import { Providers } from "@/components/ui/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-family-body" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-family-display" });

export const metadata: Metadata = {
    title: "Lumine Widget",
    description: "Lumine AI Concierge Widget",
    viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function WidgetLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className="bg-transparent">
            <body suppressHydrationWarning className={`${inter.variable} ${playfair.variable} bg-transparent text-text-primary font-sans antialiased overflow-hidden`}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
