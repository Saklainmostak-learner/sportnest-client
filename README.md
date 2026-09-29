# SportNest

SportNest is a full-stack sports facility booking platform built with the MERN Stack and Better Auth. Users can browse sports facilities, search and filter venues, book available time slots, manage their own bookings, and add or manage facilities they own.

## Live Links

- Client: https://sportnest-client-seven.vercel.app/
- Server: https://sportnest-server-h0si.onrender.com

## Purpose

SportNest provides a simple reservation flow for sports facilities such as football turfs, swimming pools, badminton courts, tennis courts, cricket facilities, and gyms. Authenticated users can make bookings and facility owners can manage their own listings securely.

## Key Features

- Better Auth email/password authentication
- Google social login
- JWT-protected private APIs using HTTPOnly cookies
- Browse all facilities
- Facility-name search using MongoDB `$regex`
- Sport-type filtering using MongoDB `$in`
- Facility details with price, capacity, location and available slots
- Date picker, available slot selector and time picker for booking
- Server-side booking price calculation
- Personal booking list and cancellation
- Add, update and delete owned facilities
- Owner-specific facility management
- Dashboard statistics
- Responsive UI
- Dark/light theme toggle
- Framer Motion animations
- Leaflet venue map
- Custom 404 page and loading states

## Frontend Packages

- React
- React Router
- Tailwind CSS
- Axios
- Better Auth
- React Hot Toast
- Framer Motion
- Lucide React
- React Icons
- React Leaflet
- Leaflet

## Backend Packages

- Node.js
- Express.js
- MongoDB
- Better Auth
- JSON Web Token
- Cookie Parser
- CORS
- dotenv

## Main Routes

### Public

- `/`
- `/all-facilities`
- `/login`
- `/register`

### Private

- `/facility/:id`
- `/my-bookings`
- `/add-facility`
- `/manage-facilities`
- `/update-facility/:id`
- `/dashboard`

## Security

The server determines the authenticated user's email from a verified JWT instead of trusting an email value sent by the client. Facility update/delete operations verify ownership on the server. Booking totals are calculated on the server from the saved facility price.

## Local Setup

### Client

```bash
git clone https://github.com/Saklainmostak-learner/sportnest-client.git
cd sportnest-client
npm install
npm run dev
```

Create a client `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

### Server

```bash
git clone https://github.com/Saklainmostak-learner/sportnest-server.git
cd sportnest-server
npm install
npm run dev
```

After configuring MongoDB credentials, seed sample facilities once if the database has fewer than six facilities:

```bash
npm run seed
```

Create a server `.env` file:

```env
PORT=5000
DB_USER=your_mongodb_database_user
DB_PASS=your_mongodb_database_password
JWT_SECRET=your_jwt_secret
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:5000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NODE_ENV=development
```

Never commit `.env` files or credentials to GitHub.

## Author

Developed by Saklain Mostak.
