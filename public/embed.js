(function () {
    // Configuration - Can be overridden by setting window.Val8Config before loading this script
    const config = window.Val8Config || {};
    const IS_DEV = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const WIDGET_URL = config.widgetUrl || (IS_DEV ? 'http://localhost:3000/widget' : 'https://your-domain.vercel.app/widget');
    const IFRAME_ID = 'val8-widget-iframe';
    const LAUNCHER_ID = 'val8-widget-launcher';

    // Create Fonts (Inter and Playfair for the specific look)
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Playfair+Display:wght@700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    // Create Styles
    const style = document.createElement('style');
    style.innerHTML = `
        #${LAUNCHER_ID} {
            position: fixed;
            bottom: 24px;
            right: 24px;
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
            font-family: 'Inter', sans-serif;
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
            background-color: #D4AF37; /* Primary */
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
        
        /* Dark Mode Support (Optional - matches system preference) */
        @media (prefers-color-scheme: dark) {
            #${LAUNCHER_ID} {
                background: #1a1a1a; /* Surface dark */
                color: #ffffff;
                border-color: rgba(255,255,255,0.1);
            }
        }

        #${IFRAME_ID} {
            position: fixed;
            bottom: 100px;
            right: 24px;
            width: 400px;
            height: 700px;
            max-height: 80vh;
            border: none;
            border-radius: 32px;
            z-index: 999999;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); /* shadow-2xl */
            opacity: 0;
            pointer-events: none;
            transform: translateY(20px) scale(0.95);
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); /* Ease-out quart-ish for premium feel */
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

    // HTML Structure matching Val8Widget.tsx:
    launcher.innerHTML = `
        <div class="icon-box" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid white; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <img src="https://api.dicebear.com/7.x/personas/svg?seed=Nora&backgroundColor=b6e3f4&hair=long&hairColor=2c1b18&eyes=happy&mouth=smile&nose=smallRound&skinColor=f5cfa0" alt="Nora AI Avatar" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <span class="text">Speak to Nora</span>
    `;
    document.body.appendChild(launcher);

    // Create Iframe
    const iframe = document.createElement('iframe');
    iframe.id = IFRAME_ID;
    iframe.src = WIDGET_URL;
    iframe.allow = "microphone; autoplay";
    document.body.appendChild(iframe);

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
