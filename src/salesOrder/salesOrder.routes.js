import * as salesOrderHandlers from './salesOrder.handlers.js'

const salesOrderRoutes = (app, options, done) => {
  app.post('/', salesOrderHandlers.createOne)
  app.post('/:id/confirm', salesOrderHandlers.confirm)
  app.post('/:id/fulfill', salesOrderHandlers.forceFulfilledStatus)
  app.post('/:id/archive', salesOrderHandlers.archive)
  app.post('/:id/cancel', salesOrderHandlers.cancel)
  app.get('/', salesOrderHandlers.getAll)
  app.get('/:id', salesOrderHandlers.getOne)
  app.delete('/:id', salesOrderHandlers.deleteOne)
  
  done()
}

export default salesOrderRoutes