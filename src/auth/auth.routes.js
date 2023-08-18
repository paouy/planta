import { verifyToken } from '../hooks.js'
import * as authHandlers from './auth.handlers.js'

const authRoutes = (app, options, done) => {
  app.post('/login', authHandlers.login)
  app.post('/change-password', { preHandler: verifyToken }, authHandlers.changePassword)
  
  done()
}

export default authRoutes