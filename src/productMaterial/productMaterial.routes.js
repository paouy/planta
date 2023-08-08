import * as productMaterialHandlers from './productMaterial.handlers.js'

const productMaterialRoutes = (app, options, done) => {
  app.post('/', productMaterialHandlers.createOne)
  app.get('/', productMaterialHandlers.getAllByProduct)
  app.put('/', productMaterialHandlers.updateOne)
  app.post('/delete', productMaterialHandlers.deleteOne)

  done()
}

export default productMaterialRoutes