#!/bin/bash

# KSM Enterprises Backend Deployment Script
echo "🚀 Starting KSM Enterprises Backend Deployment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from env.example..."
    if [ -f env.example ]; then
        cp env.example .env
        echo "📝 Please update .env file with your actual values:"
        echo "   - Database credentials"
        echo "   - Email credentials"
        echo "   - Other environment variables"
    else
        echo "❌ env.example file not found. Please create .env file manually."
    fi
fi

# Test the application
echo "🧪 Testing the application..."
npm start &
SERVER_PID=$!

# Wait for server to start
sleep 3

# Test if server is running
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Server is running on http://localhost:3000"
else
    echo "❌ Server failed to start"
    kill $SERVER_PID 2>/dev/null
    exit 1
fi

# Stop the test server
kill $SERVER_PID 2>/dev/null

echo ""
echo "🎉 Local setup completed successfully!"
echo ""
echo "📋 Next steps for deployment:"
echo "1. Choose a deployment platform (Render, Railway, Heroku, Vercel)"
echo "2. Set up your database (PlanetScale, Railway MySQL, AWS RDS)"
echo "3. Configure environment variables"
echo "4. Deploy your application"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
echo ""
echo "🔗 Quick deployment links:"
echo "- Render: https://render.com"
echo "- Railway: https://railway.app"
echo "- PlanetScale (Database): https://planetscale.com"
echo "" 