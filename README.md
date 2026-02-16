# Chrono Delivery (React Food Delivery App)

A React + TypeScript food delivery frontend with Firebase-backed menu/order data, Firebase authentication (email/password, Google, anonymous), animated UI components, and a cart flow.

## Tech Stack

- React 19
- TypeScript
- Vite 7
- Tailwind CSS 4
- Framer Motion
- React Router 7
- TanStack Query (React Query)
- Vitest + Testing Library
- Firebase Firestore
- Firebase Authentication

## Current Features

- Responsive landing experience with:
  1. About section
  2. Menu section (fetched from Firestore)
  3. Location section
- Animated desktop/mobile navigation and UI interactions with Framer Motion
- Cart system with global context and reducer
- Add, update, clear, and submit cart orders
- Firebase-backed authentication flow:
  1. Sign in with email/password
  2. Sign up with email/password
  3. Sign in with Google
  4. Anonymous sign-in
  5. Account linking (Google + email)
  6. Account settings management
- Route handling:
  1. `/` redirects to `/home`
  2. `/home` home page
  3. `/login` login/signup page
  4. `*` fallback not-found page
- Mock data mode for development without Firebase

## Project Structure

```text
src/
  assets/                         # Static images
  components/
    auth/                         # Authentication UI components
    cart/                         # Cart UI + cart context/reducer
    layout/                       # Layout, navbar, sections, menu domain components
    ui/                           # Shared reusable UI primitives
  contexts/                       # React contexts (Auth)
  firebase/                       # Firebase configuration
  hooks/                          # Custom React hooks
  mock/                           # Mock data for development
  pages/                          # Route-level pages
  services/                       # API/data services
  tests/                          # Test setup and utilities
  types/                          # Shared TypeScript types
  utils/                          # Shared utilities
```

## Environment Variables

Create `.env.local` in the project root:

```bash
# Firebase Web API Key
VITE_FIREBASE_API_KEY=your_firebase_api_key

# Firebase Project ID
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id

# Firebase Auth Domain (optional - auto-generated from projectId if omitted)
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com

# Firebase Storage Bucket (optional - auto-generated from projectId if omitted)
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app

# Firebase Messaging Sender ID (optional)
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id

# Firebase App ID (optional)
VITE_FIREBASE_APP_ID=your_app_id

# Use mock data instead of Firestore (optional, defaults to false)
VITE_USE_MOCK=true
```

You can copy `.env.example` as a starting point.

## Firebase Expectations

This app uses Firestore with the following collections:

### Menu Collection

- **Path**: `Menu/{itemId}`
- **Permissions**: Public read, admin-only write

Document shape:

```json
{
  "id": "item-1",
  "name": "Sushi Roll",
  "price": 12.99,
  "description": "Fresh salmon and avocado",
  "category": "sushi"
}
```

### Orders Collection

- **Path**: `Orders/{orderId}`
- **Permissions**: Users can read their own orders, create orders for themselves

Document shape:

```json
{
  "user_id": "firebase-uid",
  "items": [...],
  "total": 25.98,
  "status": "pending",
  "created_at": "2024-01-01T00:00:00Z"
}
```

## Development with Mock Data

To develop without Firebase, set `VITE_USE_MOCK=true` in your `.env.local`:

```bash
VITE_USE_MOCK=true
```

This will use the mock menu data from `src/mock/data.ts` instead of fetching from Firestore.

## Getting Started

```bash
npm install
npm run dev
```

Default dev URL is typically `http://localhost:5173`.

## Docker

You can also run the app using Docker:

```bash
docker build -t chrono-delivery .
docker run -p 3000:3000 chrono-delivery
```

## Available Scripts

- `npm run dev` start Vite dev server
- `npm run build` type-check and build production bundle
- `npm run preview` preview production build
- `npm run lint` run ESLint
- `npm run test` run Vitest in watch mode
- `npm run test:run` run tests once
- `npm run test:coverage` run tests with coverage
- `npm run test:ui` run Vitest UI

## Testing

This repo includes unit/component tests across cart, UI components, hooks, pages, and layout/navigation flows.

Run once:

```bash
npm run test:run
```

Run coverage:

```bash
npm run test:coverage
```

## Notes About Current State

- Menu and order submission rely on valid Firebase env config.
- The project is frontend-only in this repository.
- Firestore security rules are defined in `firestore.rules`.

## Bulk Add Menu Items

You can bulk add menu items to Firebase using a JSON file keyed by item name.

Example file: `scripts/menu-items.example.json`

Run:

```bash
npm run menu:bulk-add -- --file scripts/menu-items.example.json
```

JSON format:

```json
{
  "Sushi Roll": {
    "id": "item-1",
    "price": 12.99,
    "description": "Fresh salmon, avocado, and rice",
    "category": "sushi"
  }
}
```

## Screenshots

![Chrono Delivery app demo](./artifacts/demo.gif)
