/**
 * HSTLES Page Loader
 * Loads page content into the base index.html template
 */

(function() {
    'use strict';

    const PageLoader = {
        contentContainer: null,
        currentPage: 'home',
        
        // Page routing configuration
        routes: {
            'home': 'pages/home.html',
            'branded-saas': 'pages/saas-branded.html',
            'custom-saas': 'pages/saas-custom.html',
            'privacy': 'pages/privacy.html',
            'privacy-branded': 'pages/privacy-branded.html',
            'privacy-custom': 'pages/privacy-custom.html',
            'sla-branded': 'pages/sla-branded.html',
            'sla-custom': 'pages/sla-custom.html'
        },

        init: function() {
            this.contentContainer = document.getElementById('page-content');
            
            // Handle initial page load
            const hash = window.location.hash.slice(1) || 'home';
            this.loadPage(hash);
            
            // Handle navigation clicks
            this.attachNavigationHandlers();
            
            // Handle browser back/forward
            window.addEventListener('popstate', () => {
                const page = window.location.hash.slice(1) || 'home';
                this.loadPage(page, false);
            });
        },

        loadPage: function(pageName, updateHistory = true) {
            const pageFile = this.routes[pageName];
            
            if (!pageFile) {
                console.error('Page not found:', pageName);
                this.loadPage('home');
                return;
            }

            fetch(pageFile)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(html => {
                    this.parseAndRender(html);
                    this.currentPage = pageName;
                    
                    // Update URL hash
                    if (updateHistory) {
                        if (pageName === 'home') {
                            history.pushState(null, '', window.location.pathname);
                        } else {
                            history.pushState(null, '', '#' + pageName);
                        }
                    }
                    
                    // Scroll to top
                    window.scrollTo(0, 0);
                    
                    // Re-initialize any page-specific scripts
                    this.initPageScripts();
                })
                .catch(error => {
                    console.error('Error loading page:', error);
                    this.contentContainer.innerHTML = '<section class="wrapper"><h2>Error loading page</h2><p>Please try again.</p></section>';
                });
        },

        parseAndRender: function(html) {
            // Extract HEAD_META section
            const headMetaMatch = html.match(/<!-- HEAD_META -->([\s\S]*?)<!-- \/HEAD_META -->/);
            if (headMetaMatch) {
                this.updateHeadMeta(headMetaMatch[1]);
            }

            // Extract STRUCTURED_DATA section
            const structuredDataMatch = html.match(/<!-- STRUCTURED_DATA -->([\s\S]*?)<!-- \/STRUCTURED_DATA -->/);
            
            // Extract CONTENT section
            const contentMatch = html.match(/<!-- CONTENT -->([\s\S]*?)<!-- \/CONTENT -->/);
            if (contentMatch) {
                let content = contentMatch[1].trim();
                
                // Add structured data if present
                if (structuredDataMatch && structuredDataMatch[1].trim()) {
                    content = structuredDataMatch[1].trim() + '\n' + content;
                }
                
                this.contentContainer.innerHTML = content;
            }
        },

        updateHeadMeta: function(metaHtml) {
            // Extract title
            const titleMatch = metaHtml.match(/<title>(.*?)<\/title>/);
            if (titleMatch) {
                document.getElementById('page-title').textContent = titleMatch[1];
                document.title = titleMatch[1];
            }

            // Extract description
            const descMatch = metaHtml.match(/<meta name="description" content="(.*?)".*?\/>/);
            if (descMatch) {
                document.getElementById('page-description').setAttribute('content', descMatch[1]);
            }

            // Extract keywords
            const keywordsMatch = metaHtml.match(/<meta name="keywords" content="(.*?)".*?\/>/);
            if (keywordsMatch) {
                let keywordsMeta = document.querySelector('meta[name="keywords"]');
                if (!keywordsMeta) {
                    keywordsMeta = document.createElement('meta');
                    keywordsMeta.setAttribute('name', 'keywords');
                    document.head.appendChild(keywordsMeta);
                }
                keywordsMeta.setAttribute('content', keywordsMatch[1]);
            }
        },

        attachNavigationHandlers: function() {
            // Handle all internal links
            document.addEventListener('click', (e) => {
                const link = e.target.closest('a');
                if (!link) return;
                
                const href = link.getAttribute('href');
                if (!href) return;
                
                // Ignore dropdown toggles (they have # but shouldn't navigate)
                if (link.hasAttribute('data-bs-toggle') || link.getAttribute('role') === 'button') {
                    return;
                }
                
                // Check if it's an internal page link
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const pageName = href.slice(1);
                    this.loadPage(pageName);
                    return;
                }
                
                // Convert .html links to hash navigation
                const pageMatch = href.match(/^([\w-]+)\.html$/);
                if (pageMatch) {
                    e.preventDefault();
                    const pageName = pageMatch[1];
                    // Map old filenames to new route names
                    const routeMap = {
                        'branded-saas': 'branded-saas',
                        'custom-saas': 'custom-saas',
                        'index': 'home'
                    };
                    const route = routeMap[pageName] || pageName;
                    this.loadPage(route);
                }
            });
        },

        initPageScripts: function() {
            // Re-initialize Bootstrap components if needed
            if (typeof bootstrap !== 'undefined') {
                // Initialize dropdowns
                const dropdowns = document.querySelectorAll('[data-bs-toggle="dropdown"]');
                dropdowns.forEach(dropdown => {
                    new bootstrap.Dropdown(dropdown);
                });
            }

            // Re-initialize any carousels
            const carousels = document.querySelectorAll('.carousel');
            carousels.forEach(carousel => {
                if (typeof bootstrap !== 'undefined' && bootstrap.Carousel) {
                    new bootstrap.Carousel(carousel);
                }
            });

            // Initialize rotating headers
            this.initRotatingHeaders();
        },

        initRotatingHeaders: function() {
            const headers = document.querySelectorAll('.rotating-header');
            if (headers.length === 0) return;

            // Hide all headers except the first one
            headers.forEach((header, index) => {
                header.style.display = index === 0 ? 'block' : 'none';
            });

            let currentIndex = 0;

            // Rotate headers every 15 seconds
            setInterval(() => {
                headers[currentIndex].style.display = 'none';
                currentIndex = (currentIndex + 1) % headers.length;
                headers[currentIndex].style.display = 'block';
            }, 15000);
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => PageLoader.init());
    } else {
        PageLoader.init();
    }

    // Expose to window for debugging
    window.PageLoader = PageLoader;
})();
