import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wifi, Coffee, Car, Waves, ChevronLeft } from "lucide-react";
import { useBooking } from "../context/BookingContext";
import { nights } from "../components/shared";
import { api } from "../api/client";

const AMENITY_ICON = { wifi: Wifi, coffee: Coffee, car: Car, pool: Waves };

export default function RoomsPage() {
  const { hotelId, search, selectedRoom, setSelectedRoom } = useBooking();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  const n = nights(search.checkIn, search.checkOut) || 1;

  useEffect(() => {
    if (!search.checkIn || !search.checkOut) {
      navigate("/");
      return;
    }
    let cancelled = false;
    setStatus("loading");
    api
      .getAvailableRooms(hotelId, search.checkIn, search.checkOut)
      .then((data) => {
        if (!cancelled) {
          setRooms(data);
          setStatus("ready");
        }
      })
      .catch(() => !cancelled && setStatus("error"));
    return () => {
      cancelled = true;
    };
  }, [hotelId, search.checkIn, search.checkOut, navigate]);

  return (
    <div className="p-6 md:p-8">
      <h2 className="font-serif text-xl mb-1">Choose your room</h2>
      <p className="text-sm text-ink/60 mb-6">
        {n} night{n !== 1 ? "s" : ""} · priced per night
      </p>

      {status === "loading" && <p className="text-sm text-ink/50 py-8 text-center">Checking availability…</p>}

      {status === "error" && (
        <p className="text-sm text-rose py-8 text-center">
          Couldn't load rooms. Is the backend running at the configured API URL?
        </p>
      )}

      {status === "ready" && rooms.length === 0 && (
        <p className="text-sm text-ink/50 py-8 text-center">No rooms available for those dates.</p>
      )}

      {status === "ready" && (
        <div className="space-y-3">
          {rooms.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRoom(r)}
              className={`w-full text-left p-4 rounded-xl border-2 flex items-center justify-between transition-colors ${
                selectedRoom?.id === r.id ? "border-brass bg-brass/5" : "border-ink/10 hover:border-ink/25"
              }`}
            >
              <div>
                <p className="font-semibold">{r.name}</p>
                <p className="text-sm text-ink/60 mt-0.5">{r.description}</p>
                <div className="flex gap-2 mt-2">
                  {(r.amenities || []).map((a) => {
                    const Icon = AMENITY_ICON[a];
                    return Icon ? <Icon key={a} size={14} className="text-ink/40" /> : null;
                  })}
                </div>
              </div>
              <div className="text-right shrink-0 ml-4">
                <p className="font-mono text-lg font-semibold">${r.pricePerNight}</p>
                <p className="text-[11px] text-ink/50">/ night</p>
              </div>
            </button>
          ))}
        </div>
      )}

      <div className="flex justify-between mt-8 pt-6 border-t border-ink/10">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1 text-sm font-medium tracking-wide hover:opacity-70 transition-opacity"
        >
          <ChevronLeft size={16} /> Back
        </button>
        <button
          disabled={!selectedRoom}
          onClick={() => navigate("/guest")}
          className="px-6 py-2.5 rounded-full bg-ink text-paper text-sm font-semibold tracking-wide disabled:opacity-30 disabled:cursor-not-allowed hover:bg-ink/90 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
