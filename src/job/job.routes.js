import * as jobHandlers from './job.handlers.js'

const jobRoutes = (app, options, done) => {
  app.get('/', jobHandlers.getAll)
  app.put('/', jobHandlers.updateOne)
  
  done()
}

export default jobRoutes