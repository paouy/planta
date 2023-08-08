import * as operationBatchHandlers from './operationBatch.handlers.js'

const operationBatchRoutes = (app, options, done) => {
  app.post('/', operationBatchHandlers.createOne)
  app.get('/:id', operationBatchHandlers.getOne)
  app.get('/', operationBatchHandlers.getAllNotClosed)
  app.put('/', operationBatchHandlers.updateOne)
  app.delete('/:id', operationBatchHandlers.deleteOne)
  
  done()
}

export default operationBatchRoutes