# BetterAuth Next.js Frontend

This frontend is a Next.js application that implements authentication using **Better Auth** and communicates with a protected NestJS backend.

It provides:
- `/signup` – User registration (email & password)
- `/login` – User login
- `/dashboard` – Protected page that fetches a secret message from the backend

🚀 **Deployed URL:**  
https://betterauthfrontend-production.up.railway.app/

---

## Tech Stack

- Next.js (App Router)
- React
- better-auth/react
- Tailwind CSS
- Cookie-based authentication

---

## Requirements Implemented

### Auth Pages
- `/signup` uses `authClient.signUp.email()`
- `/login` uses `authClient.signIn.email()`
- Errors and loading states handled

### Session State
- `authClient.useSession()` is used to:
  - Redirect authenticated users to `/dashboard`
  - Redirect unauthenticated users to `/login`
- Logout button is shown only when the user is authenticated

### Dashboard
- Displays authenticated user email
- Fetches protected data from backend `/secret` endpoint
- Fetch includes cookies (`credentials: "include"`)

---

## Environment Variables (Local)

Create `.env.local` in the frontend root:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

Restart the dev server after setting env variables.

---

## Install & Run Locally

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

- http://localhost:3000

Backend must be running on:

- http://localhost:3001

---

## Local Testing Flow

1. Start backend (`npm run start:dev`)
2. Start frontend (`npm run dev`)
3. Open http://localhost:3000/signup
4. Create a new account
5. User is redirected to `/dashboard`
6. Click "Reveal Secret"
7. Secret message is fetched from the backend

---

## Production Deployment (Railway)

Frontend is deployed on Railway:

- https://betterauthfrontend-production.up.railway.app/

### Important Note About Cookies

Browsers restrict cookies across different domains.

To avoid cross-domain cookie issues:
- The frontend proxies API requests through its own domain
- Backend requests appear as same-origin to the browser
- Default `SameSite=Lax` cookies work without modification

This ensures reliable session handling in production.

---

## More Infos

- The frontend does **not** handle authentication logic directly
- All authentication flows are handled by Better Auth
- Sessions are managed via secure HTTP-only cookies
- The frontend only reacts to session state and renders UI accordingly
