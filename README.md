# Tidraw App

A real-time collaborative drawing application built with tldraw, React, and Node.js.

## Features

- 🎨 **Collaborative Drawing**: Real-time multi-user canvas with tldraw
- 🚀 **Fast & Responsive**: Built with modern web technologies
- 🔐 **Authentication**: Secure user management with JWT
- 💾 **Persistence**: PostgreSQL database with Prisma ORM
- 📁 **Asset Storage**: MinIO S3-compatible storage for images/videos
- 🐳 **Docker Ready**: Complete containerization for easy deployment

## Tech Stack

### Frontend

- React 18 + TypeScript
- Vite for fast development
- tldraw SDK for collaborative canvas
- Tailwind CSS for styling
- React Query for state management

### Backend

- Node.js + TypeScript
- Fastify web framework
- tldraw/sync-core for real-time collaboration
- WebSockets for live updates
- Prisma ORM with PostgreSQL
- Redis for caching and sessions
- MinIO for object storage

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose

### Development Setup

1. **Clone and setup the project** (if you haven't already):

   ```bash
   git clone <your-repo>
   cd <your-project>
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start development databases**:

   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d postgres redis minio
   ```

4. **Set up database**:

   ```bash
   npm run db:migrate --workspace=packages/database
   ```

5. **Start development servers**:

   ```bash
   # Terminal 1 - API
   npm run dev --workspace=apps/api

   # Terminal 2 - Web
   npm run dev --workspace=apps/web
   ```

6. **Open your browser**:
   - Web app: http://localhost:3000
   - API: http://localhost:3001
   - MinIO Console: http://localhost:9001 (minioadmin/minioadmin123)

### Production Deployment

1. **Build and start with Docker**:

   ```bash
   docker-compose up -d
   ```

2. **Access your app**:
   - Web app: http://localhost

## Project Structure

```
├── apps/
│   ├── web/          # React frontend
│   └── api/          # Node.js backend
├── packages/
│   ├── shared/       # Shared TypeScript types
│   ├── config/       # Configuration management
│   └── database/     # Prisma schema and client
├── infrastructure/
│   ├── docker/       # Docker configurations
│   └── nginx/        # Nginx proxy config
└── docker-compose.yml
```

## Development Commands

```bash
# Install dependencies
npm install

# Start development
npm run dev                    # Start all services
npm run dev:web               # Start only web app
npm run dev:api               # Start only API

# Build
npm run build                 # Build all packages
npm run build --workspace=apps/web  # Build specific package

# Database
npm run db:migrate --workspace=packages/database    # Run migrations
npm run db:studio --workspace=packages/database     # Open Prisma Studio

# Type checking
npm run type-check            # Check all packages
npm run lint                  # Lint all code
```

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tldraw_app"
REDIS_URL="redis://localhost:6379"
S3_ENDPOINT="http://localhost:9000"
S3_ACCESS_KEY="minioadmin"
S3_SECRET_KEY="minioadmin123"
JWT_SECRET="your-super-secret-jwt-key"
```

## Architecture Notes

- **Monorepo**: Uses npm workspaces for package management
- **Type Safety**: Shared TypeScript types across frontend/backend
- **Real-time Sync**: tldraw's WebSocket-based synchronization
- **Scalability**: Redis for multi-instance coordination
- **Security**: JWT authentication, input validation with Zod
- **Performance**: Optimized builds, asset optimization

## Troubleshooting

### Common Issues

1. **Port conflicts**: Make sure ports 3000, 3001, 5432, 6379, 9000 are available
2. **Database connection**: Ensure PostgreSQL is running and accessible
3. **WebSocket issues**: Check firewall settings for WebSocket connections
4. **Build errors**: Clear node_modules and reinstall dependencies

### Logs

```bash
# View API logs
docker-compose logs -f api

# View all service logs
docker-compose logs -f
```

## Next Steps

- [ ] Implement user authentication
- [ ] Add room permissions and sharing
- [ ] Set up automated testing
- [ ] Add CI/CD pipeline
- [ ] Implement user avatars and profiles
- [ ] Add real-time chat functionality
- [ ] Set up monitoring and logging
