# IGRIS - AI Assistant Platform

**Your AI. Your System. Your Power.**

IGRIS is a comprehensive AI assistant platform combining a powerful backend API with a beautiful React Native mobile application. Designed for productivity, learning, and creative work with advanced AI capabilities.

## 🌟 Features

### Core Features (Phase 1)
- 💬 **AI Chat** - Real-time conversations with OpenAI GPT
- 🎯 **Project Management** - Organize conversations and tasks
- ✅ **Task Management** - Create, track, and manage todos
- 🧠 **Memory System** - IGRIS remembers your preferences and goals
- 🔐 **Secure Auth** - JWT-based authentication with refresh tokens
- 🎨 **Beautiful UI** - Dark futuristic design with glass-morphism

### Planned Features (Phase 2)
- 🎤 **Voice Input/Output** - Talk to IGRIS, hear responses
- 📁 **File Upload** - Upload documents for analysis
- 🖼️ **Image Recognition** - Process and analyze images
- 📊 **Analytics Dashboard** - Usage and productivity insights
- 🔗 **API Integration** - Connect external services
- 🌐 **Web Version** - Full-featured web application

## 📁 Project Structure

```
igris-ai-assistant/
├── backend/                    # Node.js Express API
│   ├── src/
│   │   ├── api/               # API route handlers
│   │   ├── config/            # Configuration files
│   │   ├── middleware/        # Express middleware
│   │   ├── models/            # MongoDB schemas
│   │   ├── utils/             # Utility functions
│   │   └── server.js          # Entry point
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── frontend/                   # React Native app (Expo)
│   ├── src/
│   │   ├── api/               # API client
│   │   ├── navigation/        # Navigation config
│   │   ├── redux/             # State management
│   │   ├── screens/           # Screen components
│   │   ├── theme/             # Colors, typography
│   │   └── App.js             # Root component
│   ├── app.json               # Expo config
│   ├── package.json
│   └── README.md
│
└── docs/                       # Documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (Atlas or local)
- OpenAI API key
- npm or yarn

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your credentials

# Start development server
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start Expo development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on web
npm run web
```

## 🔧 Environment Variables

### Backend (.env)

```env
# Server
NODE_ENV=development
PORT=5000
API_URL=http://localhost:5000

# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/igris

# JWT
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRE=30d

# OpenAI
OPENAI_API_KEY=sk-your-key-here
OPENAI_MODEL=gpt-4

# AWS S3 (Phase 2)
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_S3_BUCKET=igris-uploads
AWS_REGION=us-east-1

# Redis (for queues)
REDIS_URL=redis://localhost:6379

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:8081
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📚 API Documentation

### Authentication Endpoints

```
POST   /api/auth/register          # Register new user
POST   /api/auth/login              # Login user
POST   /api/auth/refresh            # Refresh access token
GET    /api/auth/me                 # Get current user
PUT    /api/auth/profile            # Update profile
PUT    /api/auth/preferences        # Update preferences
POST   /api/auth/logout             # Logout user
```

### Chat Endpoints

```
POST   /api/chat/conversations              # Create conversation
GET    /api/chat/conversations              # List conversations
GET    /api/chat/conversations/:id          # Get conversation
POST   /api/chat/conversations/:id/messages # Send message
GET    /api/chat/conversations/:id/messages # Get messages
PUT    /api/chat/conversations/:id          # Rename conversation
DELETE /api/chat/conversations/:id          # Delete conversation
```

### Projects Endpoints

```
POST   /api/projects                # Create project
GET    /api/projects                # List projects
GET    /api/projects/:id            # Get project
PUT    /api/projects/:id            # Update project
DELETE /api/projects/:id            # Delete project
POST   /api/projects/:id/goals      # Add goal
DELETE /api/projects/:id/goals/:idx # Remove goal
```

### Tasks Endpoints

```
POST   /api/tasks              # Create task
GET    /api/tasks              # List tasks
GET    /api/tasks/:id          # Get task
PUT    /api/tasks/:id          # Update task
DELETE /api/tasks/:id          # Delete task
```

### Memory Endpoints

```
POST   /api/memories           # Create memory
GET    /api/memories           # List memories
DELETE /api/memories/:id       # Delete memory
DELETE /api/memories/clear-all # Clear all memories
```

## 🏗️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT
- **AI**: OpenAI API
- **File Storage**: AWS S3 (Phase 2)
- **Task Queue**: Bull + Redis (Phase 2)
- **Validation**: Zod
- **Logging**: Winston

### Frontend
- **Framework**: React Native
- **Platform**: Expo
- **State Management**: Redux Toolkit
- **Routing**: React Navigation
- **HTTP Client**: Axios
- **UI**: React Native Paper
- **Storage**: AsyncStorage

## 🔐 Security

- JWT-based authentication
- Secure token refresh mechanism
- Password hashing with bcryptjs
- Input validation with Zod
- CORS protection
- Helmet.js security headers
- Rate limiting (Phase 1)
- XSS prevention with input sanitization

## 📱 Mobile App Screens

- **Splash Screen** - App initialization
- **Login Screen** - User authentication
- **Signup Screen** - Account creation
- **Home Screen** - Chat list and quick actions
- **Chat Screen** - Real-time conversation
- **Settings Screen** - User preferences

## 🎨 Design System

### Color Palette
- **Primary**: `#00D9FF` (Cyan)
- **Secondary**: `#FF006E` (Hot Pink)
- **Accent**: `#8338EC` (Purple)
- **Background**: `#0A0E27` (Deep Dark Blue)
- **Surface**: `#1a1f3a` (Surface Dark)

### Typography
- **Headings**: Weights 700-800, sizes 20-32px
- **Body**: Weight 400, size 14-16px
- **Captions**: Weight 500, size 12px

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 📦 Deployment

### Backend Deployment (Heroku, Railway, Render)

```bash
# Push to production
git push heroku main
```

### Frontend Deployment (EAS, Expo)

```bash
# Build APK for Android
eas build --platform android

# Build IPA for iOS
eas build --platform ios
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🙋 Support

For issues, questions, or feedback:
- Open an issue on GitHub
- Email: support@igris.ai
- Documentation: https://docs.igris.ai

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Core chat functionality
- ✅ User authentication
- ✅ Project management
- ✅ Task management
- ✅ Memory system
- ✅ Mobile app

### Phase 2
- 🔄 Voice input/output
- 🔄 File upload and analysis
- 🔄 Image recognition
- 🔄 Web application
- 🔄 Analytics dashboard
- 🔄 API integrations

### Phase 3
- 📋 Collaborative features
- 📋 Advanced AI modes
- 📋 Plugin system
- 📋 API marketplace

---

**Made with ❤️ by the IGRIS Team**
