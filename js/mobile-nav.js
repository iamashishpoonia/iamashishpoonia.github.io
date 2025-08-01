/* 
 * Simple Mobile Navigation - Fresh Start
 */

document.addEventListener('DOMContentLoaded', function() {
    // Only create mobile navigation on mobile devices
    if (isMobileDevice()) {
        createMobileNavigation();
        setupMobileNavigation();
    }
});

// Check if device is mobile (or narrow screen for testing)
function isMobileDevice() {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Listen for window resize to handle orientation changes
window.addEventListener('resize', function() {
    const overlay = document.querySelector('.mobile-nav-overlay');
    
    if (window.innerWidth > 768) {
        // Desktop mode - remove mobile overlay if it exists
        if (overlay) {
            overlay.remove();
        }
        // Restore scrolling
        document.body.style.overflow = '';
    } else {
        // Mobile mode - create overlay if it doesn't exist
        if (!overlay && !document.querySelector('.mobile-nav-overlay')) {
            createMobileNavigation();
            setupMobileNavigation();
        }
    }
});

function createMobileNavigation() {
    // Check if mobile overlay already exists
    if (document.querySelector('.mobile-nav-overlay')) {
        return;
    }
    
    // Get navigation links from existing nav (prioritize main nav, fallback to hero nav)
    const mainNav = document.querySelector('.main-navigation ul, .main-navigation #nav-menu');
    const heroNav = document.querySelector('.hero-navigation ul, .hero-navigation .hero-nav-menu');
    const navLinks = mainNav || heroNav;
    
    if (!navLinks) {
        return;
    }
    
    // Create mobile overlay with consistent positioning
    const mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'mobile-nav-overlay';
    
    // Create mobile menu (no close button needed)
    const mobileMenu = document.createElement('ul');
    mobileMenu.className = 'mobile-nav-menu';
    
    // Copy links from existing navigation
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.textContent;
        if (link.classList.contains('active')) {
            a.classList.add('active');
        }
        a.onclick = closeMobileNav; // Close menu when link is clicked
        li.appendChild(a);
        mobileMenu.appendChild(li);
    });
    
    // Assemble overlay (just the menu, no close button)
    mobileOverlay.appendChild(mobileMenu);
    
    // Add to body with fixed positioning
    document.body.appendChild(mobileOverlay);
}

function setupMobileNavigation() {
    // Find all mobile toggle buttons
    const toggleButtons = document.querySelectorAll(
        '.mobile-nav-toggle, #mobile-nav-toggle'
    );
    
    toggleButtons.forEach((button) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openMobileNav();
        });
    });
}

function openMobileNav() {
    const overlay = document.querySelector('.mobile-nav-overlay');
    if (overlay) {
        overlay.classList.add('active');
        document.body.classList.add('mobile-nav-open');
    }
}

function closeMobileNav() {
    const overlay = document.querySelector('.mobile-nav-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.classList.remove('mobile-nav-open');
    }
}

// Close mobile nav when clicking outside or pressing escape
document.addEventListener('click', function(e) {
    const overlay = document.querySelector('.mobile-nav-overlay');
    const toggleButton = document.querySelector('.mobile-nav-toggle, #mobile-nav-toggle');
    
    if (overlay && overlay.classList.contains('active')) {
        // Close if clicking outside the overlay and not on the toggle button
        if (!overlay.contains(e.target) && !toggleButton.contains(e.target)) {
            closeMobileNav();
        }
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeMobileNav();
    }
});
