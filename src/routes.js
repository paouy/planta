import fastifyPlugin from 'fastify-plugin'
import { categoryRoutes } from './category/index.js'
import { operationRoutes } from './operation/index.js'

export default fastifyPlugin((app, options, done) => {
  app.register(categoryRoutes, { prefix: '/api/v1/categories' })
  app.register(operationRoutes, { prefix: '/api/v1/operations' })

  done()
})
