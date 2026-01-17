(function () {
    // Configuration - Can be overridden by setting window.Val8Config before loading this script
    const config = window.Val8Config || {};
    const IS_DEV = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const WIDGET_URL = config.widgetUrl || (IS_DEV ? 'http://localhost:3000/widget' : 'https://visit-dubai-demo-live.vercel.app/widget');
    const IFRAME_ID = 'val8-widget-iframe';
    const LAUNCHER_ID = 'val8-widget-launcher';

    // Branding/Customization options (optional)
    const BRANDING = {
        // 🎨 Colors
        primaryColor: config.primaryColor || null,     // Main brand color (buttons, links)
        accentColor: config.accentColor || null,       // Secondary accent color
        headerBackground: config.headerBackground || null, // Header background color
        surfaceColor: config.surfaceColor || null,     // Widget background color
        textColor: config.textColor || null,           // Primary text color

        // 🔤 Typography
        fontFamily: config.fontFamily || null,         // e.g., 'Roboto, sans-serif'

        // 📐 Layout & Position
        borderRadius: config.borderRadius || null,     // Widget corner radius (e.g., '24px')
        position: config.position || 'bottom-right',   // 'bottom-right' or 'bottom-left'
        offsetX: config.offsetX || 24,                 // Horizontal offset (px)
        offsetY: config.offsetY || 24,                 // Vertical offset (px)

        // 📝 Text & Labels
        widgetTitle: config.widgetTitle || 'Val8',     // Widget header title
        subtitle: config.subtitle || 'AI Concierge',   // Header subtitle
        launcherText: config.launcherText || 'Speak to Nora', // Launcher button text
        welcomeMessage: config.welcomeMessage || null, // Initial welcome message
        inputPlaceholder: config.inputPlaceholder || 'Type your message...', // Input placeholder

        // 🖼️ Avatar & Logo
        avatarUrl: config.avatarUrl || 'https://api.dicebear.com/7.x/personas/svg?seed=Nora&backgroundColor=b6e3f4&hair=long&hairColor=2c1b18&eyes=happy&mouth=smile&nose=smallRound&skinColor=f5cfa0',
        logoUrl: config.logoUrl || null,               // Custom logo URL for header
    };

    // Create Fonts (Inter and Playfair for the specific look)
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Playfair+Display:wght@700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    // Create Styles - dynamic based on position setting
    const isLeftPosition = BRANDING.position === 'bottom-left';
    const style = document.createElement('style');
    style.innerHTML = `
        #${LAUNCHER_ID} {
            position: fixed;
            bottom: ${BRANDING.offsetY}px;
            ${isLeftPosition ? 'left' : 'right'}: ${BRANDING.offsetX}px;
            background: #ffffff; /* Surface light */
            color: #1a1a1a;
            padding: 16px 24px;
            border-radius: 9999px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); /* shadow-2xl */
            cursor: pointer;
            z-index: 999998;
            display: flex;
            align-items: center;
            gap: 12px;
            transition: all 0.2s ease;
            font-family: ${BRANDING.fontFamily || "'Inter', sans-serif"};
            border: 1px solid rgba(0,0,0,0.1);
        }
        #${LAUNCHER_ID}:hover {
            transform: scale(1.05);
        }
        #${LAUNCHER_ID}:active {
            transform: scale(0.95);
        }
        #${LAUNCHER_ID} .icon-box {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background-color: ${BRANDING.primaryColor || '#D4AF37'}; /* Custom or default primary */
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.3s ease;
        }
        #${LAUNCHER_ID}:hover .icon-box {
            transform: rotate(12deg);
        }
        #${LAUNCHER_ID} .icon-symbol {
            font-family: 'Playfair Display', serif;
            font-weight: 700;
            color: #ffffff;
            font-size: 18px;
            line-height: 1;
        }
        #${LAUNCHER_ID} .text {
            font-weight: 500;
            letter-spacing: 0.025em;
            font-size: 16px;
            padding-right: 8px;
        }
        
        /* Dark Mode Support - applied via class */
        #${LAUNCHER_ID}.dark-theme {
            background: #1a1a1a; /* Surface dark */
            color: #ffffff;
            border-color: rgba(255,255,255,0.1);
        }
        /* Light Mode */
        #${LAUNCHER_ID}.light-theme {
            background: #ffffff; /* Surface light */
            color: #1a1a1a;
            border-color: rgba(0,0,0,0.1);
        }

        #${IFRAME_ID} {
            position: fixed;
            bottom: ${BRANDING.offsetY}px;
            ${isLeftPosition ? 'left' : 'right'}: ${BRANDING.offsetX}px;
            width: 800px;
            height: 700px;
            max-height: 85vh;
            max-width: calc(100vw - 48px);
            border: none;
            border-radius: ${BRANDING.borderRadius || '24px'};
            z-index: 999998;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            opacity: 0;
            pointer-events: none;
            transform: translateY(20px) scale(0.95);
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            transform-origin: bottom right;
        }
        #${IFRAME_ID}.open {
            opacity: 1;
            pointer-events: all;
            transform: translateY(0) scale(1);
        }
        /* Override ID styles with !important to ensure Full Screen works */
        #${IFRAME_ID}.fullscreen {
            width: 100vw !important;
            height: 100vh !important;
            max-height: 100vh !important;
            bottom: 0 !important;
            right: 0 !important;
            border-radius: 0 !important;
            transform: none !important;
        }

        @media (max-width: 480px) {
            #${IFRAME_ID} {
                width: 100%;
                height: 100%;
                bottom: 0;
                right: 0;
                border-radius: 0;
                max-height: 100vh;
            }
            #${LAUNCHER_ID} {
                bottom: 16px;
                right: 16px;
            }
        }
    `;
    document.head.appendChild(style);

    // Create Launcher
    const launcher = document.createElement('div');
    launcher.id = LAUNCHER_ID;

    // HTML Structure with customizable avatar:
    launcher.innerHTML = `
        <div class="icon-box" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid white; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <img src="${BRANDING.avatarUrl}" alt="AI Avatar" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <span class="text">${BRANDING.launcherText}</span>
    `;
    document.body.appendChild(launcher);

    // Detect parent website theme
    function detectTheme() {
        // Check for common theme indicators
        const html = document.documentElement;
        const body = document.body;

        // Check for dark mode class on html or body
        if (html.classList.contains('dark') || body.classList.contains('dark')) {
            return 'dark';
        }
        if (html.classList.contains('light') || body.classList.contains('light')) {
            return 'light';
        }

        // Check data-theme attribute
        const dataTheme = html.getAttribute('data-theme') || body.getAttribute('data-theme');
        if (dataTheme === 'dark' || dataTheme === 'light') {
            return dataTheme;
        }

        // Check for color-scheme meta tag
        const colorSchemeMeta = document.querySelector('meta[name="color-scheme"]');
        if (colorSchemeMeta) {
            const content = colorSchemeMeta.getAttribute('content');
            if (content && content.includes('dark')) return 'dark';
            if (content && content.includes('light')) return 'light';
        }

        // Check background color luminance
        const bgColor = window.getComputedStyle(body).backgroundColor;
        const match = bgColor.match(/\d+/g);
        if (match && match.length >= 3) {
            const [r, g, b] = match.map(Number);
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            return luminance < 0.5 ? 'dark' : 'light';
        }

        // Check system preference as fallback
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        return 'light';
    }

    // Apply theme to launcher
    function applyTheme(theme) {
        launcher.classList.remove('dark-theme', 'light-theme');
        launcher.classList.add(theme === 'dark' ? 'dark-theme' : 'light-theme');
    }

    const parentTheme = detectTheme();
    applyTheme(parentTheme); // Apply initial theme to launcher

    // Build widget URL with theme and branding parameters
    function buildWidgetUrl(theme) {
        const params = new URLSearchParams();
        params.set('theme', theme);

        // Colors
        if (BRANDING.primaryColor) params.set('primaryColor', BRANDING.primaryColor);
        if (BRANDING.accentColor) params.set('accentColor', BRANDING.accentColor);
        if (BRANDING.headerBackground) params.set('headerBackground', BRANDING.headerBackground);
        if (BRANDING.surfaceColor) params.set('surfaceColor', BRANDING.surfaceColor);
        if (BRANDING.textColor) params.set('textColor', BRANDING.textColor);

        // Typography & Layout
        if (BRANDING.fontFamily) params.set('fontFamily', BRANDING.fontFamily);
        if (BRANDING.borderRadius) params.set('borderRadius', BRANDING.borderRadius);

        // Text & Labels
        if (BRANDING.widgetTitle) params.set('widgetTitle', BRANDING.widgetTitle);
        if (BRANDING.subtitle) params.set('subtitle', BRANDING.subtitle);
        if (BRANDING.welcomeMessage) params.set('welcomeMessage', BRANDING.welcomeMessage);
        if (BRANDING.inputPlaceholder) params.set('inputPlaceholder', BRANDING.inputPlaceholder);

        // Avatar & Logo
        if (BRANDING.avatarUrl) params.set('avatarUrl', BRANDING.avatarUrl);
        if (BRANDING.logoUrl) params.set('logoUrl', BRANDING.logoUrl);

        return `${WIDGET_URL}?${params.toString()}`;
    }

    // Create Iframe with theme and branding parameters
    const iframe = document.createElement('iframe');
    iframe.id = IFRAME_ID;
    iframe.src = buildWidgetUrl(parentTheme);
    iframe.allow = "microphone; autoplay";
    document.body.appendChild(iframe);

    // Listen for theme changes on parent website
    const themeObserver = new MutationObserver(() => {
        const newTheme = detectTheme();
        applyTheme(newTheme); // Update launcher theme
        iframe.contentWindow.postMessage({ type: 'LUMINE_THEME_CHANGE', theme: newTheme }, '*');
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class', 'data-theme'] });

    // Toggle Logic
    let isOpen = false;

    function toggleWidget() {
        isOpen = !isOpen;
        if (isOpen) {
            iframe.classList.add('open');
            iframe.contentWindow.postMessage({ type: 'LUMINE_WIDGET_TOGGLE', isOpen: true }, '*');
            launcher.style.opacity = '0';
            launcher.style.pointerEvents = 'none';
        } else {
            iframe.classList.remove('open');
            iframe.contentWindow.postMessage({ type: 'LUMINE_WIDGET_TOGGLE', isOpen: false }, '*');
        }
    }

    function closeWidget() {
        if (isOpen) {
            isOpen = false;
            iframe.classList.remove('open');
            iframe.classList.remove('fullscreen'); // Reset fullscreen on close
            iframe.contentWindow.postMessage({ type: 'LUMINE_WIDGET_TOGGLE', isOpen: false }, '*');
            launcher.style.opacity = '1';
            launcher.style.pointerEvents = 'all';
        }
    }

    launcher.addEventListener('click', toggleWidget);

    // External API for DMC / Integrations
    window.Prv8 = {
        open: () => {
            if (!isOpen) toggleWidget();
        },
        close: () => {
            if (isOpen) closeWidget();
        },
        search: (query) => {
            if (!isOpen) toggleWidget();
            // Send search query to widget
            setTimeout(() => {
                iframe.contentWindow.postMessage({ type: 'LUMINE_WIDGET_SEARCH', query: query }, '*');
            }, 500); // Wait for open animation
        }
    };

    // Listen for custom events from host site (e.g., search bar)
    window.addEventListener('prv8-search', (e) => {
        if (e.detail && e.detail.query) {
            window.Prv8.search(e.detail.query);
        }
    });

    // Listen for messages from inside
    window.addEventListener('message', (event) => {
        // Validation: Ensure message is from the widget iframe (basic check)
        // In production, check event.origin === "YOUR_APP_DOMAIN"

        if (event.data?.type === 'LUMINE_WIDGET_CLOSE') {
            closeWidget();
        }
        if (event.data?.type === 'LUMINE_WIDGET_MODE') {
            console.log("Widget Mode Request:", event.data.mode); // Debug log
            if (event.data.mode === 'fullscreen') {
                iframe.classList.add('fullscreen');
            } else {
                iframe.classList.remove('fullscreen');
            }
        }
    });

})();
