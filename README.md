# SportNest

SportNest is a full-stack sports facility booking platform built with the MERN Stack and Better Auth.

Users can explore sports facilities, search and filter venues, book available time slots, manage their own bookings, and add or manage facilities they own.

## Live Links

### Client
https://sportnest-client-seven.vercel.app/

### Server
https://sportnest-server-h0si.onrender.com

## Project Purpose

The purpose of SportNest is to provide a simple and modern platform where users can discover and reserve sports facilities such as football turfs, swimming pools, badminton courts, tennis courts, cricket facilities, and gyms.

Facility owners can also add, update, and manage their own facilities through protected routes.

## Key Features

- Better Auth authentication
- Email and password login
- Google social login
- JWT protected private API routes
- HTTPOnly cookie based authorization
- Browse all sports facilities
- Search facilities by name
- Filter facilities by sport type
- View facility details
- Book facilities by date and available time slot
- Automatic booking price calculation
- View personal bookings
- Cancel bookings
- Add new sports facilities
- Update owned facilities
- Delete owned facilities
- Owner-specific facility management
- User dashboard with booking and facility statistics
- Custom 404 page
- Loading states
- Responsive user interface
- Framer Motion animations
- Interactive venue map using Leaflet
- MongoDB database integration

## Technologies Used

### Frontend

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

### Backend

- Node.js
- Express.js
- MongoDB
- Better Auth
- JSON Web Token
- Cookie Parser
- CORS

## Authentication and Security

SportNest uses Better Auth for user authentication.

Private API routes are protected using JWT tokens stored in HTTPOnly cookies.

The server determines authenticated user information from the verified token instead of trusting user email values sent from the client.

Protected actions include:

- Adding facilities
- Updating owned facilities
- Deleting owned facilities
- Viewing personal facilities
- Creating bookings
- Viewing personal bookings
- Cancelling bookings
- Viewing dashboard statistics

## Main Routes

### Public Routes

- `/`
- `/all-facilities`
- `/login`
- `/register`

### Private Routes

- `/facility/:id`
- `/my-bookings`
- `/add-facility`
- `/manage-facilities`
- `/update-facility/:id`
- `/dashboard`

## Search and Filter

The facilities page supports:

- Facility name search using MongoDB `$regex`
- Sport type filtering using MongoDB `$in`

Users can use search and sport filters together.

## Facility Management

Authenticated users can add facilities with:

- Facility name
- Facility type
- Image URL
- Location
- Price per hour
- Capacity
- Available time slots
- Description
- Owner email

The owner email is automatically associated with the authenticated user on the server.

Users can only update or delete facilities that they own.

## Booking System

Authenticated users can book a facility by selecting:

- Booking date
- Available time slot
- Number of hours

The final booking price is calculated on the server using the facility's price per hour.

Users can also view and cancel their own bookings.

## Installation

### Client

```bash
git clone https://github.com/Saklainmostak-learner/sportnest-client.git
cd sportnest-client
npm install
npm run dev