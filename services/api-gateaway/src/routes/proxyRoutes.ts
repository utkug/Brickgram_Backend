import { Express } from 'express'
import proxy from 'express-http-proxy'


// proxyReqOpts -> request optionst to be sent the real service
// srcReq       -> original request
export const useProxies = (app: Express) => {
    app.use('/lego', proxy('http://localhost:3001', {
        proxyReqOptDecorator: (proxtReqOpts, srcReq) => {
            proxtReqOpts.headers['x-user-id'] = srcReq.user?.id
            return proxtReqOpts
        }
    }))

    app.use('/users', proxy('http://localhost:3002', {
        proxyReqOptDecorator: (proxtReqOpts, srcReq) => {
            proxtReqOpts.headers['x-user-id'] = srcReq.user?.id
            return proxtReqOpts
        }
    }))

    app.use('/auth', proxy('http://localhost:3003', {
        proxyReqOptDecorator: (proxtReqOpts, srcReq) => {
            proxtReqOpts.headers['x-user-id'] = srcReq.user?.id
            return proxtReqOpts
        }
    }))

    app.use('/follow', proxy('http://localhost:3004', {
        proxyReqOptDecorator: (proxtReqOpts, srcReq) => {
            proxtReqOpts.headers['x-user-id'] = srcReq.user?.id
            return proxtReqOpts
        }
    }))

} 