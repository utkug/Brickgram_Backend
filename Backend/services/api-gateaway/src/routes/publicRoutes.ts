    export const publicRoutes = [
        // Lego
        { method: 'GET', path: /^\/api\/lego\/sets/ },
        { method: 'GET', path: /^\/api\/lego\/themes/ },
        // Auth
        { method: 'POST', path: /^\/api\/auth\/login/ },
        { method: 'POST', path: /^\/api\/auth\/register/ },
        // User
        { method: 'GET', path: /^\/api\/users\/search/ },
        { method: 'POST', path: /^\/api\/users$/ },
        { method: 'GET', path: /^\/api\/users\/username\/[^/]+$/ },
        { method: 'GET', path: /^\/api\/users\/id\/[A-Za-z0-9_-]+$/ },
        // Follow
        { method: 'GET', path: /^\/api\/follow\/user\/[^/]+$/ },
        { method: 'GET', path: /^\/api\/follow\/[A-Za-z0-9._-]+\/followers\/?$/},
        { method: 'GET', path: /^\/api\/follow\/[A-Za-z0-9._-]+\/followings\/?$/}
    ]