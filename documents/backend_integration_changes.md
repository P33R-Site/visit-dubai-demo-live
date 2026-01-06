# Backend Integration Changes

This document details the changes made to the `visit-dubai-demo-old` frontend application to integrate with the new Python backend.

## 1. Core Infrastructure

### API Client (`src/lib/api.ts`)
We established a robust API client to handle communication with the backend.
- **Base Configuration**: configured to use `NEXT_PUBLIC_API_URL` (default: `http://localhost:8000`) and `NEXT_PUBLIC_API_PREFIX` (default: `/api/v1`).
- **Token Management**: Implemented automatic storage and retrieval of JWT `access_token` and `refresh_token` in `localStorage`.
- **Interceptors**: Added request interceptors to inject the Authorization header automatically.
- **Auto-Refresh**: Implemented logic to intercept `401 Unauthorized` responses, attempt to refresh the token using the refresh token, and retry the original request transparently.
- **WebSocket URL**: Added a helper `getWsUrl()` to correctly derive the WebSocket endpoint from the environment configuration.

### Session Management (`src/lib/session.ts`)
- **Persistence**: Implemented `val8_session_id` storage to persist conversation context across reloads.
- **Synchronization**: Added `getOrCreateSession()` which checks for an existing local session ID and verifies it with the backend, creating a new session if necessary.
- **Anonymous Support**: Added temporary session generation for initial interactions before full backend connection.

## 2. Authentication & User Management

### Auth Service (`src/lib/auth.ts`)
- Connected frontend auth actions to backend endpoints:
    - `POST /auth/signup`: User registration.
    - `POST /auth/login`: User login (returns tokens).
    - `GET /auth/me`: Retrieve current user profile.
    - Password Management: `requestPasswordReset`, `resetPassword`, and `changePassword` endpoints.

### Auth Context (`src/contexts/AuthContext.tsx`)
- **Global State**: Managed `user`, `isAuthenticated`, `isLoading`, and `error` states globally.
- **Initialization**: Added logic to verify stored tokens and fetch the user profile on app load.
- **Integration**: Exposed methods (`login`, `signup`, `logout`) that utilize the new `auth.ts` service and handle token storage/clearing side effects.

## 3. Real-Time Chat & AI Features

### WebSocket Hook (`src/hooks/useWebSocketChat.ts`)
- **Connection**: Updated to connect to the real backend endpoint `/chat/ws`.
- **Message Handling**: added handlers for various backend message types:
    - `trip_plan`: updates the full trip plan state.
    - `plan_item`: handles streaming of individual plan items (Streaming UI).
    - `suggestion`: handles AI suggestions for events/attractions.
    - `trip_plan_ready`: notification when a plan is finalized.
- **Reconnection**: Added robust reconnection logic with exponential backoff.
- **Ping/Pong**: Implemented keep-alive mechanism.

### Audio Chat (`src/hooks/useAudioChat.ts`) & Types
- Updated types to support audio message streaming and transcription events from the backend.

## 4. UI/Component Updates

- **Login/Signup Modals**: Connected raw forms to `useAuth()` actions instead of mock logic.
- **Chat Interface**: Updated to use the real `session_id` and handle real-time events from the updated WebSocket hook.
- **Widgets**: Updated to reflect real data structures defined in `src/lib/types.ts`.

## 5. Type System (`src/lib/types.ts`)
- Synchronized TypeScript interfaces with Backend Pydantic models:
    - `UserResponse`, `Token`, `SessionResponse`.
    - `TripPlan`, `Flight`, `Hotel`, `Experience`, `Event`.
    - `WebSocketMessage` (request/response structures).
    - `SessionState` with `consecutive_rejections` and `user_context` fields.

## Summary
The application has moved from using mock data/local state to a fully connected architecture where:
1.  **Identity** is managed via JWTs.
2.  **State** (Conversations, Trips) is persisted in the backend database (Supabase via Backend).
3.  **Intelligence** is streamed in real-time via WebSockets.
