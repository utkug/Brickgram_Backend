import proxy from 'express-http-proxy'

export const createProxy = (targetUrl: string) => {
    return proxy(targetUrl, {
       proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        const user = srcReq.user

        if (user) {
            proxyReqOpts.headers['x-user-id'] = user.id;
        }
        return proxyReqOpts
       }
    })
}