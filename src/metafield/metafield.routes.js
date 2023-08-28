import { verifyToken } from '../hooks.js'
import * as metafieldHandlers from './metafield.handlers.js'

const metafieldRoutes = (app, options, done) => {
  app.addHook('preHandler', verifyToken)
  app.post('/', metafieldHandlers.createOne)
  app.get('/', metafieldHandlers.getAll)
  app.put('/', metafieldHandlers.updateOne)
  app.delete('/:id', metafieldHandlers.deleteOne)
  
  done()
}

export default metafieldRoutes