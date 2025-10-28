#!/bin/bash

# ParaBank Cypress Test Automation Setup Script

echo "🚀 Setting up ParaBank Cypress Test Automation..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (version 14 or higher) first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 14 ]; then
    echo "❌ Node.js version $NODE_VERSION is not supported. Please install Node.js version 14 or higher."
    exit 1
fi

echo "✅ Node.js version $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Install Cypress
echo "🔧 Installing Cypress..."
npx cypress install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install Cypress"
    exit 1
fi

echo "✅ Cypress installed successfully"

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p cypress/downloads
mkdir -p cypress/screenshots
mkdir -p cypress/videos
mkdir -p cypress/reports

echo "✅ Directories created"

# Verify installation
echo "🔍 Verifying installation..."
npx cypress verify

if [ $? -ne 0 ]; then
    echo "❌ Cypress verification failed"
    exit 1
fi

echo "✅ Cypress verification successful"

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "   1. Run 'npm run cypress:open' to open the Cypress Test Runner"
echo "   2. Run 'npm run cypress:run' to run tests in headless mode"
echo "   3. Check the README.md for detailed usage instructions"
echo ""
echo "🔗 Useful commands:"
echo "   - npm run cypress:open          # Open Cypress Test Runner"
echo "   - npm run cypress:run          # Run tests in headless mode"
echo "   - npm run cypress:run:chrome   # Run tests in Chrome"
echo "   - npm run test:headed          # Run tests with browser visible"
echo ""
echo "📚 Documentation: README.md"
echo "🌐 ParaBank URL: https://parabank.parasoft.com/parabank/"
echo ""
echo "Happy testing! 🧪"
