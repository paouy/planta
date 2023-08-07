import 'dotenv/config'
import Fastify from 'fastify'
import routes from './routes.js'

const app = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty'
    }
  }
 })

app.register(routes)

const start = async () => {
  try {
    await app.listen({ port: 3000 })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()