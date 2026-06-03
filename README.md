# Le Meridian Main

![Node.js](https://img.shields.io/badge/Node.js-Express_API-339933?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-Create_React_App-61DAFB?style=for-the-badge&logo=react&logoColor=111111)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Deployment](https://img.shields.io/badge/Deploy-Render_%2B_Vercel-111111?style=for-the-badge)

A full-stack hotel reservation and administration platform for a Le Meridian-style luxury hospitality experience. The application combines a customer-facing hotel website with authenticated booking flows and an admin console for managing rooms, reservations, dining, spa services, events, offers, and gallery content.

## Table of Contents

- [Project Overview](##project-overview)
- [Core Capabilities](##core-capabilities)
- [Architecture](##architecture)
- [Tech Stack](##tech-stack)
- [Repository Structure](##repository-structure)
- [Getting Started](##getting-started)
- [Environment Variables](##environment-variables)
- [Database Seeding](##database-seeding)
- [Available Scripts](##available-scripts)
- [API Reference](##api-reference)
- [Frontend Routes](##frontend-routes)
- [Admin Console](##admin-console)
- [Deployment](##deployment)
- [Quality Notes](##quality-notes)
- [Production Hardening Roadmap](##production-hardening-roadmap)

## Project Overview

Le Meridian Main is organized as a MERN-style monorepo:

- `backend/` exposes the Express API, MongoDB models, JWT authentication, role-aware middleware, seed data, and domain routes.
- `frontend/` contains the Create React App customer website and admin dashboard.
- Root-level scripts coordinate installation, local development, and database seeding across both apps.
- `render.yaml` defines a two-service Render deployment for the backend API and frontend build.
- `frontend/vercel.json` supports client-side routing when the frontend is deployed on Vercel.

The codebase is suitable for demonstrating a hospitality booking workflow, dashboard operations, and common full-stack integration patterns.

## Core Capabilities

### Guest Experience

- Luxury hotel landing page with hero, booking widget, rooms, amenities, testimonials, offers, and newsletter sections.
- Public pages for rooms, dining, spa and wellness, events, gallery, offers, and booking.
- User registration and login using backend JWT authentication.
- Protected booking creation for signed-in users.
- Room pricing, night calculation, tax calculation, and booking summary display.
- Rooms page connected to the backend room catalog.

### Admin Experience

- Role-gated `/admin` route for users with `role: "admin"`.
- Dashboard with booking, room, revenue, and active guest metrics.
- Reservation management with search, status filtering, confirmation, cancellation, and deletion.
- CRUD management views for rooms, dining items, spa services, events, offers, and gallery content.
- Axios service layer with bearer token injection from `localStorage`.

### Backend Platform

- Express API with MongoDB persistence through Mongoose.
- JWT-based authentication and authorization middleware.
- `user` and `admin` roles.
- Public content APIs for customer-facing modules.
- Protected booking and dashboard APIs.
- Admin-only write operations for inventory and content modules.
- Central database connection utility and global error handler.
- Seed script for sample rooms, content, admin user, and test user.

## Architecture

```text
Client Browser
    |
    | React Router / Axios
    v
frontend/ Create React App
    |
    | REACT_APP_API_URL
    v
backend/ Express API
    |
    | Mongoose
    v
MongoDB Atlas or local MongoDB
```

Authentication flow:

```text
Register/Login -> /api/auth -> JWT issued -> token stored in localStorage
     -> Axios Authorization: Bearer <token>
     -> protected Express routes attach req.user
     -> role checks protect admin mutations
```

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19, Create React App, React Router DOM 7 |
| Styling | CSS modules, global CSS, custom luxury/admin styles |
| HTTP Client | Axios |
| Charts | Recharts |
| Icons | React Icons |
| Backend | Node.js, Express 5 |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcryptjs |
| Validation | express-validator |
| Security/Operations | CORS, dotenv, morgan, helmet dependency present |
| Deployment | Render, Vercel-ready frontend rewrites |
| Development | concurrently, nodemon |

## Repository Structure

```text
.
|-- package.json
|-- render.yaml
|-- backend
|   |-- config
|   |   `-- db.js
|   |-- controllers
|   |   |-- authController.js
|   |   |-- bookingController.js
|   |   |-- dashboardController.js
|   |   `-- roomController.js
|   |-- middleware
|   |   |-- asyncHandler.js
|   |   |-- auth.js
|   |   `-- errorHandler.js
|   |-- models
|   |   |-- Booking.js
|   |   |-- DiningItem.js
|   |   |-- Event.js
|   |   |-- GalleryImage.js
|   |   |-- Offer.js
|   |   |-- Room.js
|   |   |-- SpaService.js
|   |   `-- User.js
|   |-- routes
|   |   |-- auth.js
|   |   |-- bookings.js
|   |   |-- dashboard.js
|   |   |-- dining.js
|   |   |-- events.js
|   |   |-- gallery.js
|   |   |-- offers.js
|   |   |-- rooms.js
|   |   `-- spa.js
|   |-- .env.example
|   |-- package.json
|   |-- seed.js
|   `-- server.js
`-- frontend
    |-- public
    |-- src
    |   |-- auth
    |   |-- components
    |   |-- layout
    |   |-- modals
    |   |-- pages
    |   |   `-- admin
    |   |-- services
    |   |-- styles
    |   |-- api.jsx
    |   |-- App.jsx
    |   `-- index.js
    |-- package.json
    `-- vercel.json
```

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm
- MongoDB Atlas connection string or local MongoDB instance
- Git

### Clone

```bash
git clone https://github.com/Radheshbhuva/Le-Meridian-Main.git
cd Le-Meridian-Main
```

### Install Dependencies

Install everything from the root:

```bash
npm run install-all
```

Or install each package manually:

```bash
npm install
cd backend
npm install
cd ../frontend
npm install
```

On Windows PowerShell systems with npm script execution restrictions, use `npm.cmd`:

```powershell
npm.cmd run install-all
```

### Configure Backend Environment

Create `backend/.env` from the example:

```bash
cd backend
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Update the values in `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
JWT_SECRET=replace_with_a_long_random_secret
```

### Run the Full Stack Locally

From the root:

```bash
npm start
```

This runs:

- Backend API at `http://localhost:5000`
- Frontend app at `http://localhost:3000`

Manual startup:

```bash
cd backend
npm run dev
```

```bash
cd frontend
npm start
```

## Environment Variables

### Backend

| Variable | Required | Description |
| --- | --- | --- |
| `PORT` | No | API server port. Defaults to `5000`. |
| `MONGO_URI` | Yes | MongoDB connection string. |
| `JWT_SECRET` | Yes | Secret used to sign and verify JWT tokens. |

### Frontend

| Variable | Required | Description |
| --- | --- | --- |
| `REACT_APP_API_URL` | Yes for deployed builds | Base backend URL, for example `https://le-meridian-main.onrender.com`. |

For local development, the frontend API helper defaults to:

```text
http://localhost:5000
```

## Database Seeding

The backend includes a seed script that clears and inserts sample data for:

- Rooms
- Dining items
- Events
- Offers
- Spa services
- Gallery images
- Admin user
- Test user

Run from the root:

```bash
npm run seed
```

Or from the backend folder:

```bash
cd backend
node seed.js
```

Seeded users:

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@lemeridian.com` | `admin123` |
| User | `test@lemeridian.com` | `test123` |

Important: change or remove seeded credentials before any real production deployment.

## Available Scripts

### Root

| Command | Description |
| --- | --- |
| `npm start` | Runs backend and frontend together with `concurrently`. |
| `npm run backend` | Starts the backend dev server. |
| `npm run frontend` | Starts the frontend dev server. |
| `npm run install-all` | Installs root, backend, and frontend dependencies. |
| `npm run seed` | Runs the backend seed script. |

### Backend

| Command | Description |
| --- | --- |
| `npm run dev` | Starts Express with nodemon. |
| `npm start` | Starts Express with Node. |
| `npm test` | Placeholder test script currently exits with an error. |

### Frontend

| Command | Description |
| --- | --- |
| `npm start` | Starts Create React App on port `3000`. |
| `npm run dev` | Alias for `react-scripts start`. |
| `npm run build` | Creates a production build in `frontend/build`. |
| `npm test` | Runs the CRA/Jest test runner. |
| `npm run eject` | Ejects CRA configuration. |

## API Reference

Base local URL:

```text
http://localhost:5000/api
```

### Health

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/` | Public | API health response. |

### Authentication

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Public | Create a user account. |
| `POST` | `/api/auth/login` | Public | Authenticate and return JWT plus user data. |
| `GET` | `/api/auth/me` | Authenticated | Return the current authenticated user. |

Register payload:

```json
{
  "name": "Guest User",
  "email": "guest@example.com",
  "password": "password123",
  "phoneNumber": "9876543210"
}
```

Login payload:

```json
{
  "email": "admin@lemeridian.com",
  "password": "admin123"
}
```

### Rooms

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/api/rooms` | Public | List rooms. |
| `POST` | `/api/rooms` | Admin | Create a room. |
| `PUT` | `/api/rooms/:id` | Admin | Update a room. |
| `DELETE` | `/api/rooms/:id` | Admin | Delete a room. |

Room statuses supported by the backend model:

```text
available, occupied, maintenance
```

### Bookings

All booking routes are mounted behind authentication in `server.js`.

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/api/bookings` | Authenticated | List bookings with optional `status`, `dateFrom`, and `dateTo` filters. |
| `GET` | `/api/bookings/me` | Authenticated | List bookings for the current user. |
| `POST` | `/api/bookings` | Authenticated | Create a booking. |
| `PUT` | `/api/bookings/:id` | Authenticated | Update booking details or status. |
| `DELETE` | `/api/bookings/:id` | Authenticated | Delete a booking. |

Booking payload:

```json
{
  "roomType": "Deluxe Room",
  "guestEmail": "guest@example.com",
  "checkInDate": "2026-08-15",
  "checkOutDate": "2026-08-18",
  "totalPrice": 31856
}
```

Booking statuses:

```text
pending, confirmed, cancelled
```

### Dashboard

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/api/dashboard/stats` | Authenticated | Return counts for rooms, bookings, users, confirmed bookings, revenue, and occupancy. |

### Dining

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/api/dining` | Public | List dining items. Supports `category` and `available` query filters. |
| `POST` | `/api/dining` | Admin | Create dining item. |
| `PUT` | `/api/dining/:id` | Admin | Update dining item. |
| `DELETE` | `/api/dining/:id` | Admin | Delete dining item. |

Backend dining categories:

```text
Breakfast, Lunch, Dinner, Beverages, Dessert
```

### Events

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/api/events` | Public | List events. Supports `active` query filter. |
| `POST` | `/api/events` | Admin | Create event. |
| `PUT` | `/api/events/:id` | Admin | Update event. |
| `DELETE` | `/api/events/:id` | Admin | Delete event. |

### Offers

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/api/offers` | Public | List active offers. |
| `POST` | `/api/offers` | Admin | Create offer. |
| `PUT` | `/api/offers/:id` | Admin | Update offer. |
| `DELETE` | `/api/offers/:id` | Admin | Delete offer. |

### Spa

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/api/spa` | Public | List available spa services. |
| `POST` | `/api/spa` | Admin | Create spa service. |
| `PUT` | `/api/spa/:id` | Admin | Update spa service. |
| `DELETE` | `/api/spa/:id` | Admin | Delete spa service. |

### Gallery

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/api/gallery` | Public | List gallery images. Supports `category` query filter. |
| `POST` | `/api/gallery` | Admin | Create gallery image record. |
| `PUT` | `/api/gallery/:id` | Admin | Update gallery image record. |
| `DELETE` | `/api/gallery/:id` | Admin | Delete gallery image record. |

Gallery categories:

```text
Rooms, Dining, Events, Spa, Exterior
```

## Frontend Routes

| Route | Description |
| --- | --- |
| `/` | Customer landing page. |
| `/rooms` | Room catalog connected to backend rooms API. |
| `/dining` | Static dining experience page. |
| `/spa` | Static spa and wellness page. |
| `/events` | Static meetings and events page. |
| `/gallery` | Static gallery with filters and lightbox. |
| `/offers` | Static offers page with booking links. |
| `/book` | Auth-aware booking form connected to backend booking API. |
| `/admin` | Protected admin dashboard. |
| `/admin/bookings` | Booking management. |
| `/admin/rooms` | Room management. |
| `/admin/dining` | Dining management. |
| `/admin/spa` | Spa service management. |
| `/admin/events` | Event management. |
| `/admin/offers` | Offer management. |
| `/admin/gallery` | Gallery management. |

## Admin Console

The admin section is protected in `frontend/src/App.jsx`:

```jsx
user?.role === "admin" ? <AdminLayout logout={logout} /> : <Navigate to="/" replace />
```

The backend role middleware supports:

```js
protect("admin")
```

Use the seeded admin account after running `npm run seed`:

```text
Email: admin@lemeridian.com
Password: admin123
```

## Deployment

### Backend on Render

`render.yaml` defines a backend web service:

- Root directory: `backend`
- Build command: `npm install`
- Start command: `node server.js`
- Health check: `/`
- Required environment variables:
  - `PORT`
  - `MONGO_URI`
  - `JWT_SECRET`

The backend CORS allowlist currently includes:

```text
http://localhost:3000
http://localhost:3001
https://le-meridian-main.vercel.app
*.vercel.app
```

### Frontend on Render

`render.yaml` also defines a frontend web service:

- Root directory: `frontend`
- Build command: `npm install && npm run build`
- Start command: `npx serve -s build -l 3000`
- Required environment variable:
  - `REACT_APP_API_URL`

### Frontend on Vercel

`frontend/vercel.json` rewrites all requests to `index.html`, which supports React Router deep links:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Set `REACT_APP_API_URL` in Vercel to the deployed backend URL.

## Quality Notes

The repository includes working application code, but there are several areas to address before treating it as production-complete:

- The frontend default CRA test still checks for "learn react" and should be replaced with application-specific tests.
- `backend/package.json` has a placeholder test command.
- `frontend/src/services/adminApi.js` references `/api/admin/...` endpoints, while `adminApiService.js` matches the current backend route structure. Prefer `adminApiService.js` unless backend admin routes are added.
- Several static frontend pages use hardcoded hospitality content while admin CRUD APIs manage separate database records.
- Some TODO files contain older path names and historical notes from previous refactors.
- The backend imports only `cors` and `dotenv` in `server.js`; dependencies such as `helmet`, `morgan`, `stripe`, and `nodemailer` are present but not fully wired into the app.
- The seed script contains demo credentials that must not be used as real production accounts.

## Production Hardening Roadmap

Recommended next steps for an industry-ready release:

1. Add automated backend tests for auth, booking creation, role protection, and admin CRUD routes.
2. Replace the default frontend test with route, auth, booking, and admin dashboard tests.
3. Normalize service files so only one canonical admin API client is used.
4. Add request validation to every write route and centralize validation response formatting.
5. Add rate limiting, Helmet middleware, structured logging, and production-safe error responses.
6. Add refresh-token or session expiration strategy beyond the current 30-day JWT.
7. Move payment UI into a real Stripe checkout or payment-intent flow before accepting real payments.
8. Connect forgot-password UI to a secure tokenized email reset workflow.
9. Store uploaded gallery assets in a real object store instead of accepting plain URL records only.
10. Add CI for install, lint, build, and test across backend and frontend.

## License

This repository currently does not include a license file. Add a license before distributing or reusing the project publicly.

## Maintainer Notes

- Keep `backend/.env` private.
- Keep `frontend/.env.production` free of secrets because Create React App embeds `REACT_APP_*` values into the browser bundle.
- Run `npm run seed` only against development or disposable databases unless you intentionally want to clear existing collections.
- Update CORS origins whenever the frontend deployment URL changes.

