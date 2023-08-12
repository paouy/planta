import * as salesOrderHandlers from './salesOrder.handlers.js'

const salesOrderRoutes = (app, options, done) => {
  app.post('/', salesOrderHandlers.createOne)
  app.post('/:id/confirm', salesOrderHandlers.confirm)
  app.post('/:id/cancel', salesOrderHandlers.cancel)
  app.get('/', salesOrderHandlers.getAllNotFulfilled)
  app.get('/:id', salesOrderHandlers.getOne)
  app.get('/fulfilled', salesOrderHandlers.getAllFulfilled)
  app.put('/', salesOrderHandlers.updateOne)
  app.delete('/:id', salesOrderHandlers.deleteOne)
  
  done()
}

export default salesOrderRoutes