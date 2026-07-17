# Hotel Booking Frontend

React + Vite + React Router + Tailwind. Talks to the Spring Boot backend (`hotel-booking-backend`) for room availability and bookings.

## Setup

```bash
npm install
cp .env.example .env   # adjust VITE_API_BASE_URL if your backend isn't on :8080
npm run dev
```

Runs on http://localhost:3000. Make sure the Spring Boot backend is running on port 8080 (or update `.env`) with CORS allowed for this origin.

## Structure

```
src/
  api/client.js          fetch wrapper for the backend
  context/BookingContext.jsx   wizard state (search, room, guest) shared across routes
  components/             Header, Stepper, shared Field/Row helpers
  pages/
    SearchPage.jsx         /            dates + guests
    RoomsPage.jsx           /rooms       live availability from the API
    GuestPage.jsx           /guest       guest details form
    ReviewPage.jsx           /review      review + submits booking (POST /api/bookings)
    ConfirmationPage.jsx      /confirmation/:code   fetches booking by code
  App.jsx                 routes + shared layout
  main.jsx                entry point
```

## Build

```bash
npm run build
```
