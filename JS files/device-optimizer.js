// Enhanced Device Optimization Script for Auto Champion
// Optimizes performance for mobile, tablet, laptop, and desktop devices

(function() {
    'use strict';

    // Performance optimizations
    function optimizePerformance() {
        const style = document.createElement('style');
        style.textContent = `
            * {
                -webkit-transform: translateZ(0);
                transform: translateZ(0);
                -webkit-backface-visibility: hidden;
                backface-visibility: hidden;
            }
            
            .slide, .brand-card, .product, .modal-content {
                will-change: transform, opacity;
            }
            
            html {
                scroll-behavior: smooth;
            }
            
            @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
                img {
                    image-rendering: -webkit-optimize-contrast;
                    image-rendering: crisp-edges;
                }
            }
        `;
        document.head.appendChild(style);

        // Optimize images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
            img.decoding = 'async';
            
            img.addEventListener('error', function() {
                this.style.display = 'none';
            });
        });
    }

    // Touch optimizations for mobile
    function optimizeTouch() {
        const touchElements = document.querySelectorAll('a, button, .nav a, .cta-button, .add-to-cart-btn, .brand-btn');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function(e) {
                this.style.transform = 'scale(0.98)';
                this.style.transition = 'transform 0.1s ease';
            }, { passive: true });

            element.addEventListener('touchend', function(e) {
                this.style.transform = '';
                this.style.transition = '';
            }, { passive: true });
        });

        // Swipe gestures for slideshow
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        document.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0 && window.nextSlide) {
                    window.nextSlide();
                } else if (diff < 0 && window.prevSlide) {
                    window.prevSlide();
                }
            }
        }
    }

    // Laptop-specific optimizations
    function optimizeLaptop() {
        const isLaptop = window.innerWidth >= 1024 && window.innerWidth <= 1440;
        
        if (isLaptop) {
            // Keyboard navigation
            document.addEventListener('keydown', function(e) {
                switch(e.key) {
                    case 'ArrowLeft':
                        if (window.prevSlide) window.prevSlide();
                        break;
                    case 'ArrowRight':
                        if (window.nextSlide) window.nextSlide();
                        break;
                    case 'Escape':
                        const modals = document.querySelectorAll('.brand-modal.modal-show');
                        modals.forEach(modal => {
                            const closeBtn = modal.querySelector('.modal-close');
                            if (closeBtn) closeBtn.click();
                        });
                        break;
                }
            });
        }
    }

    // Responsive navigation
    function handleResponsiveNav() {
        const header = document.querySelector('header');
        if (!header) return;

        let lastScrollTop = 0;
        let scrollTimeout;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const isMobile = window.innerWidth <= 768;
            
            if (isMobile) {
                clearTimeout(scrollTimeout);
                
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    header.style.transform = 'translateY(-100%)';
                    header.style.transition = 'transform 0.3s ease';
                } else {
                    header.style.transform = 'translateY(0)';
                    header.style.transition = 'transform 0.3s ease';
                }
                
                lastScrollTop = scrollTop;
                
                scrollTimeout = setTimeout(() => {
                    header.style.transform = 'translateY(0)';
                }, 1500);
            }
        }, { passive: true });
    }

    // Form optimizations
    function optimizeForms() {
        const inputs = document.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            if (input.type === 'text' || input.type === 'email' || input.type === 'tel' || input.type === 'password') {
                input.style.fontSize = '16px';
            }

            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
                this.parentElement.style.boxShadow = '0 0 0 2px rgba(70, 130, 180, 0.3)';
            });

            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
                this.parentElement.style.boxShadow = '';
            });
        });
    }

    // Image optimization
    function optimizeImages() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.1
            });

            const lazyImages = document.querySelectorAll('img[data-src], img.lazy');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    // Cart optimization
    function optimizeCart() {
        const cartIcon = document.querySelector('.cart-icon');
        const cartCount = document.querySelector('.cart-count');
        
        if (cartIcon && cartCount) {
            cartIcon.addEventListener('click', function() {
                if ('vibrate' in navigator) {
                    navigator.vibrate(50);
                }
                
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        }
    }

    // Device detection
    function detectDevice() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isTablet = /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768 && window.innerWidth <= 1024;
        const isLaptop = window.innerWidth >= 1024 && window.innerWidth <= 1440;
        const isDesktop = window.innerWidth > 1440;
        
        document.body.classList.remove('mobile-device', 'tablet-device', 'laptop-device', 'desktop-device');
        
        if (isMobile) {
            document.body.classList.add('mobile-device');
        } else if (isTablet) {
            document.body.classList.add('tablet-device');
        } else if (isLaptop) {
            document.body.classList.add('laptop-device');
        } else if (isDesktop) {
            document.body.classList.add('desktop-device');
        }
        
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            document.body.classList.add('touch-device');
        }

        if (window.devicePixelRatio > 1) {
            document.body.classList.add('high-dpi');
        }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduced-motion');
        }
    }

    // Initialize optimizations
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        detectDevice();
        optimizePerformance();
        optimizeTouch();
        optimizeLaptop();
        handleResponsiveNav();
        optimizeForms();
        optimizeImages();
        optimizeCart();

        // Resize handler
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                detectDevice();
                handleResponsiveNav();
                optimizeLaptop();
            }, 250);
        }, { passive: true });

        // Orientation change handler
        window.addEventListener('orientationchange', function() {
            setTimeout(function() {
                detectDevice();
                handleResponsiveNav();
            }, 500);
        });

        console.log('🚀 Device optimization initialized successfully!');
    }

    // Start optimizations
    init();

    // Export functions
    window.DeviceOptimizer = {
        optimizePerformance,
        optimizeTouch,
        optimizeLaptop,
        handleResponsiveNav,
        optimizeForms,
        optimizeImages,
        optimizeCart,
        detectDevice
    };

})(); 