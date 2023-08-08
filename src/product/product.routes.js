import * as productHandlers from './product.handlers.js'

const productRoutes = (app, options, done) => {
  app.post('/', productHandlers.createOne)
  app.post('/:id/increment', productHandlers.increment)
  app.get('/:id', productHandlers.getOne)
  app.get('/', productHandlers.getAll)
  app.put('/', productHandlers.updateOne)
  app.delete('/:id', productHandlers.deleteOne)
  
  done()
}

export default productRoutes