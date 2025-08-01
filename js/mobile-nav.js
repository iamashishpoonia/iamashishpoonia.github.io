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
        // Restore scrolling and remove mobile nav class
        document.body.style.overflow = '';
        document.body.classList.remove('mobile-nav-open');
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
    
    // Create backdrop for clicking outside
    const backdrop = document.createElement('div');
    backdrop.className = 'mobile-nav-backdrop';
    backdrop.addEventListener('click', closeMobileNav);
    document.body.appendChild(backdrop);
    
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
    
    // Attach to the appropriate header container for proper positioning
    let headerContainer = document.querySelector('.site-header .container:not(.d-none)');
    
    // If site-header is hidden or not found, try the hero-header container
    if (!headerContainer || headerContainer.closest('.d-none')) {
        headerContainer = document.querySelector('.hero-header .container');
    }
    
    if (headerContainer) {
        console.log('Adding dropdown to header container for proper positioning');
        headerContainer.appendChild(mobileOverlay);
    } else {
        console.log('Adding dropdown to body (fallback)');
        // Fallback to body with fixed positioning
        mobileOverlay.style.position = 'fixed';
        mobileOverlay.style.top = '60px';
        mobileOverlay.style.right = '15px';
        document.body.appendChild(mobileOverlay);
    }
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
            
            // Check if navigation is currently open
            const overlay = document.querySelector('.mobile-nav-overlay');
            if (overlay && overlay.classList.contains('active')) {
                // If open, close it
                closeMobileNav();
            } else {
                // If closed, open it
                openMobileNav();
            }
        });
    });
}

function openMobileNav() {
    const overlay = document.querySelector('.mobile-nav-overlay');
    const backdrop = document.querySelector('.mobile-nav-backdrop');
    
    if (overlay) {
        // Add classes to control display without locking scroll
        overlay.classList.add('active');
        document.body.classList.add('mobile-nav-open');
        
        // Activate backdrop
        if (backdrop) {
            backdrop.classList.add('active');
        }
        
        // Update toggle button icon to cross (X)
        const toggleButtons = document.querySelectorAll('.mobile-nav-toggle i, #mobile-nav-toggle i');
        toggleButtons.forEach(button => {
            if (button) {
                button.className = 'fas fa-times';
            }
        });
    }
}

function closeMobileNav() {
    const overlay = document.querySelector('.mobile-nav-overlay');
    const backdrop = document.querySelector('.mobile-nav-backdrop');
    
    if (overlay) {
        // Remove classes
        overlay.classList.remove('active');
        document.body.classList.remove('mobile-nav-open');
        
        // Deactivate backdrop
        if (backdrop) {
            backdrop.classList.remove('active');
        }
        
        // Update toggle button icon back to hamburger menu
        const toggleButtons = document.querySelectorAll('.mobile-nav-toggle i, #mobile-nav-toggle i');
        toggleButtons.forEach(button => {
            if (button) {
                button.className = 'fas fa-bars';
            }
        });
    }
}

// Close mobile nav when clicking outside or pressing escape
document.addEventListener('click', function(e) {
    const overlay = document.querySelector('.mobile-nav-overlay');
    const backdrop = document.querySelector('.mobile-nav-backdrop');
    const toggleButton = document.querySelector('.mobile-nav-toggle, #mobile-nav-toggle');
    
    if (overlay && overlay.classList.contains('active')) {
        // Close if clicking outside the overlay and not on the toggle button
        if (!overlay.contains(e.target) && (!toggleButton || !toggleButton.contains(e.target))) {
            closeMobileNav();
        }
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeMobileNav();
    }
});
