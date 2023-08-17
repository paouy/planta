import { verifyToken } from '../hooks.js'
import * as materialHandlers from './material.handlers.js'

const materialRoutes = (app, options, done) => {
  app.addHook('preHandler', verifyToken)
  app.post('/', materialHandlers.createOne)
  app.post('/:id/increment', materialHandlers.increment)
  app.get('/', materialHandlers.getAll)
  app.put('/', materialHandlers.updateOne)
  app.delete('/:id', materialHandlers.deleteOne)
  
  done()
}

export default materialRoutes