import { verifyToken } from '../hooks.js'
import * as workerHandlers from './worker.handlers.js'

const workerRoutes = (app, options, done) => {
  app.addHook('preHandler', verifyToken)
  app.post('/', workerHandlers.createOne)
  app.get('/', workerHandlers.getAll)
  app.put('/', workerHandlers.updateOne)
  app.delete('/:id', workerHandlers.deleteOne)
  
  done()
}

export default workerRoutes