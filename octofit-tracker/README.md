# OctoFit Tracker

A modern multi-tier fitness tracking application built with React, Express, TypeScript, and MongoDB.

## Project Structure

```
octofit-tracker/
├── frontend/          # React 19 + Vite frontend application
│   ├── src/          # React components and pages
│   ├── public/       # Static assets
│   ├── vite.config.js
│   └── package.json
└── backend/          # Express + TypeScript backend API
    ├── src/         # TypeScript source code
    ├── dist/        # Compiled JavaScript (generated)
    ├── tsconfig.json
    └── package.json
```

## Configuration

### Frontend (React + Vite)
- **Port:** 5173
- **Framework:** React 19
- **Build Tool:** Vite
- **Run:** `npm run dev` (from frontend directory)

### Backend (Express + TypeScript)
- **Port:** 8000
- **Framework:** Express
- **Language:** TypeScript
- **Database:** MongoDB (Mongoose ODM)
- **Run Dev:** `npm run dev` (from backend directory)
- **Build:** `npm run build`
- **Start Production:** `npm start`

### Database (MongoDB)
- **Port:** 27017
- **Default Connection:** `mongodb://localhost:27017/octofit_tracker`

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB 5.0+
- npm 9+

### Installation

1. **Frontend:**
   ```bash
   cd octofit-tracker/frontend
   npm install
   npm run dev
   ```

2. **Backend:**
   ```bash
   cd octofit-tracker/backend
   npm install
   npm run dev
   ```

3. **MongoDB:**
   Make sure MongoDB is running on `localhost:27017`

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

**Backend:**
- `npm run dev` - Start development server with ts-node
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled JavaScript
- `npm test` - Run tests

## API Endpoints

- `GET /health` - Health check endpoint

## Dependencies

### Frontend
- react@19
- react-dom@19
- @vitejs/plugin-react

### Backend
- express@5.2.1
- mongoose@9.6.3
- typescript@6.0.3
- @types/express@5.0.6
- @types/node@25.9.2
- ts-node@10.9.2

## Environment Variables

Create a `.env` file in the backend directory (see `.env.example`):

```
PORT=8000
MONGODB_URI=mongodb://localhost:27017/octofit_tracker
```

## Development Workflow

1. Start MongoDB locally
2. Run backend dev server: `npm run dev` from backend directory
3. Run frontend dev server: `npm run dev` from frontend directory
4. Frontend will be available at `http://localhost:5173`
5. Backend API at `http://localhost:8000`

## License

ISC
