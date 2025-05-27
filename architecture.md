# (Draft) Architecture for Tidraw

Default Settings is:
```
Frontend:  React.js (with Vite for development speed)
Database:  SQLite + Prisma (single database, simple)
Backend:   Fastify (API + WebSocket for tldraw/sync-core)
Auth:      Lucia (lightweight, self-contained)
```

## 🏠 Self-Hosted Architecture Philosophy

### Target Users: 
- **Single developers** or **small teams (<30 users)**
- **Families** wanting private collaboration
- **Small businesses** needing simple whiteboarding
- **Privacy-conscious users** who want data ownership

### Design Principles:
- **Simple deployment** (single Docker compose or binary)
- **Minimal dependencies** (avoid Redis, external services)
- **Resource efficient** (runs on modest hardware)
- **Easy configuration** (environment variables, not complex setup)

## 🏗️ Simplified Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Docker Container                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │   React     │    │   Fastify   │    │ PostgreSQL  │     │
│  │   (Static)  │◄──►│   Server    │◄──►│  + Prisma   │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              File Storage (Local/S3)                │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Core Components (Simplified)

### 1. **Single Fastify Server**
```
Handles:
✅ Static file serving (React build)
✅ REST API endpoints (/api/*)
✅ WebSocket connections (/connect/:roomId)
✅ tldraw/sync-core integration
✅ File uploads/downloads
✅ Authentication (Lucia)
```

### 2. **PostgreSQL Only**
```
Stores:
✅ Users, rooms, permissions
✅ Tldraw documents (JSON snapshots)
✅ File metadata
✅ Activity logs
✅ Sessions (no Redis needed)
```

### 3. **In-Memory Real-time State**
```
For small teams (<30 users):
✅ Active room connections (Map in memory)
✅ User presence (WebSocket state)
✅ Document operations (temporary, then persisted)
✅ Session cache (optional, fallback to DB)
```

## 📦 Deployment Options

### Option 1: Docker Compose (Recommended)
```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/tldraw
    volumes:
      - ./uploads:/app/uploads
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=tldraw
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Option 2: Single Binary (Advanced)
```
# Using bun/node to create self-contained executable
- Embedded SQLite for ultra-simple deployments
- Single file deployment
- Perfect for personal use
```

### Option 3: Cloud One-Click Deploy
```
# For users who want hosted but private
- Railway/Render/Fly.io templates
- Environment variable configuration
- Automatic HTTPS/domains
```

## 🔄 Redis: Optional Enhancement

### Default (No Redis):
```typescript
// In-memory state for small teams
class InMemoryRoomManager {
  private rooms = new Map<string, {
    connections: Set<WebSocket>,
    presence: Map<string, UserPresence>,
    lastActivity: Date
  }>()
  
  // Perfect for <30 users, simple and fast
}
```

### Optional Redis (For Growth):
```typescript
// Easy migration path when team grows
if (process.env.REDIS_URL) {
  roomManager = new RedisRoomManager()
} else {
  roomManager = new InMemoryRoomManager()
}
```

## 🎛️ Configuration Levels

### Basic (Family/Personal):
```env
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret
UPLOAD_DIR=./uploads
```

### Advanced (Small Business):
```env
# Basic config +
REDIS_URL=redis://... (optional)
S3_BUCKET=your-bucket (optional, uses local storage)
SMTP_HOST=your-email (optional, uses console logging)
```

### Enterprise (Future):
```env
# Advanced config +
MULTIPLE_DATABASES=true
LOAD_BALANCER=true
ANALYTICS=true
```