/**
 * Animations for academic website
 * This file contains animations and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Page transition handler - ensure consistent fade-in on all pages
    document.body.style.opacity = "1";
    
    // Handle all internal links for smooth transitions
    document.querySelectorAll('a').forEach(link => {
        // Only handle internal links (not external, mailto, etc)
        if (link.hostname === window.location.hostname && 
            !link.href.includes('mailto:') && 
            !link.getAttribute('target') &&
            !link.href.includes('#')) {
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const destination = this.href;
                
                // Start page exit animation
                document.body.classList.add('page-exit');
                
                // After animation completes, navigate to the new page
                setTimeout(function() {
                    window.location.href = destination;
                }, 300);
            });
        }
    });
    
    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
    }
    
    // Add animation classes to elements when they enter the viewport
    const animateOnScroll = function() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                // Add the 'animated' class which will trigger the CSS transitions
                element.classList.add('animated');
            }
        });
    };
    
    // Initialize animations
    animateOnScroll();
    // Use throttled scroll event for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                animateOnScroll();
                scrollTimeout = null;
            }, 20); // Execute at most every 20ms
        }
    });
    
    // Add smooth scrolling to page anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Toggle mobile navigation
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileNavToggle.classList.toggle('active');
        });
    }
});
