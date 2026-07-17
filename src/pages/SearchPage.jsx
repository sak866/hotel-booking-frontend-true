import { useNavigate } from "react-router-dom";
import { Calendar, Users } from "lucide-react";
import { useBooking } from "../context/BookingContext";
import { Field, inputCls } from "../components/shared";

export default function SearchPage() {
  const { search, setSearch } = useBooking();
  const navigate = useNavigate();

  const validRange = search.checkIn && search.checkOut && new Date(search.checkOut) > new Date(search.checkIn);

  return (
    <div className="p-6 md:p-8">
      <h2 className="font-serif text-xl mb-1">When are you staying?</h2>
      <p className="text-sm text-ink/60 mb-6">Pick your dates and party size to see available rooms.</p>

      <div className="grid grid-cols-2 gap-6">
        <Field label="Check in">
          <div className="flex items-center gap-2">
            <Calendar size={15} className="text-brass" />
            <input
              type="date"
              className={inputCls}
              value={search.checkIn}
              onChange={(e) => setSearch({ ...search, checkIn: e.target.value })}
            />
          </div>
        </Field>
        <Field label="Check out">
          <div className="flex items-center gap-2">
            <Calendar size={15} className="text-brass" />
            <input
              type="date"
              className={inputCls}
              value={search.checkOut}
              onChange={(e) => setSearch({ ...search, checkOut: e.target.value })}
            />
          </div>
        </Field>
        <Field label="Guests">
          <div className="flex items-center gap-2">
            <Users size={15} className="text-brass" />
            <input
              type="number"
              min={1}
              max={8}
              className={inputCls}
              value={search.guests}
              onChange={(e) => setSearch({ ...search, guests: +e.target.value })}
            />
          </div>
        </Field>
      </div>

      {search.checkIn && search.checkOut && !validRange && (
        <p className="text-rose text-sm mt-4">Check-out must be after check-in.</p>
      )}

      <div className="flex justify-end mt-8 pt-6 border-t border-ink/10">
        <button
          disabled={!validRange}
          onClick={() => navigate("/rooms")}
          className="px-6 py-2.5 rounded-full bg-ink text-paper text-sm font-semibold tracking-wide disabled:opacity-30 disabled:cursor-not-allowed hover:bg-ink/90 transition-colors"
        >
          See available rooms
        </button>
      </div>
    </div>
  );
}
