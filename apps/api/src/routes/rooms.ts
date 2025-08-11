import { FastifyPluginAsync } from 'fastify'
import { TLSocketRoom } from '@tldraw/sync-core'
import { createTLSchema, defaultShapeSchemas, defaultBindingSchemas } from '@tldraw/tlschema'

// Create schema for tldraw
const schema = createTLSchema({
  shapes: defaultShapeSchemas,
  bindings: defaultBindingSchemas,
})

// Store rooms in memory (use Redis in production)
const rooms = new Map<string, TLSocketRoom>()

function getOrCreateRoom(roomId: string): TLSocketRoom {
  if (!rooms.has(roomId)) {
    const room = new TLSocketRoom({
      schema,
      // Add persistence hooks here later
      onDocumentChange: (snapshot) => {
        // Save to database
        console.log(`Room ${roomId} changed, saving snapshot...`)
      },
      onUserPresenceChange: (presence) => {
        console.log(`User presence changed in room ${roomId}:`, presence)
      },
    })
    
    rooms.set(roomId, room)
    console.log(`Created new room: ${roomId}`)
  }
  
  return rooms.get(roomId)!
}

export const roomRoutes: FastifyPluginAsync = async (fastify) => {
  // WebSocket endpoint for tldraw sync
  fastify.register(async function (fastify) {
    fastify.get('/rooms/:roomId/connect', { websocket: true }, (connection, req) => {
      const { roomId } = req.params as { roomId: string }
      
      if (!roomId) {
        connection.socket.close(1003, 'Room ID required')
        return
      }
      
      console.log(`Client connecting to room: ${roomId}`)
      
      const room = getOrCreateRoom(roomId)
      
      // Add client to room
      room.addClient(connection.socket)
      
      connection.socket.on('close', () => {
        console.log(`Client disconnected from room: ${roomId}`)
        room.removeClient(connection.socket)
      })
      
      connection.socket.on('error', (error) => {
        console.error(`WebSocket error in room ${roomId}:`, error)
      })
    })
  })

  // REST endpoints for room management
  fastify.get('/rooms/:roomId', async (request, reply) => {
    const { roomId } = request.params as { roomId: string }
    const room = rooms.get(roomId)
    
    if (!room) {
      return reply.code(404).send({ error: 'Room not found' })
    }
    
    return {
      roomId,
      clientCount: room.getClientCount(),
      snapshot: room.getCurrentSnapshot(),
    }
  })

  fastify.post('/rooms/:roomId', async (request, reply) => {
    const { roomId } = request.params as { roomId: string }
    const room = getOrCreateRoom(roomId)
    
    return {
      roomId,
      created: true,
      clientCount: room.getClientCount(),
    }
  })
}