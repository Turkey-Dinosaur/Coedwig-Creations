document.addEventListener('DOMContentLoaded', () => {
    // Enhanced reveal animations on scroll with mobile optimization
    const revealElements = document.querySelectorAll('.reveal');

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mobile-optimized threshold
    const isMobile = window.innerWidth <= 768;
    const threshold = isMobile ? 0.05 : 0.1;

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a small delay for smoother appearance
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, prefersReducedMotion ? 0 : 100);

                // Optional: Unobserve after animation to improve performance
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: threshold,
        rootMargin: isMobile ? '0px 0px -50px 0px' : '0px 0px -100px 0px'
    });

    revealElements.forEach(el => {
        // Add animation variety based on section
        if (el.id === 'gallery') {
            el.classList.add('scale-in');
        } else if (el.id === 'about') {
            el.classList.add('fade-up');
        } else if (el.id === 'services') {
            el.classList.add('fade-up');
        } else if (el.id === 'process') {
            el.classList.add('fade-up');
        } else if (el.id === 'testimonials') {
            el.classList.add('fade-up');
        }

        revealObserver.observe(el);
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');

    document.querySelectorAll('.lightbox-trigger').forEach(item => {
        item.addEventListener('click', e => {
            lightbox.style.display = 'block';
            lightboxImg.src = item.getAttribute('data-full');
            lightboxCaption.innerText = item.getAttribute('data-caption');
            document.body.style.overflow = 'hidden'; // Prevent scroll
        });
    });

    const closeLightbox = () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scroll
    };

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (lightbox) {
        lightbox.addEventListener('click', e => {
            if (e.target === lightbox || e.target === closeBtn) {
                closeLightbox();
            }
        });
    }

    // Escape key to close lightbox
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeLightbox();
    });

    // Header sticky effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    // Form submission mock
    const form = document.getElementById('quote-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = 'Quote Request Sent!';
                btn.style.backgroundColor = '#4bb543';
                btn.style.color = 'white';
                form.reset();

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger-menu');
    const menuClose = document.getElementById('menu-close');
    const navMenu = document.getElementById('nav-menu');
    const navLinksList = document.querySelectorAll('.nav-menu .nav-links li a');

    const toggleMenu = () => {
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    };

    if (hamburger) hamburger.addEventListener('click', toggleMenu);
    if (menuClose) menuClose.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
});
