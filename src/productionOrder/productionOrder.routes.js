import * as productionOrderHandlers from './productionOrder.handlers.js'

const productionOrderRoutes = (app, options, done) => {
  app.post('/', productionOrderHandlers.createOne)
  app.post('/:id/cancel', productionOrderHandlers.cancel)
  app.post('/:id/release', productionOrderHandlers.release)
  app.get('/:id', productionOrderHandlers.getOne)
  app.get('/', productionOrderHandlers.getAllNotReleased)
  app.get('/released', productionOrderHandlers.getAllReleased)
  app.put('/', productionOrderHandlers.updateOne)
  app.delete('/:id', productionOrderHandlers.deleteOne)
  
  done()
}

export default productionOrderRoutes