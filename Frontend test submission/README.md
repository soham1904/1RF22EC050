# React URL Shortener Web App (Frontend)

**Runs on http://localhost:3000** and uses **Material UI only**.

## Quick Start
```bash
cp .env.example .env   # update if your endpoints differ
npm install
npm start
```

## Environment Variables
- `REACT_APP_API_BASE_URL` — base URL for your backend (shorten + stats APIs).
- `REACT_APP_LOG_BASE_URL` — base URL for your Logging Middleware service (Pre-Test step).

## Expected Backend Endpoints (Adjustable)
- `POST {API_BASE}/shorten`  
  Body: `{ longUrl, validityMinutes?, preferredCode? }`  
  Returns: `{ code, shortUrl, longUrl, createdAt, expiresAt }`

- `GET {API_BASE}/stats`  
  Returns an array of items:  
  ```json
  [
    {
      "code": "xy12",
      "shortUrl": "http://sho.rt/xy12",
      "longUrl": "https://example.com",
      "createdAt": "2025-09-01T10:00:00Z",
      "expiresAt": "2025-09-07T10:00:00Z",
      "clicks": 12,
      "clickDetails": [
        {"timestamp":"2025-09-02T12:00:00Z","source":"Twitter","referrer":"https://twitter.com/...","ip":"1.2.3.4","location":"US"},
        {"timestamp":"2025-09-03T09:20:00Z","source":"Direct","referrer":null,"ip":"2.3.4.5","location":"DE"}
      ]
    }
  ]
  ```

If your API shapes differ, update `src/api.js` mapping functions.

## Pages
- **URL Shortener Page** — shorten up to 5 URLs concurrently with validation.
- **Statistics Page** — list of all shortened URLs, with total click count and per-click details (timestamp, source, referrer, IP, location).

## Mandatory Logging Integration
All user actions are logged via `src/logging/LoggerProvider.jsx` to the Logging Middleware (`/logs` endpoint by default). Replace the URL in `.env` or in `src/utils/logger.js` if your service differs.
