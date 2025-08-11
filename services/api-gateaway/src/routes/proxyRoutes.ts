import { Express } from 'express'
import { createProxy } from '../utils/createProxy'

export const useProxies = (app: Express) => {
    // Lego
    app.use('/api/lego', createProxy('http://localhost:3001'))
    
    //User
    app.use('/api/users', createProxy('http://localhost:3002'))
    
    // Auth
    app.use('/api/auth', createProxy('http://localhost:3003'))
    
    // Follow
    app.use('/api/follow', createProxy('http://localhost:3004'))
} 