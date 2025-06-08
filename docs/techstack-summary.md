# Tech Stack Summary - Tldraw Collaborative Whiteboard

## Core Philosophy
- **Self-hosted first**: Full containerization support with Docker Compose
- **Monorepo approach**: Nx orchestration for frontend, backend, and ORM
- **Real-time collaboration**: Custom Tldraw sync backend implementation
- **Database flexibility**: SQLite default, PostgreSQL optional

## Technology Stack

### Frontend
- **Framework**: React 18+
- **Routing**: TanStack Router (formerly React Location)
- **Language**: TypeScript
- **Whiteboard**: Tldraw SDK with custom sync integration
- **Build Tool**: Nx with Vite/Webpack

### Backend API
- **Framework**: Fastify.js
- **WebSocket**: Built-in Fastify WebSocket support (based on `ws`)
- **Language**: TypeScript
- **Custom Integration**: Tldraw Sync Core (`@tldraw/sync-core`)

### Database & ORM
- **ORM**: Prisma
- **Default Database**: SQLite (development & simple deployments)
- **Production Database**: PostgreSQL (optional upgrade path)
- **Migrations**: Prisma Migrate

### Development & Orchestration
- **Monorepo**: Nx Workspace
- **Package Manager**: npm
- **Language**: TypeScript across all layers
- **Task Runner**: Nx executors and targets

### Deployment & Infrastructure
- **Containerization**: Docker + Docker Compose
- **Self-hosting**: Complete stack bundled in single repository
- **External Dependencies**: Only databases and optional services

## Workspace Structure
```
project-root/
├── apps/
│   ├── frontend/          # React + TanStack Router
│   └── backend/           # Fastify + WebSocket + Tldraw Sync
├── libs/
│   ├── database/          # Prisma schema and migrations
│   ├── shared-types/      # Shared TypeScript interfaces
│   └── tldraw-config/     # Tldraw custom shapes and configurations
├── docker/
│   ├── Dockerfile.frontend
│   ├── Dockerfile.backend
│   └── docker-compose.yml
└── tools/                 # Custom Nx generators and executors
```

## Key Integration Points

### Tldraw Sync Architecture
- **Frontend**: `useSync` hook connecting to custom backend
- **Backend**: `TLSocketRoom` managing document state and WebSocket connections
- **Assets**: Custom asset store implementation
- **Persistence**: Prisma-based document snapshots and state management

### Development Workflow
1. **Database**: `nx run database:migrate` - Apply Prisma migrations
2. **Backend**: `nx serve backend` - Start Fastify server with WebSocket
3. **Frontend**: `nx serve frontend` - Start React development server
4. **Full Stack**: `nx run-many --target=serve --all` - Start all services

### Production Deployment
- Single Docker Compose setup
- Environment-based database switching (SQLite → PostgreSQL)
- Asset storage with configurable backends
- WebSocket scaling considerations

## Architecture Benefits
- **Separation of Concerns**: Clear boundaries between frontend, backend, and data layers
- **Scalability**: Nx enables easy addition of new apps/libs
- **Maintainability**: Shared types and configurations reduce duplication
- **Flexibility**: Database and deployment options accommodate different use cases
- **Real-time Ready**: Built-in WebSocket support for Tldraw collaboration

## Future Considerations
- **Authentication**: JWT/session management integration points
- **Asset Storage**: S3-compatible storage for production
- **Monitoring**: Logging and metrics collection
- **Testing**: E2E testing strategy for real-time features
- **Scaling**: Multiple backend instances with shared state considerations