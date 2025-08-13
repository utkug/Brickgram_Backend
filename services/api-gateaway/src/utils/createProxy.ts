import proxy from 'express-http-proxy'

// proxyReqOpts -> request optionst to be sent the real service
// srcReq       -> original request
export const createProxy = (targetUrl: string) => {
    return proxy(targetUrl, {
        proxyReqPathResolver: (req) => {
            console.log(req.originalUrl)
            return req.originalUrl
        },
       proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        const user = (srcReq as any).user
        //console.log(targetUrl+srcReq.url)
        if (user) {
            proxyReqOpts.headers['x-user-id'] = user.id
        }
        return proxyReqOpts
       },
    //    userResDecorator: async (proxyRes, proxyResData, userReq, userRes) => {
    //     try {
    //         const json = JSON.parse(proxyResData)
    //         return {
    //             succes: proxyRes.statusCode && proxyRes.statusCode < 400,
    //             message: json.message || null,
    //             data: json.data || null
    //         }
    //     } catch (error) {
    //         return proxyResData
    //     }
    //    }
    })
}