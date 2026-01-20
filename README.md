# Weather Analytics Application

A secure full-stack weather analytics application that fetches real-time weather data from OpenWeatherMap, computes a custom **Comfort Index**, caches responses server-side, and presents ranked city comfort insights in a responsive UI. Authentication and authorization are implemented using **Auth0** with MFA and restricted signups.

## Features

- Fetches weather for multiple cities using city IDs from `cities.json`
- Calculates a custom Comfort Index Score (0–100) based on temperature, humidity, and wind speed
- Server-side caching of raw weather data (5-minute TTL)
- Ranking of cities from most to least comfortable
- Protected dashboard accessible only after Auth0 login
- Responsive design (desktop + mobile)
- Filtering & sorting on frontend
- Comfort score & temperature trend visualization using Recharts

## Tech Stack

**Backend**

- Node.js + Express
- node-cache (caching)
- Axios (API calls)
- express-oauth2-jwt-bearer (JWT validation)

**Frontend**

- React (Vite)
- @auth0/auth0-react
- Tailwind CSS
- Recharts (charts)
- Lucide React (icons)

**Authentication**

- Auth0 (SPA + API)
- MFA via email
- Signups disabled + whitelisted test user

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/MIDNayanajith/Fidenz-Assignment.git
cd Fidenz-Assignment

2. Backend Setup
cd backend
npm install

Create .env in the backend folder:
envWEATHER_API_KEY=your_openweathermap_api_key
AUTH0_AUDIENCE=https://weather-api
AUTH0_DOMAIN=dev-4j25jm4ybskh2axg.us.auth0.com

Start the backend:
npm start
# or
node index.js
→ Runs on http://localhost:8800


3. Frontend Setup
cd weather_frontend
npm install

Create .env in the frontend folder:
envVITE_AUTH0_DOMAIN=dev-4j25jm4ybskh2axg.us.auth0.com
VITE_AUTH0_CLIENT_ID=eAvcvxiv0SrabMt2verh2tobruTB9bzs
VITE_AUTH0_AUDIENCE=https://weather-api
VITE_API_URL=http://localhost:8800/api/weather

Start the frontend:
Bashnpm run dev
→ Runs on http://localhost:5173

4. Auth0 Configuration (Already Done)

SPA application created for frontend
API created with audience https://weather-api
MFA enabled (email/OTP)
Public signups disabled
Test user created:
Email: careers@fidenz.com
Password: Pass#fidenz

5. Running the Application

Start backend (localhost:8800)
Start frontend (localhost:5173)
Open http://localhost:5173 in browser
Login with the test credentials
View the protected Weather Comfort Dashboard

Comfort Index Formula

Score (0–100) calculated server-side using:
textTemperature Score = max(0, min(100, 100 - |temp - 22| × 4))
Humidity Score    = max(0, min(100, 100 - |humidity - 50| × 2))
Wind Score        = max(0, min(100, 100 - windSpeed × 10))

Final Comfort Score = round( (tempScore + humidityScore + windScore) / 3 )
Cities are sorted descending by score → rank 1 = most comfortable.
Reasoning Behind Variable Weights

Temperature (ideal ~22°C, heavy penalty ×4)
→ Primary driver of thermal comfort (strongest human perception factor)
Humidity (ideal ~50%, moderate penalty ×2)
→ Important but secondary; affects perceived temperature and skin comfort
Wind Speed (linear penalty ×10 per m/s)
→ Calm conditions preferred; higher wind reduces comfort quickly (especially in cold)

Equal averaging keeps the formula simple, interpretable, and balanced.
Inspired by concepts from Heat Index, Wind Chill, and general bioclimatic comfort research.


Cache Design

Library: node-cache
TTL: 300 seconds (5 minutes)
Key: weather_${cityCode}
Strategy: Cache raw OpenWeatherMap response per city
Debug: GET /api/weather/cache-status → shows hits/misses/stats
Benefit: Reduces API calls, respects rate limits, faster repeat requests

Processed comfort scores are not cached → always fresh ranking.

Known Limitations

Dependent on OpenWeatherMap availability and rate limits
Fixed city list from cities.json (no dynamic search)
Comfort Index is simplified/subjective — not personalized
Cache is in-memory → lost on server restart
No persistent storage or background refresh of data
Basic error handling (assumes valid API responses)
No unit tests for comfort formula (bonus)
No dark mode or advanced chart interactions

Bonus Features Implemented

Responsive UI (mobile + desktop)
Filtering & sorting (city name + weather description)
Line chart visualization of comfort score, temperature, humidity, wind
```
