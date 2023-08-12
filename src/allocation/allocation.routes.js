import * as allocationHandlers from './allocation.handlers.js'

const allocationRoutes = (app, options, done) => {
  app.get('/', allocationHandlers.getAll)
  app.post('/increment', allocationHandlers.increment)
  
  done()
}

export default allocationRoutes