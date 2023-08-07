import * as categoryHandlers from './category.handlers.js'

const categoryRoutes = (app, options, done) => {
  app.post('/', categoryHandlers.createOne)
  app.get('/', categoryHandlers.getAll)
  app.put('/', categoryHandlers.updateOne)
  app.delete('/:id', categoryHandlers.deleteOne)
  
  done()
}

export default categoryRoutes