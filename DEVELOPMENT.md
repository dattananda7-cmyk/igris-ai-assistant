# Development Setup Guide

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- MongoDB (local or Atlas cloud)
- OpenAI API key
- Git

## Full Stack Setup

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/igris-ai-assistant.git
cd igris-ai-assistant
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Create Environment File
```bash
cp .env.example .env
```

#### Configure .env

Edit `backend/.env` with your credentials:

```env
# Server Config
NODE_ENV=development
PORT=5000
API_URL=http://localhost:5000

# MongoDB Setup
# Option 1: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/igris

# Option 2: MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/igris?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-key-change-this-in-production
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_REFRESH_EXPIRE=30d

# OpenAI API
# Get your key from https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-your-actual-key-here
OPENAI_MODEL=gpt-4

# CORS Configuration
CORS_ORIGIN=http://localhost:3000,http://localhost:8081

# AWS S3 (optional, for Phase 2)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=
AWS_REGION=us-east-1

# Redis (optional, for Phase 2)
REDIS_URL=redis://localhost:6379
```

#### Start Backend Server
```bash
npm run dev
```

Server will start on `http://localhost:5000`

### 3. Frontend Setup

#### Install Dependencies
```bash
cd ../frontend
npm install
```

#### Create Environment File (if needed)
```bash
# Frontend typically uses app.json for configuration
# API URL can be set in src/api/client.js
```

#### Start Frontend Development Server
```bash
npm start
```

This opens Expo CLI where you can:
- Press `i` for iOS
- Press `a` for Android
- Press `w` for web
- Press `j` for debugging

### 4. Database Setup

#### Option A: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get connection string
5. Add to `.env` as `MONGODB_URI`

#### Option B: Local MongoDB

```bash
# macOS with Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Ubuntu/Debian
sudo apt-get install -y mongodb
sudo systemctl start mongodb

# Windows
# Download from https://www.mongodb.com/try/download/community
```

### 5. OpenAI Setup

1. Create account at https://platform.openai.com
2. Go to API keys section
3. Create new secret key
4. Add to `backend/.env` as `OPENAI_API_KEY`

## Development Workflow

### Running Both Servers (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Testing the API

#### Using cURL
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","username":"testuser","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

#### Using Postman

1. Import the API collection (coming soon)
2. Set up environment variables for:
   - `api_url`: http://localhost:5000
   - `token`: (filled after login)
3. Test endpoints

### Code Structure Tips

**Backend:**
- API routes are organized by feature in `src/api/`
- Models define MongoDB schemas
- Middleware handles auth, validation, error handling
- Utils contain reusable functions

**Frontend:**
- Screens are organized in `src/screens/`
- Redux slices in `src/redux/slices/`
- API calls in `src/api/index.js`
- Theme colors and styles in `src/theme/`

## Troubleshooting

### Backend Issues

**Port 5000 already in use:**
```bash
# Change port in .env
PORT=5001
```

**MongoDB connection error:**
```bash
# Check if MongoDB is running
# macOS: brew services list
# Linux: sudo systemctl status mongodb
```

**OpenAI API key invalid:**
- Double-check your key hasn't expired
- Make sure it's not revoked in the dashboard
- Ensure billing is set up on your OpenAI account

### Frontend Issues

**Expo won't start:**
```bash
# Clear cache and restart
npm start -- --clear
```

**Can't connect to backend from phone:**
- Use `npm start -- --tunnel` to debug over internet
- Or ensure phone is on same WiFi as computer

**Module not found errors:**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "feat: Add my feature"

# Push and create PR
git push origin feature/my-feature
```

## VS Code Setup (Recommended)

### Extensions
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- MongoDB for VS Code
- Thunder Client (API testing)

### Workspace Settings

Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "prettier.singleQuote": true,
  "prettier.trailingComma": "es5"
}
```

## Performance Tips

- Use Redux DevTools to debug state
- Enable Flipper for React Native debugging
- Use Network tab in DevTools to inspect API calls
- Profile backend with `npm run profile`

## Next Steps

1. ✅ Complete setup above
2. 📖 Read API documentation in `backend/BACKEND_API.md`
3. 🎨 Review design system in `frontend/src/theme/`
4. 🧪 Write tests as you develop
5. 📝 Update documentation
6. 🚀 Deploy to staging

## Support

If you get stuck:
1. Check error messages carefully
2. Search GitHub issues
3. Ask on Discord/Slack
4. Create a GitHub issue with details

---

**Happy coding! 🚀**
