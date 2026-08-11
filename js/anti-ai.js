document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('anti-ai-toggle');
    const status = document.getElementById('anti-ai-status');
    const links = [...document.querySelectorAll('nav a')];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!toggle || !status || links.length === 0) return;

    const resetTargets = () => {
        links.forEach(link => {
            link.style.removeProperty('--anti-x');
            link.style.removeProperty('--anti-y');
            link.style.removeProperty('--anti-r');
        });
    };

    const setMode = enabled => {
        document.body.classList.toggle('anti-ai-enabled', enabled);
        toggle.setAttribute('aria-pressed', String(enabled));
        toggle.textContent = enabled ? 'Turn off AI anti-patterns' : 'Turn on AI anti-patterns';
        status.textContent = enabled
            ? 'Anti-AI mode is on. Navigation is intentionally less predictable.'
            : 'Anti-AI mode is off. Navigation is back to normal.';

        if (!enabled) resetTargets();
    };

    toggle.addEventListener('click', () => {
        setMode(!document.body.classList.contains('anti-ai-enabled'));
    });

    links.forEach(link => {
        link.addEventListener('pointerenter', event => {
            if (!document.body.classList.contains('anti-ai-enabled')) return;
            if (reducedMotion.matches || event.pointerType === 'touch') return;

            const x = Math.round((Math.random() - 0.5) * 30);
            const y = Math.round((Math.random() - 0.5) * 14);
            const rotation = ((Math.random() - 0.5) * 3).toFixed(2);
            link.style.setProperty('--anti-x', `${x}px`);
            link.style.setProperty('--anti-y', `${y}px`);
            link.style.setProperty('--anti-r', `${rotation}deg`);
        });

        link.addEventListener('pointerleave', () => {
            window.setTimeout(() => {
                link.style.removeProperty('--anti-x');
                link.style.removeProperty('--anti-y');
                link.style.removeProperty('--anti-r');
            }, 180);
        });
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && document.body.classList.contains('anti-ai-enabled')) {
            setMode(false);
            toggle.focus();
        }
    });
});
