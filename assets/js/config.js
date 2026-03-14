// Site Configuration - Single Source of Truth
window.siteConfig = {
    // Router Configuration
    routes: {
        '/': '/pages/home.html',
        '/partnering': '/pages/partnering.html',
        '/platform': '/pages/platform.html',
        '/success-stories': '/pages/success-stories.html',
        '/small-business': '/pages/small-business.html',
        '/branded-saas': '/pages/saas-branded.html',
        '/custom-saas': '/pages/saas-custom.html',
        '/it-services': '/pages/it-services.html',
        '/ndis': '/pages/ndis.html',
        '/privacy': '/pages/privacy.html',
        '/privacy-branded': '/pages/privacy-branded.html',
        '/privacy-custom': '/pages/privacy-custom.html',
        '/sla-branded': '/pages/sla-branded.html',
        '/sla-custom': '/pages/sla-custom.html',
        '/security': '/pages/security.html',
        '/calculator': '/pages/calculator.html'
    }
};

// Expose routes for router.js compatibility
window.siteRoutes = window.siteConfig.routes;
