import { z } from 'zod'

export const CreateRoomSchema = z.object({
  name: z.string().min(1).max(100),
  isPublic: z.boolean().default(false),
})

export const UpdateRoomSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  isPublic: z.boolean().optional(),
})

export type CreateRoomInput = z.infer<typeof CreateRoomSchema>
export type UpdateRoomInput = z.infer<typeof UpdateRoomSchema>