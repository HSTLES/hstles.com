// Client-side router to handle direct links and clean URLs
(function() {
    
    // Config: Routes should be defined in window.siteRoutes by the embedding page
    const routes = window.siteRoutes || {};

    function loadContent() {
        const path = window.location.pathname;
        // Normalize path (remove trailing slash)
        const cleanPath = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
        
        // Skip router if htmx hasn't loaded (race condition safety)
        if (typeof htmx === 'undefined') return;

        let targetFragment = null;

        // 1. Check for Clean URL match
        if (routes[cleanPath]) {
            targetFragment = routes[cleanPath];
        } 
        // 2. Fallback: Check for Hash Routing
        else if (window.location.hash.length > 1) {
             let hashPath = window.location.hash.substring(1); // remove #
             
             // Check if it's a Clean URL style hash (#branded-saas)
             let routeMatch = routes['/' + hashPath] || routes[hashPath];
             if (routeMatch) {
                 targetFragment = routeMatch;
             }
             // Check if it's a direct file path (#pages/foo.html)
             else if (hashPath.match(/^[a-zA-Z0-9\-\/]+\.html$/)) {
                 targetFragment = hashPath;
             }
        }
        // 3. Default to Home if root (and no route matched above)
        else if ((cleanPath === '/' || cleanPath === '' || cleanPath === '/index.html') && routes['/']) {
            targetFragment = routes['/'];
        }

        // Execute Load if we have a target
        if (targetFragment) {
            htmx.ajax('GET', targetFragment, {
                target: '#page-content',
                swap: 'innerHTML'
            });
        }
    }

    // Run on initial load
    window.addEventListener('load', loadContent);
    window.addEventListener('hashchange', loadContent);
    // Be ready for HTMX to load
    if (typeof htmx === 'undefined') {
        document.addEventListener('DOMContentLoaded', loadContent);
    }

})();
