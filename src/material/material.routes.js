import * as materialHandlers from './material.handlers.js'

const materialRoutes = (app, options, done) => {
  app.post('/', materialHandlers.createOne)
  app.get('/', materialHandlers.getAll)
  app.put('/', materialHandlers.updateOne)
  app.delete('/:id', materialHandlers.deleteOne)
  
  done()
}

export default materialRoutes