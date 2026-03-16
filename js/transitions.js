document.addEventListener('DOMContentLoaded', () => {

    // Page exit fade using pageHide/beforeunload so browser history works normally
    window.addEventListener('pagehide', () => {
        document.body.classList.add('is-leaving');
    });

    // Scroll-triggered timeline animation
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;

    const items = timeline.querySelectorAll('.entry, .section-label');

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
