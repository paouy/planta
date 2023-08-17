import { verifyToken } from '../hooks.js'
import * as productionRecordHandlers from './productionRecord.handlers.js'

const productionRecordRoutes = (app, options, done) => {
  app.addHook('preHandler', verifyToken)
  app.post('/', productionRecordHandlers.createOne)
  app.get('/', productionRecordHandlers.getAll)

  done()
}

export default productionRecordRoutes