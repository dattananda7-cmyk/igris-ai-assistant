# IGRIS Mobile Frontend

React Native mobile application for IGRIS AI Assistant.

## Setup

```bash
cd frontend
npm install
npm start
```

## Run on Android

```bash
npm run android
```

## Run on iOS

```bash
npm run ios
```

## Build for Production

### Android APK

```bash
eas build --platform android
```

### iOS App

```bash
eas build --platform ios
```

## Project Structure

```
src/
├── api/              # API calls and client setup
├── navigation/       # Navigation configuration
├── redux/            # Redux store and slices
├── screens/          # Screen components
├── theme/            # Colors, typography, styles
└── App.js            # Root component
```

## Features

- 🤖 AI Chat with IGRIS
- 🎨 Dark futuristic UI
- 💬 Conversation management
- ⚙️ User preferences
- 🔐 Secure authentication

## Environment Variables

Create a `.env` file in the frontend directory:

```
REACT_APP_API_URL=http://your-backend-url/api
```

## Development

The app uses:
- React Native + Expo for cross-platform mobile development
- Redux Toolkit for state management
- Axios for API calls
- React Navigation for navigation
- React Native Paper for UI components

## Notes

- Phone must be on the same network as your development machine for Expo to work
- Use `expo start --tunnel` to debug over internet
- API endpoints assume backend is running on `http://localhost:5000`
