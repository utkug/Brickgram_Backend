export const publicRoutes = [
    // Lego
    { method: 'GET', path: /^\/api\/lego\/sets/ },
    { method: 'GET', path: /^\/api\/lego\/themes/ },
    // Auth
    { method: 'POST', path: /^\/api\/auth\/login/ },
    // User
    { method: 'GET', path: /^\/api\/users\/search/ },
    { method: 'GET', path: /^\/api\/users\/username\/[^/]+$/ },
    { method: 'GET', path: /^\/api\/users\/id\/[A-Za-z0-9_-]+$/ },
    // Follow
    { method: 'GET', path: /^\/api\/follow\/user\/[^/]+$/ }
]