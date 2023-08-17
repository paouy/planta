import fastifyPlugin from 'fastify-plugin'
import { allocationRoutes } from './allocation/index.js'
import { authRoutes } from './auth/index.js'
import { categoryRoutes } from './category/index.js'
import { customerRoutes } from './customer/index.js'
import { equipmentRoutes } from './equipment/index.js'
import { fulfillmentRoutes } from './fulfillment/index.js'
import { jobRoutes } from './job/index.js'
import { lookupRoutes } from './lookup/index.js'
import { materialRoutes } from './material/index.js'
import { miscRoutes } from './misc/index.js'
import { operationRoutes } from './operation/index.js'
import { operationBatchRoutes } from './operationBatch/index.js'
import { operationBatchJobRoutes } from './operationBatchJob/index.js'
import { productRoutes } from './product/index.js'
import { productionOrderRoutes } from './productionOrder/index.js'
import { productionRecordRoutes } from './productionRecord/index.js'
import { productMaterialRoutes } from './productMaterial/index.js'
import { salesOrderRoutes } from './salesOrder/index.js'
import { salesOrderItemRoutes } from './salesOrderItem/index.js'
import { userRoutes } from './user/index.js'
import { workerRoutes } from './worker/index.js'
import { workstationRoutes } from './workstation/index.js'

export default fastifyPlugin((app, options, done) => {
  app.register(allocationRoutes, { prefix: '/api/v1/allocations' })
  app.register(authRoutes, { prefix: '/api/v1/auth' })
  app.register(categoryRoutes, { prefix: '/api/v1/categories' })
  app.register(customerRoutes, { prefix: '/api/v1/customers' })
  app.register(equipmentRoutes, { prefix: '/api/v1/equipments' })
  app.register(fulfillmentRoutes, { prefix: '/api/v1/fulfillments' })
  app.register(jobRoutes, { prefix: '/api/v1/jobs' })
  app.register(lookupRoutes, { prefix: '/api/v1/lookup' })
  app.register(materialRoutes, { prefix: '/api/v1/materials' })
  app.register(miscRoutes, { prefix: '/api/v1' })
  app.register(operationRoutes, { prefix: '/api/v1/operations' })
  app.register(operationBatchRoutes, { prefix: '/api/v1/operation-batches' })
  app.register(operationBatchJobRoutes, { prefix: '/api/v1/operation-batch-jobs' })
  app.register(productRoutes, { prefix: '/api/v1/products' })
  app.register(productionOrderRoutes, { prefix: '/api/v1/production-orders' })
  app.register(productionRecordRoutes, { prefix: '/api/v1/production-records' })
  app.register(productMaterialRoutes, { prefix: '/api/v1/product-materials' })
  app.register(salesOrderRoutes, { prefix: '/api/v1/sales-orders' })
  app.register(salesOrderItemRoutes, { prefix: '/api/v1/sales-order-items' })
  app.register(userRoutes, { prefix: '/api/v1/users' })
  app.register(workerRoutes, { prefix: '/api/v1/workers' })
  app.register(workstationRoutes, { prefix: '/api/v1/workstations' })

  done()
})
