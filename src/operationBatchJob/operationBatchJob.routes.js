import { verifyToken } from '../hooks.js'
import * as operationBatchJobHandlers from './operationBatchJob.handlers.js'

const operationBatchJobRoutes = (app, options, done) => {
  app.addHook('preHandler', verifyToken)
  app.post('/', operationBatchJobHandlers.createOne)
  app.post('/delete', operationBatchJobHandlers.deleteOne)

  done()
}

export default operationBatchJobRoutes