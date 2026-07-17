import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Check } from "lucide-react";
import { useBooking } from "../context/BookingContext";
import { Row, fmtDate } from "../components/shared";
import { api } from "../api/client";

export default function ConfirmationPage() {
  const { code } = useParams();
  const { lastBooking, guest } = useBooking();
  const [booking, setBooking] = useState(lastBooking?.confirmationCode === code ? lastBooking : null);
  const [status, setStatus] = useState(booking ? "ready" : "loading");

  useEffect(() => {
    if (booking) return;
    api
      .getBookingByCode(code)
      .then((data) => {
        setBooking(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [code, booking]);

  if (status === "loading") {
    return <p className="p-10 text-center text-sm text-ink/50">Loading your confirmation…</p>;
  }
  if (status === "error" || !booking) {
    return (
      <div className="p-10 text-center">
        <p className="text-sm text-rose mb-4">We couldn't find a booking for code {code}.</p>
        <Link to="/" className="text-sm underline text-ink/70">
          Start a new search
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 text-center">
      <div className="w-14 h-14 rounded-full bg-teal/15 border-2 border-teal flex items-center justify-center mx-auto mb-5">
        <Check size={24} className="text-teal" />
      </div>
      <h2 className="font-serif text-2xl mb-1">You're booked</h2>
      <p className="text-sm text-ink/60 mb-6">
        A confirmation has been sent to {guest.email || "your email"}
      </p>

      <div className="text-left mx-auto max-w-sm border-2 border-dashed border-ink/20 rounded-xl p-5 font-mono text-sm space-y-3">
        <Row label="Confirmation" value={booking.confirmationCode} />
        <Row label="Room" value={booking.roomName} />
        <Row label="Dates" value={`${fmtDate(booking.checkIn)} → ${fmtDate(booking.checkOut)}`} />
        <Row label="Nights" value={booking.nights} />
        <Row label="Total paid" value={`$${booking.totalPrice}`} />
      </div>

      <Link
        to="/"
        className="inline-block mt-8 px-6 py-2.5 rounded-full bg-ink text-paper text-sm font-semibold tracking-wide hover:bg-ink/90 transition-colors"
      >
        Book another stay
      </Link>
    </div>
  );
}
