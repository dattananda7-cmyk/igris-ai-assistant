# IGRIS AI Assistant

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![React Native](https://img.shields.io/badge/react%20native-0.73-blue)](https://reactnative.dev/)

**Your AI. Your System. Your Power.**

IGRIS is a comprehensive AI assistant platform that combines a powerful backend API with a beautiful React Native mobile application. Designed for productivity, learning, and creative work with advanced AI capabilities.

## 🌟 Quick Links

- [Features](#-features)
- [Getting Started](#-quick-start)
- [Documentation](#-documentation)
- [Contributing](#-contributing)
- [Roadmap](#-roadmap)

## ✨ Features

### Core Capabilities
- 💬 **AI Chat** - Real-time conversations with OpenAI GPT-4
- 📋 **Project Management** - Organize conversations and work
- ✅ **Task Management** - Create, track, and prioritize todos
- 🧠 **Memory System** - IGRIS learns your preferences and goals
- 🔐 **Secure Authentication** - JWT-based with refresh tokens
- 🎨 **Beautiful UI** - Dark futuristic design with glass-morphism effects

### Coming Soon
- 🎤 Voice input/output
- 📁 File upload and analysis
- 🖼️ Image recognition
- 📊 Analytics dashboard
- 🔗 API integrations
- 🌐 Web application

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (Atlas or local)
- OpenAI API key

### Backend (5 minutes)

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

Server running at `http://localhost:5000`

### Frontend (5 minutes)

```bash
cd frontend
npm install
npm start
# Press 'i' for iOS, 'a' for Android, or 'w' for web
```

For detailed setup, see [DEVELOPMENT.md](DEVELOPMENT.md)

## 📚 Documentation

- **[README.md](README.md)** - Project overview
- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Full setup guide
- **[backend/BACKEND_API.md](backend/BACKEND_API.md)** - API documentation
- **[ROADMAP.md](ROADMAP.md)** - Feature roadmap
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contributing guidelines

## 🏗️ Architecture

### Backend Stack
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **AI**: OpenAI API
- **Auth**: JWT tokens
- **Validation**: Zod

### Frontend Stack
- **Framework**: React Native
- **Platform**: Expo
- **State**: Redux Toolkit
- **Navigation**: React Navigation
- **HTTP**: Axios
- **UI**: React Native Paper

## 📁 Project Structure

```
igris-ai-assistant/
├── backend/                # Node.js Express API
│   ├── src/
│   │   ├── api/           # Route handlers
│   │   ├── models/        # MongoDB schemas
│   │   ├── middleware/    # Express middleware
│   │   └── utils/         # Helper functions
│   └── package.json
├── frontend/              # React Native app
│   ├── src/
│   │   ├── screens/       # Screen components
│   │   ├── redux/         # State management
│   │   ├── api/           # API client
│   │   ├── theme/         # Colors & styles
│   │   └── App.js
│   └── package.json
├── docs/                  # Documentation
├── README.md
├── DEVELOPMENT.md
└── CONTRIBUTING.md
```

## 🔌 API Overview

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
GET    /api/auth/me
```

### Chat
```
POST   /api/chat/conversations
GET    /api/chat/conversations
POST   /api/chat/conversations/:id/messages
GET    /api/chat/conversations/:id/messages
```

### Projects & Tasks
```
POST   /api/projects
GET    /api/projects
POST   /api/tasks
GET    /api/tasks
```

Full API docs: [backend/BACKEND_API.md](backend/BACKEND_API.md)

## 🎨 Design System

### Color Palette
- **Primary**: `#00D9FF` (Cyan)
- **Secondary**: `#FF006E` (Hot Pink)
- **Accent**: `#8338EC` (Purple)
- **Background**: `#0A0E27` (Deep Dark)
- **Surface**: `#1a1f3a` (Surface)

## 💻 Development

### Running Both Servers

```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm start
```

### Code Style

```bash
# Lint backend
cd backend && npm run lint

# Format frontend
cd frontend && npm run format
```

### Testing

```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```

## 🐛 Reporting Bugs

1. Check existing issues
2. Create new issue with:
   - Clear title
   - Description of bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

## 💡 Feature Requests

1. Check roadmap in [ROADMAP.md](ROADMAP.md)
2. Create discussion or issue
3. Include:
   - Feature description
   - Use cases
   - Any constraints

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Quick Contribution Steps
1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

## 📊 Project Status

### Phase 1: MVP ✅
- [x] Backend API
- [x] Chat functionality
- [x] Authentication
- [x] React Native app
- [x] Project/task management
- [x] Memory system

### Phase 2: Enhanced Features 🔄
- [ ] Voice I/O
- [ ] File uploads
- [ ] Image recognition
- [ ] Web app
- [ ] Analytics

### Phase 3: Enterprise 📋
- [ ] Collaboration
- [ ] API integrations
- [ ] Plugin system
- [ ] Advanced memory

See full roadmap: [ROADMAP.md](ROADMAP.md)

## 📈 Performance

- Response time: < 200ms
- Chat latency: < 1s
- Mobile app startup: < 2s
- Database queries: Indexed for O(1) lookups

## 🔒 Security

- JWT token-based authentication
- Secure password hashing (bcryptjs)
- Input validation (Zod)
- CORS protection
- Rate limiting (coming soon)
- XSS prevention

## 📱 Mobile Support

- **iOS**: 14+
- **Android**: 8+
- **Web**: Modern browsers

## 🌐 Environment Variables

### Backend
See [DEVELOPMENT.md](DEVELOPMENT.md#environment-variables) for complete list

### Frontend
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📞 Support

- 📖 [Documentation](https://docs.igris.ai)
- 💬 [GitHub Discussions](https://github.com/dattananda7-cmyk/igris-ai-assistant/discussions)
- 🐛 [Issue Tracker](https://github.com/dattananda7-cmyk/igris-ai-assistant/issues)
- 📧 Email: support@igris.ai
- 💬 Discord: [Join community](https://discord.gg/igris)

## 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for GPT API
- React Native and Expo communities
- MongoDB Atlas
- Contributors and testers

## 🚀 Deployment

### Backend Deployment

```bash
# Heroku
git push heroku main

# Railway
railway up

# Docker
docker build -t igris-backend .
docker run -p 5000:5000 igris-backend
```

### Frontend Deployment

```bash
# Expo EAS
eas build --platform android --auto-submit
eas build --platform ios --auto-submit

# Web
npm run build:web
```

## 🎯 Roadmap Highlights

- **Q4 2024**: MVP launch ✅
- **Q1 2025**: Voice & files 🎤
- **Q2 2025**: Collaboration & analytics 📊
- **Q3 2025**: Integrations & marketplace 🔌
- **Q4 2025**: Enterprise features 🏢

---

<div align="center">

**[🌟 Star us on GitHub](https://github.com/dattananda7-cmyk/igris-ai-assistant)**

Made with ❤️ by the IGRIS Team

</div>
