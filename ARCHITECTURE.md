# IGRIS Architecture & Design

## Overview
IGRIS is a futuristic AI-powered personal assistant operating system for Android. It combines natural language chat, voice interaction, file analysis, and AI-powered app building into a unified experience.

## Technology Stack

### Frontend (Android)
- **Framework**: React Native (cross-platform) or Native Android (Kotlin)
- **UI Library**: React Native Paper / Material Design 3
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation
- **Voice**: Expo Audio / react-native-voice
- **Camera/Gallery**: react-native-image-picker
- **HTTP Client**: axios with secure token storage
- **Local Storage**: AsyncStorage + encrypted storage for sensitive data
- **Animations**: React Native Reanimated

### Backend (Node.js)
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Authentication**: JWT + Refresh Tokens
- **Database**: MongoDB (flexible schema for conversations/projects)
- **AI Integration**: OpenAI API (via secure backend proxy)
- **File Storage**: AWS S3 or Firebase Storage
- **Task Scheduling**: Bull/BullMQ (Redis-backed)
- **WebSocket**: Socket.io (for real-time AI responses)
- **Validation**: Zod schema validation
- **Logging**: Winston logger

### Infrastructure
- **Hosting**: AWS EC2 / DigitalOcean / Railway
- **Database**: MongoDB Atlas
- **File Storage**: AWS S3 / Google Cloud Storage
- **Environment**: Docker containerization
- **Monitoring**: Sentry (error tracking)

## Folder Structure

```
igris-ai-assistant/
├── backend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── chat/
│   │   │   ├── projects/
│   │   │   ├── tasks/
│   │   │   ├── files/
│   │   ���   └── memories/
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Conversation.js
│   │   │   ├── Message.js
│   │   │   ├── Project.js
│   │   │   ├── Task.js
│   │   │   ├── Memory.js
│   │   │   └── File.js
│   │   ├── services/
│   │   │   ├── ai-service.js
│   │   │   ├── voice-service.js
│   │   │   ├── file-service.js
│   │   │   ├── web-search-service.js
│   │   │   └── notification-service.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   └── validation.js
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   ├── helpers.js
│   │   │   └── security.js
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   ├── env.js
│   │   │   └── ai-client.js
│   │   └── server.js
│   ├── .env.example
│   ├── docker-compose.yml
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── android/
│   │   └── [React Native / Kotlin Android project]
│   │
│   ├── src/
│   │   ├── screens/
│   │   │   ├── AuthStack/
│   │   │   │   ├── LoginScreen.js
│   │   │   │   ├── SignupScreen.js
│   │   │   │   └── OnboardingScreen.js
│   │   │   ├── MainStack/
│   │   │   │   ├── HomeScreen.js
│   │   │   │   ├── ChatScreen.js
│   │   │   │   ├── ProjectsScreen.js
│   │   │   │   ├── TasksScreen.js
│   │   │   │   ├── SettingsScreen.js
│   │   │   │   └── MemoriesScreen.js
│   │   │   └── ModalStack/
│   │   │       ├── VoiceMode.js
│   │   │       ├── BuilderMode.js
│   │   │       └── FileUpload.js
│   │   ├── components/
│   │   │   ├── ChatBubble.js
│   │   │   ├── MessageInput.js
│   │   │   ├── VoiceAnimator.js
│   │   │   ├── QuickActionButton.js
│   │   │   ├── GlassmorphCard.js
│   │   │   └── LoadingState.js
│   │   ├── navigation/
│   │   │   ├── RootNavigator.js
│   │   │   ├── AuthNavigator.js
│   │   │   └── MainNavigator.js
│   │   ├── redux/
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js
│   │   │   │   ├── chatSlice.js
│   │   │   │   ├── projectSlice.js
│   │   │   │   ├── taskSlice.js
│   │   │   │   └── settingsSlice.js
│   │   │   ├── selectors/
│   │   │   └── store.js
│   │   ├── api/
│   │   │   ├── client.js
│   │   │   ├── auth.js
│   │   │   ├── chat.js
│   │   │   ├── projects.js
│   │   │   ├── tasks.js
│   │   │   └── files.js
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useChat.js
│   │   │   └── useVoice.js
│   │   ├── theme/
│   │   │   ├── colors.js
│   │   │   ├── typography.js
│   │   │   └── styles.js
│   │   └── App.js
│   ├── app.json
│   └── package.json
│
├── docs/
│   ├── API.md
│   ├── SETUP.md
│   ├── FEATURES.md
│   └── DEVELOPMENT.md
│
├── .gitignore
└── README.md
```

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  username: String (unique),
  passwordHash: String,
  profile: {
    fullName: String,
    avatar: String,
    bio: String,
    preferredName: String
  },
  preferences: {
    theme: 'dark' | 'light',
    language: String,
    voiceEnabled: Boolean,
    voiceLanguage: String,
    memoryEnabled: Boolean,
    notificationsEnabled: Boolean
  },
  subscription: {
    tier: 'free' | 'pro' | 'premium',
    expiresAt: Date
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Conversations Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  projectId: ObjectId (ref: Projects, nullable),
  title: String,
  mode: 'normal' | 'learn' | 'create' | 'code' | 'research' | 'plan' | 'vision' | 'builder',
  messages: [MessageId],
  summary: String,
  createdAt: Date,
  updatedAt: Date,
  lastAccessedAt: Date
}
```

### Messages Collection
```javascript
{
  _id: ObjectId,
  conversationId: ObjectId (ref: Conversations),
  userId: ObjectId (ref: Users),
  role: 'user' | 'assistant',
  content: String,
  contentType: 'text' | 'image' | 'file' | 'code',
  attachments: [{
    type: String,
    url: String,
    fileName: String
  }],
  metadata: {
    voiceInput: Boolean,
    voiceOutput: Boolean,
    modelUsed: String
  },
  createdAt: Date
}
```

### Projects Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  name: String,
  description: String,
  conversations: [ConversationId],
  files: [FileId],
  tasks: [TaskId],
  goals: [String],
  metadata: {
    icon: String,
    color: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Tasks Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  projectId: ObjectId (ref: Projects, nullable),
  title: String,
  description: String,
  status: 'todo' | 'in-progress' | 'completed',
  priority: 'low' | 'medium' | 'high',
  dueDate: Date,
  reminders: [Date],
  createdAt: Date,
  updatedAt: Date
}
```

### Memories Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  category: 'preference' | 'project' | 'goal' | 'skill' | 'personal',
  key: String,
  value: String,
  importance: 'low' | 'medium' | 'high',
  source: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Files Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  projectId: ObjectId (ref: Projects, nullable),
  conversationId: ObjectId (ref: Conversations, nullable),
  fileName: String,
  fileType: String,
  fileSize: Number,
  s3Url: String,
  description: String,
  analysisResult: String,
  createdAt: Date
}
```

## API Endpoints (Backend)

### Authentication
- `POST /api/auth/register` — User signup
- `POST /api/auth/login` — User login
- `POST /api/auth/refresh` — Refresh token
- `POST /api/auth/logout` — Logout

### Chat
- `POST /api/chat/conversations` — Create new conversation
- `GET /api/chat/conversations` — List conversations
- `GET /api/chat/conversations/:id` — Get conversation details
- `POST /api/chat/conversations/:id/messages` — Send message
- `GET /api/chat/conversations/:id/messages` — Get conversation history
- `DELETE /api/chat/conversations/:id` — Delete conversation
- `PUT /api/chat/conversations/:id` — Rename conversation

### Projects
- `POST /api/projects` — Create project
- `GET /api/projects` — List projects
- `GET /api/projects/:id` — Get project details
- `PUT /api/projects/:id` — Update project
- `DELETE /api/projects/:id` — Delete project
- `POST /api/projects/:id/goals` — Add goal
- `DELETE /api/projects/:id/goals/:goalId` — Remove goal

### Tasks
- `POST /api/tasks` — Create task
- `GET /api/tasks` — List tasks
- `GET /api/tasks/:id` — Get task details
- `PUT /api/tasks/:id` — Update task
- `DELETE /api/tasks/:id` — Delete task
- `POST /api/tasks/:id/remind` — Set reminder

### Memories
- `POST /api/memories` — Create memory
- `GET /api/memories` — List memories
- `DELETE /api/memories/:id` — Delete memory
- `DELETE /api/memories/clear-all` — Clear all memories

### Files
- `POST /api/files/upload` — Upload file
- `GET /api/files` — List files
- `DELETE /api/files/:id` — Delete file
- `POST /api/files/:id/analyze` — Analyze file with AI

### Voice
- `POST /api/voice/transcribe` — Convert speech to text
- `POST /api/voice/synthesize` — Convert text to speech

## MVP Scope (Phase 1)

### Frontend
- ✅ Login/Signup screens
- ✅ Home screen with IGRIS greeting
- ✅ Chat interface with message history
- ✅ Conversation management (new, delete, rename)
- ✅ Dark futuristic UI with glassmorphism
- ✅ Settings screen
- ✅ Basic error handling
- ✅ Responsive Android layout

### Backend
- ✅ User authentication (JWT)
- ✅ Conversation storage & retrieval
- ✅ Message storage & retrieval
- ✅ OpenAI API integration (GPT-4)
- ✅ Basic error handling & validation
- ✅ CORS & security middleware

### Database
- ✅ Users, Conversations, Messages collections
- ✅ Proper indexing for performance

## Security Considerations

1. **API Keys**: Never exposed in frontend. Kept in backend environment variables.
2. **Authentication**: JWT tokens with expiry. Refresh tokens stored securely.
3. **Authorization**: User can only access their own data.
4. **Data Encryption**: Sensitive data encrypted at rest.
5. **HTTPS**: All communication via HTTPS.
6. **Input Validation**: Zod schema validation on backend.
7. **Rate Limiting**: Prevent abuse of AI API calls.
8. **File Validation**: Scan uploads, validate MIME types.

## Performance Strategy

1. **Lazy Loading**: Conversations loaded on-demand
2. **Pagination**: Messages paginated (50 per load)
3. **Caching**: Redux for local state, AsyncStorage for offline access
4. **Compression**: Gzip response compression
5. **CDN**: Static assets via CDN
6. **Connection Pooling**: MongoDB connection pool
7. **Background Tasks**: Task scheduling via Bull queues

## Error Handling Strategy

All errors follow a standard format:
```json
{
  "success": false,
  "error": "Human-readable error message",
  "code": "ERROR_CODE",
  "details": {}
}
```

Frontend displays user-friendly messages:
- Network errors: "Check your internet connection"
- Server errors: "IGRIS is experiencing issues, please try again"
- Validation errors: Specific field errors with hints

## Development Phases

### Phase 1 (MVP)
- Core chat functionality
- User authentication
- Conversation management
- Dark UI design
- Basic settings

### Phase 2
- Voice input/output
- File upload & analysis
- Memory system
- Projects feature
- Enhanced UI polish

### Phase 3
- Web search integration
- Tasks & reminders
- AI modes (Learn, Create, Code, etc.)
- Advanced personalization
- Mobile notifications

### Phase 4
- App builder feature
- Preview system
- Advanced automation
- Analytics dashboard
- Premium features

## Deployment

### Local Development
```bash
# Backend
cd backend && npm install && npm run dev

# Frontend
cd frontend && npm install && npm start
```

### Production
- Backend: Docker container on AWS/Railway
- Frontend: Built APK deployed to Google Play Store
- Database: MongoDB Atlas
- Storage: AWS S3
- Monitoring: Sentry error tracking

