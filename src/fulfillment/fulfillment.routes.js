import * as fulfillmentHandlers from './fulfillment.handlers.js'

const fulfillmentRoutes = (app, options, done) => {
  app.post('/', fulfillmentHandlers.createOne)
  app.get('/', fulfillmentHandlers.getAllBySalesOrderItem)
  app.delete('/:id', fulfillmentHandlers.deleteOne)
  
  done()
}

export default fulfillmentRoutes