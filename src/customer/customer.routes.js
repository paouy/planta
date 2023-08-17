import { verifyToken } from '../hooks.js'
import * as customerHandlers from './customer.handlers.js'

const customerRoutes = (app, options, done) => {
  app.addHook('preHandler', verifyToken)
  app.post('/', customerHandlers.createOne)
  app.get('/', customerHandlers.getAll)
  app.put('/', customerHandlers.updateOne)
  app.delete('/:id', customerHandlers.deleteOne)
  
  done()
}

export default customerRoutes