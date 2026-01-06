/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-family-body)', 'sans-serif'],
                serif: ['var(--font-family-display)', 'serif'],
                display: ['var(--font-family-display)', 'serif'],
            },
            colors: {
                primary: 'var(--color-primary)',
                'primary-soft': 'var(--color-primary-soft)',
                'primary-old': '#D4AF37',
                surface: {
                    DEFAULT: 'var(--color-surface)',
                    alt: 'var(--color-surface-alt)',
                    50: 'var(--color-surface-50)',
                    100: 'var(--color-surface-100)',
                    200: 'var(--color-surface-200)',
                },
                obsidian: 'var(--color-bg)',
                charcoal: 'var(--color-surface)',
                champagne: {
                    100: '#F9F5EB',
                    200: '#F2E6D0',
                    300: '#E5C558',
                    400: 'var(--color-primary)',
                    500: '#B59326',
                    900: '#4A3B2A',
                },
                text: {
                    primary: 'var(--color-text-primary)',
                    secondary: 'var(--color-text-secondary)',
                    muted: 'var(--color-text-muted)',
                    onPrimary: 'var(--color-text-on-primary)',
                },
                success: 'var(--color-success)',
                warning: 'var(--color-warning)',
                error: 'var(--color-error)',
                glass: {
                    heavy: 'var(--glass-heavy)',
                    atlas: 'var(--glass-atlas)',
                    card: {
                        start: 'var(--glass-card-start)',
                        end: 'var(--glass-card-end)',
                    }
                }
            },
            backgroundImage: {
                'noise': "url('https://www.transparenttextures.com/patterns/stardust.png')",
                'luxury-gradient': 'radial-gradient(circle at top right, #1a1a1a 0%, #050505 100%)',
                'metal-sheen': 'linear-gradient(120deg, transparent 30%, var(--color-sheen) 50%, transparent 70%)',
            },
            animation: {
                'float': 'float 8s ease-in-out infinite',
                'spotlight': 'spotlight 2s ease-in-out infinite alternate',
                'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.2, 1, 0.3, 1) forwards',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                spotlight: {
                    '0%': { opacity: 0.5 },
                    '100%': { opacity: 1 },
                },
                fadeInUp: {
                    '0%': { opacity: 0, transform: 'translateY(20px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                }
            }
        },
    },
    plugins: [],
}
