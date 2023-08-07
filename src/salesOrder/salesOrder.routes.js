import * as salesOrderHandlers from './salesOrder.handlers.js'

const salesOrderRoutes = (app, options, done) => {
  app.post('/', salesOrderHandlers.createOne)
  app.get('/', salesOrderHandlers.getAllNotFulfilled)
  app.get('/fulfilled', salesOrderHandlers.getAllFulfilled)
  app.get('/:id', salesOrderHandlers.getOne)
  app.put('/', salesOrderHandlers.updateOne)
  app.delete('/:id', salesOrderHandlers.deleteOne)
  app.post('/:id/confirm', salesOrderHandlers.confirm)
  app.post('/:id/cancel', salesOrderHandlers.cancel)
  
  done()
}

export default salesOrderRoutes