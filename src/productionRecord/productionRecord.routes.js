import * as productionRecordHandlers from './productionRecord.handlers.js'

const productionRecordRoutes = (app, options, done) => {
  app.post('/', productionRecordHandlers.createOne)
  app.get('/', productionRecordHandlers.getAll)

  done()
}

export default productionRecordRoutes