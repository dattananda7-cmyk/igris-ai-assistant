# IGRIS - Your AI. Your System. Your Power.

A futuristic AI-powered personal assistant operating system for Android. IGRIS combines natural language chat, voice interaction, file analysis, and intelligent assistance into a unified, premium experience.

## Features (Roadmap)

### Phase 1 - MVP ✅
- 🤖 Intelligent AI chat interface
- 🎨 Dark futuristic UI with glassmorphism design
- 💬 Conversation history & management
- ⚙️ Settings & preferences
- 🔐 Secure authentication (JWT)

### Phase 2
- 🎤 Voice input & output
- 📸 Image upload & analysis
- 💾 File analysis & discussion
- 🧠 User memory system
- 📁 Project management

### Phase 3
- 🔍 Web research & search
- ✅ Tasks, reminders & goals
- 🎯 Multiple AI modes (Learn, Create, Code, Plan, etc.)
- 📊 Personal dashboard

### Phase 4
- 🛠️ App/Website builder with AI
- 👁️ Vision mode for image analysis
- 🤖 Advanced automation
- 📈 Analytics & insights

## Tech Stack

**Frontend:** React Native + Redux + Expo
**Backend:** Node.js + Express + MongoDB
**AI:** OpenAI GPT-4 API
**Storage:** AWS S3 / Firebase Storage
**Database:** MongoDB Atlas
**Hosting:** AWS EC2 / Railway / DigitalOcean

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- OpenAI API key
- Expo CLI (for frontend)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your API keys
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
expo start
```

## Project Structure
```
igris-ai-assistant/
├── backend/           # Express.js API server
├── frontend/          # React Native app
├── docs/             # Documentation
└── ARCHITECTURE.md   # Detailed architecture
```

## API Documentation

See `docs/API.md` for complete API endpoints.

## Development Guide

See `docs/DEVELOPMENT.md` for development workflow, coding standards, and best practices.

## Security

- API keys stored securely in backend (never in frontend)
- JWT authentication with refresh tokens
- HTTPS-only communication
- Input validation & sanitization
- Rate limiting on sensitive endpoints
- Secure file upload handling

## Deployment

See `docs/SETUP.md` for detailed deployment instructions.

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Open a Pull Request

## License

MIT License - See LICENSE file

## Brand & Vision

**IGRIS** is more than a chatbot—it's a personal AI operating system.

**Tagline:** "Your AI. Your System. Your Power."

**Personality:**
- Intelligent and knowledgeable
- Calm and helpful
- Futuristic and innovative
- Respectful and friendly
- Confident without being arrogant

The app should feel like having a powerful AI companion in your pocket, ready to help you learn, create, build, and achieve.

## Contact & Support

- 📧 Email: support@igris.ai (placeholder)
- 🐛 Issues: GitHub Issues
- 💬 Discussions: GitHub Discussions

---

**Built with ❤️ for the future of personal AI assistance.**
