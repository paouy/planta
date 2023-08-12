import * as allocationHandlers from './allocation.handlers.js'

const allocationRoutes = (app, options, done) => {
  app.get('/', allocationHandlers.getAll)
  app.put('/', allocationHandlers.updateOne)
  
  done()
}

export default allocationRoutes