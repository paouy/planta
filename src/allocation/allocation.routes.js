import * as allocationHandlers from './allocation.handlers.js'

const allocationRoutes = (app, options, done) => {
  app.post('/', allocationHandlers.createOne)
  app.get('/', allocationHandlers.getAll)
  app.put('/', allocationHandlers.updateOne)
  app.delete('/:id', allocationHandlers.deleteOne)
  
  done()
}

export default allocationRoutes