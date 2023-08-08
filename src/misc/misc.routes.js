import * as miscService from './misc.handlers.js'

const miscRoutes = (app, options, done) => {
  app.get('/initializeApp', miscService.initializeApp)

  done()
}

export default miscRoutes