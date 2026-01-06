# LUMINA - Premium Concierge

> **Curated Existence.** A symbiotic blend of neural-network precision and human concierge mastery.

Lumina is a next-generation high-end concierge platform designed for the ultra-luxury market. It combines an immersive, premium "Void/Sanctuary" aesthetic with powerful utility, featuring an AI-driven concierge (Val8), dynamic dashboard management, and seamless functional integrations (Itinerary, Trips, Wallet).

---

## 🚀 Tech Stack

-   **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS + Vanilla CSS (Tokens)
-   **Icons:** Lucide React
-   **Animation:** Framer Motion + CSS Transitions
-   **Fonts:** Inter (Body) & Playfair Display (Headings)

---

## ✨ Features

-   **Hyper-Modern Aesthetic:** Custom "glassmorphism" design system (`glass-card`, `glass-atlas`, `glass-heavy`) with ambient lighting and blur effects.
-   **Dashboard Ecosystem:**
    -   Persistent **Sidebar Navigation** & Context-Aware **Header**.
    -   **Widgets:** Interactive bento-grid layout for quick access to Calendar, Weather, Flights, and more.
    -   **Val8 Integration:** AI Concierge context accessible globally.
-   **Responsive Layouts:** Fully responsive design optimizing complex grids for mobile, tablet, and desktop.
-   **Seamless Authentication:** Custom Login/Register flows integrated with Next.js routing.

---

## 📂 Project Structure

```bash
src/
├── app/                  # Next.js App Router
│   ├── dashboard/        # Dashboard layout & sub-pages (Itinerary, Wallet, etc.)
│   ├── login/            # Authentication routes
│   ├── globals.css       # Global styles & Tailwind directives
│   ├── layout.tsx        # Root layout with Providers
│   └── page.tsx          # Landing page
├── components/
│   ├── dashboard/        # Dashboard widgets (Flight, Stay, Activity, etc.) & Layouts
│   ├── home/             # Landing page sections (Hero, Features, Membership)
│   ├── ui/               # Reusable UI atoms (Button, Header, Footer)
│   └── val8/             # Val8 AI specific components
├── contexts/             # React Contexts (Auth, Val8)
├── styles/               # Design tokens
└── types.ts              # Global type definitions
```

---

## 🛠️ Getting Started

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/your-repo/lumina.git

# Install dependencies
npm install
```

### 2. Development

Run the local development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to view the application.

### 3. Build

Create an optimized production build:

```bash
npm run build
```

---

## 📦 Deployment

This project is optimized for deployment on **Vercel**.

1.  Push your code to a Git repository (GitHub/GitLab).
2.  Import the project into Vercel.
3.  Vercel will automatically detect Next.js and configure the build settings.

*(Optional)* A `vercel.json` is included for explicit framework configuration.

---

## 🎨 Design System & Credits
-   **Primary Color:** Lumina Gold (`#E3B574`)
-   **Visual Style:** "Noir Luxury" — Dark backgrounds, subtle gradients, glass textures.
-   **Imagery:** Curated Unsplash collections (Luxury Travel, Architecture).

---

© 2025 Lumina Concierge. All Rights Reserved.
