import proxy from 'express-http-proxy'

export const createProxy = (targetUrl: string) => {
    return proxy(targetUrl, {
        proxyReqPathResolver: (req) => {
            return `/api${req.url}`
        },
       proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        const user = (srcReq as any).user
        if (user) {
            proxyReqOpts.headers['x-user-id'] = user.id;
        }
        return proxyReqOpts
       }
    })
}