(function() {
    function initNavDroplet(navMain) {
        if (!navMain) return;
        if (navMain.dataset && navMain.dataset.navDropletInit === '1') return;
        if (navMain.dataset) navMain.dataset.navDropletInit = '1';
        const navLinks = Array.from(navMain.querySelectorAll('.nav-link'));
        const droplet = navMain.querySelector('.nav-droplet');
        if (!navLinks.length || !droplet) return;

        let lastLeft = null;
        let lastWidth = null;
        let navDropletResetTimer = null;

        const moveDropletTo = (target) => {
            const navRect = navMain.getBoundingClientRect();
            const rect = target.getBoundingClientRect();
            const nextLeft = rect.left - navRect.left;
            const nextWidth = rect.width;
            const dx = lastLeft === null ? 0 : Math.abs(nextLeft - lastLeft);
            const dw = lastWidth === null ? 0 : Math.abs(nextWidth - lastWidth);
            const intensity = Math.min(1, (dx + dw * 0.45) / 72);
            const squeezeX = (1 + 0.22 * intensity).toFixed(3);
            const squeezeY = (1 - 0.14 * intensity).toFixed(3);

            navMain.style.setProperty('--nav-drop-x', `${nextLeft}px`);
            navMain.style.setProperty('--nav-drop-w', `${rect.width}px`);
            navMain.style.setProperty('--nav-drop-sx', squeezeX);
            navMain.style.setProperty('--nav-drop-sy', squeezeY);
            navMain.classList.add('is-nav-droplet-moving');

            const targetIndex = navLinks.indexOf(target);
            navLinks.forEach((link, index) => {
                const distance = Math.abs(index - targetIndex);
                link.classList.toggle('nav-hovered', distance === 0);
                link.classList.toggle('nav-peak', distance === 0);
                link.classList.toggle('nav-side', distance === 1);
            });

            clearTimeout(navDropletResetTimer);
            navDropletResetTimer = setTimeout(() => {
                navMain.style.setProperty('--nav-drop-sx', '1');
                navMain.style.setProperty('--nav-drop-sy', '1');
                navMain.classList.remove('is-nav-droplet-moving');
            }, 150);

            lastLeft = nextLeft;
            lastWidth = nextWidth;
        };

        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => moveDropletTo(link));
            link.addEventListener('focus', () => moveDropletTo(link));
        });

        navMain.addEventListener('mouseleave', () => {
            navLinks.forEach(link => link.classList.remove('nav-hovered', 'nav-peak', 'nav-side'));
            navMain.style.setProperty('--nav-drop-sx', '1');
            navMain.style.setProperty('--nav-drop-sy', '1');
            navMain.classList.remove('is-nav-droplet-moving');
        });

        const active = navMain.querySelector('.nav-link.active') || navLinks[0];
        moveDropletTo(active);
    }

    function boot() {
        document.querySelectorAll('.nav-main').forEach(initNavDroplet);
    }

    function getAppLang() {
        try {
            let lang = localStorage.getItem('appLang');
            if (!lang) {
                try {
                    const raw = (window.name || '').trim();
                    if (raw) {
                        const parsed = JSON.parse(raw);
                        if (parsed && typeof parsed.appLang === 'string') lang = parsed.appLang;
                    }
                } catch (e) {}
            }
            if (!lang) lang = 'zh-CN';
            return lang === 'en' ? 'en' : 'zh-CN';
        } catch (e) {
            return 'zh-CN';
        }
    }

    const appTexts = {
        'zh-CN': {
            logoText: '圆几何交互式学习平台',
            navHome: '首页',
            navGame: '游戏',
            navQuiz: '测试',
            quizReturn: '返回测试首页'
        },
        'en': {
            logoText: 'Interactive Learning Platform for Circle Geometry',
            navHome: 'Home',
            navGame: 'Game',
            navQuiz: 'Quiz',
            quizReturn: 'Back to Quiz'
        }
    };

    function applyQuizI18n() {
        const lang = getAppLang();
        const texts = appTexts[lang] || appTexts['zh-CN'];
        document.documentElement.setAttribute('lang', lang);

        const navHome = document.getElementById('navHome');
        const navGame = document.getElementById('navGame');
        const navQuiz = document.getElementById('navQuiz');
        const logoText = document.getElementById('logoText');
        if (logoText) logoText.textContent = texts.logoText;
        if (navHome) navHome.textContent = texts.navHome;
        if (navGame) navGame.textContent = texts.navGame;
        if (navQuiz) navQuiz.textContent = texts.navQuiz;

        document.querySelectorAll('.quiz-return').forEach((el) => {
            el.textContent = texts.quizReturn;
            el.setAttribute('aria-label', texts.quizReturn);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            boot();
            applyQuizI18n();
        }, { once: true });
    } else {
        boot();
        applyQuizI18n();
    }
})();
