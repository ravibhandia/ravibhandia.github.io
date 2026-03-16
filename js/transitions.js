document.addEventListener('DOMContentLoaded', () => {
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
});
