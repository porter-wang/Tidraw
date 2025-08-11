# Install all dependencies

echo "📦 Installing dependencies..."
npm install

# Install dependencies for all workspaces

npm install --workspaces

# Build shared packages

echo "🔨 Building shared packages..."
npm run build --workspace=packages/shared
npm run build --workspace=packages/config

# Generate Prisma client

echo "🗄️ Setting up database..."
npm run db:generate --workspace=packages/database

# Create README for the project

cat > README.md << 'EOF'

# Create package.json scripts for convenience

cat > run-dev.sh << 'EOF'
#!/bin/bash

echo "🚀 Starting Tldraw Collaborative App Development Environment"
echo ""

# Check if databases are running

if ! docker-compose ps | grep -q "postgres.\*Up"; then
echo "📦 Starting development databases..."
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d postgres redis minio
echo "⏳ Waiting for databases to be ready..."
sleep 10
fi

echo "🔨 Building shared packages..."
npm run build --workspace=packages/shared
npm run build --workspace=packages/config

echo "🗄️ Generating database client..."
npm run db:generate --workspace=packages/database

echo ""
echo "✅ Setup complete! Starting development servers..."
echo ""
echo "🌐 Web app will be available at: http://localhost:3000"
echo "🔧 API will be available at: http://localhost:3001"
echo "📁 MinIO console: http://localhost:9001 (minioadmin/minioadmin123)"
echo ""

# Start both dev servers

npm run dev

chmod +x run-dev.sh

echo ""
echo "🎉 Project setup complete!"
echo ""
echo "📁 Your project structure:"
tree -L 3 -I node_modules

echo ""
echo "🚀 To get started:"
echo "1. Run: ./run-dev.sh"
echo "2. Open http://localhost:3000 in your browser"
echo ""
echo "📚 Check README.md for detailed instructions"
echo ""

# Show final project structure

echo "📂 Project structure created:"
echo "├── apps/"
echo "│ ├── web/ # React + tldraw frontend"
echo "│ └── api/ # Node.js + WebSocket backend"
echo "├── packages/"
echo "│ ├── shared/ # Shared TypeScript types"
echo "│ ├── config/ # Environment configuration"
echo "│ └── database/ # Prisma database setup"
echo "├── infrastructure/"
echo "│ ├── docker/ # Docker configurations"
echo "│ └── nginx/ # Reverse proxy config"
echo "├── docker-compose.yml"
echo "└── README.md"
