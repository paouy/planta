import { verifyToken } from '../hooks.js'
import * as workstationHandlers from './workstation.handlers.js'

const workstationRoutes = (app, options, done) => {
  app.addHook('preHandler', verifyToken)
  app.post('/', workstationHandlers.createOne)
  app.get('/', workstationHandlers.getAll)
  app.put('/', workstationHandlers.updateOne)
  app.delete('/:id', workstationHandlers.deleteOne)
  
  done()
}

export default workstationRoutes