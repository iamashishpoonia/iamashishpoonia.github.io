/**
 * Dark mode functionality for academic website
 * Handles theme switching, persistence, and system preference detection
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dark mode script loaded');
    
    // Theme options
    const THEME_LIGHT = 'light';
    const THEME_DARK = 'dark';
    const STORAGE_KEY = 'preferred-theme';
    
    // Get DOM elements
    const toggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    /**
     * Apply the specified theme to the document
     * @param {string} theme - 'light' or 'dark'
     */
    function applyTheme(theme) {
        console.log('Applying theme:', theme);
        
        // Set data attribute for CSS variables
        html.setAttribute('data-theme', theme);
        
        // Add/remove class-based approach as backup
        if (theme === THEME_DARK) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        
        // Update toggle state
        if (toggle) {
            toggle.checked = theme === THEME_DARK;
        }
        
        // Save preference
        localStorage.setItem(STORAGE_KEY, theme);
    }
    
    /**
     * Toggle between light and dark themes
     */
    function toggleTheme() {
        const currentTheme = localStorage.getItem(STORAGE_KEY) || THEME_LIGHT;
        const newTheme = currentTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
        applyTheme(newTheme);
    }
    
    /**
     * Initialize theme based on saved preference or system preference
     */
    function initTheme() {
        // Check for saved preference
        const savedTheme = localStorage.getItem(STORAGE_KEY);
        
        if (savedTheme) {
            console.log('Using saved theme preference:', savedTheme);
            applyTheme(savedTheme);
        } else {
            // Check system preference
            const prefersDark = window.matchMedia && 
                               window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            console.log('No saved preference, using system preference:', prefersDark ? THEME_DARK : THEME_LIGHT);
            applyTheme(prefersDark ? THEME_DARK : THEME_LIGHT);
        }
    }
    
    // Initialize theme
    initTheme();
    
    // Set up toggle event listener
    if (toggle) {
        toggle.addEventListener('change', function() {
            const newTheme = this.checked ? THEME_DARK : THEME_LIGHT;
            console.log('Toggle changed to:', newTheme);
            applyTheme(newTheme);
        });
    } else {
        console.warn('Theme toggle element not found');
    }
    
    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            // Only apply system preference if user hasn't set a preference
            if (!localStorage.getItem(STORAGE_KEY)) {
                console.log('System theme preference changed');
                applyTheme(e.matches ? THEME_DARK : THEME_LIGHT);
            }
        });
    }
});
