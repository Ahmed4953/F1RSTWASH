import dotenv from 'dotenv';
dotenv.config();
dotenv.config({ path: '.env.local', override: false });
import express from 'express';
import cors from 'cors';
import crypto from 'node:crypto';
import { DateTime } from 'luxon';
import { openDb } from './db.js';
import { sendBookingNotification } from './email.js';

const TIMEZONE = process.env.BOOKING_TZ || 'Europe/Berlin';

// Default hours (Berlin local time)
const OPEN_HOUR = Number(process.env.OPEN_HOUR || 10); // 10:00
const CLOSE_HOUR = Number(process.env.CLOSE_HOUR || 20); // 20:00
const SLOT_INTERVAL_MIN = Number(process.env.SLOT_INTERVAL_MIN || 15);
const CAPACITY = Number(process.env.CAPACITY || 2);

const db = openDb();

const app = express();
app.use(cors());
app.use(express.json());

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3333';
app.get('/', (req, res) => {
  // Return 200 for health checks (Railway, load balancers); redirect browsers to frontend
  const wantsHtml = (req.headers.accept || '').includes('text/html');
  if (wantsHtml) {
    res.redirect(302, FRONTEND_URL);
  } else {
    res.status(200).json({ ok: true, message: 'Booking API' });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/services', (_req, res) => {
  const rows = db
    .prepare(`select id, name, duration_min from services where active = 1 order by duration_min asc`)
    .all();
  res.json({ services: rows });
});

app.get('/api/availability', (req, res) => {
  const date = String(req.query.date || '');
  const serviceId = String(req.query.serviceId || '');

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ error: 'Invalid date. Expected YYYY-MM-DD.' });
  }
  if (!serviceId) {
    return res.status(400).json({ error: 'Missing serviceId.' });
  }

  const service = db
    .prepare(`select id, duration_min from services where id = ? and active = 1`)
    .get(serviceId);
  if (!service) return res.status(404).json({ error: 'Unknown service.' });

  const dayStart = DateTime.fromISO(date, { zone: TIMEZONE }).set({
    hour: OPEN_HOUR,
    minute: 0,
    second: 0,
    millisecond: 0,
  });
  const dayEnd = DateTime.fromISO(date, { zone: TIMEZONE }).set({
    hour: CLOSE_HOUR,
    minute: 0,
    second: 0,
    millisecond: 0,
  });

  const rangeStartTs = dayStart.toMillis();
  const rangeEndTs = dayEnd.toMillis();

  const bookings = db
    .prepare(
      `select start_ts, end_ts
       from bookings
       where status = 'confirmed'
         and start_ts < ?
         and end_ts > ?`
    )
    .all(rangeEndTs, rangeStartTs);

  const blocks = db
    .prepare(
      `select start_ts, end_ts
       from blocks
       where start_ts < ?
         and end_ts > ?`
    )
    .all(rangeEndTs, rangeStartTs);

  const durationMin = Number(service.duration_min);
  const durationMs = durationMin * 60 * 1000;
  const intervalMs = SLOT_INTERVAL_MIN * 60 * 1000;
  const slots = [];

  const nowTs = DateTime.now().setZone(TIMEZONE).toMillis();

  for (
    let slotStartTs = rangeStartTs;
    slotStartTs + durationMs <= rangeEndTs;
    slotStartTs += intervalMs
  ) {
    const slotEndTs = slotStartTs + durationMs;

    if (slotStartTs <= nowTs) continue; // no past slots

    const overlappingCount =
      countOverlaps(bookings, slotStartTs, slotEndTs) + countOverlaps(blocks, slotStartTs, slotEndTs);

    const available = overlappingCount < CAPACITY;
    if (available) {
      const slotStart = DateTime.fromMillis(slotStartTs, { zone: TIMEZONE });
      const slotEnd = DateTime.fromMillis(slotEndTs, { zone: TIMEZONE });

      slots.push({
        start: slotStart.toISO(),
        end: slotEnd.toISO(),
        label: slotStart.toFormat('HH:mm'),
      });
    }
  }

  res.json({
    date,
    timezone: TIMEZONE,
    serviceId,
    slotIntervalMin: SLOT_INTERVAL_MIN,
    durationMin,
    slots,
  });
});

app.post('/api/bookings', (req, res) => {
  try {
    const body = req.body || {};
    const serviceId = String(body.serviceId || '');
    const startIso = String(body.start || '');
    const customerName = String(body.name || '').trim();
    const customerPhone = String(body.phone || '').trim();
    const customerEmail = String(body.email || '').trim() || null;

    if (!serviceId) return res.status(400).json({ error: 'Missing serviceId.' });
    if (!startIso) return res.status(400).json({ error: 'Missing start.' });
    if (!customerName) return res.status(400).json({ error: 'Missing name.' });
    if (!customerPhone) return res.status(400).json({ error: 'Missing phone.' });

    const service = db
      .prepare(`select id, duration_min from services where id = ? and active = 1`)
      .get(serviceId);
    if (!service) return res.status(404).json({ error: 'Unknown service.' });

    const start = DateTime.fromISO(startIso, { zone: TIMEZONE });
    if (!start.isValid) return res.status(400).json({ error: 'Invalid start time.' });

    const end = start.plus({ minutes: Number(service.duration_min) });

    // Enforce business hours
    const startLocal = start.setZone(TIMEZONE);
    const endLocal = end.setZone(TIMEZONE);
    const open = startLocal.set({ hour: OPEN_HOUR, minute: 0, second: 0, millisecond: 0 });
    const close = startLocal.set({ hour: CLOSE_HOUR, minute: 0, second: 0, millisecond: 0 });
    if (!(startLocal >= open && endLocal <= close)) {
      return res.status(400).json({ error: 'Outside business hours.' });
    }
    if (startLocal < DateTime.now().setZone(TIMEZONE)) {
      return res.status(400).json({ error: 'Cannot book a past time.' });
    }

    const startTs = start.toUTC().toMillis();
    const endTs = end.toUTC().toMillis();

    const conflictsRow = db
      .prepare(
        `select count(*) as c
         from bookings
         where status = 'confirmed'
           and start_ts < ?
           and end_ts > ?`
      )
      .get(endTs, startTs);
    const conflicts = Number(conflictsRow?.c ?? 0);

    const blockRow = db
      .prepare(
        `select count(*) as c
         from blocks
         where start_ts < ?
           and end_ts > ?`
      )
      .get(endTs, startTs);
    const blockConflicts = Number(blockRow?.c ?? 0);

    if (conflicts + blockConflicts >= CAPACITY) {
      return res.status(409).json({ error: 'That slot is no longer available.' });
    }

    const id = crypto.randomUUID();
    const createdAt = Date.now();

    try {
      db.prepare(
        `insert into bookings
          (id, service_id, start_ts, end_ts, customer_name, customer_phone, customer_email, status, created_at)
         values
          (?,  ?,          ?,        ?,      ?,             ?,              ?,              'confirmed', ?)`
      ).run(id, serviceId, startTs, endTs, customerName, customerPhone, customerEmail, createdAt);
    } catch (dbErr) {
      console.error('[API] Database write failed:', dbErr.code || dbErr.message, dbErr);
      return res.status(503).json({
        error: 'Booking storage is temporarily unavailable. Please try again later or contact us.',
      });
    }

    sendBookingNotification({
      name: customerName,
      email: customerEmail,
      start: start.toISO(),
    }).catch((err) => console.error('[Email]', err));

    res.status(201).json({
      id,
      serviceId,
      start: start.toISO(),
      end: end.toISO(),
      timezone: TIMEZONE,
      name: customerName,
      phone: customerPhone,
      email: customerEmail,
    });
  } catch (err) {
    const msg = err?.message || (err && String(err)) || 'Server error. Try again.';
    console.error('[API] POST /api/bookings error:', err);
    res.status(500).json({ error: msg });
  }
});

// Basic admin listing (optional) — protected by ADMIN_KEY env var if set.
app.get('/api/admin/bookings', (req, res) => {
  const adminKey = process.env.ADMIN_KEY;
  if (adminKey) {
    const provided = String(req.header('x-admin-key') || '');
    if (provided !== adminKey) return res.status(401).json({ error: 'Unauthorized' });
  }

  const date = String(req.query.date || '');
  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ error: 'Invalid date. Expected YYYY-MM-DD.' });
  }

  let startTs = null;
  let endTs = null;
  if (date) {
    const dayStart = DateTime.fromISO(date, { zone: TIMEZONE }).startOf('day');
    const dayEnd = dayStart.plus({ days: 1 });
    startTs = dayStart.toUTC().toMillis();
    endTs = dayEnd.toUTC().toMillis();
  }

  const rows = date
    ? db
        .prepare(
          `select b.id, b.service_id, b.start_ts, b.end_ts, b.customer_name, b.customer_phone, b.customer_email, b.status
           from bookings b
           where b.start_ts >= ? and b.start_ts < ?
           order by b.start_ts asc`
        )
        .all(startTs, endTs)
    : db
        .prepare(
          `select b.id, b.service_id, b.start_ts, b.end_ts, b.customer_name, b.customer_phone, b.customer_email, b.status
           from bookings b
           order by b.start_ts desc
           limit 200`
        )
        .all();

  const items = rows.map((r) => ({
    ...r,
    start: DateTime.fromMillis(r.start_ts, { zone: 'utc' }).setZone(TIMEZONE).toISO(),
    end: DateTime.fromMillis(r.end_ts, { zone: 'utc' }).setZone(TIMEZONE).toISO(),
  }));

  res.json({ items });
});

function countOverlaps(ranges, startTs, endTs) {
  let c = 0;
  for (const r of ranges) {
    if (r.start_ts < endTs && r.end_ts > startTs) c++;
  }
  return c;
}

// Prevent uncaught route errors from crashing the process (which causes 502)
app.use((err, _req, res, _next) => {
  console.error('[Express] Unhandled error:', err);
  res.status(500).json({ error: 'Server error. Try again.' });
});

// Railway injects PORT; must be a number. Bind to 0.0.0.0 so the proxy can reach the app.
const PORT = Number(process.env.PORT) || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log("Booking API listening on 0.0.0.0:" + PORT + " (env PORT=" + process.env.PORT + ")");
});

