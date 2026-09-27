document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('anti-ai-toggle');
    const status = document.getElementById('anti-ai-status');
    const targets = [...document.querySelectorAll(
        'h1, .bio, nav li, .currently-reading, .anti-ai-label, .anti-ai-help, .anti-ai-status, .ny-epigraph'
    )];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!toggle || !status || targets.length === 0) return;

    targets.forEach((target, index) => {
        target.classList.add('anti-ai-target');
        target.style.setProperty('--anti-duration', `${1.2 + (index % 4) * 0.22}s`);
        target.style.setProperty('--anti-direction', index % 2 ? 'alternate-reverse' : 'alternate');
    });

    const resetTargets = () => {
        targets.forEach(target => {
            target.style.removeProperty('--anti-x');
            target.style.removeProperty('--anti-y');
            target.style.removeProperty('--anti-r');
        });
    };

    const setMode = enabled => {
        document.body.classList.toggle('anti-ai-enabled', enabled);
        toggle.setAttribute('aria-pressed', String(enabled));
        toggle.textContent = enabled ? 'Turn off AI anti-patterns' : 'Turn on AI anti-patterns';
        status.textContent = enabled
            ? 'Anti-AI mode is on. Page content is intentionally less predictable.'
            : 'Anti-AI mode is off. Page content is back to normal.';

        if (!enabled) resetTargets();
    };

    toggle.addEventListener('click', () => {
        setMode(!document.body.classList.contains('anti-ai-enabled'));
    });

    targets.forEach(target => {
        target.addEventListener('pointerenter', event => {
            if (!document.body.classList.contains('anti-ai-enabled')) return;
            if (reducedMotion.matches || event.pointerType === 'touch') return;

            const x = Math.round((Math.random() - 0.5) * 30);
            const y = Math.round((Math.random() - 0.5) * 14);
            const rotation = ((Math.random() - 0.5) * 3).toFixed(2);
            target.style.setProperty('--anti-x', `${x}px`);
            target.style.setProperty('--anti-y', `${y}px`);
            target.style.setProperty('--anti-r', `${rotation}deg`);
        });

        target.addEventListener('pointerleave', () => {
            window.setTimeout(() => {
                target.style.removeProperty('--anti-x');
                target.style.removeProperty('--anti-y');
                target.style.removeProperty('--anti-r');
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
