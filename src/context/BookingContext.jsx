import { createContext, useContext, useState } from "react";

const BookingContext = createContext(null);

const HOTEL_ID = 1; // single-property app for now

export function BookingProvider({ children }) {
  const [search, setSearch] = useState({ checkIn: "", checkOut: "", guests: 2 });
  const [selectedRoom, setSelectedRoom] = useState(null); // full room object from API
  const [guest, setGuest] = useState({ name: "", email: "", phone: "", requests: "" });
  const [lastBooking, setLastBooking] = useState(null); // BookingResponse from API

  const value = {
    hotelId: HOTEL_ID,
    search,
    setSearch,
    selectedRoom,
    setSelectedRoom,
    guest,
    setGuest,
    lastBooking,
    setLastBooking,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within a BookingProvider");
  return ctx;
}
