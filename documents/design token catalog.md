
1. Design Token Catalog (Default Theme)
You can paste this into a Figma page called “Design Tokens” and set up Styles/Variables accordingly.
🎨 Color Tokens
Token
Description
Example Value
color-bg
App background
#0C0C10
color-surface
Card / panel background
#15151C
color-surface-alt
Elevated / secondary surface
#1E1E27
color-primary
Primary brand accent (buttons)
#E3B574
color-primary-soft
Soft version of primary
#3A3020
color-accent
Secondary accent (chips, tags)
#5FB3C6
color-border-subtle
Subtle border
#2A2A34
color-border-strong
Strong border / focus
#F4D7A4
color-text-primary
Main text
#F5F5FA
color-text-secondary
Secondary text / helper
#A8A8BA
color-text-muted
Disabled / meta text
#6B6B82
color-text-on-primary
Text on primary buttons
#120F06
color-success
Positive / confirmed state
#6AD3A1
color-warning
Caution
#FFCF70
color-error
Error / failure
#FF7B80
color-overlay
Modal overlay (with opacity)
rgba(7,7,10,0.72)

For a light theme, you’d invert these (bg → light, text → dark) but keep token names identical.

🔤 Typography Tokens
Font families
Token
Example Value
font-family-display
"Cormorant Garamond", serif
font-family-body
"Inter", system-ui, sans-serif

Font sizes (px)
Token
Value
font-size-2xl
32
font-size-xl
24
font-size-lg
20
font-size-md
16
font-size-sm
14
font-size-xs
12

Font weight
Token
Value
font-weight-regular
400
font-weight-medium
500
font-weight-semibold
600
font-weight-bold
700

Line heights
Token
Value
line-height-tight
1.2
line-height-normal
1.4
line-height-loose
1.6


📏 Spacing Tokens
(Use 4px base scale)
Token
Value (px)
space-0
0
space-1
4
space-2
8
space-3
12
space-4
16
space-5
20
space-6
24
space-8
32
space-10
40
space-12
48
space-16
64


⭕ Radius Tokens
Token
Value (px)
Usage
radius-none
0
Sharp edges
radius-sm
4
Inputs, chips
radius-md
8
Buttons
radius-lg
16
Cards
radius-xl
24
Larger modals / containers
radius-pill
999
Pills, circular chips


🌫 Shadow / Elevation Tokens
Token
Value (CSS)
Usage
shadow-none
none
Flat elements
shadow-sm
0 4px 8px rgba(0,0,0,0.22)
Inputs, chips
shadow-md
0 8px 20px rgba(0,0,0,0.28)
Cards
shadow-lg
0 18px 40px rgba(0,0,0,0.38)
Modals, overlays


⏱ Motion Tokens
Token
Value (ms)
motion-fast
120
motion-normal
200
motion-slow
280

Easing:
Token
Value
easing-standard
cubic-bezier(0.2, 0.0, 0.2, 1)
easing-decelerate
cubic-bezier(0.0, 0.0, 0.2, 1)
easing-accelerate
cubic-bezier(0.4, 0.0, 1, 1)


📚 Z-index Tokens
Token
Value
z-base
0
z-raised
10
z-overlay
100
z-toast
200


🧩 Component-Level Semantic Tokens
These are aliases that map to the primitives above (what Figma and devs actually use in components):
Buttons
btn-primary-bg → color-primary


btn-primary-text → color-text-on-primary


btn-primary-radius → radius-md


btn-primary-padding-x → space-4


btn-primary-padding-y → space-3


Cards
card-bg → color-surface


card-border-radius → radius-lg


card-shadow → shadow-md


card-padding → space-4


Chat Bubbles
chat-bubble-user-bg → color-primary


chat-bubble-user-text → color-text-on-primary


chat-bubble-ai-bg → color-surface-alt


chat-bubble-ai-text → color-text-primary


chat-bubble-radius → radius-lg


Chips
chip-bg → color-surface-alt


chip-text → color-text-secondary


chip-radius → radius-pill


chip-padding-x → space-3


chip-padding-y → space-1



2. JSON Token Sheet (Default Theme)
You can hand this to devs as tokens-default.json and also mirror it in Figma variables:
{
  "color": {
    "bg": "#0C0C10",
    "surface": "#15151C",
    "surface-alt": "#1E1E27",
    "primary": "#E3B574",
    "primary-soft": "#3A3020",
    "accent": "#5FB3C6",
    "border-subtle": "#2A2A34",
    "border-strong": "#F4D7A4",
    "text-primary": "#F5F5FA",
    "text-secondary": "#A8A8BA",
    "text-muted": "#6B6B82",
    "text-on-primary": "#120F06",
    "success": "#6AD3A1",
    "warning": "#FFCF70",
    "error": "#FF7B80",
    "overlay": "rgba(7,7,10,0.72)"
  },
  "font": {
    "family-display": "\"Cormorant Garamond\", serif",
    "family-body": "\"Inter\", system-ui, sans-serif",
    "size-2xl": 32,
    "size-xl": 24,
    "size-lg": 20,
    "size-md": 16,
    "size-sm": 14,
    "size-xs": 12,
    "weight-regular": 400,
    "weight-medium": 500,
    "weight-semibold": 600,
    "weight-bold": 700,
    "line-tight": 1.2,
    "line-normal": 1.4,
    "line-loose": 1.6
  },
  "space": {
    "0": 0,
    "1": 4,
    "2": 8,
    "3": 12,
    "4": 16,
    "5": 20,
    "6": 24,
    "8": 32,
    "10": 40,
    "12": 48,
    "16": 64
  },
  "radius": {
    "none": 0,
    "sm": 4,
    "md": 8,
    "lg": 16,
    "xl": 24,
    "pill": 999
  },
  "shadow": {
    "none": "none",
    "sm": "0 4px 8px rgba(0,0,0,0.22)",
    "md": "0 8px 20px rgba(0,0,0,0.28)",
    "lg": "0 18px 40px rgba(0,0,0,0.38)"
  },
  "motion": {
    "fast": 120,
    "normal": 200,
    "slow": 280,
    "easing-standard": "cubic-bezier(0.2, 0.0, 0.2, 1)",
    "easing-decelerate": "cubic-bezier(0.0, 0.0, 0.2, 1)",
    "easing-accelerate": "cubic-bezier(0.4, 0.0, 1, 1)"
  },
  "z": {
    "base": 0,
    "raised": 10,
    "overlay": 100,
    "toast": 200
  }
}

3. CSS Variable Mapping
Dev can drop this into a base stylesheet and you’re instantly white-label-ready:
:root {
  /* Colors */
  --color-bg: #0C0C10;
  --color-surface: #15151C;
  --color-surface-alt: #1E1E27;
  --color-primary: #E3B574;
  --color-primary-soft: #3A3020;
  --color-accent: #5FB3C6;
  --color-border-subtle: #2A2A34;
  --color-border-strong: #F4D7A4;
  --color-text-primary: #F5F5FA;
  --color-text-secondary: #A8A8BA;
  --color-text-muted: #6B6B82;
  --color-text-on-primary: #120F06;
  --color-success: #6AD3A1;
  --color-warning: #FFCF70;
  --color-error: #FF7B80;
  --color-overlay: rgba(7,7,10,0.72);

  /* Typography */
  --font-family-display: "Cormorant Garamond", serif;
  --font-family-body: "Inter", system-ui, sans-serif;
  --font-size-2xl: 32px;
  --font-size-xl: 24px;
  --font-size-lg: 20px;
  --font-size-md: 16px;
  --font-size-sm: 14px;
  --font-size-xs: 12px;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --line-tight: 1.2;
  --line-normal: 1.4;
  --line-loose: 1.6;

  /* Spacing */
  --space-0: 0px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  /* Radius */
  --radius-none: 0px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-pill: 999px;

  /* Shadow */
  --shadow-none: none;
  --shadow-sm: 0 4px 8px rgba(0,0,0,0.22);
  --shadow-md: 0 8px 20px rgba(0,0,0,0.28);
  --shadow-lg: 0 18px 40px rgba(0,0,0,0.38);

  /* Motion */
  --motion-fast: 120ms;
  --motion-normal: 200ms;
  --motion-slow: 280ms;
  --easing-standard: cubic-bezier(0.2, 0.0, 0.2, 1);
  --easing-decelerate: cubic-bezier(0.0, 0.0, 0.2, 1);
  --easing-accelerate: cubic-bezier(0.4, 0.0, 1, 1);

  /* Z-index */
  --z-base: 0;
  --z-raised: 10;
  --z-overlay: 100;
  --z-toast: 200;
}

/* Example usage */
.card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--space-4);
}
For a Visa theme, they just override a subset:
html.partner-visa {
  --color-primary: #001A49;
  --color-accent: #FFD700;
}

