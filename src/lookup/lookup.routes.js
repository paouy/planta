import * as lookupHandlers from './lookup.handlers.js'

const lookupRoutes = (app, options, done) => {
  app.get('/', lookupHandlers.get)
  
  done()
}

export default lookupRoutes