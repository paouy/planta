import { verifyToken } from '../hooks.js'
import * as allocationHandlers from './allocation.handlers.js'

const allocationRoutes = (app, options, done) => {
  app.addHook('preHandler', verifyToken)
  app.get('/', allocationHandlers.getAll)
  app.post('/increment', allocationHandlers.increment)
  
  done()
}

export default allocationRoutes