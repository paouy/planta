import * as operationBatchJobHandlers from './operationBatchJob.handlers.js'

const operationBatchJobRoutes = (app, options, done) => {
  app.post('/', operationBatchJobHandlers.createOne)
  app.delete('/', operationBatchJobHandlers.deleteOne)

  done()
}

export default operationBatchJobRoutes