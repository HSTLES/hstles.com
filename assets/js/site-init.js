// HSTLES.com — Site initialization (vanilla JS, Alpine.js handles mobile nav)
(function() {
    'use strict';

    // HTMX swap handler — scroll to top on page navigation
    document.body.addEventListener('htmx:afterSwap', function(evt) {
        // If swapping main content area, scroll to top
        if (evt.detail.target && evt.detail.target.id === 'page-content') {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
    });

})();
