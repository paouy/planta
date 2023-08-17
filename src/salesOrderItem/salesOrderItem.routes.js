import { verifyToken } from '../hooks.js'
import * as salesOrderItemHandlers from './salesOrderItem.handlers.js'

const salesOrderItemRoutes = (app, options, done) => {
  app.addHook('preHandler', verifyToken)
  app.post('/', salesOrderItemHandlers.createOne)
  app.get('/:id', salesOrderItemHandlers.getOne)
  app.get('/', salesOrderItemHandlers.getAllBySalesOrder)
  app.put('/', salesOrderItemHandlers.updateOne)
  app.delete('/:id', salesOrderItemHandlers.deleteOne)
  
  done()
}

export default salesOrderItemRoutes