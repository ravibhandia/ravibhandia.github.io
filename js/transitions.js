document.addEventListener('DOMContentLoaded', () => {

    // Page exit fade for internal links
    document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        if (href.startsWith('mailto:') || href.startsWith('http') || href.startsWith('//')) return;

        link.addEventListener('click', e => {
            e.preventDefault();
            document.body.classList.add('is-leaving');
            setTimeout(() => { window.location.href = href; }, 250);
        });
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
