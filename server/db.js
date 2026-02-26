import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import Database from 'better-sqlite3';

// DATA_DIR env wins. On Railway (no writable disk by default) use /tmp if DATA_DIR not set.
const DEFAULT_DATA_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : process.env.RAILWAY_ENVIRONMENT
    ? path.join(os.tmpdir(), 'f1rst-wash-data')
    : path.resolve(process.cwd(), 'server', 'data');
const FALLBACK_DATA_DIR = path.join(os.tmpdir(), 'f1rst-wash-data');

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function tryOpenDb(dataDir) {
  const dbPath = path.join(dataDir, 'bookings.sqlite');
  ensureDir(dataDir);
  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  migrate(db);
  seed(db);
  return db;
}

export function openDb() {
  try {
    return tryOpenDb(DEFAULT_DATA_DIR);
  } catch (e) {
    console.warn('[DB] Default path failed:', e.message, '- trying fallback', FALLBACK_DATA_DIR);
    try {
      return tryOpenDb(FALLBACK_DATA_DIR);
    } catch (e2) {
      console.error('[DB] Fallback also failed:', e2.message);
      throw e2;
    }
  }
}

function migrate(db) {
  db.exec(`
    create table if not exists services (
      id text primary key,
      name text not null,
      duration_min integer not null,
      active integer not null default 1
    );

    create table if not exists bookings (
      id text primary key,
      service_id text not null references services(id),
      start_ts integer not null,
      end_ts integer not null,
      customer_name text not null,
      customer_phone text not null,
      customer_email text,
      status text not null default 'confirmed',
      created_at integer not null
    );

    create index if not exists idx_bookings_start_end on bookings(start_ts, end_ts);
    create index if not exists idx_bookings_status on bookings(status);

    create table if not exists blocks (
      id text primary key,
      start_ts integer not null,
      end_ts integer not null,
      reason text,
      created_at integer not null
    );

    create index if not exists idx_blocks_start_end on blocks(start_ts, end_ts);
  `);
}

function seed(db) {
  const count = db.prepare(`select count(*) as c from services`).get().c;
  if (count > 0) return;

  const insert = db.prepare(
    `insert into services (id, name, duration_min, active) values (@id, @name, @duration_min, 1)`
  );

  const defaults = [
    { id: 'exterior', name: 'Exterior Wash', duration_min: 30 },
    { id: 'interior', name: 'Interior Cleaning', duration_min: 45 },
    { id: 'detailing', name: 'Premium Detailing', duration_min: 90 },
    { id: 'valet', name: 'Mall Valet', duration_min: 30 },
  ];

  const tx = db.transaction(() => {
    for (const s of defaults) insert.run(s);
  });
  tx();
}

