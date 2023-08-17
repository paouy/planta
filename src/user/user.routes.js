import * as userHandlers from './user.handlers.js'

const userRoutes = (app, options, done) => {
  app.get('/', userHandlers.getAll)
  app.put('/', userHandlers.updateOne)
  app.delete('/:id', userHandlers.deleteOne)
  
  done()
}

export default userRoutes