// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Language Switcher
    const langButtons = document.querySelectorAll('.lang-btn');
    const htmlElement = document.documentElement;
    let currentLang = 'en'; // Default language

    // Set initial language
    setLanguage(currentLang);

    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            if (selectedLang !== currentLang) {
                setLanguage(selectedLang);
                currentLang = selectedLang;
                
                // Update active button
                langButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    function setLanguage(lang) {
        // Update HTML attributes
        if (lang === 'ku') {
            htmlElement.setAttribute('lang', 'ku');
            htmlElement.setAttribute('dir', 'rtl');
            document.body.style.textAlign = 'right';
        } else {
            htmlElement.setAttribute('lang', 'en');
            htmlElement.setAttribute('dir', 'ltr');
            document.body.style.textAlign = 'left';
        }

        // Update all elements with data attributes
        const elements = document.querySelectorAll('[data-en][data-ku]');
        elements.forEach(element => {
            const text = element.getAttribute('data-' + lang);
            if (text) {
                element.textContent = text;
            }
        });

        // Update form placeholders
        const inputs = document.querySelectorAll('input[data-placeholder-en], textarea[data-placeholder-en]');
        inputs.forEach(input => {
            const placeholder = input.getAttribute('data-placeholder-' + lang);
            if (placeholder) {
                input.placeholder = placeholder;
            }
        });

        // Update badge text for featured cards
        const badgeElements = document.querySelectorAll('[data-badge-en][data-badge-ku]');
        badgeElements.forEach(element => {
            const badgeText = element.getAttribute('data-badge-' + lang);
            if (badgeText) {
                element.setAttribute('data-badge', badgeText);
            }
        });

        // Update page title
        if (lang === 'ku') {
            if (window.location.pathname.includes('offers.html')) {
                document.title = 'ئۆفەرە تایبەتەکان - Cro Agency';
            } else {
                document.title = 'Cro Agency - ئایجێنسی مارکێتینگ';
            }
        } else {
            if (window.location.pathname.includes('offers.html')) {
                document.title = 'Special Offers - Cro Agency';
            } else {
                document.title = 'Cro Agency - Professional Marketing Agency';
            }
        }

        // Store language preference
        localStorage.setItem('preferred-language', lang);
    }

    // Load saved language preference
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && savedLang !== currentLang) {
        setLanguage(savedLang);
        currentLang = savedLang;
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === savedLang) {
                btn.classList.add('active');
            }
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const message = this.querySelector('textarea').value;

            // Simple validation
            if (!name || !email || !phone || !message) {
                alert('تکایە هەموو خانەکان پڕ بکەرەوە');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('تکایە ئیمەیڵێکی دروست بنووسە');
                return;
            }

            // Success message
            alert('زۆر سپاس! پەیامەکەت گەیشت. زوو پەیوەندیت پێوە دەکەینەوە.');
            
            // Reset form
            this.reset();
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .benefit-card, .offer-card, .stat-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-item h3');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetText = target.textContent;
                const targetNumber = parseInt(targetText.replace(/\D/g, ''));
                const suffix = targetText.replace(/\d/g, '');
                
                if (targetNumber) {
                    let current = 0;
                    const increment = targetNumber / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= targetNumber) {
                            current = targetNumber;
                            clearInterval(timer);
                        }
                        target.textContent = Math.floor(current) + suffix;
                    }, 30);
                }
                
                statsObserver.unobserve(target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Active navigation highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.service-card, .benefit-card, .offer-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Back to top button
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 50px;
        height: 50px;
        background: var(--primary-red);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 1.2rem;
    `;

    document.body.appendChild(backToTop);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .loaded {
            animation: fadeIn 0.5s ease-in;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .nav-menu a.active {
            color: var(--primary-red) !important;
            background: rgba(227, 30, 36, 0.1) !important;
        }
    `;
    document.head.appendChild(style);
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization for scroll events
const debouncedScroll = debounce(function() {
    // Scroll-based animations can go here
}, 10);

window.addEventListener('scroll', debouncedScroll);
