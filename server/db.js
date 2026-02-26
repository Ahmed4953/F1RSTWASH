import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';

const DATA_DIR = path.resolve(process.cwd(), 'server', 'data');
const DB_PATH = path.join(DATA_DIR, 'bookings.sqlite');

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

export function openDb() {
  ensureDir(DATA_DIR);
  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  migrate(db);
  seed(db);
  return db;
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

