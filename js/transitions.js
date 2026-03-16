document.addEventListener('DOMContentLoaded', () => {

    // Page exit fade — add class on leave, remove it on bfcache restore
    window.addEventListener('pagehide', () => {
        document.body.classList.add('is-leaving');
    });

    window.addEventListener('pageshow', (e) => {
        // Fires on bfcache restore (back/forward navigation)
        if (e.persisted) {
            document.body.classList.remove('is-leaving');
        }
    });

    // Open external links in a new tab
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });

    // Scroll-triggered timeline animation
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;

    const items = timeline.querySelectorAll('.entry, .section-label');

    // Reduced motion: skip animation entirely, make everything visible immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        items.forEach(item => item.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver(observed => {
        const appearing = observed.filter(o => o.isIntersecting);
        appearing.forEach((item, i) => {
            setTimeout(() => {
                item.target.classList.add('visible');
            }, i * 100);
            observer.unobserve(item.target);
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    // Delay observer start so page-content fade-in completes first
    setTimeout(() => {
        items.forEach(item => observer.observe(item));
    }, 400);
});
