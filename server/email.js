import nodemailer from 'nodemailer';

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'ahmedtarekfawzy2005@gmail.com';

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    console.warn('[Email] SMTP not configured (set SMTP_HOST, SMTP_USER, SMTP_PASS). Booking notification skipped.');
    return null;
  }
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendBookingNotification(booking) {
  const transporter = getTransporter();
  if (!transporter) return;

  const start = new Date(booking.start);
  const pad = (n) => String(n).padStart(2, '0');
  const dateStr = `${start.getFullYear()}-${pad(start.getMonth() + 1)}-${pad(start.getDate())}`;
  const timeStr = `${pad(start.getHours())}:${pad(start.getMinutes())}`;

  const text = [
    'New Booking:',
    `Name: ${booking.name}`,
    `Email: ${booking.email || ''}`,
    `Date: ${dateStr}`,
    `Time: ${timeStr}`,
  ].join('\n');

  try {
    console.log('[Email] Sending booking notification via SMTP...');
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: NOTIFY_EMAIL,
      subject: 'New Booking – F1RST-WASH',
      text,
    });
  } catch (err) {
    console.error('[Email] Failed to send booking notification via SMTP:', err);
  }
}
