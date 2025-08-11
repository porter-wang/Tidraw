import Fastify from 'fastify'
import websocket from '@fastify/websocket'
import cors from '@fastify/cors'
import { roomRoutes } from './routes/rooms.js'
import { config } from '@/config'

const fastify = Fastify({
  logger: {
    level: 'info',
  },
})

// Register plugins
await fastify.register(cors, {
  origin: ['http://localhost:3000', 'http://localhost:5173'], // Vite dev server
  credentials: true,
})

await fastify.register(websocket)

// Register routes
await fastify.register(roomRoutes, { prefix: '/api' })

// Health check
fastify.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() }
})

// Start server
const start = async () => {
  try {
    const port = config.port || 3001
    await fastify.listen({ port, host: '0.0.0.0' })
    fastify.log.info(`🚀 API server listening on port ${port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()