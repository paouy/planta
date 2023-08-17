import { verifyToken } from '../hooks.js'
import * as lookupHandlers from './lookup.handlers.js'

const lookupRoutes = (app, options, done) => {
  app.addHook('preHandler', verifyToken)
  app.get('/', lookupHandlers.get)
  
  done()
}

export default lookupRoutes