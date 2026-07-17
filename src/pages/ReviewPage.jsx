import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useBooking } from "../context/BookingContext";
import { Row, fmtDate, nights } from "../components/shared";
import { api } from "../api/client";

export default function ReviewPage() {
  const { search, selectedRoom, guest, setLastBooking } = useBooking();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedRoom || !guest.name || !guest.email) navigate("/guest");
  }, [selectedRoom, guest, navigate]);

  const n = nights(search.checkIn, search.checkOut) || 1;
  const total = selectedRoom ? selectedRoom.pricePerNight * n : 0;

  async function handleConfirm() {
    setSubmitting(true);
    setError(null);
    try {
      const booking = await api.createBooking({
        roomId: selectedRoom.id,
        checkIn: search.checkIn,
        checkOut: search.checkOut,
        guests: search.guests,
        guestName: guest.name,
        guestEmail: guest.email,
        guestPhone: guest.phone,
        specialRequests: guest.requests,
      });
      setLastBooking(booking);
      navigate(`/confirmation/${booking.confirmationCode}`);
    } catch (err) {
      setError(err.message || "Something went wrong booking your stay.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!selectedRoom) return null;

  return (
    <div className="p-6 md:p-8">
      <h2 className="font-serif text-xl mb-6">Review your stay</h2>
      <div className="space-y-4 font-mono text-sm">
        <Row label="Hotel" value="Meridian House, Lisbon, Portugal" />
        <Row label="Dates" value={`${fmtDate(search.checkIn)} → ${fmtDate(search.checkOut)} (${n} night${n !== 1 ? "s" : ""})`} />
        <Row label="Room" value={selectedRoom.name} />
        <Row label="Guest" value={`${guest.name} · ${guest.email}`} />
        {guest.requests && <Row label="Requests" value={guest.requests} />}
        <div className="border-t border-dashed border-ink/20 pt-4 flex justify-between items-baseline">
          <span className="text-ink/60 uppercase text-[11px] tracking-[0.15em]">Total due</span>
          <span className="text-2xl font-semibold">${total}</span>
        </div>
      </div>

      {error && <p className="text-rose text-sm mt-4">{error}</p>}

      <div className="flex justify-between mt-8 pt-6 border-t border-ink/10">
        <button
          onClick={() => navigate("/guest")}
          disabled={submitting}
          className="flex items-center gap-1 text-sm font-medium tracking-wide hover:opacity-70 transition-opacity disabled:opacity-30"
        >
          <ChevronLeft size={16} /> Back
        </button>
        <button
          onClick={handleConfirm}
          disabled={submitting}
          className="px-6 py-2.5 rounded-full bg-brass text-ink text-sm font-semibold tracking-wide hover:bg-brass-dark transition-colors disabled:opacity-50"
        >
          {submitting ? "Booking…" : "Confirm & book"}
        </button>
      </div>
    </div>
  );
}
