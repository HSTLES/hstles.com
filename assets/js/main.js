// HSTLES.com — Main JS (vanilla, no jQuery)
(function() {
    'use strict';

    // Rotating headers — auto-cycle every 12 seconds
    function initRotatingHeaders(scope) {
        var root = scope || document;
        var headers = root.querySelectorAll('.rotating-header');
        if (headers.length === 0) return;

        var current = 0;

        // Hide all, show first
        headers.forEach(function(h) { h.style.opacity = '0'; h.style.display = 'none'; });
        headers[0].style.display = '';
        headers[0].style.opacity = '1';

        setInterval(function() {
            var prev = headers[current];
            prev.style.opacity = '0';
            setTimeout(function() {
                prev.style.display = 'none';
                current = (current + 1) % headers.length;
                headers[current].style.display = '';
                // Force reflow
                void headers[current].offsetWidth;
                headers[current].style.opacity = '1';
            }, 400);
        }, 12000);
    }

    // Smooth scroll to hash target
    function scrollToHash() {
        var hash = window.location.hash;
        if (hash && hash.length > 1) {
            setTimeout(function() {
                var target = document.querySelector(hash);
                if (target) {
                    var header = document.querySelector('.header');
                    var offset = header ? header.offsetHeight + 16 : 76;
                    var pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top: pos, behavior: 'smooth' });
                }
            }, 150);
        } else {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
    }

    // Back to top button
    function initBackToTop() {
        var btn = document.getElementById('backToTop');
        if (!btn) return;
        window.addEventListener('scroll', function() {
            btn.classList.toggle('show', window.pageYOffset > 300);
        });
    }

    window.scrollToTop = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Initialize on DOM ready
    function init() {
        initRotatingHeaders();
        initBackToTop();
        scrollToHash();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Re-initialize after HTMX content swap
    document.body.addEventListener('htmx:load', function(evt) {
        initRotatingHeaders(evt.detail.elt);
        scrollToHash();
    });

})();
