import { z } from 'zod'

const configSchema = z.object({
  // Server
  port: z.coerce.number().default(3001),
  host: z.string().default('0.0.0.0'),
  
  // Database
  databaseUrl: z.string().url(),
  
  // Redis
  redisUrl: z.string().url().optional(),
  
  // MinIO/S3
  s3Endpoint: z.string().optional(),
  s3AccessKey: z.string().optional(),
  s3SecretKey: z.string().optional(),
  s3BucketName: z.string().default('tldraw-assets'),
  
  // Auth
  jwtSecret: z.string().min(32),
  jwtExpiresIn: z.string().default('7d'),
  
  // Environment
  nodeEnv: z.enum(['development', 'production', 'test']).default('development'),
})

const env = {
  port: process.env.PORT,
  host: process.env.HOST,
  databaseUrl: process.env.DATABASE_URL,
  redisUrl: process.env.REDIS_URL,
  s3Endpoint: process.env.S3_ENDPOINT,
  s3AccessKey: process.env.S3_ACCESS_KEY,
  s3SecretKey: process.env.S3_SECRET_KEY,
  s3BucketName: process.env.S3_BUCKET_NAME,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  nodeEnv: process.env.NODE_ENV,
}

export const config = configSchema.parse(env)
export type Config = typeof config