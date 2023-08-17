import { verifyToken } from '../hooks.js'
import * as jobHandlers from './job.handlers.js'

const jobRoutes = (app, options, done) => {
  app.addHook('preHandler', verifyToken)
  app.get('/', jobHandlers.getAll)
  app.put('/', jobHandlers.updateOne)
  
  done()
}

export default jobRoutes