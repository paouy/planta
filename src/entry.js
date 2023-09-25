import { PUBLIC_PATH, HOST, PORT } from './config.js'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import fastifyStatic from '@fastify/static'
import routes from './routes.js'

const app = Fastify({ logger: true })

app.register(cors)
app.register(fastifyStatic, { root: PUBLIC_PATH })
app.register(routes)

app.setNotFoundHandler((_, reply) => reply.sendFile('index.html'))

const start = () => {
  try {
    app.listen({ host: HOST, port: PORT })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()