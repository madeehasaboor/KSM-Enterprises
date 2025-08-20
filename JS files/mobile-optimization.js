// Mobile Optimization Script for Auto Champion
// Handles touch interactions, performance optimizations, and responsive behavior

(function() {
    'use strict';

    // Performance optimizations
    function optimizePerformance() {
        // Reduce repaints and reflows
        const style = document.createElement('style');
        style.textContent = `
            * {
                -webkit-transform: translateZ(0);
                transform: translateZ(0);
                -webkit-backface-visibility: hidden;
                backface-visibility: hidden;
            }
        `;
        document.head.appendChild(style);

        // Optimize images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
            img.decoding = 'async';
        });
    }

    // Touch optimizations
    function optimizeTouch() {
        // Prevent double-tap zoom on buttons
        const touchElements = document.querySelectorAll('a, button, .nav a, .cta-button, .add-to-cart-btn');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function(e) {
                this.style.transform = 'scale(0.98)';
            }, { passive: true });

            element.addEventListener('touchend', function(e) {
                this.style.transform = '';
            }, { passive: true });
        });

        // Improve scroll performance
        let ticking = false;
        function updateScroll() {
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    // Responsive navigation
    function handleResponsiveNav() {
        const nav = document.querySelector('.centered-nav');
        const header = document.querySelector('.header');
        
        if (!nav || !header) return;

        // Handle mobile menu toggle if needed
        let isMenuOpen = false;
        
        function toggleMenu() {
            isMenuOpen = !isMenuOpen;
            nav.style.display = isMenuOpen ? 'flex' : 'none';
        }

        // Auto-hide navigation on scroll (mobile only)
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            if (window.innerWidth <= 768) {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    // Scrolling down
                    header.style.transform = 'translateY(-100%)';
                } else {
                    // Scrolling up
                    header.style.transform = 'translateY(0)';
                }
                lastScrollTop = scrollTop;
            }
        }, { passive: true });
    }

    // Form optimizations
    function optimizeForms() {
        const inputs = document.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Prevent zoom on iOS
            if (input.type === 'text' || input.type === 'email' || input.type === 'tel') {
                input.style.fontSize = '16px';
            }

            // Add focus states for better UX
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
            });

            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });
    }

    // Image loading optimization
    function optimizeImages() {
        // Intersection Observer for lazy loading
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    // Cart optimization for mobile
    function optimizeCart() {
        const cartIcon = document.querySelector('.cart-icon');
        const cartCount = document.querySelector('.cart-count');
        
        if (cartIcon && cartCount) {
            // Add haptic feedback on mobile
            cartIcon.addEventListener('click', function() {
                if ('vibrate' in navigator) {
                    navigator.vibrate(50);
                }
            });

            // Animate cart count changes
            const originalText = cartCount.textContent;
            cartCount.addEventListener('DOMSubtreeModified', function() {
                if (this.textContent !== originalText) {
                    this.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 200);
                }
            });
        }
    }

    // Device detection
    function detectDevice() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isTablet = /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768 && window.innerWidth <= 1024;
        
        document.body.classList.add(isMobile ? 'mobile-device' : isTablet ? 'tablet-device' : 'desktop-device');
        
        // Add touch class for touch devices
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            document.body.classList.add('touch-device');
        }
    }

    // Initialize all optimizations
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        detectDevice();
        optimizePerformance();
        optimizeTouch();
        handleResponsiveNav();
        optimizeForms();
        optimizeImages();
        optimizeCart();

        // Add resize handler for responsive behavior
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                detectDevice();
                handleResponsiveNav();
            }, 250);
        }, { passive: true });
    }

    // Start optimizations
    init();

    // Export functions for external use
    window.MobileOptimizer = {
        optimizePerformance,
        optimizeTouch,
        handleResponsiveNav,
        optimizeForms,
        optimizeImages,
        optimizeCart,
        detectDevice
    };

})(); 