import { verifyToken } from '../hooks.js'
import * as miscService from './misc.handlers.js'

const miscRoutes = (app, options, done) => {
  app.addHook('preHandler', verifyToken)
  app.get('/initializeApp', miscService.initializeApp)

  done()
}

export default miscRoutes