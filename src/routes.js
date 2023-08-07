import fastifyPlugin from 'fastify-plugin'
import { operationRoutes } from './operation/index.js'

export default fastifyPlugin((app, options, done) => {
  app.register(operationRoutes, { prefix: '/api/v1/operations' })

  done()
})
