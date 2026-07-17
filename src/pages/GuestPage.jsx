import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useBooking } from "../context/BookingContext";
import { Field, inputCls } from "../components/shared";

export default function GuestPage() {
  const { selectedRoom, guest, setGuest } = useBooking();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedRoom) navigate("/rooms");
  }, [selectedRoom, navigate]);

  const canContinue = guest.name.trim() && guest.email.trim();

  return (
    <div className="p-6 md:p-8">
      <h2 className="font-serif text-xl mb-1">Who's staying?</h2>
      <p className="text-sm text-ink/60 mb-6">We'll send your confirmation here.</p>

      <div className="grid grid-cols-2 gap-6">
        <Field label="Full name">
          <input className={inputCls} value={guest.name} onChange={(e) => setGuest({ ...guest, name: e.target.value })} placeholder="Jordan Alvarez" />
        </Field>
        <Field label="Email">
          <input type="email" className={inputCls} value={guest.email} onChange={(e) => setGuest({ ...guest, email: e.target.value })} placeholder="jordan@email.com" />
        </Field>
        <Field label="Phone">
          <input className={inputCls} value={guest.phone} onChange={(e) => setGuest({ ...guest, phone: e.target.value })} placeholder="+1 555 010 0000" />
        </Field>
        <Field label="Special requests">
          <input className={inputCls} value={guest.requests} onChange={(e) => setGuest({ ...guest, requests: e.target.value })} placeholder="Optional" />
        </Field>
      </div>

      <div className="flex justify-between mt-8 pt-6 border-t border-ink/10">
        <button
          onClick={() => navigate("/rooms")}
          className="flex items-center gap-1 text-sm font-medium tracking-wide hover:opacity-70 transition-opacity"
        >
          <ChevronLeft size={16} /> Back
        </button>
        <button
          disabled={!canContinue}
          onClick={() => navigate("/review")}
          className="px-6 py-2.5 rounded-full bg-ink text-paper text-sm font-semibold tracking-wide disabled:opacity-30 disabled:cursor-not-allowed hover:bg-ink/90 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
