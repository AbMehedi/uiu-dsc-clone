# UIU Data Science Club - Website Clone

A full-stack monorepo clone of the UIU Data Science Club website (https://uiudsc.uiu.ac.bd/).

## Project Structure

```
uiu-dsc-clone/
├── frontend/          # Next.js 14 with App Router, TypeScript, Tailwind CSS, shadcn/ui
├── backend/           # Node.js + Express, TypeScript, MongoDB + Mongoose
├── package.json       # Root package.json for running both projects
└── README.md         # This file
```

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB (local or cloud instance)

## Setup Instructions

### 1. Install Dependencies

Install all dependencies for root, frontend, and backend:

```bash
npm run install:all
```

Or install them separately:

```bash
# Root dependencies
npm install

# Frontend dependencies
cd frontend && npm install

# Backend dependencies
cd backend && npm install
```

### 2. Environment Variables

#### Backend (.env file in `/backend`)

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/uiu-dsc
NODE_ENV=development
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

#### Frontend (.env.local file in `/frontend`)

Create a `.env.local` file in the `frontend` directory (if needed):

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Start MongoDB

Make sure MongoDB is running on your system. If using a local installation:

```bash
# Windows
net start MongoDB

# macOS/Linux
mongod
```

Or use MongoDB Atlas (cloud) and update the `MONGODB_URI` in the backend `.env` file.

### 4. Run Development Servers

Run both frontend and backend concurrently:

```bash
npm run dev
```

Or run them separately:

```bash
# Frontend only (runs on http://localhost:3000)
npm run dev:frontend

# Backend only (runs on http://localhost:5000)
npm run dev:backend
```

## Available Scripts

### Root Level

- `npm run dev` - Run both frontend and backend in development mode
- `npm run build` - Build both frontend and backend for production
- `npm run start` - Start both frontend and backend in production mode
- `npm run install:all` - Install all dependencies

### Frontend

- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Backend

- `npm run dev` - Start Express server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Zod** - Schema validation
- **cookie-parser** - Cookie parsing middleware

## Features

### Backend API
- **Events Management** - CRUD operations for events
- **About Section** - Dynamic about content management
- **Contact Form** - Contact submission handling
- **Admin Authentication** - JWT-based admin authentication
- **Protected Routes** - Middleware for route protection
- **Error Handling** - Centralized error handling
- **Input Validation** - Zod schema validation

### Database Models
- **Event** - Event management with status tracking
- **About** - About section with sections, mission, and vision
- **Contact** - Contact form submissions with status
- **Admin** - Admin users with password hashing

### API Endpoints
- `GET /api/events` - Get all events
- `GET /api/events/upcoming` - Get upcoming events
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event (protected)
- `PUT /api/events/:id` - Update event (protected)
- `DELETE /api/events/:id` - Delete event (protected)
- `GET /api/about` - Get about content
- `PUT /api/about` - Update about (protected)
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all submissions (protected)
- `PUT /api/contact/:id` - Update contact status (protected)
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current admin (protected)

## Development

- Frontend runs on: `http://localhost:3000`
- Backend API runs on: `http://localhost:5000`
- API Health Check: `http://localhost:5000/api/health`

## Project Structure

```
uiu-dsc-clone/
├── frontend/              # Next.js 14 Frontend
│   ├── app/               # App Router pages
│   ├── components/        # React components
│   │   └── ui/           # shadcn/ui components
│   └── lib/              # Utility functions
├── backend/               # Express Backend
│   ├── src/
│   │   ├── config/       # Configuration files
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Express middleware
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # API routes
│   │   ├── types/        # TypeScript types
│   │   └── validations/  # Zod validation schemas
│   └── server.ts         # Express server entry point
└── package.json          # Root package.json
```

## License

This is a clone project for educational purposes.

