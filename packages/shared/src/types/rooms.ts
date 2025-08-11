export interface Room {
  id: string
  name: string
  ownerId: string
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}

export interface RoomMember {
  roomId: string
  userId: string
  role: 'owner' | 'editor' | 'viewer'
  joinedAt: Date
}

export interface RoomPresence {
  userId: string
  userName: string
  cursor?: { x: number; y: number }
  color: string
  lastSeen: Date
}