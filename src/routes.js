import fastifyPlugin from 'fastify-plugin'
import { categoryRoutes } from './category/index.js'
import { equipmentRoutes } from './equipment/index.js'
import { materialRoutes } from './material/index.js'
import { operationRoutes } from './operation/index.js'
import { productRoutes } from './product/index.js'
import { productMaterialRoutes } from './productMaterial/index.js'
import { workstationRoutes } from './workstation/index.js'

export default fastifyPlugin((app, options, done) => {
  app.register(categoryRoutes, { prefix: '/api/v1/categories' })
  app.register(equipmentRoutes, { prefix: '/api/v1/equipments' })
  app.register(materialRoutes, { prefix: '/api/v1/materials' })
  app.register(operationRoutes, { prefix: '/api/v1/operations' })
  app.register(productRoutes, { prefix: '/api/v1/products' })
  app.register(productMaterialRoutes, { prefix: '/api/v1/product-materials' })
  app.register(workstationRoutes, { prefix: '/api/v1/workstations' })

  done()
})
