(For Figma designer + front-end engineer)
1. MUST SUPPORT THEMING VIA TOKENIZATION
The UI system must be designed using design tokens, not hard-coded values.
Tokens should be defined for:
Color
Primary


Secondary


Accent


Background


Surface


Text-primary


Text-secondary


Border


Typography
Font families


Font sizes


Font weights


Line heights


Letter spacing


Spacing
Vertical spacing scale


Horizontal spacing scale


Component padding scale


Radius
Default corner radius


Large radius (cards)


Full radius (chips)


Elevation
Shadow presets


Motion
Duration values


Standard easing



2. TOKEN NAMING CONVENTION (REQUIRED)
Recommend a brand-agnostic naming system, such as:
color-primary
color-surface
color-text-primary
color-border
font-family-display
font-weight-regular
radius-card
spacing-4
spacing-8
shadow-sm
shadow-lg
Avoid names tied to brand identity (e.g., “gold” or “champagne”).
Tokens = semantic function, not visual description.

3. MAKE TOKENS 
OVERRIDABLE PER PARTNER
PRV8 should support one default global token set and multiple partner token sets.
Example structure:
tokens-default.json
tokens-visa.json
tokens-aspire.json
tokens-ten.json
Figma should reflect this architecture through:
Styles


Variables


Component properties



4. CSS IMPLEMENTATION REQUIREMENTS
Front-end must implement tokens as CSS variables, ideally at :root scope:
:root {
  --color-primary: #101010;
  --color-accent: #D4AF37;
  --font-family-display: "Editorial New", serif;
  --font-family-body: "Inter", sans-serif;
  --radius-card: 16px;
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.06);
}
Partner overrides must be possible by overwriting the same variables, not modifying components.
Example:
.partner-visa {
  --color-primary: #001A49;
  --color-accent: #00AEEF;
}

5. COMPONENT DESIGN REQUIREMENTS (Figma)
Components must reference tokens and not static values.
Examples:
❌ Bad:
Color: #F3EADC


Font: Playfair 20px


Radius: 12px


✔️ Good:
Fill: color-surface


Headline: font-size-xl


Radius: radius-card


This applies to:
Buttons


Cards


Chips


Modals


Overlays


Nav bars


Chat bubbles



6. DESIGNER HANDOFF REQUIREMENTS
Designer must provide:
Token sheet (master list)


Component library tied to tokens


Variant logic for components


Documentation for overrides


Deliverables:
A. Visual Token Sheet (Figma)
Colors


Typography


Spacing


Radius


Elevation


Motion


B. Code Token Sheet (JSON or CSS Variables)
{
  "color-primary": "#000",
  "color-accent": "#d4af37",
  "radius-card": "16px",
  "font-display": "Editorial",
  ...
}
C. Partner Theme Variants
Light adjustments


Dark adjustments (optional)



7. WHITE-LABELING GOALS
This system MUST enable:
Rapid partner onboarding (days → hours)


Run-time theming overrides


Visual consistency across components


Minimal re-design cost for new partners


Theming without code refactor

 (only variable overrides)



8. ACCESSIBILITY REQUIREMENTS
Each partner theme must still meet:
Contrast AA for actionable components


Font size minimum 14px


Tap target ≥ 44px


Token override must not break accessibility compliance.

9. ADDITIONAL UX/BRANDING REQUIREMENTS
UI should read as “bespoke luxury,” not “travel agency”


Photography + shadows = subtle, atmospheric, elevated


Motion minimal, tasteful


Whitespace intentional, confident



10. QUICK EXAMPLE
Default Styling:
--color-primary: #181818
--color-accent: #AA7C3E
--radius-card: 14px
--shadow-lg: 0 6px 18px rgba(0,0,0,0.08)
Visa Theme:
--color-primary: #000F2F
--color-accent: #FFD700
--radius-card: 16px
--shadow-lg: 0 8px 20px rgba(0,0,0,0.12)
Aspire Theme:
--color-primary: #262626
--color-accent: #4CAF50

11. WHAT TO TELL THE DESIGNER
Required:
“All components must be built using design tokens and variables, not fixed values.”
Required:
“Design system must support easy white-labeling by changing token sets, not redesigning components.”
Required:
“Provide a token sheet and companion CSS variables mapping for engineering.”

12. WHAT THIS ENABLES FOR THE BUSINESS
Turnkey white-label deployments


Scalable partner licensing


Consistent look + feel


Faster iteration velocity


Lower engineering cost


Revenue growth via partner theming


This makes PRV8 a platform, not a custom build each time.

13. NICE-TO-HAVES (IF TIME ALLOWS)
Light/Dark theme variants


Animation token overrides


Typography scale per partner


Custom icon sets


White-label logo asset system


Theme preview sandbox



✔️ TL;DR FOR DESIGNER
Design must be:
Tokenized


Themeable


Partner-ready


Luxury aesthetic


Designer MUST deliver:
Token sheet


Component library tied to tokens


Theme variants


Code-ready variable mappings



✔️ TL;DR FOR ENGINEERING
Implement tokens as:
CSS variables at root scope


Override per partner class or stylesheet


No component changes required


Mapping example:
.card {
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-lg);
  color: var(--color-text-primary);
}
Partner override example:
html.partner-visa {
  --color-primary: #001A49;
  --color-accent: #FFD700;
}

