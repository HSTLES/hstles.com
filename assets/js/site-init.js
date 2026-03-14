// Site Initialization Scripts
// This file consolidates all initialization logic for the site

(function() {
    'use strict';
    
    // ===========================================
    // Navbar Collapse (Mobile)
    // ===========================================
    function initNavbarCollapse() {
        const navbarCollapse = document.getElementById('navbarNav');
        if (!navbarCollapse) return;
        
        const navLinks = navbarCollapse.querySelectorAll('.nav-link:not(.dropdown-toggle)');
        
        navLinks.forEach(function(link) {
            // Remove existing listeners to avoid duplicates
            link.removeEventListener('click', handleNavLinkClick);
            link.addEventListener('click', handleNavLinkClick);
        });
    }
    
    function handleNavLinkClick() {
        if (window.innerWidth < 992) {
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse && typeof bootstrap !== 'undefined') {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        }
    }
    
    // ===========================================
    // Back to Top Button
    // ===========================================
    function initBackToTop() {
        const backToTop = document.getElementById('backToTop');
        if (!backToTop) return;
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
    }
    
    // Global function for onclick handler
    window.scrollToTop = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    
    // ===========================================
    // HTMX Event Handlers
    // ===========================================
    function setupHtmxHandlers() {
        document.body.addEventListener('htmx:afterSwap', function(evt) {
            // Re-init navbar collapse when navbar is loaded
            if (evt.detail.elt.querySelector && evt.detail.elt.querySelector('#navbarNav')) {
                initNavbarCollapse();
            }
        });
    }
    
    // ===========================================
    // Initialize Everything
    // ===========================================
    function init() {
        initNavbarCollapse();
        initBackToTop();
        setupHtmxHandlers();
    }
    
    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Also try after a short delay (for HTMX-loaded content)
    setTimeout(initNavbarCollapse, 150);
    
})();
