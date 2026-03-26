// Site Configuration - Single Source of Truth
window.siteConfig = {
    // Router Configuration
    routes: {
        '/': '/pages/home.html',
        '/platform': '/pages/platform.html',
        '/products': '/pages/saas-branded.html',
        '/branded-saas': '/pages/saas-branded.html',
        '/solutions': '/pages/saas-custom.html',
        '/custom-saas': '/pages/saas-custom.html',
        '/services': '/pages/it-services.html',
        '/it-services': '/pages/it-services.html',
        '/pricing': '/pages/calculator.html',
        '/calculator': '/pages/calculator.html',
        '/about': '/pages/partnering.html',
        '/partnering': '/pages/partnering.html',
        '/success-stories': '/pages/success-stories.html',
        '/small-business': '/pages/small-business.html',
        '/ndis': '/pages/ndis.html',
        '/privacy': '/pages/privacy.html',
        '/privacy-branded': '/pages/privacy-branded.html',
        '/privacy-custom': '/pages/privacy-custom.html',
        '/sla-branded': '/pages/sla-branded.html',
        '/sla-custom': '/pages/sla-custom.html',
        '/security': '/pages/security.html'
    }
};

// Expose routes for router.js compatibility
window.siteRoutes = window.siteConfig.routes;
