/* 
 * Homepage-Specific Mobile Navigation - Dedicated Solution
 */

document.addEventListener('DOMContentLoaded', function() {
    // Determine if this is the homepage
    const isHomepage = document.querySelector('.hero-header') !== null;
    
    // Only create mobile navigation on mobile devices
    if (isMobileDevice()) {
        if (isHomepage) {
            createHomepageMobileNav();
        } else {
            createSubpageMobileNav();
        }
        setupMobileNavListeners();
    }
});

// Check if device is mobile (or narrow screen for testing)
function isMobileDevice() {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Listen for window resize to handle orientation changes
window.addEventListener('resize', function() {
    const overlay = document.querySelector('.mobile-nav-overlay, .homepage-mobile-nav');
    
    if (window.innerWidth > 768) {
        // Desktop mode - remove mobile overlay if it exists
        if (overlay) {
            overlay.remove();
        }
        // Remove backdrop
        const backdrop = document.querySelector('.mobile-nav-backdrop, .homepage-backdrop');
        if (backdrop) {
            backdrop.remove();
        }
        // Restore scrolling and remove mobile nav class
        document.body.style.overflow = '';
        document.body.classList.remove('mobile-nav-open');
    } else {
        // Mobile mode - create overlay if it doesn't exist
        if (!overlay) {
            const isHomepage = document.querySelector('.hero-header') !== null;
            if (isHomepage) {
                createHomepageMobileNav();
            } else {
                createSubpageMobileNav();
            }
            setupMobileNavListeners();
        }
    }
});

// Homepage-specific mobile navigation
function createHomepageMobileNav() {
    // Check if homepage mobile nav already exists
    if (document.querySelector('.homepage-mobile-nav')) {
        return;
    }
    
    // Create backdrop for homepage
    const backdrop = document.createElement('div');
    backdrop.className = 'mobile-nav-backdrop homepage-backdrop';
    backdrop.addEventListener('click', closeHomepageMobileNav);
    document.body.appendChild(backdrop);
    
    // Get navigation links from hero nav
    const heroNav = document.querySelector('.hero-navigation ul, .hero-nav-menu');
    
    if (!heroNav) {
        console.warn('Hero navigation not found on homepage');
        return;
    }
    
    // Create mobile overlay specifically for homepage
    const mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'mobile-nav-overlay homepage-mobile-nav';
    
    // Create mobile menu
    const mobileMenu = document.createElement('ul');
    mobileMenu.className = 'mobile-nav-menu';
    
    // Copy links from hero navigation
    const links = heroNav.querySelectorAll('a');
    links.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.textContent;
        if (link.classList.contains('active')) {
            a.classList.add('active');
        }
        a.addEventListener('click', closeHomepageMobileNav);
        li.appendChild(a);
        mobileMenu.appendChild(li);
    });
    
    // Assemble overlay
    mobileOverlay.appendChild(mobileMenu);
    document.body.appendChild(mobileOverlay);
    
    console.log('Homepage mobile navigation created');
}

// Subpage mobile navigation (existing implementation)
function createSubpageMobileNav() {
    // Check if mobile overlay already exists
    if (document.querySelector('.mobile-nav-overlay:not(.homepage-mobile-nav)')) {
        return;
    }
    
    // Create backdrop for clicking outside
    const backdrop = document.createElement('div');
    backdrop.className = 'mobile-nav-backdrop';
    backdrop.addEventListener('click', closeSubpageMobileNav);
    document.body.appendChild(backdrop);
    
    // Get navigation links from existing nav (prioritize main nav, fallback to hero nav)
    const mainNav = document.querySelector('.main-navigation ul, .main-navigation #nav-menu');
    const heroNav = document.querySelector('.hero-navigation ul, .hero-nav-menu');
    const navLinks = mainNav || heroNav;
    
    if (!navLinks) {
        console.warn('Navigation not found on subpage');
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
        a.addEventListener('click', closeSubpageMobileNav);
        li.appendChild(a);
        mobileMenu.appendChild(li);
    });
    
    // Assemble overlay
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
    
    console.log('Subpage mobile navigation created');
}

// Setup event listeners for toggle buttons
function setupMobileNavListeners() {
    // Get all mobile nav toggle buttons
    const toggleButtons = document.querySelectorAll('.mobile-nav-toggle, #mobile-nav-toggle');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Determine if we're on homepage
            const isHomepage = document.querySelector('.hero-header') !== null;
            
            if (isHomepage) {
                toggleHomepageMobileNav();
            } else {
                toggleSubpageMobileNav();
            }
        });
    });
}

// Homepage-specific toggle functions
function toggleHomepageMobileNav() {
    const overlay = document.querySelector('.homepage-mobile-nav');
    const backdrop = document.querySelector('.homepage-backdrop');
    
    if (!overlay || !backdrop) {
        console.warn('Homepage mobile nav elements not found');
        return;
    }
    
    if (overlay.classList.contains('active')) {
        closeHomepageMobileNav();
    } else {
        openHomepageMobileNav();
    }
}

function openHomepageMobileNav() {
    const overlay = document.querySelector('.homepage-mobile-nav');
    const backdrop = document.querySelector('.homepage-backdrop');
    
    if (overlay) {
        overlay.classList.add('active');
    }
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

function closeHomepageMobileNav() {
    const overlay = document.querySelector('.homepage-mobile-nav');
    const backdrop = document.querySelector('.homepage-backdrop');
    
    if (overlay) {
        overlay.classList.remove('active');
    }
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

// Subpage-specific toggle functions
function toggleSubpageMobileNav() {
    const overlay = document.querySelector('.mobile-nav-overlay:not(.homepage-mobile-nav)');
    if (overlay && overlay.classList.contains('active')) {
        closeSubpageMobileNav();
    } else {
        openSubpageMobileNav();
    }
}

function openSubpageMobileNav() {
    const overlay = document.querySelector('.mobile-nav-overlay:not(.homepage-mobile-nav)');
    const backdrop = document.querySelector('.mobile-nav-backdrop:not(.homepage-backdrop)');
    
    if (overlay) {
        overlay.classList.add('active');
        document.body.classList.add('mobile-nav-open');
    }
    
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

function closeSubpageMobileNav() {
    const overlay = document.querySelector('.mobile-nav-overlay:not(.homepage-mobile-nav)');
    const backdrop = document.querySelector('.mobile-nav-backdrop:not(.homepage-backdrop)');
    
    if (overlay) {
        overlay.classList.remove('active');
        document.body.classList.remove('mobile-nav-open');
    }
    
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

// Close mobile nav when clicking outside or pressing escape
document.addEventListener('click', function(e) {
    const overlay = document.querySelector('.mobile-nav-overlay, .homepage-mobile-nav');
    const toggleButton = document.querySelector('.mobile-nav-toggle, #mobile-nav-toggle');
    
    if (overlay && overlay.classList.contains('active')) {
        // Close if clicking outside the overlay and not on the toggle button
        if (!overlay.contains(e.target) && (!toggleButton || !toggleButton.contains(e.target))) {
            const isHomepage = document.querySelector('.hero-header') !== null;
            if (isHomepage) {
                closeHomepageMobileNav();
            } else {
                closeSubpageMobileNav();
            }
        }
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const isHomepage = document.querySelector('.hero-header') !== null;
        if (isHomepage) {
            closeHomepageMobileNav();
        } else {
            closeSubpageMobileNav();
        }
    }
});
