import { verifyToken } from '../hooks.js'
import * as equipmentHandlers from './equipment.handlers.js'

const equipmentRoutes = (app, options, done) => {
  app.addHook('preHandler', verifyToken)
  app.post('/', equipmentHandlers.createOne)
  app.get('/', equipmentHandlers.getAll)
  app.put('/', equipmentHandlers.updateOne)
  app.delete('/:id', equipmentHandlers.deleteOne)
  
  done()
}

export default equipmentRoutes