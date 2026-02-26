# Deploying F1RST-WASH (Vercel + Railway)

Your **frontend** is on **Vercel** and your **booking API** must run 24/7 somewhere. Vercel only runs code when someone visits the site (serverless), so the API cannot run on Vercel. Use **Railway** (or similar) to host the API.

---

## 1. Deploy the API to Railway (24/7)

Railway runs your Node server all the time so customers can book anytime.

1. Go to [railway.app](https://railway.app) and sign in (e.g. with GitHub).
2. **New Project** → **Deploy from GitHub repo** → choose your repo (e.g. `Ahmed4953/F1RSTWASH`).
3. Railway will detect the app. Configure:
   - **Root Directory:** leave empty (use repo root).
   - **Build Command:** `npm install` (or leave default).
   - **Start Command:** `npm run start` (runs `node server/index.js`).
4. **Settings** → **Variables** – add:

   | Variable        | Example / description |
   |-----------------|------------------------|
   | `PORT`          | Railway sets this; you can leave it unset. |
   | `FRONTEND_URL`  | Your Vercel URL, e.g. `https://your-site.vercel.app` |
   | `NOTIFY_EMAIL`  | Your email (you get a notification when someone books) |
   | `SMTP_HOST`     | e.g. `smtp.gmail.com` |
   | `SMTP_PORT`     | `587` |
   | `SMTP_USER`     | Your email |
   | `SMTP_PASS`     | App password (Gmail: use an [App Password](https://support.google.com/accounts/answer/185833)) |
   | `BOOKING_TZ`    | `Europe/Berlin` (optional) |

5. **Deploy.** When it’s running, open the service → **Settings** → **Domains** → **Generate Domain**. Copy the URL (e.g. `https://f1rst-wash-api-production.up.railway.app`).

### Optional: Keep bookings across deploys (SQLite on Railway)

By default the SQLite file lives in `server/data/` and can be lost on redeploy. To keep it:

- In your Railway project, add a **Volume** and mount it at `server/data`.
- Redeploy so the app uses that path for the database.

---

## 2. Point Vercel to your API

So the booking page on Vercel calls your Railway API:

1. **Vercel** → your project → **Settings** → **Environment Variables**.
2. Add:

   | Name            | Value                                      |
   |-----------------|--------------------------------------------|
   | `VITE_API_URL`  | Your Railway API URL, e.g. `https://f1rst-wash-api-production.up.railway.app` |

   Do **not** add a trailing slash.

3. **Redeploy** the Vercel project (e.g. **Deployments** → … → **Redeploy**) so the new variable is baked into the build.

After redeploy, the booking form will send requests to Railway instead of `/api` on Vercel (which was 404).

---

## 3. Quick check

- Open your Vercel site → go to **Book** → pick date/time, fill name/phone → submit.
- If it works, you’ll see a success message and the booking is stored in the API (and you get an email if SMTP is set).
- If you see “Cannot reach the booking server”, check:
  - `VITE_API_URL` in Vercel is correct and you redeployed after adding it.
  - The Railway service is running and the domain is correct.
  - Railway env vars (especially `FRONTEND_URL` if you use it) are set.

---

## Summary

| Where     | What runs |
|----------|-----------|
| **Vercel**  | Frontend (React). Redeploy when you change code; set `VITE_API_URL` to your API URL. |
| **Railway** | Booking API (Express + SQLite + email). Runs 24/7; no need to run `npm run dev:api` on your machine. |

Once both are deployed and `VITE_API_URL` is set, customers can book 24/7 without you running anything in the terminal.
