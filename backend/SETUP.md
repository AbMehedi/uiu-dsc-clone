# Backend Setup Guide

## Environment Variables

### 1. Copy the example file
```bash
cp .env.example .env
```

### 2. Update the `.env` file with your values:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/uiudsc
JWT_SECRET=your-secret-key-here-change-in-production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### 3. Generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and use it as your `JWT_SECRET` in the `.env` file.

## Database Setup

### 1. Make sure MongoDB is running:
```bash
# Windows
net start MongoDB

# macOS/Linux
mongod
```

Or use MongoDB Atlas (cloud) and update `MONGODB_URI` in `.env`.

### 2. Seed the database:
```bash
npm run seed
```

This will create:
- Default admin user (email: `admin@uiudsc.ac.bd`, password: `admin123`)
- Sample events
- Sample about content

**⚠️ Important:** Change the default admin password after first login!

## Running the Server

```bash
# Development mode (with hot reload)
npm run dev

# Production mode
npm run build
npm start
```

## Default Admin Credentials

After running the seed script:
- **Email:** admin@uiudsc.ac.bd
- **Password:** admin123

**⚠️ Change this password immediately after first login!**




