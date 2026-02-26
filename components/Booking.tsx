import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import {
  CalendarDays,
  Clock,
  Loader2,
  Phone,
  User,
  Mail,
  CheckCircle2,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

type BookingResponse = {
  id: string;
  serviceId: string;
  start: string;
  end: string;
  timezone: string;
  name: string;
  phone: string;
  email: string | null;
};

function todayIso() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function parseIsoDate(value: string) {
  const [y, m, d] = value.split('-').map((n) => Number(n));
  return {
    year: y || new Date().getFullYear(),
    month: (m || new Date().getMonth() + 1) - 1, // 0-based
    day: d || new Date().getDate(),
  };
}

const DEFAULT_TITLE = 'F1RST-WASH | Premium Car Wash & Detailing Berlin';

const Booking: React.FC = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title = DEFAULT_TITLE;
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [language]);

  // Single fixed service – plain car wash
  const serviceId = 'exterior';
  const [date, setDate] = useState<string>(todayIso());
  const initial = parseIsoDate(todayIso());
  const [visibleYear, setVisibleYear] = useState<number>(initial.year);
  const [visibleMonth, setVisibleMonth] = useState<number>(initial.month); // 0-based
  const [slots, setSlots] = useState<Array<{ start: string; label: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStart, setSelectedStart] = useState<string>('');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<BookingResponse | null>(null);

  const bookingCopy = t('bookingForm');
  const selectedDate = parseIsoDate(date);

  const handleMonthChange = (direction: 'prev' | 'next') => {
    let year = visibleYear;
    let month = visibleMonth + (direction === 'next' ? 1 : -1);
    if (month < 0) {
      month = 11;
      year -= 1;
    }
    if (month > 11) {
      month = 0;
      year += 1;
    }
    setVisibleYear(year);
    setVisibleMonth(month);
  };

  const handleDayClick = (day: number) => {
    const yyyy = visibleYear;
    const mm = String(visibleMonth + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const newIso = `${yyyy}-${mm}-${dd}`;
    setDate(newIso);
  };

  useEffect(() => {
    if (!serviceId || !date) return;
    let cancelled = false;
    setIsLoading(true);
    setError('');
    setSuccess(null);
    setSelectedStart('');
    (async () => {
      try {
        // Generate slots on the client between 10:00 and 20:00 – one option per hour.
        const [year, month, day] = date.split('-').map((n) => Number(n));
        if (!year || !month || !day) return;

        const result: Array<{ start: string; label: string }> = [];
        const now = new Date();

        const openHour = 10;
        const closeHour = 20;
        const durationMinutes = 30; // service length; still 30 min but we only offer one start per hour

        const pad = (n: number) => String(n).padStart(2, '0');
        // Send "YYYY-MM-DDTHH:mm:00" so server (Europe/Berlin) parses the time correctly
        const toStartIso = (y: number, m: number, d: number, h: number) =>
          `${y}-${pad(m)}-${pad(d)}T${pad(h)}:00:00`;

        for (let hour = openHour; hour < closeHour; hour++) {
          const start = new Date(year, month - 1, day, hour, 0, 0, 0);
          if (start <= now) continue; // skip past times

          const label = start.toLocaleTimeString(language === 'de' ? 'de-DE' : 'en-US', {
            hour: '2-digit',
            minute: '2-digit',
          });

          result.push({
            start: toStartIso(year, month, day, hour),
            label,
          });
        }

        if (!cancelled) setSlots(result);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [serviceId, date, t]);

  const canSubmit = !!serviceId && !!selectedStart && !!name.trim() && !!phone.trim();

  // In production (Vercel), point to your hosted API (e.g. Railway). In dev, '' uses Vite proxy.
  const apiBase = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

  const submit = async () => {
    setError('');
    setSuccess(null);
    try {
      const res = await fetch(`${apiBase}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId,
          start: selectedStart,
          name,
          phone,
          email: email.trim() || undefined,
        }),
      });
      let json: BookingResponse & { error?: string };
      try {
        json = await res.json();
      } catch {
        setError(res.status ? t('bookingForm.errorServer') || `Server error ${res.status}.` : (t('bookingForm.errorConnection') || 'Cannot reach the booking server. Try again later.'));
        return;
      }
      if (!res.ok) {
        setError(json?.error || String(t('bookingForm.errorGeneric') || 'Error'));
        return;
      }
      setSuccess(json);

      // Send booking notification email to owner via EmailJS (template params: to_email, customer_name, customer_phone, customer_email, appointment_date, appointment_time, service_name, booking_id)
      const emailJsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      if (emailJsServiceId && templateId && publicKey) {
        const startDate = new Date(json.start);
        const dateStr = startDate.toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        const timeStr = startDate.toLocaleTimeString(language === 'de' ? 'de-DE' : 'en-US', {
          hour: '2-digit',
          minute: '2-digit',
        });
        const toEmail = import.meta.env.VITE_NOTIFY_EMAIL || '';
        emailjs
          .send(emailJsServiceId, templateId, {
            to_email: toEmail,
            customer_name: json.name,
            customer_phone: json.phone,
            customer_email: json.email || '(not provided)',
            appointment_date: dateStr,
            appointment_time: timeStr,
            service_name: bookingCopy?.serviceName || 'Car wash (standard)',
            booking_id: json.id,
          }, publicKey)
          .then(() => { /* sent */ })
          .catch((err) => console.warn('[EmailJS]', err));
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? (t('bookingForm.errorConnection') || `Connection failed: ${err.message}. Try again later.`)
          : String(t('bookingForm.errorGeneric') || 'Error')
      );
    }
  };

  return (
    <main className="booking-page min-h-screen">
      <div className="booking-bg" aria-hidden="true" />
      <div className="booking-bg-orb booking-bg-orb-1" aria-hidden="true" />
      <div className="booking-bg-orb booking-bg-orb-2" aria-hidden="true" />
      <div className="booking-bg-orb booking-bg-orb-3" aria-hidden="true" />
      <div className="booking-bg-orb booking-bg-orb-4" aria-hidden="true" />
      <div className="booking-bg-grid" aria-hidden="true" />
      <section id="book" className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/"
            className="booking-fade-in inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm font-bold uppercase tracking-widest mb-10 transition-colors duration-200"
          >
            <ArrowLeft size={16} /> {bookingCopy?.backToHome}
          </Link>
        <div className="booking-fade-in-up booking-fade-in-up-1 text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black uppercase italic mb-2">{bookingCopy?.subtitle}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="booking-card booking-fade-in-up booking-fade-in-up-2 bg-gradient-to-br from-zinc-950/95 via-black/95 to-zinc-900/95 backdrop-blur-sm border border-zinc-800/80 p-8 shadow-[0_0_40px_rgba(0,0,0,0.4)] rounded-2xl">
            {/* Service info */}
            <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="block">
                <div className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-500 mb-2 flex items-center gap-2">
                  <CalendarDays size={14} /> {bookingCopy?.serviceLabel}
                </div>
                <div className="w-full bg-black/60 border border-zinc-800 px-4 py-3 text-sm text-zinc-100 rounded-md">
                  {bookingCopy?.serviceName}
                </div>
              </div>

            </div>

            {/* Custom calendar */}
            <div className="mb-8 rounded-2xl border border-zinc-800/80 bg-black/40 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-black flex items-center gap-2">
                  <CalendarDays size={14} />
                  {bookingCopy?.dateLabel}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleMonthChange('prev')}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-800 text-zinc-400 hover:text-white hover:border-white/40 transition-colors text-xs"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMonthChange('next')}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-800 text-zinc-400 hover:text-white hover:border-white/40 transition-colors text-xs"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              <div className="mb-3 flex items-baseline justify-between">
                <div className="font-heading font-black text-lg md:text-xl tracking-tight">
                  {new Date(visibleYear, visibleMonth, 1).toLocaleString(language === 'de' ? 'de-DE' : 'en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                  <div key={d} className="text-center">
                    {language === 'de'
                      ? { Mon: 'Mo', Tue: 'Di', Wed: 'Mi', Thu: 'Do', Fri: 'Fr', Sat: 'Sa', Sun: 'So' }[d]
                      : d}
                  </div>
                ))}
              </div>

              {(() => {
                const firstOfMonth = new Date(visibleYear, visibleMonth, 1);
                const firstWeekday = (firstOfMonth.getDay() + 6) % 7; // Mon=0
                const daysInMonth = new Date(visibleYear, visibleMonth + 1, 0).getDate();
                const cells: React.ReactElement[] = [];
                const today = new Date();
                const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

                for (let i = 0; i < firstWeekday; i++) {
                  cells.push(<div key={`pad-${i}`} />);
                }

                for (let day = 1; day <= daysInMonth; day++) {
                  const cellDate = new Date(visibleYear, visibleMonth, day);
                  const cellMidnight = new Date(visibleYear, visibleMonth, day).getTime();
                  const isPast = cellMidnight < todayMidnight;
                  const isSelected =
                    selectedDate.year === visibleYear &&
                    selectedDate.month === visibleMonth &&
                    selectedDate.day === day;

                  const baseClasses =
                    'w-full aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-colors';

                  let stateClasses =
                    'bg-zinc-900/40 border border-zinc-800 text-zinc-300 hover:border-zinc-500 hover:bg-zinc-900 cursor-pointer';

                  if (isPast) {
                    stateClasses =
                      'bg-black/20 border border-zinc-900 text-zinc-700 cursor-not-allowed line-through';
                  }

                  if (isSelected && !isPast) {
                    stateClasses =
                      'bg-white text-black border border-white shadow-[0_0_30px_rgba(255,255,255,0.25)] cursor-pointer';
                  }

                  cells.push(
                    <button
                      key={day}
                      type="button"
                      disabled={isPast}
                      onClick={() => !isPast && handleDayClick(day)}
                      className={`booking-day-btn ${baseClasses} ${stateClasses}`}
                    >
                      {day}
                    </button>
                  );
                }

                return <div className="grid grid-cols-7 gap-2 mt-1">{cells}</div>;
              })()}

              <div className="mt-4 text-[11px] text-zinc-500 flex items-center justify-between">
                <div>
                  <span className="inline-block w-3 h-3 rounded-sm bg-white mr-2" />
                  <span>{bookingCopy?.selectedDateLabel}</span>
                </div>
                <div className="text-zinc-400">
                  {date &&
                    new Date(selectedDate.year, selectedDate.month, selectedDate.day).toLocaleDateString(
                      language === 'de' ? 'de-DE' : 'en-US',
                      { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
                    )}
                </div>
              </div>
            </div>

            {/* Time selection */}
            <div className="mt-6">
              <div className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-500 mb-3 flex items-center gap-2">
                <Clock size={14} /> {bookingCopy?.timeLabel}
              </div>

              {isLoading ? (
                <div className="flex items-center gap-3 text-zinc-500 text-sm">
                  <Loader2 className="animate-spin" size={18} /> {bookingCopy?.loading}
                </div>
              ) : slots.length ? (
                <div className="flex flex-wrap gap-3">
                  {slots.map((slot) => {
                    const active = selectedStart === slot.start;
                    return (
                      <button
                        key={slot.start}
                        data-active={active}
                        onClick={() => setSelectedStart(slot.start)}
                        className={`booking-slot-btn px-4 py-2 text-xs font-black uppercase tracking-widest rounded-full transition-colors ${
                          active
                            ? 'bg-white text-black border border-white shadow-[0_0_20px_rgba(255,255,255,0.25)]'
                            : 'bg-black/40 border border-zinc-800 text-zinc-300 hover:border-white/80 hover:bg-zinc-900'
                        }`}
                      >
                        {slot.label}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="text-zinc-500 text-sm">{bookingCopy?.noSlots}</div>
              )}
            </div>

            {error ? (
              <div className="mt-6 border border-red-900/60 bg-red-950/40 text-red-200 px-4 py-3 text-sm">
                {error}
              </div>
            ) : null}

            {success ? (
              <div className="mt-6 border border-emerald-900/60 bg-emerald-950/40 text-emerald-100 px-4 py-4 text-sm">
                <div className="flex items-center gap-2 font-black uppercase tracking-widest text-[10px] mb-2">
                  <CheckCircle2 size={14} /> {bookingCopy?.successTitle}
                </div>
                <div className="text-emerald-100/90">{bookingCopy?.successBody}</div>
                <div className="mt-3 text-emerald-100/80 text-xs">
                  {new Date(success.start).toLocaleString(language === 'de' ? 'de-DE' : 'en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </div>
              </div>
            ) : null}
          </div>

          <div className="booking-card booking-fade-in-up booking-fade-in-up-3 bg-black/80 backdrop-blur-sm border border-zinc-800 p-8 rounded-2xl shadow-xl">
            <div className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-500 mb-6">
              {bookingCopy?.bookBtn}
            </div>

            <div className="space-y-5">
              <label className="block">
                <div className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-500 mb-2 flex items-center gap-2">
                  <User size={14} /> {bookingCopy?.nameLabel}
                </div>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="booking-input w-full bg-black/60 border border-zinc-800 px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-white"
                  placeholder={bookingCopy?.nameLabel}
                />
              </label>

              <label className="block">
                <div className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-500 mb-2 flex items-center gap-2">
                  <Phone size={14} /> {bookingCopy?.phoneLabel}
                </div>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="booking-input w-full bg-black/60 border border-zinc-800 px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-white"
                  placeholder={bookingCopy?.phonePlaceholder || '+49 …'}
                />
              </label>

              <label className="block">
                <div className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-500 mb-2 flex items-center gap-2">
                  <Mail size={14} /> {bookingCopy?.emailLabel}
                </div>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="booking-input w-full bg-black/60 border border-zinc-800 px-4 py-3 text-sm rounded-lg focus:outline-none focus:border-white"
                  placeholder={bookingCopy?.emailPlaceholder || 'name@email.com'}
                />
              </label>

              <button
                disabled={!canSubmit}
                onClick={submit}
                className={`booking-submit-btn w-full mt-2 px-6 py-4 font-black uppercase tracking-widest text-xs rounded-lg transition-colors ${
                  canSubmit ? 'bg-white text-black hover:bg-zinc-200' : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                }`}
              >
                {bookingCopy?.bookBtn}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    </main>
  );
};

export default Booking;

