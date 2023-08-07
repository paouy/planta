import * as operationHandlers from './operation.handlers.js'

const operationRoutes = (app, options, done) => {
  app.post('/', operationHandlers.createOne)
  app.get('/', operationHandlers.getAll)
  app.put('/', operationHandlers.updateOne)
  app.delete('/:id', operationHandlers.deleteOne)
  
  done()
}

export default operationRoutes