import { verifyToken } from '../hooks.js'
import * as authHandlers from './auth.handlers.js'

const authRoutes = (app, options, done) => {
  app.post('/login', authHandlers.login)
  app.post('/update-password', { preHandler: verifyToken }, authHandlers.updatePassword)
  
  done()
}

export default authRoutes