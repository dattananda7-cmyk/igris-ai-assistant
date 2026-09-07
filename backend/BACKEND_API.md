# Backend API Documentation

## Overview

IGRIS Backend is a Node.js/Express API providing AI-powered chat, project management, and task tracking capabilities.

## Getting Started

### Installation

```bash
cd backend
npm install
```

### Environment Variables

Create a `.env` file in the backend directory:

```env
NODE_ENV=development
PORT=5000
API_URL=http://localhost:5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/igris
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRE=30d
OPENAI_API_KEY=sk-your-key
OPENAI_MODEL=gpt-4
CORS_ORIGIN=http://localhost:3000,http://localhost:8081
```

### Running the Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will start on `http://localhost:5000`

## API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "username",
  "password": "password123",
  "fullName": "John Doe"
}

Response 201:
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": { ... },
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response 200:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {accessToken}

Response 200:
{
  "success": true,
  "data": { user object }
}
```

### Chat

#### Create Conversation
```http
POST /api/chat/conversations
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "title": "My First Chat",
  "mode": "normal"
}

Response 201:
{
  "success": true,
  "message": "Conversation created",
  "data": { conversation object }
}
```

#### Send Message
```http
POST /api/chat/conversations/{conversationId}/messages
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "content": "Hello IGRIS!",
  "contentType": "text"
}

Response 201:
{
  "success": true,
  "message": "Message sent",
  "data": {
    "userMessage": { ... },
    "assistantMessage": { ... }
  }
}
```

#### Get Conversations
```http
GET /api/chat/conversations?page=1&limit=20
Authorization: Bearer {accessToken}

Response 200:
{
  "success": true,
  "data": {
    "conversations": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 5,
      "pages": 1
    }
  }
}
```

#### Get Conversation Details
```http
GET /api/chat/conversations/{conversationId}
Authorization: Bearer {accessToken}

Response 200:
{
  "success": true,
  "data": { conversation with messages }
}
```

#### Get Messages
```http
GET /api/chat/conversations/{conversationId}/messages?page=1&limit=50
Authorization: Bearer {accessToken}

Response 200:
{
  "success": true,
  "data": {
    "messages": [...],
    "pagination": { ... }
  }
}
```

#### Rename Conversation
```http
PUT /api/chat/conversations/{conversationId}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "title": "New Title"
}

Response 200:
{
  "success": true,
  "data": { updated conversation }
}
```

#### Delete Conversation
```http
DELETE /api/chat/conversations/{conversationId}
Authorization: Bearer {accessToken}

Response 200:
{
  "success": true,
  "message": "Conversation deleted",
  "data": null
}
```

### Projects

#### Create Project
```http
POST /api/projects
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "name": "My Project",
  "description": "Project description",
  "icon": "📁",
  "color": "#00D9FF"
}

Response 201:
{
  "success": true,
  "message": "Project created",
  "data": { project object }
}
```

#### Get Projects
```http
GET /api/projects?page=1&limit=20
Authorization: Bearer {accessToken}

Response 200:
{
  "success": true,
  "data": {
    "projects": [...],
    "pagination": { ... }
  }
}
```

#### Get Project Details
```http
GET /api/projects/{projectId}
Authorization: Bearer {accessToken}

Response 200:
{
  "success": true,
  "data": { project with conversations and tasks }
}
```

#### Update Project
```http
PUT /api/projects/{projectId}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated description"
}

Response 200:
{
  "success": true,
  "data": { updated project }
}
```

#### Delete Project
```http
DELETE /api/projects/{projectId}
Authorization: Bearer {accessToken}

Response 200:
{
  "success": true,
  "message": "Project deleted",
  "data": null
}
```

### Tasks

#### Create Task
```http
POST /api/tasks
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "title": "Task Title",
  "description": "Task description",
  "priority": "high",
  "dueDate": "2024-12-31",
  "projectId": "..."
}

Response 201:
{
  "success": true,
  "message": "Task created",
  "data": { task object }
}
```

#### Get Tasks
```http
GET /api/tasks?status=todo&priority=high&page=1&limit=20
Authorization: Bearer {accessToken}

Response 200:
{
  "success": true,
  "data": {
    "tasks": [...],
    "pagination": { ... }
  }
}
```

#### Update Task
```http
PUT /api/tasks/{taskId}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "status": "completed",
  "priority": "medium"
}

Response 200:
{
  "success": true,
  "data": { updated task }
}
```

#### Delete Task
```http
DELETE /api/tasks/{taskId}
Authorization: Bearer {accessToken}

Response 200:
{
  "success": true,
  "message": "Task deleted",
  "data": null
}
```

### Memory

#### Create Memory
```http
POST /api/memories
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "category": "preference",
  "key": "favorite_color",
  "value": "blue",
  "importance": "high",
  "source": "user_input"
}

Response 201:
{
  "success": true,
  "message": "Memory saved",
  "data": { memory object }
}
```

#### Get Memories
```http
GET /api/memories?category=preference&page=1&limit=20
Authorization: Bearer {accessToken}

Response 200:
{
  "success": true,
  "data": {
    "memories": [...],
    "pagination": { ... }
  }
}
```

#### Delete Memory
```http
DELETE /api/memories/{memoryId}
Authorization: Bearer {accessToken}

Response 200:
{
  "success": true,
  "message": "Memory deleted",
  "data": null
}
```

## Error Handling

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {},
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Error Codes

- `AUTH_REQUIRED` - Authentication token required
- `INVALID_TOKEN` - Token is invalid or expired
- `USER_NOT_FOUND` - User not found
- `INVALID_CREDENTIALS` - Email/password combination incorrect
- `EMAIL_EXISTS` - Email already registered
- `VALIDATION_ERROR` - Input validation failed
- `NOT_FOUND` - Resource not found
- `FORBIDDEN` - Access denied
- `RATE_LIMITED` - Too many requests
- `SERVER_ERROR` - Internal server error

## Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

## Rate Limiting (Phase 1)

Rate limits are applied per endpoint:
- Authentication: 5 requests per 15 minutes
- Chat: 100 requests per hour
- General: 1000 requests per hour

## Pagination

All list endpoints support pagination:

```
?page=1&limit=20
```

Response includes:
```json
{
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

## Authentication

All protected endpoints require an `Authorization` header:

```
Authorization: Bearer {accessToken}
```

## File Structure

```
src/
├── api/
│   ├── auth/routes.js
│   ├── chat/routes.js
│   ├── projects/routes.js
│   ├── tasks/routes.js
│   ├── memories/routes.js
│   ├── files/routes.js
│   └── voice/routes.js
├── config/
│   ├── database.js
│   ├── ai-client.js
│   └── env.js
├── middleware/
│   ├── auth.js
│   ├── validation.js
│   └── errorHandler.js
├── models/
│   ├── User.js
│   ├── Conversation.js
│   ├── Message.js
│   ├── Project.js
│   ├── Task.js
│   ├── Memory.js
│   └── File.js
├── utils/
│   ├── constants.js
│   ├── helpers.js
│   └── logger.js
└── server.js
```

## Contributing

See main README.md for contribution guidelines.
