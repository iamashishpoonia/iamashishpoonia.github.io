/**
 * Main JavaScript file for Academic Personal Website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Make sure site title is clickable
    const siteTitle = document.querySelector('.site-title');
    if (siteTitle) {
        // Remove any event listeners that might interfere
        const newSiteTitle = siteTitle.cloneNode(true);
        siteTitle.parentNode.replaceChild(newSiteTitle, siteTitle);
        
        // Add click event to ensure it works
        newSiteTitle.addEventListener('click', function(e) {
            // Don't prevent default - let the link work normally
            console.log('Site title clicked');
        });
    }

    // Mobile menu toggle
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mainNavigation = document.querySelector('.main-navigation');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileNavToggle && mainNavigation) {
        mobileNavToggle.addEventListener('click', function() {
            mainNavigation.classList.toggle('show');
            
            // Change toggle icon
            if (mainNavigation.classList.contains('show')) {
                this.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                this.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mainNavigation.contains(event.target) && !mobileNavToggle.contains(event.target)) {
                if (mainNavigation.classList.contains('show')) {
                    mainNavigation.classList.remove('show');
                    mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
        
        // Close menu when a navigation link is clicked
        if (navMenu) {
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    mainNavigation.classList.remove('show');
                    mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
                });
            });
        }
    }
    
    // Set active navigation item based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('#nav-menu a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href').split('/').pop();
        
        // Remove any existing active classes
        link.classList.remove('active');
        
        if (linkHref === currentPage) {
            link.classList.add('active');
        } else if (currentPage === '' && linkHref === 'about.html') {
            // Don't highlight any link when on homepage
        } else if (currentPage === 'about.html' && linkHref === 'about.html') {
            link.classList.add('active');
        }
    });
    
    // Theme functionality removed as requested
    
    // Publication filtering (for research page)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const publications = document.querySelectorAll('.publication-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Show/hide publications based on filter
                publications.forEach(publication => {
                    if (filter === 'all') {
                        publication.style.display = 'block';
                    } else if (publication.classList.contains(filter)) {
                        publication.style.display = 'block';
                    } else {
                        publication.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});