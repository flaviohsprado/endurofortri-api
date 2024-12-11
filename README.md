# EnduroForTri API

A RESTful API built with NestJS for managing athlete activities and Strava integration.

## Features

- Athlete Management
- Activity Tracking
- Strava Integration
- OAuth2 Authentication

## API Endpoints

### Athletes

```
GET    /athlete/:id      - Get athlete by ID
POST   /athlete         - Create new athlete
PUT    /athlete/:id     - Update athlete
DELETE /athlete/:id     - Delete athlete
```

### Activities

```
GET    /activities/:athleteId  - Get activities by athlete ID
POST   /activities/:athleteId  - Create new activity
PUT    /activities/:id         - Update activity
DELETE /activities/:id         - Delete activity
```

### Strava Integration

The API integrates with Strava's API v3 for:
- Fetching athlete activities
- OAuth2 authentication
- Token management

## Technical Stack

- NestJS
- TypeScript
- Swagger/OpenAPI
- Axios for HTTP requests
- Clean Architecture with Use Cases

## Project Structure

```
src/
├── modules/
│   ├── activities/       # Activities module
│   │   ├── usecases/    # Activity-related use cases
│   │   └── ...
│   ├── athlete/         # Athlete module
│   │   ├── usecases/    # Athlete-related use cases
│   │   └── ...
│   └── usecase-proxy    # Use case proxy implementation
├── services/
│   └── strava/          # Strava integration service
└── common/              # Common decorators and utilities
```

## Environment Variables

```
STRAVA_CLIENT_ID=your_strava_client_id
STRAVA_CLIENT_SECRET=your_strava_client_secret
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables
4. Run the development server:
   ```bash
   npm run start:dev
   ```

## API Documentation

API documentation is available through Swagger UI at `/api` endpoint when running the server.