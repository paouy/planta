import { verifyToken } from '../hooks.js'
import * as userHandlers from './user.handlers.js'

const userRoutes = (app, options, done) => {
  app.addHook('preHandler', verifyToken)
  app.get('/', userHandlers.getAll)
  app.put('/', userHandlers.updateOne)
  app.delete('/:id', userHandlers.deleteOne)
  
  done()
}

export default userRoutes