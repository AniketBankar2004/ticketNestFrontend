# 🎬 TicketNest — Frontend

A modern React frontend for **TicketNest**, a full-stack movie ticket booking platform. The application allows users to browse movies, view showtimes, select seats, book tickets, and manage their bookings through an interactive and responsive interface.

The frontend communicates with the TicketNest **Spring Boot REST API** using Axios and uses JWT-based authentication for protected operations.

---

## ✨ Features

### 🎥 Movie Browsing

* Browse available movies
* View movie posters
* View movie details
* View available showtimes
* Select a show to proceed with booking

### 🎟️ Interactive Seat Selection

* Visual seat layout
* Select multiple seats
* Display already-booked seats
* Prevent selection of unavailable seats
* Dynamically calculate the booking amount
* Display selected seats before confirmation

### 🔐 Authentication

* User registration
* User login
* JWT-based authentication
* Protected routes
* JWT token sent with authenticated API requests
* Persistent authentication using browser storage

### 📋 My Bookings

Users can view their bookings with:

* Movie title
* Show time
* Selected seats
* Total amount
* Booking status
* Movie poster

Users can also cancel confirmed bookings directly from the booking page.

### 🔔 User Feedback

The application uses toast notifications to provide feedback for actions such as:

* Successful login
* Successful booking
* Booking cancellation
* API errors

---

## 🛠️ Tech Stack

| Technology         | Purpose                         |
| ------------------ | ------------------------------- |
| ⚛️ React           | UI development                  |
| ⚡ Vite             | Development server & build tool |
| 🎨 Tailwind CSS    | Styling                         |
| 🔄 Axios           | REST API communication          |
| 🔐 JWT             | Authentication                  |
| 🔔 React Hot Toast | Notifications                   |
| 🎯 React Router    | Client-side routing             |
| 🎬 TMDB API        | Movie poster data               |

---

## 🏗️ Application Architecture

```text
                    ┌──────────────────────┐
                    │      React App       │
                    │                      │
                    │  React + Vite        │
                    │  Tailwind CSS        │
                    └──────────┬───────────┘
                               │
                               │ Axios
                               ▼
                    ┌──────────────────────┐
                    │   Spring Boot API    │
                    │                      │
                    │  Authentication      │
                    │  Movies              │
                    │  Shows               │
                    │  Bookings            │
                    │  Tickets             │
                    └──────────┬───────────┘
                               │
                               ▼
                         PostgreSQL
```

---

## 🔄 Booking Flow

```text
Home
 │
 ▼
Browse Movies
 │
 ▼
Movie Details
 │
 ▼
Select Show
 │
 ▼
Seat Selection
 │
 ▼
Select Available Seats
 │
 ▼
Booking Confirmation
 │
 ▼
Spring Boot API
 │
 ▼
Booking Created
 │
 ▼
My Bookings
```

---

## 🔐 Authentication Flow

TicketNest uses JWT-based authentication.

```text
User Login
    │
    ▼
POST /api/auth/login
    │
    ▼
Spring Boot
    │
    ▼
JWT Token
    │
    ▼
localStorage
    │
    ▼
Axios Request
    │
    │ Authorization: Bearer <token>
    ▼
Spring Security
    │
    ▼
Protected API
```

---

## 📂 Project Structure

```text
ticketNestFrontend/
│
├── public/
│   └── assets/
│
├── services/
│   └── fetchPoster.js
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── MovieDetailsPage.jsx
│   │   ├── BookingPage.jsx
│   │   ├── ConfirmationPage.jsx
│   │   └── MyBookingsPage.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

---

## 🧭 Application Routes

| Route                      | Description           |
| -------------------------- | --------------------- |
| `/`                        | Landing/Home page     |
| `/login`                   | User login            |
| `/register`                | User registration     |
| `/home`                    | Browse movies         |
| `/movies/:id`              | Movie details & shows |
| `/movies/:id/book/:showId` | Seat selection        |
| `/my-bookings`             | User bookings         |

---

## 📡 API Integration

The frontend communicates with the Spring Boot backend using Axios.

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Movies

```http
GET /api/v1/movies
GET /api/v1/movies/{id}
```

### Shows

```http
GET /api/shows/movie/{movieId}
GET /api/v1/shows/{showId}/tickets
```

### Bookings

```http
POST   /api/shows/{showId}/book
GET    /api/bookings/my
DELETE /api/bookings/{bookingId}
```

Authenticated requests include:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

## 💺 Seat Selection

The booking interface provides a visual representation of the cinema seating arrangement.

```text
          SCREEN
    ─────────────────

       A1  A2  A3  A4  A5
       B1  B2  B3  B4  B5
       C1  C2  C3  C4  C5
       D1  D2  D3  D4  D5
       E1  E2  E3  E4  E5

       Select available seats
```

Selected seats are maintained in React state and sent to the backend as:

```json
{
  "seatNumbers": [
    "A1",
    "A2",
    "B3"
  ]
}
```

---

## 🖼️ Movie Posters

Movie poster information is retrieved using the movie data and displayed throughout the application.

The frontend contains a dedicated poster service:

```text
services/
└── fetchPoster.js
```

Poster API configuration can be provided through environment variables.

Example:

```env
VITE_TMDB_API_KEY=YOUR_API_KEY
```

> Never commit API keys or other secrets to the repository.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:

* Node.js 18+
* npm
* TicketNest Spring Boot backend running locally

---

### 1. Clone the Repository

```bash
git clone https://github.com/AniketBankar2004/ticketNestFrontend.git

cd ticketNestFrontend
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

Create a `.env` file:

```env
VITE_TMDB_API_KEY=YOUR_TMDB_API_KEY
```

Add any additional environment variables required by your API configuration.

---

### 4. Start the Development Server

```bash
npm run dev
```

Vite will provide the local development URL, typically:

```text
http://localhost:5173
```

---

## 🔗 Backend

The frontend is designed to work with the TicketNest Spring Boot backend.

Backend repository:

**TicketNest Backend**

```text
https://github.com/AniketBankar2004/ticketNest
```

---

## 🎨 UI Design

The application uses a dark cinema-inspired interface with:

* Dark purple backgrounds
* Movie poster cards
* Interactive seat selection
* Responsive booking cards
* Status badges
* Toast notifications
* Hover interactions
* Responsive layouts

The styling is primarily implemented using **Tailwind CSS**.

---

## 📱 Responsive Design

The frontend is designed to work across:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile

Layouts use Tailwind's responsive utilities to adapt movie cards, booking details, seat selection, and navigation to different screen sizes.

---

## 🔒 Security Considerations

The frontend:

* Sends JWT tokens with protected API requests
* Restricts authenticated application flows
* Does not expose backend secrets
* Uses environment variables for client-side API configuration
* Relies on the backend for authorization and booking validation

> Client-side authentication should not be treated as the final security boundary. Authorization and ownership validation are enforced by the backend.

---

## 🎯 Future Improvements

* [ ] Real-time seat availability using WebSockets
* [ ] Redis-backed seat availability
* [ ] Online payment integration
* [ ] Booking confirmation email
* [ ] Downloadable booking tickets
* [ ] QR code generation for tickets
* [ ] Movie search and filtering
* [ ] Movie genre filtering
* [ ] Improved mobile navigation
* [ ] Loading skeletons
* [ ] Better error handling
* [ ] Production deployment

---

## 📚 What I Learned

Building the TicketNest frontend helped with:

* React component architecture
* React hooks and state management
* React Router
* REST API integration
* Axios
* JWT authentication
* Protected application flows
* Dynamic route parameters
* Seat-selection UI
* Managing asynchronous API requests
* Tailwind CSS
* Responsive UI development
* Handling frontend/backend integration

---

## 👨‍💻 Author

**Aniket Bankar**

GitHub: [@AniketBankar2004](https://github.com/AniketBankar2004)

---

## ⭐ Support

If you found this project useful, consider giving the repository a ⭐.

**Built with React, Vite, Tailwind CSS, and Spring Boot.**
