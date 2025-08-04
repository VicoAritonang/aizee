#!/bin/bash

echo "🚀 Setting up Aizee Development Environment..."

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

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found. Creating template..."
    cat > .env.local << EOF
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Optional: Google OAuth
# GOOGLE_CLIENT_ID=your_google_client_id_here
# GOOGLE_CLIENT_SECRET=your_google_client_secret_here
EOF
    echo "📝 Please update .env.local with your Supabase credentials"
fi

# Create public/qr.png if it doesn't exist
if [ ! -f public/qr.png ]; then
    echo "📱 Creating placeholder QR code file..."
    echo "# QR Code placeholder" > public/qr.png
fi

# Run type check
echo "🔍 Running type check..."
npx tsc --noEmit

# Run linting
echo "🧹 Running linting..."
npm run lint

echo "✅ Setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Update .env.local with your Supabase credentials"
echo "2. Run 'npm run dev' to start development server"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "📚 For more information, see README.md" 