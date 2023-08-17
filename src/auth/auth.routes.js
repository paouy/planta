import * as authHandlers from './auth.handlers.js'

const authRoutes = (app, options, done) => {
  app.post('/login', authHandlers.login)
  
  done()
}

export default authRoutes