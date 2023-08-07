import * as workstationHandlers from './workstation.handlers.js'

const workstationRoutes = (app, options, done) => {
  app.post('/', workstationHandlers.createOne)
  app.get('/', workstationHandlers.getAll)
  app.put('/', workstationHandlers.updateOne)
  app.delete('/:id', workstationHandlers.deleteOne)
  
  done()
}

export default workstationRoutes