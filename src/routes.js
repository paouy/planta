import fastifyPlugin from 'fastify-plugin'
import { categoryRoutes } from './category/index.js'
import { customerRoutes } from './customer/index.js'
import { equipmentRoutes } from './equipment/index.js'
import { materialRoutes } from './material/index.js'
import { operationRoutes } from './operation/index.js'
import { productRoutes } from './product/index.js'
import { productionOrderRoutes } from './productionOrder/index.js'
import { productMaterialRoutes } from './productMaterial/index.js'
import { salesOrderRoutes } from './salesOrder/index.js'
import { salesOrderItemRoutes } from './salesOrderItem/index.js'
import { workstationRoutes } from './workstation/index.js'

export default fastifyPlugin((app, options, done) => {
  app.register(categoryRoutes, { prefix: '/api/v1/categories' })
  app.register(customerRoutes, { prefix: '/api/v1/customers' })
  app.register(equipmentRoutes, { prefix: '/api/v1/equipments' })
  app.register(materialRoutes, { prefix: '/api/v1/materials' })
  app.register(operationRoutes, { prefix: '/api/v1/operations' })
  app.register(productRoutes, { prefix: '/api/v1/products' })
  app.register(productionOrderRoutes, { prefix: '/api/v1/production-orders' })
  app.register(productMaterialRoutes, { prefix: '/api/v1/product-materials' })
  app.register(salesOrderRoutes, { prefix: '/api/v1/sales-orders' })
  app.register(salesOrderItemRoutes, { prefix: '/api/v1/sales-order-items' })
  app.register(workstationRoutes, { prefix: '/api/v1/workstations' })

  done()
})
