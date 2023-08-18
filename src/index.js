import 'dotenv/config'
import { HOST, PORT } from './config.js'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import routes from './routes.js'

const app = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty'
    }
  }
})

app.register(cors)
app.register(routes)

const start = () => {
  try {
    app.listen({ host: HOST, port: PORT })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()