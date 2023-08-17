import { verifyToken } from '../hooks.js'
import * as operationBatchHandlers from './operationBatch.handlers.js'

const operationBatchRoutes = (app, options, done) => {
  app.addHook('preHandler', verifyToken)
  app.post('/', operationBatchHandlers.createOne)
  app.post('/:id/start', operationBatchHandlers.start)
  app.post('/report', operationBatchHandlers.createReport)
  app.get('/', operationBatchHandlers.getAllNotClosed)
  app.get('/:id', operationBatchHandlers.getOne)
  app.put('/', operationBatchHandlers.updateOne)
  app.delete('/:id', operationBatchHandlers.deleteOne)
  
  done()
}

export default operationBatchRoutes